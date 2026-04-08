'use client';
import { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import { FileText, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const statusConfig: Record<string, { color: string; icon: ReactElement }> = {
  pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} /> },
  accepted: { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={14} /> },
  rejected: { color: 'bg-red-100 text-red-600', icon: <XCircle size={14} /> },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:5000/api/applications/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data);
      } catch {
        setError('Failed to load applications');
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <FileText size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Application History</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Track all your job applications</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-48">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>
      ) : applications.length === 0 ? (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 py-16 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FileText size={28} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No applications yet</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">Browse available jobs and apply to start building your application history.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const status = (app.status || 'pending').toLowerCase();
            const cfg = statusConfig[status] ?? statusConfig['pending'];
            return (
              <div key={app._id} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{app.job?.title || 'Job Listing'}</h3>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-500">
                      {app.job?.location && <span>📍 {app.job.location}</span>}
                      {app.job?.salaryAmount && <span>💰 ₹{app.job.salaryAmount}/{app.job.salaryType}</span>}
                      {app.job?.category && <span>🏷️ {app.job.category}</span>}
                    </div>
                    {app.coverLetter && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{app.coverLetter}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.color}`}>
                      {cfg.icon} {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
