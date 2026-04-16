'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { adminService } from '@/services/admin.service';
import { extractErrorMessage } from '@/lib/api';
import {
  Briefcase,
  Plus,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  Loader2,
} from 'lucide-react';

type JobStatus = 'Open' | 'Closed' | 'In Progress';
type SalaryType = 'Gig' | 'Hourly' | 'Monthly' | 'Fixed';

type Job = {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  companyName?: string;
  location?: string;
  status: JobStatus;
  applicationsCount?: number;
  salaryAmount: number;
  salaryType?: SalaryType;
  openings?: number;
  requirements?: string[];
  tags?: string[];
};

type JobFormValues = {
  title: string;
  description: string;
  category: string;
  companyName: string;
  location: string;
  status: JobStatus;
  salaryAmount: string;
  salaryType: SalaryType;
  openings: string;
  requirements: string;
  tags: string;
};

type JobPayload = {
  title: string;
  description: string;
  category: string;
  companyName: string;
  location: string;
  status: JobStatus;
  salaryAmount: number;
  salaryType: SalaryType;
  openings: number;
  requirements: string[];
  tags: string[];
};

function JobFormModal({
  job,
  onClose,
  onSave,
}: {
  job: Job | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState<JobFormValues>({
    title: job?.title ?? '',
    description: job?.description ?? '',
    category: job?.category ?? '',
    companyName: job?.companyName ?? '',
    location: job?.location ?? '',
    status: job?.status ?? 'Open',
    salaryAmount: String(job?.salaryAmount ?? ''),
    salaryType: job?.salaryType ?? 'Monthly',
    openings: String(job?.openings ?? 1),
    requirements: Array.isArray(job?.requirements) ? job.requirements.join('\n') : '',
    tags: Array.isArray(job?.tags) ? job.tags.join(', ') : '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (key: keyof JobFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.salaryAmount.trim()) {
      setError('Title, description and salary are required.');
      return;
    }

    const salaryAmount = Number(form.salaryAmount);
    const openings = Number(form.openings);

    if (Number.isNaN(salaryAmount) || salaryAmount <= 0) {
      setError('Salary amount must be a valid number greater than 0.');
      return;
    }

    if (Number.isNaN(openings) || openings <= 0) {
      setError('Openings must be at least 1.');
      return;
    }

    setIsLoading(true);
    setError('');

    const payload: JobPayload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      companyName: form.companyName.trim(),
      location: form.location.trim(),
      status: form.status,
      salaryAmount,
      salaryType: form.salaryType,
      openings,
      requirements: form.requirements
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      tags: form.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (job) {
        await adminService.updateJob(job._id, payload);
      } else {
        await adminService.createJob(payload);
      }
      onSave();
    } catch (err) {
      setError(extractErrorMessage(err, 'Unable to save the job right now.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#111827]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 dark:border-gray-800 dark:bg-[#111827]">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {job ? 'Edit Job' : 'Post New Job'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {job ? 'Update job details safely.' : 'Create a new job posting for the platform.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Job Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. Field Sales Executive"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Category
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="e.g. Delivery Jobs"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="e.g. AD Sky"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="e.g. Mumbai / Remote"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => updateField('status', e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Salary Amount
              </label>
              <input
                type="number"
                min="0"
                value={form.salaryAmount}
                onChange={(e) => updateField('salaryAmount', e.target.value)}
                placeholder="e.g. 20000"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Salary Type
              </label>
              <select
                value={form.salaryType}
                onChange={(e) => updateField('salaryType', e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              >
                <option value="Monthly">Monthly</option>
                <option value="Hourly">Hourly</option>
                <option value="Gig">Gig</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Openings
              </label>
              <input
                type="number"
                min="1"
                value={form.openings}
                onChange={(e) => updateField('openings', e.target.value)}
                placeholder="e.g. 3"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe the role, responsibilities, and expectations"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Requirements
              </label>
              <textarea
                rows={4}
                value={form.requirements}
                onChange={(e) => updateField('requirements', e.target.value)}
                placeholder={`One requirement per line\n18+ age\nTwo-wheeler required`}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tags
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => updateField('tags', e.target.value)}
                placeholder="Comma separated tags, e.g. urgent, bike, field"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-[#0b1220] dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Saving...' : job ? 'Update Job' : 'Create Job'}
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

  const updateStatus = async (id: string, status: JobStatus) => {
    try {
      await adminService.updateJobStatus(id, status);
      setJobs((prev) => prev.map((job) => (job._id === id ? { ...job, status } : job)));
    } catch (err) {
      console.error(extractErrorMessage(err));
    }
  };

  const deleteJob = async (id: string) => {
    setDeleting(true);

    try {
      await adminService.deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error(extractErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const filtered = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.category || '').toLowerCase().includes(search.toLowerCase()),
  );

  const statusColors: Record<JobStatus, string> = {
    Open: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    Closed: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    'In Progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <Briefcase size={24} className="text-secondary" />
            Job Repository
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {jobs.length} total · {jobs.filter((job) => job.status === 'Open').length} open
          </p>
        </div>

        <button
          onClick={() => {
            setEditJob(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          <Plus size={18} />
          Post New Job
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-[#111827]">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="relative max-w-xs">
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

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-800/30 dark:text-gray-400">
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
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={6} className="px-5 py-4">
                      <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400">
                    <Briefcase size={36} className="mx-auto mb-3 opacity-30" />
                    <p className="font-semibold">
                      {search ? `No jobs matching "${search}"` : 'No jobs posted yet'}
                    </p>
                    <button
                      onClick={() => {
                        setEditJob(null);
                        setShowForm(true);
                      }}
                      className="mt-3 text-sm font-semibold text-primary hover:underline"
                    >
                      Post the first job
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((job) => (
                  <tr
                    key={job._id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/20"
                  >
                    <td className="px-5 py-4">
                      <p className="line-clamp-1 font-bold text-gray-900 dark:text-white">
                        {job.title}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {job.companyName || '—'} · {job.category || 'Uncategorized'}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-green-600 dark:text-green-400">
                      ₹{job.salaryAmount}/
                      {job.salaryType === 'Gig'
                        ? 'task'
                        : job.salaryType === 'Hourly'
                          ? 'hr'
                          : job.salaryType === 'Monthly'
                            ? 'mo'
                            : 'fixed'}
                    </td>

                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                      {job.location || 'Remote'}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          statusColors[job.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                      {job.applicationsCount ?? 0}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/jobs/${job._id}`}
                          target="_blank"
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-primary/10 hover:text-primary"
                          title="View public page"
                        >
                          <Eye size={16} />
                        </Link>

                        <button
                          onClick={() => updateStatus(job._id, 'Open')}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600"
                          title="Set Open"
                        >
                          <CheckCircle size={16} />
                        </button>

                        <button
                          onClick={() => updateStatus(job._id, 'Closed')}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          title="Close job"
                        >
                          <XCircle size={16} />
                        </button>

                        <button
                          onClick={() => {
                            setEditJob(job);
                            setShowForm(true);
                          }}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-orange-50 hover:text-secondary"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteConfirm(job._id)}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
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

      {showForm ? (
        <JobFormModal
          job={editJob}
          onClose={() => {
            setShowForm(false);
            setEditJob(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditJob(null);
            void fetchJobs();
          }}
        />
      ) : null}

      {deleteConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-surface">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <Trash2 size={22} className="text-red-500" />
            </div>

            <h3 className="mb-2 text-center text-lg font-bold text-gray-900 dark:text-white">
              Delete Job?
            </h3>
            <p className="mb-6 text-center text-sm text-gray-500">
              This will permanently remove the job and all associated data. This cannot
              be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => void deleteJob(deleteConfirm)}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
