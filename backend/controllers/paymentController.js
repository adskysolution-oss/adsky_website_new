const crypto = require('crypto');
const Cashfree = require('../config/cashfree');
const Payment = require('../models/Payment');
const QuoteRequest = require('../models/QuoteRequest');
const User = require('../models/User');
const { getPlanBySlug } = require('../config/pricingPlans');
const { getRequiredEnv } = require('../utils/env');
const { normalizeEmail, sanitizeText } = require('../utils/sanitize');

const buildOrderId = ({ userId, planSlug }) => `plan_${planSlug}_${userId}_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;

exports.createOrder = async (req, res) => {
  try {
    const planSlug = sanitizeText(req.body.planSlug || req.body.planName).toLowerCase();
    const expectedAmountFromClient = Number(req.body.amount || 0);
    const plan = getPlanBySlug(planSlug);

    if (!plan || plan.slug === 'custom') {
      return res.status(400).json({ message: 'Invalid pricing plan selected.' });
    }

    if (expectedAmountFromClient && expectedAmountFromClient !== plan.amount) {
      return res.status(400).json({ message: 'Plan amount mismatch. Please refresh and try again.' });
    }

    const user = await User.findById(req.user.id).select('name email phone');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const orderId = buildOrderId({ userId: user._id.toString(), planSlug: plan.slug });
    const frontendUrl = getRequiredEnv('FRONTEND_URL').replace(/\/$/, '');

    const request = {
      order_id: orderId,
      order_amount: plan.amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: user._id.toString(),
        customer_name: user.name || 'Customer',
        customer_email: user.email,
        customer_phone: user.phone || '9999999999',
      },
      order_meta: {
        return_url: `${frontendUrl}/payment-success?order_id=${orderId}&plan=${plan.slug}`,
      },
      order_note: `${plan.name} subscription purchase`,
    };

    const response = await Cashfree.PGCreateOrder(
      request,
      `req_${orderId}`,
      `idem_${orderId}`,
    );

    await Payment.create({
      user: user._id,
      planName: plan.name,
      amount: plan.amount,
      type: 'Subscription',
      status: 'Pending',
      paymentStatus: 'PENDING',
      orderId,
      paymentGateway: 'Cashfree',
      rawOrder: response.data,
    });

    res.status(201).json({
      orderId,
      planName: plan.name,
      amount: plan.amount,
      payment_session_id: response.data.payment_session_id,
    });
  } catch (error) {
    const message = error.response?.data?.message || 'Unable to initiate payment right now.';
    res.status(500).json({ message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const orderId = sanitizeText(req.body.orderId);
    if (!orderId) {
      return res.status(400).json({ message: 'orderId is required.' });
    }

    const paymentRecord = await Payment.findOne({ orderId, user: req.user.id });
    if (!paymentRecord) {
      return res.status(404).json({ message: 'Payment record not found.' });
    }

    const orderResponse = await Cashfree.PGFetchOrder(orderId);
    const orderData = orderResponse.data;

    let paymentData = null;
    try {
      const paymentsResponse = await Cashfree.PGOrderFetchPayments(orderId);
      paymentData = Array.isArray(paymentsResponse.data) ? paymentsResponse.data[0] : null;
    } catch (error) {
      paymentData = null;
    }

    if (orderData.order_status !== 'PAID') {
      paymentRecord.status = 'Failed';
      paymentRecord.paymentStatus = orderData.order_status || 'FAILED';
      paymentRecord.rawOrder = orderData;
      paymentRecord.rawPayment = paymentData;
      await paymentRecord.save();

      return res.status(400).json({
        success: false,
        message: 'Payment is not successful.',
        orderStatus: orderData.order_status,
      });
    }

    paymentRecord.status = 'Completed';
    paymentRecord.paymentStatus = paymentData?.payment_status || orderData.order_status;
    paymentRecord.transactionId = paymentData?.cf_payment_id || paymentRecord.transactionId || orderId;
    paymentRecord.cashfreePaymentId = paymentData?.cf_payment_id || paymentRecord.cashfreePaymentId;
    paymentRecord.rawOrder = orderData;
    paymentRecord.rawPayment = paymentData;
    paymentRecord.completedAt = new Date();
    paymentRecord.paymentDate = new Date();
    await paymentRecord.save();

    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        subscription: {
          planName: paymentRecord.planName,
          status: 'active',
          amount: paymentRecord.amount,
          orderId: paymentRecord.orderId,
          activatedAt: new Date(),
        },
      },
    });

    res.json({
      success: true,
      planName: paymentRecord.planName,
      amount: paymentRecord.amount,
      orderId: paymentRecord.orderId,
      paymentStatus: paymentRecord.paymentStatus,
      paymentDate: paymentRecord.paymentDate,
    });
  } catch (error) {
    const message = error.response?.data?.message || 'Unable to verify payment right now.';
    res.status(500).json({ message });
  }
};

exports.createCustomQuoteRequest = async (req, res) => {
  try {
    const name = sanitizeText(req.body.name);
    const email = normalizeEmail(req.body.email);
    const requirements = sanitizeText(req.body.requirements);

    if (!name || !email || !requirements) {
      return res.status(400).json({ message: 'Name, email, and requirements are required.' });
    }

    const quoteRequest = await QuoteRequest.create({
      user: req.user.id,
      name,
      email,
      requirements,
      planName: 'Custom',
    });

    res.status(201).json({
      success: true,
      quoteRequestId: quoteRequest._id,
      message: 'Your quote request has been submitted. Our team will contact you shortly.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to submit quote request right now.' });
  }
};
