const express = require('express');
const router = express.Router();
const {
    getMyApplications,
    applyToJob,
    getAllApplicationsForAdmin,
    getJobApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Optional auth — don't block unauthenticated users from applying
const optionalAuth = (req, res, next) => {
    const header = req.headers.authorization;
    if (header && header.startsWith('Bearer ')) {
        const jwt = require('jsonwebtoken');
        try {
            req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET );
        } catch (_) {}
    }
    next();
};

router.get('/my', protect, getMyApplications);
router.post('/', optionalAuth, applyToJob);
router.get('/all', protect, authorize('Admin'), getAllApplicationsForAdmin); // New global admin view
router.get('/job/:jobId', protect, authorize('Admin'), getJobApplications);
router.patch('/:id/status', protect, authorize('Admin'), updateApplicationStatus);

module.exports = router;
