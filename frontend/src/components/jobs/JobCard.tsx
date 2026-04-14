'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Clock3, IndianRupee, MapPin, Users } from 'lucide-react';
import { formatCompensation, formatPostedLabel, getCompanyName } from '@/lib/jobs';
import type { Job } from '@/types/job';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const companyDisplay = getCompanyName(job);
  const compensation = formatCompensation(job);
  const postedLabel = formatPostedLabel(job.createdAt);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="brand-card-light card-shadow flex h-full flex-col p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-secondary/12 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-secondary">
              {job.category}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7b8db]">
              {job.status || 'Open'}
            </span>
          </div>

          <Link href={`/jobs/${job._id}`} className="block">
            <h3 className="text-[1.35rem] font-black tracking-[-0.04em] text-white transition-colors hover:text-secondary">
              {job.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm font-semibold text-[#b6c5e5]">{companyDisplay}</p>
        </div>

        <div className="flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-secondary">
          <BriefcaseBusiness className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm text-[#dce7ff]">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
          <MapPin className="h-4 w-4 text-secondary" />
          {job.location || 'Remote / Flexible'}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
          <IndianRupee className="h-4 w-4 text-secondary" />
          {compensation}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#9bb0d6]">{job.description}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#a7b8db]">
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5 text-secondary" />
          {postedLabel}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-secondary" />
          {job.applicationsCount || 0} applicants
        </span>
        {job.openings ? <span>{job.openings} openings</span> : null}
      </div>

      {job.tags && job.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-[#c6d2ee]"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex gap-3">
        <button onClick={() => onApply(job)} className="btn-primary flex-1 px-5 py-3">
          Apply Now
        </button>
        <Link href={`/jobs/${job._id}`} className="btn-secondary px-5 py-3">
          Details
        </Link>
      </div>
    </motion.article>
  );
}
