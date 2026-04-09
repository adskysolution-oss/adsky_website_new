const express = require('express');
const router = express.Router();
const {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getCategories
} = require('../controllers/jobController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Optional auth middleware — attaches user if token present, but doesn't block
const optionalAuth = (req, res, next) => {
    const header = req.headers.authorization;
    if (header && header.startsWith('Bearer ')) {
        const jwt = require('jsonwebtoken');
        try {
            const token = header.split(' ')[1];
            req.user = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key_12345');
        } catch (_) { /* ignore invalid token */ }
    }
    next();
};

// ── Public routes ──────────────────────────────────────────────
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.get('/categories', protect, getCategories);

// ── Protected routes (Admin or Client) ────────────────────────
router.post('/jobs', protect, authorize('Admin', 'Client'), createJob);
router.put('/jobs/:id', protect, authorize('Admin', 'Client'), updateJob);
router.delete('/jobs/:id', protect, authorize('Admin', 'Client'), deleteJob);

module.exports = router;
