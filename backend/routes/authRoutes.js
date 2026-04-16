const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  uploadProfilePicture,
  updateOnboardingProfile,
  forgotPassword,
  logoutUser,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const {
  loginRateLimiter,
  forgotPasswordRateLimiter,
  resetPasswordRateLimiter,
} = require('../middlewares/rateLimiters');
const upload = require('../config/multer');

router.post('/register', registerUser);
router.post('/login', loginRateLimiter, loginUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPasswordRateLimiter, forgotPassword);
router.post('/reset-password/:token', resetPasswordRateLimiter, resetPassword);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/profile/onboarding', protect, updateOnboardingProfile);
router.post('/profile/picture', protect, upload.single('profileImage'), uploadProfilePicture);

module.exports = router;
