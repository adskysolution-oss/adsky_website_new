/**
 * Seed Script — creates sample jobs in MongoDB
 * Run: node backend/seeds/seedJobs.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Job = require('../models/Job');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/adsky');

    // Find or create a seed admin user
    let admin = await User.findOne({ role: 'Admin' });
    if (!admin) {
        admin = await User.findOne({});
    }
    if (!admin) {
        console.log('No users found — register first then run this seeder');
        process.exit(1);
    }

    const jobs = [
        {
            title: 'Delivery Partner – Pune',
            description: 'Join our growing delivery network and earn daily. Deliver food, groceries, and packages across Pune city. Flexible hours — work when you want!',
            requirements: ['Own a two-wheeler', 'Smartphone with internet', 'Age 18–40', 'Valid driving license'],
            category: 'Delivery Jobs',
            location: 'Pune, MH',
            salaryType: 'Gig',
            salaryAmount: 450,
            openings: 50,
            companyName: 'SwiftDeliver',
            experienceLevel: 'Fresher',
            qualification: '10th Pass',
            tags: ['delivery', 'part-time', 'two-wheeler'],
            client: admin._id, status: 'Open'
        },
        {
            title: 'Field Sales Executive – FMCG',
            description: 'Promote and sell FMCG products to retail outlets in your area. Best for candidates who enjoy meeting people and working independently.',
            requirements: ['Good communication skills', 'Own a vehicle preferred', 'Target-driven attitude'],
            category: 'Field Sales',
            location: 'Mumbai, MH',
            salaryType: 'Monthly',
            salaryAmount: 18000,
            openings: 20,
            companyName: 'NationBrands Ltd',
            experienceLevel: 'Experienced',
            qualification: '12th Pass',
            tags: ['sales', 'fmcg', 'field-work'],
            client: admin._id, status: 'Open'
        },
        {
            title: 'Data Entry Operator – Work From Home',
            description: 'Remote data entry work. Digitize records, maintain spreadsheets, and update databases. Perfect for students or homemakers.',
            requirements: ['Basic computer knowledge', 'Typing speed 30+ WPM', 'Own laptop/PC'],
            category: 'Data Entry',
            location: 'Remote',
            salaryType: 'Hourly',
            salaryAmount: 120,
            openings: 100,
            companyName: 'DataMatrix Solutions',
            experienceLevel: 'Any',
            qualification: 'No minimum',
            tags: ['remote', 'data-entry', 'wfh'],
            client: admin._id, status: 'Open'
        },
        {
            title: 'Digital Marketing Intern',
            description: 'Support our marketing team with social media management, content creation, and SEO campaigns. Learn while you earn!',
            requirements: ['Knowledge of Instagram/Facebook', 'Basic Canva skills', 'Creative mindset'],
            category: 'Marketing',
            location: 'Bangalore, KA',
            salaryType: 'Monthly',
            salaryAmount: 8000,
            openings: 5,
            companyName: 'GrowthHack Agency',
            experienceLevel: 'Fresher',
            qualification: 'Pursuing Graduation',
            tags: ['marketing', 'social-media', 'intern'],
            client: admin._id, status: 'Open'
        },
        {
            title: 'Telecaller – Customer Support',
            description: 'Make outbound/inbound calls to assist customers with queries, complaints, and service requests. Work from the comfort of your home.',
            requirements: ['Clear voice', 'Hindi + English fluency required', 'Quiet workspace'],
            category: 'Work From Home',
            location: 'Remote',
            salaryType: 'Monthly',
            salaryAmount: 12000,
            openings: 30,
            companyName: 'CareConnect India',
            experienceLevel: 'Any',
            qualification: '12th Pass',
            tags: ['telecalling', 'bpo', 'remote'],
            client: admin._id, status: 'Open'
        },
        {
            title: 'Mystery Shopper / Audit Executive',
            description: 'Visit retail stores, restaurants, and service centers as a mystery customer and submit detailed audit reports.',
            requirements: ['Good observation skills', 'Smartphone for photo documentation', 'Willingness to travel locally'],
            category: 'Testing & QA',
            location: 'Delhi, NCR',
            salaryType: 'Gig',
            salaryAmount: 800,
            openings: 200,
            companyName: 'AudiTrack Solutions',
            experienceLevel: 'Any',
            qualification: 'Graduate preferred',
            tags: ['mystery-audit', 'field', 'gig'],
            client: admin._id, status: 'Open'
        }
    ];

    await Job.deleteMany({ client: admin._id, companyName: { $exists: true } });
    const inserted = await Job.insertMany(jobs);
    console.log(`✅ Seeded ${inserted.length} sample jobs`);
    mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
