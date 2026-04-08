const Application = require('../models/Application');

// GET /api/applications/my — get applications for logged-in user
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ worker: req.user.id })
            .populate('job', 'title salaryAmount salaryType location category')
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/applications — apply to a job
exports.applyToJob = async (req, res) => {
    try {
        const { jobId, coverLetter } = req.body;

        const existingApp = await Application.findOne({ job: jobId, worker: req.user.id });
        if (existingApp) {
            return res.status(400).json({ message: 'You have already applied to this job' });
        }

        const application = await Application.create({
            job: jobId,
            worker: req.user.id,
            coverLetter
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
