'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Clock, ChevronRight, Filter, X, Loader2, IndianRupee } from 'lucide-react';
import ApplicationModal from '@/components/jobs/ApplicationModal';

const API = 'http://localhost:5000/api';

const CATEGORIES = ['All', 'Delivery Jobs', 'Field Sales', 'Data Entry', 'Marketing', 'Work From Home', 'Testing & QA'];
const SALARY_TYPES = ['All', 'Fixed', 'Gig', 'Hourly', 'Monthly'];

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  salaryType: string;
  salaryAmount: number;
  openings?: number;
  companyName?: string;
  experienceLevel?: string;
  applicationsCount: number;
  status: string;
  createdAt: string;
  tags?: string[];
  client?: { name: string; companyName?: string };
}

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  const salaryLabel = job.salaryType === 'Hourly'
    ? `₹${job.salaryAmount}/hr`
    : job.salaryType === 'Monthly'
    ? `₹${job.salaryAmount}/mo`
    : `₹${job.salaryAmount}/${job.salaryType === 'Gig' ? 'task' : 'fixed'}`;

  const daysAgo = Math.floor((Date.now() - new Date(job.createdAt).getTime()) / 86400000);
  const timeLabel = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo}d ago`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="job-card group bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <Link href={`/jobs/${job._id}`} className="block">
            <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {job.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
            {job.companyName || job.client?.companyName || job.client?.name || 'AdSky Partner'}
          </p>
        </div>
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
          <Briefcase size={20} className="text-primary" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
        {job.location && (
          <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
        )}
        <span className="flex items-center gap-1"><Clock size={12} /> {timeLabel}</span>
        <span className="flex items-center gap-1"><IndianRupee size={12} /> {salaryLabel}</span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          {job.category}
        </span>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          job.salaryType === 'Gig' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
          job.salaryType === 'Fixed' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
          'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
        }`}>
          {salaryLabel}
        </span>
        {job.openings && job.openings > 1 && (
          <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold">
            {job.openings} openings
          </span>
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => onApply(job)}
          className="flex-1 py-2 bg-secondary hover:bg-secondary-hover text-white font-bold text-sm rounded-xl transition-all hover:shadow-md"
        >
          Apply Now
        </button>
        <Link
          href={`/jobs/${job._id}`}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:border-primary hover:text-primary transition-all"
        >
          Details
        </Link>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-2xl p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        </div>
        <div className="w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-xl" />
    </div>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: '12' };
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const res = await axios.get(`${API}/jobs`, { params });
      setJobs(res.data.jobs);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch {
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, category, search]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Header */}
      <div className="gradient-bg py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Find Your <span className="text-secondary">Perfect Gig</span>
          </h1>
          <p className="text-blue-200 mb-6 text-sm sm:text-base">
            {total > 0 ? `${total} opportunities available right now` : 'Browse thousands of gig opportunities near you'}
          </p>
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search jobs, skills, companies..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {searchInput && (
              <button onClick={() => { setSearchInput(''); setSearch(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                category === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results bar */}
        {!isLoading && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">{total}</span> jobs found
              {category !== 'All' && <span className="ml-1">in {category}</span>}
              {search && <span className="ml-1">for &ldquo;{search}&rdquo;</span>}
            </p>
          </div>
        )}

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No jobs found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              {search ? `No results for "${search}". Try different keywords.` : 'No jobs in this category yet. Check back soon!'}
            </p>
            {search && (
              <button onClick={() => { setSearchInput(''); setSearch(''); }} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} onApply={setSelectedJob} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-semibold disabled:opacity-40 hover:border-primary hover:text-primary transition-all"
            >
              Previous
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                  p === page ? 'bg-primary text-white' : 'border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-semibold disabled:opacity-40 hover:border-primary hover:text-primary transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
