const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Worker', 'Client', 'IT Vendor', 'Gig Vendor', 'Admin'], 
        required: true 
    },
    // Common profiles
    phone: { type: String },
    profileImage: { type: String },
    
    // Worker specific
    skills: [String],
    verified: { type: Boolean, default: false },
    kycStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    
    // Bank details
    bankAccount: { type: String },
    ifscCode: { type: String },

    // Vendor specific
    companyName: { type: String },
    portfolioUrl: { type: String },
    
    // Onboarding additional fields
    onboardingCompleted: { type: Boolean, default: false },
    dob: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Others'] },
    languages: [{ type: String }],
    whatsappUpdates: { type: Boolean },
    referralCode: { type: String },
    
    locationType: { type: String, enum: ['Current', 'Manual'] },
    locationArea: { type: String },
    travelDistance: { type: String },
    
    availabilityType: { type: String, enum: ['Full-time', 'Part-time'] },
    shift: { type: String, enum: ['Day', 'Night', 'Flexible'] },
    workingDays: { type: String, enum: ['Weekdays', 'Weekends', 'All week'] },
    hoursPerDay: { type: Number },
    joiningTime: { type: String },

    // Admin Access Management
    accountStatus: { type: String, enum: ['Active', 'Blocked'], default: 'Active' },
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
