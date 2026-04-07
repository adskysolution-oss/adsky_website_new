const express = require('express');
const router = express.Router();
const { getJobs, getCategories } = require('../controllers/jobController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/jobs', protect, getJobs);
router.get('/categories', protect, getCategories);

module.exports = router;
