const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String],
    category: { type: String, required: true },
    location: { type: String },
    salaryType: { type: String, enum: ['Fixed', 'Gig', 'Hourly'], required: true },
    salaryAmount: { type: Number, required: true },
    
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
    
    applicationsCount: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
