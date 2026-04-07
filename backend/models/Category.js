const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);
