'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminService, type AdminStats } from '@/services/admin.service';
import { applicationService } from '@/services/application.service';
import { extractErrorMessage } from '@/lib/api';
import {
  Users,
  Briefcase,
  IndianRupee,
  Activity,
  ClipboardList,
  ArrowRight,
  UserCheck,
  Loader2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type ApplicationStatus = 'Pending' | 'Shortlisted' | 'Rejected' | 'Hired';



interface ChartPoint {
  name: string;
  revenue: number;
  applications: number;
}

interface RecentUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface RecentApplication {
  _id: string;
  applicantName: string;
  appliedAt: string;
  status: ApplicationStatus;
  job?: {
    title?: string;
  };
}

const quickLinks = [
  {
    label: 'Post a Job',
    href: '/admin/jobs',
    color: 'from-blue-500 to-blue-600',
    icon: <Briefcase size={18} />,
  },
  {
    label: 'View Applications',
    href: '/admin/applications',
    color: 'from-purple-500 to-purple-600',
    icon: <ClipboardList size={18} />,
  },
  {
    label: 'Manage Users',
    href: '/admin/users',
    color: 'from-green-500 to-green-600',
    icon: <Users size={18} />,
  },
  {
    label: 'All Payments',
    href: '/admin/payments',
    color: 'from-orange-500 to-orange-600',
    icon: <IndianRupee size={18} />,
  },
];

const applicationStatusColors: Record<ApplicationStatus, string> = {
  Pending: 'bg-blue-100 text-blue-700',
  Shortlisted: 'bg-indigo-100 text-indigo-700',
  Hired: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalRevenue: 0,
    activeJobs: 0,
    totalVendors: 0,
    totalApplications: 0,
  });
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, appsRes] = await Promise.all([
          adminService.getStats(),
          adminService.getAllUsers() as unknown as Promise<RecentUser[]>,
          applicationService.getAllForAdmin() as unknown as Promise<RecentApplication[]>,
        ]);

        setStats(statsRes);
        setRecentUsers(usersRes.slice(0, 5));
        setRecentApplications(appsRes.slice(0, 5));
      } catch (error: unknown) {
        console.error(extractErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    const fetchChartData = async () => {
      try {
        const data = (await adminService.getCharts()) as ChartPoint[];
        setChartData(data);
      } catch (error: unknown) {
        console.error(extractErrorMessage(error));
      } finally {
        setLoadingChart(false);
      }
    };

    void fetchData();
    void fetchChartData();
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Platform metrics and real-time analytics.
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-400 dark:border-gray-800 dark:bg-[#111827] sm:mt-0">
          <Activity size={14} className="animate-pulse text-green-500" />
          <span>Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-[#111827] dark:hover:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bg} ${card.color}`}
              >
                {card.icon}
              </div>
              <ArrowRight
                size={16}
                className="text-gray-300 transition-colors group-hover:text-gray-500"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {card.label}
              </p>
              <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-7 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                ) : (
                  card.value
                )}
              </h3>
              <p className="mt-1 text-xs text-gray-400">{card.change}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2.5 rounded-xl bg-gradient-to-r px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:brightness-110 hover:shadow-md ${link.color}`}
          >
            {link.icon}
            <span className="truncate">{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827] lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <Activity size={18} className="text-primary" />
              Revenue & Applications
            </h3>
            <span className="rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-400 dark:bg-gray-800">
              Jan – Jul 2024
            </span>
          </div>

          <div className="flex h-64 w-full items-center justify-center">
            {loadingChart ? (
              <Loader2 size={32} className="animate-spin text-primary opacity-50" />
            ) : chartData.length === 0 ? (
              <div className="text-sm text-gray-400">
                No chart data available for this period.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
                >
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

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#374151"
                    opacity={0.15}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue (₹)"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    name="Applications"
                    stroke="#a855f7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorApp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
          <h3 className="mb-5 text-base font-bold text-gray-900 dark:text-white">
            Platform Snapshot
          </h3>

          <div className="space-y-4">
            <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Total Vendors
              </p>
              <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">
                {loading ? '...' : stats.totalVendors}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Recent Users Loaded
              </p>
              <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">
                {loading ? '...' : recentUsers.length}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Recent Applications Loaded
              </p>
              <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">
                {loading ? '...' : recentApplications.length}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Hired In Recent List
              </p>
              <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">
                {loading
                  ? '...'
                  : recentApplications.filter((app) => app.status === 'Hired').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <UserCheck size={18} className="text-blue-500" />
              Recent Users
            </h3>
            <Link href="/admin/users" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-1 items-center justify-center py-10">
              <Loader2 size={24} className="animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="flex-1 space-y-4">
              {recentUsers.map((user) => (
                <div key={user._id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-400">{user.email}</p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {user.role}
                  </span>
                </div>
              ))}

              {recentUsers.length === 0 ? (
                <div className="py-8 text-center text-gray-400">
                  <p className="text-sm">No new users yet</p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <ClipboardList size={18} className="text-purple-500" />
              Recent Applications
            </h3>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-secondary hover:underline"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-1 items-center justify-center py-10">
              <Loader2 size={24} className="animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="flex-1 space-y-4">
              {recentApplications.map((app) => (
                <div key={app._id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                    <Briefcase size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                      {app.applicantName}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {app.job?.title || 'Unknown Job'}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">{timeAgo(app.appliedAt)}</p>
                    <span
                      className={`ml-auto flex w-max rounded-full px-1.5 py-0.5 text-[9px] font-black ${
                        applicationStatusColors[app.status]
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}

              {recentApplications.length === 0 ? (
                <div className="py-8 text-center text-gray-400">
                  <p className="text-sm">No applications yet</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;

  return `${Math.floor(hrs / 24)}d`;
}
