const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional if guest applies
    
    // Applicant details captured in the modal form
    applicantName: { type: String, required: true },
    applicantPhone: { type: String, required: true },
    applicantEmail: { type: String },
    applicantDob: { type: String },
    applicantLanguages: [String],
    applicantLocation: { type: String },
    applicantAvailability: { type: String },
    applicantNote: { type: String },

    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Completed'], default: 'Pending' },
    coverLetter: { type: String },
    
    submissionUrl: { type: String },
    submissionNotes: { type: String },
    escrowStatus: { type: String, enum: ['Not Started', 'Funded', 'Released', 'Refunded'], default: 'Not Started' },
    
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
