const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signAuthToken } = require('../utils/jwt');
const { PASSWORD_REGEX, PASSWORD_REQUIREMENTS_TEXT } = require('../utils/password');
const { normalizeEmail, sanitizeText, sanitizeOptionalText } = require('../utils/sanitize');
const { sendEmail } = require('../utils/email');
const { buildPasswordResetEmail } = require('../utils/emailTemplates');
const { getRequiredEnv } = require('../utils/env');

const PASSWORD_RESET_TTL_MS = 15 * 60 * 1000;
const FORGOT_PASSWORD_RESPONSE = 'If an account with that email exists, a password reset link will be sent shortly.';

const buildAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  onboardingCompleted: user.onboardingCompleted,
  token: signAuthToken(user._id.toString(), user.role),
});

const validatePasswordStrength = (password) => PASSWORD_REGEX.test(password);

exports.registerUser = async (req, res) => {
  try {
    const name = sanitizeText(req.body.name);
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');
    const role = sanitizeText(req.body.role);
    const phone = sanitizeOptionalText(req.body.phone);
    const companyName = sanitizeOptionalText(req.body.companyName);

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required.' });
    }

    if (!validatePasswordStrength(password)) {
      return res.status(400).json({ message: PASSWORD_REQUIREMENTS_TEXT });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      companyName,
    });

    res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: 'Unable to create account right now.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (user.accountStatus !== 'Active') {
      return res.status(403).json({ message: 'Your account is currently unavailable. Please contact support.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: 'Unable to sign in right now.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -passwordResetToken -passwordResetExpiresAt')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fieldsToCheck = [
      'name', 'email', 'role', 'phone', 'profileImage',
      'dob', 'gender', 'languages', 'locationArea',
      'travelDistance', 'availabilityType', 'shift', 'hoursPerDay',
    ];

    let filledFields = 0;
    fieldsToCheck.forEach((field) => {
      if (user[field] && (Array.isArray(user[field]) ? user[field].length > 0 : true)) {
        filledFields += 1;
      }
    });

    const progressPercentage = Math.round((filledFields / fieldsToCheck.length) * 100);

    res.json({ ...user, progressPercentage });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load profile.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const allowedUpdates = [
      'name', 'phone', 'gender', 'dob', 'languages', 'skills',
      'locationArea', 'travelDistance', 'availabilityType', 'shift', 'hoursPerDay',
      'companyName', 'portfolioUrl', 'bankAccount', 'ifscCode',
    ];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = typeof req.body[field] === 'string' ? sanitizeText(req.body[field]) : req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true })
      .select('-password -passwordResetToken -passwordResetExpiresAt');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update profile.' });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true },
    ).select('-password -passwordResetToken -passwordResetExpiresAt');

    res.json({ message: 'Profile picture updated', profileImage: imageUrl, user });
  } catch (error) {
    res.status(500).json({ message: 'Unable to upload profile picture.' });
  }
};

exports.updateOnboardingProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = { ...req.body };

    if (typeof updates.name === 'string') {
      updates.name = sanitizeText(updates.name);
    }

    const user = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true })
      .select('-password -passwordResetToken -passwordResetExpiresAt');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update onboarding profile.' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }

    const user = await User.findOne({ email });
    if (user) {
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
      const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS);

      user.passwordResetToken = hashedToken;
      user.passwordResetExpiresAt = expiresAt;
      await user.save();

      const frontendUrl = getRequiredEnv('FRONTEND_URL');
      const resetUrl = `${frontendUrl.replace(/\/$/, '')}/reset-password/${rawToken}`;
      const emailPayload = buildPasswordResetEmail({ name: user.name, resetUrl, expiresInMinutes: 15 });

      try {
        await sendEmail({
          to: user.email,
          subject: emailPayload.subject,
          html: emailPayload.html,
        });
      } catch (emailError) {
        user.passwordResetToken = undefined;
        user.passwordResetExpiresAt = undefined;
        await user.save();
      }
    }

    res.json({ message: FORGOT_PASSWORD_RESPONSE });
  } catch (error) {
    res.json({ message: FORGOT_PASSWORD_RESPONSE });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const rawToken = String(req.params.token || '');
    const newPassword = String(req.body.newPassword || '');

    if (!rawToken) {
      return res.status(400).json({ message: 'Reset token is required.' });
    }

    if (!validatePasswordStrength(newPassword)) {
      return res.status(400).json({ message: PASSWORD_REQUIREMENTS_TEXT });
    }

    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'This password reset link is invalid or has expired.' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.passwordResetToken = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now sign in with your new password.' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to reset password right now.' });
  }
};
