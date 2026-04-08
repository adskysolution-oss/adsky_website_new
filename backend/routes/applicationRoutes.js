const express = require('express');
const router = express.Router();
const { getMyApplications, applyToJob } = require('../controllers/applicationController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/my', protect, getMyApplications);
router.post('/', protect, applyToJob);

module.exports = router;
