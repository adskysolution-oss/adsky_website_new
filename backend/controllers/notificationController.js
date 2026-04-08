const Notification = require('../models/Notification');

// GET /api/notifications — get all notifications for logged-in user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);

        const unreadCount = await Notification.countDocuments({ userId: req.user.id, read: false });

        res.json({ notifications, unreadCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/notifications/:id/read — mark one notification as read
exports.markRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { read: true },
            { new: true }
        );

        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/notifications/mark-all-read — mark all notifications as read
exports.markAllRead = async (req, res) => {
    try {
        await Notification.updateMany({ userId: req.user.id, read: false }, { read: true });
        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/notifications — create a notification (admin/internal use)
exports.createNotification = async (req, res) => {
    try {
        const { userId, type, title, details, link } = req.body;
        const notification = await Notification.create({ userId, type, title, details, link });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
