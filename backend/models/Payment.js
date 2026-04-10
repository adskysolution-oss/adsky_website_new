const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  planName: { type: String, trim: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Payout', 'Refund', 'Escrow', 'Commission', 'Subscription'], required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' },
  paymentStatus: { type: String, default: 'PENDING' },
  orderId: { type: String, unique: true, sparse: true },
  transactionId: { type: String, unique: true, sparse: true },
  cashfreePaymentId: { type: String, sparse: true },
  paymentGateway: { type: String, default: 'Cashfree' },
  rawOrder: { type: mongoose.Schema.Types.Mixed },
  rawPayment: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  paymentDate: { type: Date },
});

module.exports = mongoose.model('Payment', paymentSchema);
