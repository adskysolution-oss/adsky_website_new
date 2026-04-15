'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  Users, Briefcase, IndianRupee, TrendingUp, Activity,
  ClipboardList, ArrowRight, UserCheck, Loader2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

interface Stats {
  totalUsers: number;
  totalRevenue: number;
  activeJobs: number;
  totalVendors: number;
  totalApplications?: number;
}

const revenueData = [
  { name: 'Jan', revenue: 4000, applications: 12 },
  { name: 'Feb', revenue: 3000, applications: 19 },
  { name: 'Mar', revenue: 6200, applications: 31 },
  { name: 'Apr', revenue: 4780, applications: 24 },
  { name: 'May', revenue: 5890, applications: 42 },
  { name: 'Jun', revenue: 7390, applications: 37 },
  { name: 'Jul', revenue: 9490, applications: 58 },
];

const quickLinks = [
  { label: 'Post a Job', href: '/admin/jobs', color: 'from-blue-500 to-blue-600', icon: <Briefcase size={18} /> },
  { label: 'View Applications', href: '/admin/applications', color: 'from-purple-500 to-purple-600', icon: <ClipboardList size={18} /> },
  { label: 'Manage Users', href: '/admin/users', color: 'from-green-500 to-green-600', icon: <Users size={18} /> },
  { label: 'All Payments', href: '/admin/payments', color: 'from-orange-500 to-orange-600', icon: <IndianRupee size={18} /> },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0, totalRevenue: 0, activeJobs: 0, totalVendors: 0, totalApplications: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/stats', { headers }),
          axios.get('http://localhost:5000/api/admin/users', { headers }),
        ]);

        setStats(statsRes.data);
        setRecentUsers(usersRes.data.slice(0, 5));
      } catch (e) {
        console.error('Failed to load admin data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: <Users size={22} />,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+12% this month',
      href: '/admin/users',
    },
    {
      label: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: <IndianRupee size={22} />,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      change: '+18% this month',
      href: '/admin/payments',
    },
    {
      label: 'Active Jobs',
      value: stats.activeJobs,
      icon: <Briefcase size={22} />,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      change: 'Live on platform',
      href: '/admin/jobs',
    },
    {
      label: 'Applications',
      value: stats.totalApplications ?? '—',
      icon: <ClipboardList size={22} />,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      change: 'All time',
      href: '/admin/applications',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Platform metrics and real-time analytics.</p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2 text-xs text-gray-400 bg-white dark:bg-[#111827] px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800">
          <Activity size={14} className="text-green-500 animate-pulse" />
          <span>Live</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((s, i) => (
          <Link key={i} href={s.href}
            className="bg-white dark:bg-[#111827] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all group">
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                {s.icon}
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {loading ? <span className="inline-block w-16 h-7 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /> : s.value}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{s.change}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickLinks.map((q, i) => (
          <Link key={i} href={q.href}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r ${q.color} text-white text-sm font-bold shadow-sm hover:shadow-md hover:brightness-110 transition-all`}>
            {q.icon}
            <span className="truncate">{q.label}</span>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-primary" /> Revenue & Applications
            </h3>
            <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">Jan – Jul 2024</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)', fontSize: '12px' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Users</h3>
            <Link href="/admin/users" className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center flex-1">
              <Loader2 size={24} className="animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {recentUsers.map((user, i) => (
                <div key={user._id || i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full font-semibold">
                    {user.role}
                  </span>
                </div>
              ))}
              {recentUsers.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <UserCheck size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No users yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
