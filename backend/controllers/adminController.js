const User = require('../models/User');
const Job = require('../models/Job');
const Task = require('../models/Task');
const Payment = require('../models/Payment');
const Application = require('../models/Application');

exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeJobs = await Job.countDocuments({ status: 'Open' });
        const totalApplications = await Application.countDocuments();
        const totalVendors = await User.countDocuments({ role: { $in: ['IT Vendor', 'Gig Vendor'] } });
        
        // Calculate real revenue from completed payments
        const revenueData = await Payment.aggregate([
            { $match: { status: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

        res.json({
            totalUsers,
            totalRevenue,
            activeJobs,
            totalVendors,
            totalApplications
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



// Admin: Create a job (uses admin's own user ID as client)
exports.createAdminJob = async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, client: req.user.id });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Update a job
exports.updateAdminJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Delete a job
exports.deleteAdminJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get Chart Data (Monthly Revenue and Applications)
exports.getAdminChartData = async (req, res) => {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        sixMonthsAgo.setDate(1);

        // Aggregate Revenue
        const revenueAgg = await Payment.aggregate([
            { $match: { status: 'Completed', createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                    revenue: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Aggregate Applications
        const applicationsAgg = await Application.aggregate([
            { $match: { appliedAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { month: { $month: "$appliedAt" }, year: { $year: "$appliedAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Merge data
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const combined = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() - (6 - i));
            const m = date.getMonth() + 1;
            const y = date.getFullYear();
            
            const rev = revenueAgg.find(r => r._id.month === m && r._id.year === y)?.revenue || 0;
            const app = applicationsAgg.find(a => a._id.month === m && a._id.year === y)?.count || 0;
            
            combined.push({
                name: monthNames[date.getMonth()],
                revenue: rev,
                applications: app
            });
        }

        res.json(combined);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get Chart Data (Monthly Revenue and Applications)
exports.getAdminChartData = async (req, res) => {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        sixMonthsAgo.setDate(1);

        // Aggregate Revenue
        const revenueAgg = await Payment.aggregate([
            { $match: { status: 'Completed', createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                    revenue: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Aggregate Applications
        const applicationsAgg = await Application.aggregate([
            { $match: { appliedAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { month: { $month: "$appliedAt" }, year: { $year: "$appliedAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Merge data
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const combined = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() - (6 - i));
            const m = date.getMonth() + 1;
            const y = date.getFullYear();
            
            const rev = revenueAgg.find(r => r._id.month === m && r._id.year === y)?.revenue || 0;
            const app = applicationsAgg.find(a => a._id.month === m && a._id.year === y)?.count || 0;
            
            combined.push({
                name: monthNames[date.getMonth()],
                revenue: rev,
                applications: app
            });
        }

        res.json(combined);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
