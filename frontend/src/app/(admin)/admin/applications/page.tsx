'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Search, Users, ChevronDown, ChevronRight, Phone, Mail,
  MapPin, Calendar, Clock, FileText, CheckCircle, XCircle,
  AlertCircle, Loader2, Eye, X, Briefcase
} from 'lucide-react';

const API = 'http://localhost:5000/api';

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
  status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Hired';
  appliedAt: string;
  worker?: { name: string; email: string; phone?: string };
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

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  Pending: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: <AlertCircle size={12} />, label: 'Pending' },
  Shortlisted: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: <Eye size={12} />, label: 'Shortlisted' },
  Hired: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: <CheckCircle size={12} />, label: 'Hired' },
  Rejected: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: <XCircle size={12} />, label: 'Rejected' },
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

function ApplicantModal({ app, onClose, onStatusChange }: {
  app: Application; onClose: () => void; onStatusChange: (id: string, status: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#111827] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
        onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white dark:bg-[#111827] border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Applicant Details</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"><X size={18} /></button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-xl">
              {app.applicantName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{app.applicantName}</h3>
              <p className="text-sm text-gray-500">Applied {timeAgo(app.appliedAt)}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <Phone size={16} className="text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{app.applicantPhone}</span>
            </div>
            {app.applicantEmail && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <Mail size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{app.applicantEmail}</span>
              </div>
            )}
            {app.applicantLocation && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{app.applicantLocation}</span>
              </div>
            )}
            {app.applicantAvailability && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <Clock size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{app.applicantAvailability}</span>
              </div>
            )}
          </div>

          {/* Languages */}
          {app.applicantLanguages && app.applicantLanguages.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Languages</p>
              <div className="flex flex-wrap gap-2">
                {app.applicantLanguages.map((l, i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-semibold">{l}</span>
                ))}
              </div>
            </div>
          )}

          {/* Note / Cover Letter */}
          {(app.applicantNote || app.coverLetter) && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <FileText size={12} className="inline mr-1" />Applicant Note
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 leading-relaxed">
                {app.applicantNote || app.coverLetter}
              </p>
            </div>
          )}

          {/* Status Change */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {(['Pending', 'Shortlisted', 'Hired', 'Rejected'] as const).map(s => (
                <button key={s} onClick={() => onStatusChange(app._id, s)}
                  className={`py-2 rounded-xl text-sm font-bold transition-all border ${app.status === s ? statusConfig[s].color + ' border-current' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400'}`}>
                  {s}
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
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API}/admin/jobs`, { headers: { Authorization: `Bearer ${token}` } });
      setJobs(res.data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const fetchApplicationsForJob = async (jobId: string) => {
    if (applications[jobId]) return; // cached
    setLoadingApps(jobId);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API}/applications/job/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
      setApplications(prev => ({ ...prev, [jobId]: res.data }));
    } catch { /* ignore */ }
    finally { setLoadingApps(null); }
  };

  const toggleJob = async (jobId: string) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
      await fetchApplicationsForJob(jobId);
    }
  };

  const handleStatusChange = async (appId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API}/applications/${appId}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      // Update in all cached job applications
      setApplications(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(jobId => {
          updated[jobId] = updated[jobId].map(a => a._id === appId ? { ...a, status: status as Application['status'] } : a);
        });
        return updated;
      });
      if (selectedApp?._id === appId) {
        setSelectedApp(prev => prev ? { ...prev, status: status as Application['status'] } : null);
      }
    } catch { /* ignore */ }
  };

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    (j.companyName || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalApps = jobs.reduce((sum, j) => sum + (j.applicationsCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users size={24} className="text-primary" /> Applications Tracker
          </h1>
          <p className="text-gray-500 text-sm mt-1">{totalApps} total applications across {jobs.length} jobs</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Jobs', value: jobs.length, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Total Applications', value: totalApps, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Open Jobs', value: jobs.filter(j => j.status === 'Open').length, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Avg per Job', value: jobs.length ? Math.round(totalApps / jobs.length) : 0, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-[#111827] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#080d1a] rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>

        {/* Job Accordion */}
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-5 py-4 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/5" />
              </div>
            ))
          ) : filteredJobs.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Briefcase size={36} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No jobs found</p>
            </div>
          ) : (
            filteredJobs.map(job => {
              const isOpen = expandedJob === job._id;
              const jobApps = applications[job._id] || [];

              return (
                <div key={job._id}>
                  <button onClick={() => toggleJob(job._id)}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors text-left">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${isOpen ? 'bg-primary/10' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <Briefcase size={18} className={isOpen ? 'text-primary' : 'text-gray-500'} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{job.title}</p>
                        <p className="text-xs text-gray-500">{job.companyName || job.category} · {job.location || 'Remote'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {job.status}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-400">
                        <Users size={13} />{job.applicationsCount || 0}
                      </span>
                      <div className="text-gray-400">
                        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20">
                      {loadingApps === job._id ? (
                        <div className="py-8 flex items-center justify-center gap-2 text-gray-400">
                          <Loader2 size={20} className="animate-spin" /><span className="text-sm">Loading applications...</span>
                        </div>
                      ) : jobApps.length === 0 ? (
                        <div className="py-8 text-center text-gray-400">
                          <Users size={32} className="mx-auto mb-2 opacity-30" />
                          <p className="text-sm font-semibold">No applications yet</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left">
                            <thead className="text-xs font-semibold text-gray-500 uppercase bg-white dark:bg-[#111827] border-b border-gray-100 dark:border-gray-800">
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
                              {jobApps.map(app => {
                                const sc = statusConfig[app.status] || statusConfig.Pending;
                                return (
                                  <tr key={app._id} className="hover:bg-white dark:hover:bg-[#111827]/60 transition-colors">
                                    <td className="px-5 py-3">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                                          {app.applicantName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                          <p className="font-bold text-gray-900 dark:text-white">{app.applicantName}</p>
                                          {app.applicantLocation && <p className="text-xs text-gray-500">{app.applicantLocation}</p>}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-3">
                                      <div className="text-sm text-gray-700 dark:text-gray-300">{app.applicantPhone}</div>
                                      {app.applicantEmail && <div className="text-xs text-gray-400">{app.applicantEmail}</div>}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400 text-sm">{app.applicantAvailability || '—'}</td>
                                    <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">{timeAgo(app.appliedAt)}</td>
                                    <td className="px-5 py-3">
                                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${sc.color}`}>
                                        {sc.icon}{sc.label}
                                      </span>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                      <button onClick={() => setSelectedApp(app)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
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
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <ApplicantModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
