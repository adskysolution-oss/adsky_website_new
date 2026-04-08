const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { 
        type: String, 
        enum: ['success', 'info', 'alert', 'payment'],
        default: 'info'
    },
    title: { type: String, required: true },
    details: { type: String, required: true },
    read: { type: Boolean, default: false },
    link: { type: String }, // optional navigation link
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
