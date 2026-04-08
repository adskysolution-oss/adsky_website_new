const express = require('express');
const router = express.Router();
const { 
    registerUser, loginUser, getProfile, updateProfile,
    uploadProfilePicture, updateOnboardingProfile,
    forgotPassword, verifyOTP, resetPassword
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/profile/onboarding', protect, updateOnboardingProfile);
router.post('/profile/picture', protect, upload.single('profileImage'), uploadProfilePicture);

module.exports = router;
