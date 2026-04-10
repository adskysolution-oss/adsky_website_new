const rateLimit = require('express-rate-limit');

const buildLimiter = ({ windowMs, max, message }) => rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message },
});

const loginRateLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: 'Too many login attempts. Please try again in a few minutes.',
});

const forgotPasswordRateLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many reset requests. Please try again in a few minutes.',
});

const resetPasswordRateLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many password reset attempts. Please try again in a few minutes.',
});

module.exports = {
  loginRateLimiter,
  forgotPasswordRateLimiter,
  resetPasswordRateLimiter,
};
