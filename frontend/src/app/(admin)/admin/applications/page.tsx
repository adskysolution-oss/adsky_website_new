'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { applicationService } from '@/services/application.service';
import { adminService } from '@/services/admin.service';
import { extractErrorMessage } from '@/lib/api';
import {
  Search,
  Users,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Eye,
  X,
  Briefcase,
} from 'lucide-react';

type ApplicationStatus = 'Pending' | 'Shortlisted' | 'Rejected' | 'Hired';

interface Application {
  _id: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail?: string;
  applicantDob?: string;
  applicantLocation?: string;
  applicantAvailability?: string;
  applicantLanguages?: string[];
  applicantNote?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
  worker?: {
    name: string;
    email: string;
    phone?: string;
  };
}

interface Job {
  _id: string;
  title: string;
  category: string;
  location?: string;
  status: string;
  applicationsCount: number;
  createdAt: string;
  companyName?: string;
}

type StatusMeta = {
  color: string;
  icon: ReactNode;
  label: string;
};

const statusConfig: Record<ApplicationStatus, StatusMeta> = {
  Pending: {
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    icon: <AlertCircle size={12} />,
    label: 'Pending',
  },
  Shortlisted: {
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    icon: <Eye size={12} />,
    label: 'Shortlisted',
  },
  Hired: {
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    icon: <CheckCircle size={12} />,
    label: 'Hired',
  },
  Rejected: {
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: <XCircle size={12} />,
    label: 'Rejected',
  },
};

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);

  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;

  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;

  return `${Math.floor(h / 24)}d ago`;
}

