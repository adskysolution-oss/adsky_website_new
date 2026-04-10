const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Worker', 'Client', 'IT Vendor', 'Gig Vendor', 'Admin'],
    required: true,
  },
  phone: { type: String, trim: true },
  profileImage: { type: String },
  skills: [String],
  verified: { type: Boolean, default: false },
  kycStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  bankAccount: { type: String },
  ifscCode: { type: String },
  companyName: { type: String, trim: true },
  portfolioUrl: { type: String },
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
  passwordResetToken: { type: String },
  passwordResetExpiresAt: { type: Date },
  accountStatus: { type: String, enum: ['Active', 'Blocked'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ passwordResetToken: 1, passwordResetExpiresAt: 1 });

module.exports = mongoose.model('User', userSchema);
