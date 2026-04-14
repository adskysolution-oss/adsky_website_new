'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import ApplicationModal from '@/components/jobs/ApplicationModal';
import JobCard from '@/components/jobs/JobCard';
import { fetchJobs } from '@/lib/jobs';
import type { Job } from '@/types/job';

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetchJobs({ page: 1, limit: 3 });
        setJobs(response.jobs ?? []);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    void loadJobs();
  }, []);

  return (
    <section className="bg-white px-6 py-24 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#2f67ff]">Live Opportunities</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.04em] text-slate-900 sm:text-5xl">
              Browse featured roles without leaving the landing page.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
              This section now previews the real jobs feed while keeping the homepage layout visually aligned with the lighter Figma sections.
            </p>
          </div>
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2f67ff]">
            Browse all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center rounded-[2rem] border border-slate-200 bg-slate-50 text-slate-500">
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Loading live opportunities...
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">No live opportunities right now.</p>
            <p className="mt-3 text-sm text-slate-500">Published jobs from your backend will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <motion.div key={job._id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }}>
                <JobCard job={job} onApply={setSelectedJob} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedJob ? <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} /> : null}
    </section>
  );
}
