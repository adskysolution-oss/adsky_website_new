const express = require('express');
const router = express.Router();
const { 
    getAdminStats, 
    getAllUsers, 
    updateUserStatus, 
    getAllJobs, 
    updateJobStatus,
    createAdminJob,
    updateAdminJob,
    deleteAdminJob,
    getAllTasks,
    updateTaskStatus,
    getAllPayments,
    updatePaymentStatus,
    getAllVendors,
    getAdminChartData
} = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Mount middleware
router.use(protect);

// Strict admin only below
router.use(authorize('Admin'));

// Analytics
router.get('/stats', getAdminStats);
router.get('/charts', getAdminChartData);

// Users
router.get('/users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);

// Jobs
router.get('/jobs', getAllJobs);
router.post('/jobs', createAdminJob);
router.patch('/jobs/:id/status', updateJobStatus);
router.put('/jobs/:id', updateAdminJob);
router.delete('/jobs/:id', deleteAdminJob);

// Tasks
router.get('/tasks', getAllTasks);
router.patch('/tasks/:id/status', updateTaskStatus);

// Payments
router.get('/payments', getAllPayments);
router.patch('/payments/:id/status', updatePaymentStatus);

// Vendors
router.get('/vendors', getAllVendors);

module.exports = router;
