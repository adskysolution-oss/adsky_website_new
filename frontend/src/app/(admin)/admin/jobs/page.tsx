'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Briefcase, Plus, CheckCircle, XCircle, Trash2, Edit2, X, Loader2, ChevronDown, Eye } from 'lucide-react';
import Link from 'next/link';

const API = 'http://localhost:5000/api';

const CATEGORIES = ['Delivery Jobs', 'Field Sales', 'Data Entry', 'Marketing', 'Work From Home', 'Testing & QA', 'Other'];
const SALARY_TYPES = ['Fixed', 'Gig', 'Hourly', 'Monthly'];
const EXP_LEVELS = ['Fresher', 'Experienced', 'Any'];

const emptyForm = {
  title: '', description: '', requirements: '', category: CATEGORIES[0],
  location: '', salaryType: 'Gig', salaryAmount: '', openings: '1',
  companyName: '', experienceLevel: 'Any', qualification: 'No minimum', tags: ''
};

interface Job {
  _id: string; title: string; category: string; location?: string;
  salaryAmount: number; salaryType: string; status: string;
  applicationsCount: number; createdAt: string; companyName?: string; openings?: number;
  description?: string; requirements?: string[]; tags?: string[];
  experienceLevel?: string; qualification?: string;
}

function JobFormModal({ job, onClose, onSave }: { job: Job | null; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState(job ? {
    title: job.title,
    description: job.description || '',
    requirements: (job.requirements || []).join('\n'),
    category: job.category,
    location: job.location || '',
    salaryType: job.salaryType,
    salaryAmount: String(job.salaryAmount),
    openings: String(job.openings || 1),
    companyName: job.companyName || '',
    experienceLevel: job.experienceLevel || 'Any',
    qualification: job.qualification || 'No minimum',
    tags: (job.tags || []).join(', ')
  } : { ...emptyForm });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.salaryAmount) {
      setError('Title, description and salary are required.');
      return;
    }
    setIsLoading(true); setError('');
    const token = localStorage.getItem('token');
    const payload = {
      ...form,
      salaryAmount: Number(form.salaryAmount),
      openings: Number(form.openings),
      requirements: form.requirements.split('\n').map(r => r.trim()).filter(Boolean),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      if (job) {
        await axios.put(`${API}/admin/jobs/${job._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${API}/admin/jobs`, payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      onSave();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || 'Failed to save job.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none text-sm transition-all';
  const labelCls = 'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 modal-backdrop px-4">
      <div className="bg-white dark:bg-dark-surface rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{job ? 'Edit Job' : 'Post New Job'}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Will appear on /jobs instantly after publishing</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Job Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Delivery Partner – Mumbai" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Company Name</label>
              <input value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder="e.g. Zomato, Swiggy" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Salary Type *</label>
              <select value={form.salaryType} onChange={e => set('salaryType', e.target.value)} className={inputCls}>
                {SALARY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Salary Amount (₹) *</label>
              <input type="number" value={form.salaryAmount} onChange={e => set('salaryAmount', e.target.value)} placeholder="500" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Pune, Mumbai, Remote" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Openings</label>
              <input type="number" value={form.openings} onChange={e => set('openings', e.target.value)} min="1" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Experience Level</label>
              <select value={form.experienceLevel} onChange={e => set('experienceLevel', e.target.value)} className={inputCls}>
                {EXP_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Qualification</label>
              <input value={form.qualification} onChange={e => set('qualification', e.target.value)} placeholder="e.g. 10th Pass, Graduate" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tags (comma-separated)</label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="delivery, part-time, two-wheeler" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Job Description *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              rows={4} placeholder="Describe the role, responsibilities and what you're looking for..." required
              className={`${inputCls} resize-none`} />
          </div>

          <div>
            <label className={labelCls}>Requirements (one per line)</label>
            <textarea value={form.requirements} onChange={e => set('requirements', e.target.value)}
              rows={3} placeholder={"Own a two-wheeler\nSmartphone with internet\nAge 18–35"}
              className={`${inputCls} resize-none`} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-primary transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 transition-colors">
              {isLoading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : job ? 'Update Job' : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API}/admin/jobs`, { headers: { Authorization: `Bearer ${token}` } });
      setJobs(res.data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('token');
    await axios.patch(`${API}/admin/jobs/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
    setJobs(prev => prev.map(j => j._id === id ? { ...j, status } : j));
  };

  const deleteJob = async (id: string) => {
    setDeleting(true);
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API}/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setJobs(prev => prev.filter(j => j._id !== id));
      setDeleteConfirm(null);
    } catch { /* ignore */ }
    finally { setDeleting(false); }
  };

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    (j.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    Open: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    Closed: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    'In Progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Briefcase size={24} className="text-secondary" /> Job Repository
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {jobs.length} total · {jobs.filter(j => j.status === 'Open').length} open
          </p>
        </div>
        <button
          onClick={() => { setEditJob(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors"
        >
          <Plus size={18} /> Post New Job
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        {/* Search */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#080d1a] rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="px-5 py-3">Job / Company</th>
                <th className="px-5 py-3">Salary</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Applied</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-5 py-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400">
                    <Briefcase size={36} className="mx-auto mb-3 opacity-30" />
                    <p className="font-semibold">{search ? `No jobs matching "${search}"` : 'No jobs posted yet'}</p>
                    <button onClick={() => { setEditJob(null); setShowForm(true); }} className="mt-3 text-primary text-sm font-semibold hover:underline">
                      Post the first job
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map(job => (
                  <tr key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{job.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{job.companyName || '—'} · {job.category}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-green-600 dark:text-green-400 whitespace-nowrap">
                      ₹{job.salaryAmount}/{job.salaryType === 'Gig' ? 'task' : job.salaryType === 'Hourly' ? 'hr' : job.salaryType === 'Monthly' ? 'mo' : 'fixed'}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{job.location || 'Remote'}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[job.status] || 'bg-gray-100 text-gray-600'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{job.applicationsCount ?? 0}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/jobs/${job._id}`} target="_blank"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors" title="View public page">
                          <Eye size={16} />
                        </Link>
                        <button onClick={() => updateStatus(job._id, 'Open')}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Set Open">
                          <CheckCircle size={16} />
                        </button>
                        <button onClick={() => updateStatus(job._id, 'Closed')}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Close job">
                          <XCircle size={16} />
                        </button>
                        <button onClick={() => { setEditJob(job); setShowForm(true); }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-secondary hover:bg-orange-50 transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => setDeleteConfirm(job._id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 size={16} />
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

      {/* Job Form Modal */}
      {showForm && (
        <JobFormModal
          job={editJob}
          onClose={() => { setShowForm(false); setEditJob(null); }}
          onSave={() => { setShowForm(false); setEditJob(null); fetchJobs(); }}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">Delete Job?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">This will permanently remove the job and all associated data. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300">
                Cancel
              </button>
              <button onClick={() => deleteJob(deleteConfirm)} disabled={deleting}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold disabled:opacity-60 flex items-center justify-center gap-2">
                {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
