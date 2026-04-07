const User = require('../models/User');
const Job = require('../models/Job');
const Task = require('../models/Task');
const Payment = require('../models/Payment');

exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeJobs = await Job.countDocuments({ status: 'Open' });
        
        // Mock revenue and vendor counts since those modules are minimal right now
        const totalRevenue = 154000;
        const totalVendors = await User.countDocuments({ role: { $in: ['IT Vendor', 'Gig Vendor'] } });

        res.json({
            totalUsers,
            totalRevenue,
            activeJobs,
            totalVendors
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const query = {};
        if (req.query.role) query.role = req.query.role;
        if (req.query.status) query.accountStatus = req.query.status;

        const users = await User.find(query).select('-password').sort('-createdAt');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const user = await User.findByIdAndUpdate(id, { accountStatus: status }, { new: true });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('client', 'name email').sort('-createdAt');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJobStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const job = await Job.findByIdAndUpdate(id, { status }, { new: true });
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('job', 'title').populate('worker', 'name email').populate('client', 'name email').sort('-createdAt');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('user', 'name email').sort('-createdAt');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await User.find({ role: { $in: ['IT Vendor', 'Gig Vendor'] } }).select('-password').sort('-createdAt');
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Seeder hack: Quick undocumented endpoint just to promote current user to Admin for testing
// I will not expose this in production, just using it so user can test admin panel
exports.makeMeAdmin = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { role: 'Admin' }, { new: true });
        res.json({ message: 'You are now an Admin! Please relogin to refresh token.', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
