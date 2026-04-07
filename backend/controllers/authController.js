const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'super_secret_key_12345', {
        expiresIn: '30d',
    });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

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

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').lean();
        if (user) {
            // Calculate progress percentage
            const fieldsToCheck = [
                'name', 'email', 'role', 'phone', 'profileImage',
                'dob', 'gender', 'languages', 'locationArea',
                'travelDistance', 'availabilityType', 'shift', 'hoursPerDay'
            ];
            let filledFields = 0;
            fieldsToCheck.forEach(field => {
                if (user[field] && (Array.isArray(user[field]) ? user[field].length > 0 : true)) {
                    filledFields++;
                }
            });
            const progressPercentage = Math.round((filledFields / fieldsToCheck.length) * 100);
            
            res.json({ ...user, progressPercentage });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOnboardingProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
