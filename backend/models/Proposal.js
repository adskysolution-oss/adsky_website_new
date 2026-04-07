const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'ITService', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    clientRequirement: { type: String, required: true },
    
    vendorProposedPrice: { type: Number },
    vendorProposedTimeline: { type: Number }, // in days
    vendorMessage: { type: String },
    
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Completed'], default: 'Pending' },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposal', proposalSchema);
