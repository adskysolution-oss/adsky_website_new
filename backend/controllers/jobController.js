const Job = require('../models/Job');
const Category = require('../models/Category');
const Application = require('../models/Application');

const DEFAULT_CATEGORIES = [
    { title: 'Delivery Jobs', description: 'Deliver goods, packages, and groceries locally.', iconUrl: '🚚' },
    { title: 'Field Sales', description: 'Promote products and onboard merchants on the ground.', iconUrl: '📈' },
    { title: 'Data Entry', description: 'Perform typing, data structuring, and document tagging.', iconUrl: '💻' },
    { title: 'Marketing', description: 'Brand promotion, BTL activities, and market research.', iconUrl: '📊' },
    { title: 'Work From Home', description: 'Telecalling, remote sales, and customer support.', iconUrl: '🏠' },
    { title: 'Testing & QA', description: 'Software quality assurance and mystery audits.', iconUrl: '🛡️' }
];

exports.getCategories = async (req, res) => {
    try {
        let categories = await Category.find({ isActive: true });
        if (categories.length === 0) {
            await Category.insertMany(DEFAULT_CATEGORIES);
            categories = await Category.find({ isActive: true });
        }
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/jobs — public, with search/filter/pagination
exports.getJobs = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 12, salaryType, location } = req.query;
        const query = { status: 'Open' };

        if (category && category !== 'All') query.category = category;
        if (salaryType) query.salaryType = salaryType;
        if (location) query.location = new RegExp(location, 'i');
        if (search) {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { category: new RegExp(search, 'i') },
                { companyName: new RegExp(search, 'i') }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Job.countDocuments(query);
        const jobs = await Job.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('client', 'name companyName')
            .select('-requirements');

        res.json({ jobs, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/jobs/:id — public, full detail
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('client', 'name companyName email');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/jobs — protected (Admin or Client)
exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, client: req.user.id });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/jobs/:id — protected (Admin or Client who owns it)
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        if (req.user.role !== 'Admin' && job.client.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/jobs/:id — protected (Admin or Client who owns it)
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        if (req.user.role !== 'Admin' && job.client.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/admin/jobs/:id/applications — admin only
exports.getJobApplications = async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.id }).sort({ appliedAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