function ApplicantModal({
  app,
  onClose,
  onStatusChange,
}: {
  app: Application;
  onClose: () => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-[#111827]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 dark:border-gray-800 dark:bg-[#111827]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Applicant Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xl font-black text-white">
              {app.applicantName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {app.applicantName}
              </h3>
              <p className="text-sm text-gray-500">Applied {timeAgo(app.appliedAt)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
              <Phone size={16} className="text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {app.applicantPhone}
              </span>
            </div>

            {app.applicantEmail ? (
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
                <Mail size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {app.applicantEmail}
                </span>
              </div>
            ) : null}

            {app.applicantLocation ? (
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {app.applicantLocation}
                </span>
              </div>
            ) : null}

            {app.applicantAvailability ? (
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
                <Clock size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {app.applicantAvailability}
                </span>
              </div>
            ) : null}
          </div>

          {app.applicantLanguages && app.applicantLanguages.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {app.applicantLanguages.map((language, index) => (
                  <span
                    key={`${language}-${index}`}
                    className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {app.applicantNote || app.coverLetter ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <FileText size={12} className="mr-1 inline" />
                Applicant Note
              </p>
              <p className="rounded-xl bg-gray-50 p-3 text-sm leading-relaxed text-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
                {app.applicantNote || app.coverLetter}
              </p>
            </div>
          ) : null}

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Update Status
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(['Pending', 'Shortlisted', 'Hired', 'Rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(app._id, status)}
                  className={`rounded-xl border py-2 text-sm font-bold transition-all ${
                    app.status === status
                      ? `${statusConfig[status].color} border-current`
                      : 'border-gray-200 text-gray-600 hover:border-gray-400 dark:border-gray-700 dark:text-gray-400'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminApplicationsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Record<string, Application[]>>({});
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingApps, setLoadingApps] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      const data = (await adminService.getAllJobs()) as Job[];
      setJobs(data);
    } catch (err) {
      console.error(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchJobs();
  }, [fetchJobs]);

  const fetchApplicationsForJob = async (jobId: string) => {
    if (applications[jobId]) return;

    setLoadingApps(jobId);

    try {
      const data = (await applicationService.getJobApplications(jobId)) as Application[];
      setApplications((prev) => ({ ...prev, [jobId]: data }));
    } catch (err) {
      console.error(extractErrorMessage(err));
    } finally {
      setLoadingApps(null);
    }
  };

  const toggleJob = async (jobId: string) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
      return;
    }

    setExpandedJob(jobId);
    await fetchApplicationsForJob(jobId);
  };

  const handleStatusChange = async (appId: string, status: ApplicationStatus) => {
    try {
      await applicationService.updateStatus(appId, status);

      setApplications((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((jobId) => {
          updated[jobId] = updated[jobId].map((application) =>
            application._id === appId
              ? { ...application, status }
              : application,
          );
        });

        return updated;
      });

      if (selectedApp?._id === appId) {
        setSelectedApp((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (err) {
      console.error(extractErrorMessage(err));
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.companyName || '').toLowerCase().includes(search.toLowerCase()),
  );

  const totalApps = jobs.reduce((sum, job) => sum + (job.applicationsCount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <Users size={24} className="text-primary" />
            Applications Tracker
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {totalApps} total applications across {jobs.length} jobs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: 'Total Jobs',
            value: jobs.length,
            color: 'text-blue-600',
          },
          {
            label: 'Total Applications',
            value: totalApps,
            color: 'text-purple-600',
          },
          {
            label: 'Open Jobs',
            value: jobs.filter((job) => job.status === 'Open').length,
            color: 'text-green-600',
          },
          {
            label: 'Avg per Job',
            value: jobs.length ? Math.round(totalApps / jobs.length) : 0,
            color: 'text-orange-600',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#111827]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {stat.label}
            </p>
            <p className={`mt-1 text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-[#111827]">
        <div className="border-b border-gray-100 p-4 dark:border-gray-800">
          <div className="relative max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#080d1a]"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse px-5 py-4">
                <div className="mb-2 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-1/5 rounded bg-gray-100 dark:bg-gray-800" />
              </div>
            ))
          ) : filteredJobs.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Briefcase size={36} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No jobs found</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isOpen = expandedJob === job._id;
              const jobApps: Application[] = applications[job._id] ?? [];

              return (
                <div key={job._id}>
                  <button
                    onClick={() => void toggleJob(job._id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-lg p-2 ${
                          isOpen ? 'bg-primary/10' : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                      >
                        <Briefcase
                          size={18}
                          className={isOpen ? 'text-primary' : 'text-gray-500'}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {job.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {job.companyName || job.category} · {job.location || 'Remote'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          job.status === 'Open'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {job.status}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-400">
                        <Users size={13} />
                        {job.applicationsCount || 0}
                      </span>
                      <div className="text-gray-400">
                        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/20">
                      {loadingApps === job._id ? (
                        <div className="flex items-center justify-center gap-2 py-8 text-gray-400">
                          <Loader2 size={20} className="animate-spin" />
                          <span className="text-sm">Loading applications...</span>
                        </div>
                      ) : jobApps.length === 0 ? (
                        <div className="py-8 text-center text-gray-400">
                          <Users size={32} className="mx-auto mb-2 opacity-30" />
                          <p className="text-sm font-semibold">No applications yet</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-100 bg-white text-xs font-semibold uppercase text-gray-500 dark:border-gray-800 dark:bg-[#111827]">
                              <tr>
                                <th className="px-5 py-3">Applicant</th>
                                <th className="px-5 py-3">Contact</th>
                                <th className="px-5 py-3">Availability</th>
                                <th className="px-5 py-3">Applied</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                              {jobApps.map((app) => {
                                const statusMeta = statusConfig[app.status];

                                return (
                                  <tr
                                    key={app._id}
                                    className="transition-colors hover:bg-white dark:hover:bg-[#111827]/60"
                                  >
                                    <td className="px-5 py-3">
                                      <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                                          {app.applicantName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                          <p className="font-bold text-gray-900 dark:text-white">
                                            {app.applicantName}
                                          </p>
                                          {app.applicantLocation ? (
                                            <p className="text-xs text-gray-500">
                                              {app.applicantLocation}
                                            </p>
                                          ) : null}
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-5 py-3">
                                      <div className="text-sm text-gray-700 dark:text-gray-300">
                                        {app.applicantPhone}
                                      </div>
                                      {app.applicantEmail ? (
                                        <div className="text-xs text-gray-400">
                                          {app.applicantEmail}
                                        </div>
                                      ) : null}
                                    </td>

                                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">
                                      {app.applicantAvailability || '—'}
                                    </td>

                                    <td className="whitespace-nowrap px-5 py-3 text-xs text-gray-500">
                                      {timeAgo(app.appliedAt)}
                                    </td>

                                    <td className="px-5 py-3">
                                      <span
                                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${statusMeta.color}`}
                                      >
                                        {statusMeta.icon}
                                        {statusMeta.label}
                                      </span>
                                    </td>

                                    <td className="px-5 py-3 text-right">
                                      <button
                                        onClick={() => setSelectedApp(app)}
                                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-primary/10 hover:text-primary"
                                      >
                                        <Eye size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {selectedApp ? (
        <ApplicantModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusChange={handleStatusChange}
        />
      ) : null}
    </div>
  );
}
