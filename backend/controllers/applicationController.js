const Application = require('../models/Application');
const Job = require('../models/Job');

// GET /api/applications/my — logged-in user's applications
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ worker: req.user.id })
            .populate('job', 'title salaryAmount salaryType location category status companyName')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/applications — apply to a job (full modal form data)
exports.applyToJob = async (req, res) => {
    try {
        const {
            jobId,
            applicantName,
            applicantPhone,
            applicantEmail,
            applicantDob,
            applicantLanguages,
            applicantLocation,
            applicantAvailability,
            applicantNote,
            coverLetter
        } = req.body;

        if (!jobId) return res.status(400).json({ message: 'Job ID is required' });
        if (!applicantName || !applicantPhone) {
            return res.status(400).json({ message: 'Name and phone are required' });
        }

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Prevent duplicate application from logged-in users
        if (req.user) {
            const existingApp = await Application.findOne({ job: jobId, worker: req.user.id });
            if (existingApp) {
                return res.status(400).json({ message: 'You have already applied to this job' });
            }
        }

        const application = await Application.create({
            job: jobId,
            worker: req.user ? req.user.id : undefined,
            applicantName,
            applicantPhone,
            applicantEmail,
            applicantDob,
            applicantLanguages: Array.isArray(applicantLanguages) ? applicantLanguages : [],
            applicantLocation,
            applicantAvailability,
            applicantNote,
            coverLetter
        });

        // Increment job applications count
        await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/applications/job/:jobId — admin: view all applications for a job
exports.getJobApplications = async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId })
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/applications/:id/status — admin: update status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const app = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status, updatedAt: new Date() },
            { new: true }
        );
        if (!app) return res.status(404).json({ message: 'Application not found' });
        res.json(app);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
