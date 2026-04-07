const Job = require('../models/Job');
const Category = require('../models/Category');

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
        
        // Auto-seed if empty
        if (categories.length === 0) {
            await Category.insertMany(DEFAULT_CATEGORIES);
            categories = await Category.find({ isActive: true });
        }
        
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const query = { status: 'Open' };
        if (req.query.category) {
            query.category = req.query.category;
        }
        // Exclude specific fields to keep it light
        const jobs = await Job.find(query).sort('-createdAt').select('-requirements').limit(20);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
