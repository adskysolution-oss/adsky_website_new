'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MapPin, Clock, Briefcase, IndianRupee, Users, Star, ArrowLeft,
  CheckCircle, ChevronRight, Building2, GraduationCap, Layers
} from 'lucide-react';
import ApplicationModal from '@/components/jobs/ApplicationModal';

const API = 'http://localhost:5000/api';

interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  category: string;
  location?: string;
  salaryType: string;
  salaryAmount: number;
  openings?: number;
  companyName?: string;
  experienceLevel?: string;
  qualification?: string;
  applicationsCount: number;
  status: string;
  createdAt: string;
  tags?: string[];
  client?: { name: string; companyName?: string; email?: string };
}

function SkeletonDetail() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6" />
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 mb-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl" />)}
        </div>
      </div>
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-6">
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${70 + i * 7}%` }} />)}
        </div>
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/jobs/${id}`);
        setJob(res.data);
      } catch {
        setError('Job not found or has been removed.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (isLoading) return <SkeletonDetail />;

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="text-red-400" size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Job Not Found</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Link href="/jobs" className="btn-primary px-6 py-3 inline-flex items-center gap-2 text-sm font-semibold">
          <ArrowLeft size={16} /> Back to Jobs
        </Link>
      </div>
    );
  }

  const salaryLabel = job.salaryType === 'Hourly'
    ? `₹${job.salaryAmount}/hr`
    : job.salaryType === 'Monthly'
    ? `₹${job.salaryAmount}/month`
    : `₹${job.salaryAmount}${job.salaryType === 'Gig' ? '/task' : ''}`;

  const daysAgo = Math.floor((Date.now() - new Date(job.createdAt).getTime()) / 86400000);
  const postedLabel = daysAgo === 0 ? 'Posted today' : daysAgo === 1 ? 'Posted yesterday' : `Posted ${daysAgo} days ago`;

  const companyDisplay = job.companyName || job.client?.companyName || job.client?.name || 'AdSky Partner';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Breadcrumb */}
      <div className="gradient-bg py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-blue-200">
          <Link href="/jobs" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Jobs
          </Link>
          <ChevronRight size={14} />
          <span className="text-blue-300">{job.category}</span>
          <ChevronRight size={14} />
          <span className="text-white font-medium line-clamp-1">{job.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                <Briefcase size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  {job.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5 mt-1">
                  <Building2 size={14} /> {companyDisplay}
                </p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {job.location && <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>}
                  <span className="flex items-center gap-1"><Clock size={12} /> {postedLabel}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {job.applicationsCount} applied</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                job.status === 'Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-500'
              }`}>
                {job.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                {job.category}
              </span>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { icon: <IndianRupee size={16} />, label: 'Salary', value: salaryLabel },
              { icon: <Layers size={16} />, label: 'Type', value: job.salaryType },
              { icon: <GraduationCap size={16} />, label: 'Experience', value: job.experienceLevel || 'Any' },
              { icon: <Users size={16} />, label: 'Openings', value: String(job.openings || 1) },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1.5 text-primary mb-1">{stat.icon}
                  <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          {job.status === 'Open' && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="btn-secondary flex-1 sm:flex-none px-8 py-3.5 text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                ✍️ Fill My Application
              </button>
              <Link href="/jobs" className="px-6 py-3.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:border-primary hover:text-primary transition-all">
                Browse More
              </Link>
            </div>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.tags && job.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {job.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About the Client</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{companyDisplay}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Verified AdSky Partner</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-yellow-500">
              <Star size={14} className="fill-yellow-400" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">4.5</span>
            </div>
          </div>
        </motion.div>

        {/* Sticky bottom apply bar (mobile) */}
        {job.status === 'Open' && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between gap-3 sm:hidden z-40 shadow-lg">
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">{salaryLabel}</p>
              <p className="text-xs text-gray-500">{job.salaryType}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn-secondary px-6 py-2.5 text-sm font-bold rounded-xl flex-shrink-0"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <ApplicationModal job={job} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
