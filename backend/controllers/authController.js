const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_12345';

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

// ─── Register ────────────────────────────────────────────────────────────────
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            onboardingCompleted: user.onboardingCompleted,
            token: generateToken(user._id, user.role),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Login ────────────────────────────────────────────────────────────────────
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                onboardingCompleted: user.onboardingCompleted,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Get Profile ──────────────────────────────────────────────────────────────
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -resetOTP -resetOTPExpiry -resetToken -resetTokenExpiry').lean();
        if (!user) return res.status(404).json({ message: 'User not found' });

        const fieldsToCheck = [
            'name', 'email', 'role', 'phone', 'profileImage',
            'dob', 'gender', 'languages', 'locationArea',
            'travelDistance', 'availabilityType', 'shift', 'hoursPerDay'
        ];
        let filledFields = 0;
        fieldsToCheck.forEach(field => {
            if (user[field] && (Array.isArray(user[field]) ? user[field].length > 0 : true)) filledFields++;
        });
        const progressPercentage = Math.round((filledFields / fieldsToCheck.length) * 100);

        res.json({ ...user, progressPercentage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Update Profile ───────────────────────────────────────────────────────────
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const allowedUpdates = ['name', 'phone', 'gender', 'dob', 'languages', 'skills',
            'locationArea', 'travelDistance', 'availabilityType', 'shift', 'hoursPerDay',
            'companyName', 'portfolioUrl', 'bankAccount', 'ifscCode'];

        const updates = {};
        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        const user = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true })
            .select('-password -resetOTP -resetOTPExpiry -resetToken -resetTokenExpiry');

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Upload Profile Picture ───────────────────────────────────────────────────
exports.uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: imageUrl },
            { new: true }
        ).select('-password');

        res.json({ message: 'Profile picture updated', profileImage: imageUrl, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Update Onboarding Profile ────────────────────────────────────────────────
exports.updateOnboardingProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true })
            .select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Forgot Password (Generate OTP) ──────────────────────────────────────────
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // Security: don't reveal if email exists
            return res.json({ message: 'If this email is registered, an OTP will be sent.' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.resetOTP = otp;
        user.resetOTPExpiry = otpExpiry;
        await user.save();

        // In production, send email. For dev: log to console
        console.log(`\n🔑 OTP for ${email}: ${otp} (expires in 10 mins)\n`);

        res.json({ 
            message: 'OTP sent to your email address.',
            // Remove in production:
            devOTP: process.env.NODE_ENV === 'production' ? undefined : otp
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Verify OTP ────────────────────────────────────────────────────────────────
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.resetOTP) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        if (user.resetOTP !== otp) {
            return res.status(400).json({ message: 'Incorrect OTP' });
        }

        if (new Date() > user.resetOTPExpiry) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // OTP is valid — generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        user.resetOTP = undefined;
        user.resetOTPExpiry = undefined;
        await user.save();

        res.json({ message: 'OTP verified', resetToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Reset Password ────────────────────────────────────────────────────────────
exports.resetPassword = async (req, res) => {
    try {
        const { email, resetToken, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.resetToken) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        if (user.resetToken !== resetToken) {
            return res.status(400).json({ message: 'Invalid reset token' });
        }

        if (new Date() > user.resetTokenExpiry) {
            return res.status(400).json({ message: 'Reset token has expired. Start over.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: 'Password reset successfully. You can now log in.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
