'use client';

import { useState, useEffect, type ReactElement } from 'react';
import { FileText, Clock, CheckCircle, XCircle, Loader2, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  applicationService,
  type ApplicationItem,
} from '@/services/application.service';

const statusConfig: Record<string, { color: string; icon: ReactElement }> = {
  pending: {
    color: 'bg-yellow-100 text-yellow-700',
    icon: <Clock size={14} />,
  },
  reviewed: {
    color: 'bg-blue-100 text-blue-700',
    icon: <Eye size={14} />,
  },
  shortlisted: {
    color: 'bg-indigo-100 text-indigo-700',
    icon: <CheckCircle size={14} />,
  },
  hired: {
    color: 'bg-green-100 text-green-700',
    icon: <CheckCircle size={14} />,
  },
  rejected: {
    color: 'bg-red-100 text-red-600',
    icon: <XCircle size={14} />,
  },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await applicationService.getMyApplications();
        setApplications(data);
      } catch {
        setError('Failed to load applications');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchApplications();
  }, [isAuthenticated]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileText size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Application History
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track all your job applications
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-48 items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      ) : applications.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-gray-800 dark:bg-dark-surface">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <FileText size={28} className="text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            No applications yet
          </h3>
          <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
            Browse available jobs and apply to start building your application history.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const status = (app.status || 'Pending').toLowerCase();
            const cfg = statusConfig[status] ?? statusConfig.pending;
            const job = typeof app.job === 'string' ? null : app.job;
            const displayDate = app.appliedAt ?? app.updatedAt;

            return (
              <div
                key={app._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-dark-surface"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      {job?.title || 'Job Listing'}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-gray-500">
                      {job?.location ? <span>{`Location: ${job.location}`}</span> : null}
                      {job?.salaryAmount ? (
                        <span>{`Salary: Rs ${job.salaryAmount}/${job.salaryType || 'fixed'}`}</span>
                      ) : null}
                      {job?.category ? <span>{`Category: ${job.category}`}</span> : null}
                    </div>

                    {app.coverLetter ? (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                        {app.coverLetter}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-shrink-0 flex-col items-end gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${cfg.color}`}
                    >
                      {cfg.icon}
                      {app.status}
                    </span>

                    {displayDate ? (
                      <span className="text-xs text-gray-400">
                        {new Date(displayDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
