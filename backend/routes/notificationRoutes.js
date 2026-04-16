const express = require('express');
const router = express.Router();
const { 
    getNotifications, markRead, markAllRead, createNotification 
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', protect, getNotifications);
router.put('/mark-all-read', protect, markAllRead);
router.put('/:id/read', protect, markRead);
router.post('/', protect, authorize('Admin'), createNotification);

module.exports = router;
