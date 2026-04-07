'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Briefcase, IndianRupee, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
     totalUsers: 0,
     totalRevenue: 0,
     activeJobs: 0,
     totalVendors: 0
  });
  const [loading, setLoading] = useState(true);

  // Mock Graph Data
  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
  ];

  useEffect(() => {
     const fetchStats = async () => {
         try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/admin/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
         } catch(e) {
            console.error("Failed to load admin stats", e);
         } finally {
            setLoading(false);
         }
     }
     fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Platform metrics and realtime analytics.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric Card */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center">
           <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-4">
              <Users size={24} />
           </div>
           <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                 {loading ? '...' : stats.totalUsers.toLocaleString()}
              </h3>
           </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center">
           <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mr-4">
              <IndianRupee size={24} />
           </div>
           <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                 ₹{loading ? '...' : stats.totalRevenue.toLocaleString()}
              </h3>
           </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center">
           <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-4">
              <Briefcase size={24} />
           </div>
           <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Active Jobs</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                 {loading ? '...' : stats.activeJobs.toLocaleString()}
              </h3>
           </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center">
           <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mr-4">
              <TrendingUp size={24} />
           </div>
           <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Vendors</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                 {loading ? '...' : stats.totalVendors.toLocaleString()}
              </h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Graph */}
         <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Activity size={18} className="mr-2 text-primary" /> Revenue Growth
            </h3>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                    <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Recent Activity */}
         <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
            <div className="space-y-6">
               {[
                 { action: 'New User Registered', user: 'Rahul Sharma', time: '10 mins ago', color: 'bg-green-500' },
                 { action: 'Job Approved', user: 'Delivery Executive', time: '1 hr ago', color: 'bg-blue-500' },
                 { action: 'Payout Processed', user: 'Vendor TechCorp', time: '2 hrs ago', color: 'bg-purple-500' },
                 { action: 'Task Rejected', user: 'Data Entry - QA', time: '5 hrs ago', color: 'bg-red-500' },
               ].map((item, idx) => (
                 <div key={idx} className="flex relative">
                    <div className="mr-4 flex flex-col items-center">
                       <div className={`w-3 h-3 rounded-full ${item.color} ring-4 ring-white dark:ring-[#111827] z-10`} />
                       {idx !== 3 && <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-800 absolute top-3 bottom-[-1.5rem]" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">by {item.user} • {item.time}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
