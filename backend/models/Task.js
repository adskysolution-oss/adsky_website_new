const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    attachments: [String], // URLs to files/images uploaded by worker
    status: { type: String, enum: ['Assigned', 'In Progress', 'Submitted', 'Approved', 'Rejected'], default: 'Assigned' },
    rewardAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    submittedAt: { type: Date },
    resolvedAt: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);
