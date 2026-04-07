'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Briefcase, ChevronRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OfficeDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Fetch Parallel
        const [profileRes, jobsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/profile', config),
          axios.get('http://localhost:5000/api/jobs', config)
        ]);

        setProfile(profileRes.data);
        setJobs(jobsRes.data);
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Promotional Banner */}
      <div className="w-full bg-gradient-to-r from-indigo-500 via-primary to-blue-600 rounded-2xl overflow-hidden shadow-lg mb-8 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 bg-cover bg-center" />
        <div className="px-8 py-10 md:py-14 relative z-10 flex flex-col justify-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Earn up to <span className="text-yellow-300">₹24k</span> from Home Using Your Phone!</h2>
          <ul className="text-blue-100 space-y-2 mb-6 font-medium">
            <li className="flex items-center">• Easy work + flexible + quick payout</li>
            <li className="flex items-center">• Turn Your Daily Activities into Income!</li>
          </ul>
          <div>
            <Link href="/categories" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105">
               Get Started Now
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Jobs Area */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended Jobs</h3>
            <Link href="/categories" className="text-primary font-semibold hover:underline text-sm">View All Categories</Link>
          </div>

          {loading ? (
             <div className="animate-pulse space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>)}
             </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
               {jobs.map((job) => (
                 <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} key={job._id} className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h4>
                     <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">₹{job.salaryAmount} / {job.salaryType}</span>
                   </div>
                   <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{job.description}</p>
                   <button className="text-primary font-semibold text-sm flex items-center hover:text-primary-hover">
                     View Details <ChevronRight size={16} />
                   </button>
                 </motion.div>
               ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-3xl py-16 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-48 h-48 mb-6 opacity-80">
                 {/* Using unDraw style vector placeholder */}
                 <img src="https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/folder-src.svg" alt="No jobs" className="w-full h-full opacity-50 grayscale" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No jobs explicitly assigned right now</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">Explore specific job categories manually to apply for available gigs based on your preferences.</p>
              <Link href="/categories" className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                Explore Job Categories
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Profile Progress */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm sticky top-24">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dream Applications</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Let us know you by completing your profile so we can match you perfectly.</p>
            
            <div className="mb-2 flex justify-between items-end">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                 {profile?.progressPercentage || 0}% Complete
              </span>
            </div>
            
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-6">
               <div 
                 className="h-full bg-green-500 transition-all duration-1000 ease-out"
                 style={{ width: `${profile?.progressPercentage || 0}%` }}
               />
            </div>
            
            <Link 
              href="/onboarding" 
              className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center ${profile?.progressPercentage === 100 ? 'bg-green-500 text-white cursor-default' : 'bg-[#0d1630] text-white hover:opacity-90'}`}
              onClick={(e) => profile?.progressPercentage === 100 && e.preventDefault()}
            >
              {profile?.progressPercentage === 100 ? 'Profile Completed' : 'Complete Profile'}
            </Link>
            
            {profile?.progressPercentage !== 100 && (
               <div className="mt-4 flex items-start text-xs text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg">
                 <AlertCircle size={14} className="mr-2 flex-shrink-0 mt-0.5" />
                 Complete your profile quickly to boost your visibility to clients by 3x!
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
