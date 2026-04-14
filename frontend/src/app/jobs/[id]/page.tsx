'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BriefcaseBusiness, ChevronRight } from 'lucide-react';
import ApplicationModal from '@/components/jobs/ApplicationModal';
import JobCardSkeleton from '@/components/jobs/JobCardSkeleton';
import JobDetailContent from '@/components/jobs/JobDetailContent';
import JobDetailOverview from '@/components/jobs/JobDetailOverview';
import { fetchJobById } from '@/lib/jobs';
import type { Job } from '@/types/job';

function DetailLoadingState() {
  return (
    <div className="section-container py-12">
      <div className="mb-6 h-5 w-56 animate-pulse rounded-full bg-white/8" />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="space-y-5">
          <JobCardSkeleton />
          <JobCardSkeleton />
        </div>
        <JobCardSkeleton />
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadJob = async () => {
      try {
        const response = await fetchJobById(id);
        setJob(response);
      } catch {
        setError('This job could not be found or may no longer be available.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadJob();
  }, [id]);

  if (isLoading) {
    return <DetailLoadingState />;
  }

  if (error || !job) {
    return (
      <div className="section-container py-20">
        <div className="brand-card-light mx-auto max-w-2xl px-6 py-14 text-center sm:px-10">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-white/6 text-secondary">
            <BriefcaseBusiness className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-[-0.05em] text-white">Job not found</h1>
          <p className="mt-3 text-sm leading-7 text-[#9bb0d6] sm:text-base">{error}</p>
          <Link href="/jobs" className="btn-secondary mt-7 px-6 py-3">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <section className="gradient-bg border-b border-white/6 py-6">
        <div className="section-container flex flex-wrap items-center gap-2 text-sm text-[#c6d2ee]">
          <Link href="/jobs" className="inline-flex items-center gap-2 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Jobs
          </Link>
          <ChevronRight className="h-4 w-4 text-[#7992c4]" />
          <span>{job.category}</span>
          <ChevronRight className="h-4 w-4 text-[#7992c4]" />
          <span className="font-semibold text-white">{job.title}</span>
        </div>
      </section>

      <section className="section-container py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_360px] xl:items-start"
        >
          <JobDetailContent job={job} />
          <JobDetailOverview job={job} onApply={() => setShowModal(true)} />
        </motion.div>
      </section>

      {showModal ? <ApplicationModal job={job} onClose={() => setShowModal(false)} /> : null}
    </div>
  );
}
