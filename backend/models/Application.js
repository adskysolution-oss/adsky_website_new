const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Completed'], default: 'Pending' },
    coverLetter: { type: String },
    
    // For gigs that require submission
    submissionUrl: { type: String },
    submissionNotes: { type: String },
    
    escrowStatus: { type: String, enum: ['Not Started', 'Funded', 'Released', 'Refunded'], default: 'Not Started' },
    
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
