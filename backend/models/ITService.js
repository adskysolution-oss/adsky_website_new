const mongoose = require('mongoose');

const itServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Web Development', 'App Development', 'Digital Marketing', 'Design'], required: true },
    
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Pricing tiers
    packages: {
        basic: {
            price: Number,
            deliveryDays: Number,
            features: [String]
        },
        standard: {
            price: Number,
            deliveryDays: Number,
            features: [String]
        },
        premium: {
            price: Number,
            deliveryDays: Number,
            features: [String]
        }
    },
    
    portfolioImages: [String],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ITService', itServiceSchema);
