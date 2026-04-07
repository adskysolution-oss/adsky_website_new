'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Briefcase, Plus, CheckCircle, XCircle } from 'lucide-react';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/jobs/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.map(j => j._id === id ? { ...j, status: newStatus } : j));
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Repository</h1>
          <p className="text-gray-500 text-sm mt-1">Audit, approve, or suspend all open gigs across the platform.</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-primary hover:bg-primary-hover text-white px-4 py-2 font-bold rounded-lg flex items-center shadow-md">
           <Plus size={18} className="mr-2" />
           Post New Job
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        
        {/* Filters */}
        <div className="flex mb-6">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search by job title..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#080d1a] rounded-lg focus:ring-2 focus:ring-primary outline-none"
                 value={search}
                 onChange={e => setSearch(e.target.value)}
              />
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Job Title & Category</th>
                <th className="px-6 py-4">Payout</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                 <tr>
                   <td colSpan={5} className="py-10 text-center">Loading jobs...</td>
                 </tr>
              ) : filteredJobs.length === 0 ? (
                 <tr>
                   <td colSpan={5} className="py-10 text-center">No jobs found in the database.</td>
                 </tr>
              ) : (
                filteredJobs.map(job => (
                  <tr key={job._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                       <div className="font-bold text-gray-900 dark:text-white flex items-center">
                          <Briefcase size={16} className="text-gray-400 mr-2" /> {job.title}
                       </div>
                       <div className="text-xs text-gray-500 mt-1">{job.category}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                       ₹{job.salaryAmount} / {job.salaryType}
                    </td>
                    <td className="px-6 py-4">
                       {job.location} ({job.type})
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${
                           job.status === 'Open' ? 'bg-green-100 text-green-700' : 
                           job.status === 'Closed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                       }`}>
                          {job.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2">
                           <button 
                             onClick={() => updateJobStatus(job._id, 'Open')}
                             className="text-green-600 hover:bg-green-50 p-2 rounded" title="Approve/Open"
                           >
                             <CheckCircle size={18} />
                           </button>
                           <button 
                             onClick={() => updateJobStatus(job._id, 'Closed')}
                             className="text-red-500 hover:bg-red-50 p-2 rounded" title="Reject/Close"
                           >
                             <XCircle size={18} />
                           </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
