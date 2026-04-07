const express = require('express');
const router = express.Router();
const { 
    getAdminStats, 
    getAllUsers, 
    updateUserStatus, 
    getAllJobs, 
    updateJobStatus,
    getAllTasks,
    updateTaskStatus,
    getAllPayments,
    updatePaymentStatus,
    getAllVendors,
    makeMeAdmin
} = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Mount middleware
router.use(protect);

// Backdoor just for testing so user can promote themselves
router.post('/make-me-admin', makeMeAdmin);

// Strict admin only below
router.use(authorize('Admin'));

// Analytics
router.get('/stats', getAdminStats);

// Users
router.get('/users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);

// Jobs
router.get('/jobs', getAllJobs);
router.patch('/jobs/:id/status', updateJobStatus);

// Tasks
router.get('/tasks', getAllTasks);
router.patch('/tasks/:id/status', updateTaskStatus);

// Payments
router.get('/payments', getAllPayments);
router.patch('/payments/:id/status', updatePaymentStatus);

// Vendors
router.get('/vendors', getAllVendors);

module.exports = router;
