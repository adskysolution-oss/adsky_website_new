const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateOnboardingProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile/onboarding', protect, updateOnboardingProfile);

module.exports = router;
