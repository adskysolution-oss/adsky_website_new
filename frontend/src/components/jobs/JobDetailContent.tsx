import { CheckCircle, Sparkles } from 'lucide-react';
import type { Job } from '@/types/job';

interface JobDetailContentProps {
  job: Job;
}

export default function JobDetailContent({ job }: JobDetailContentProps) {
  return (
    <div className="space-y-5">
      <section className="brand-card-light p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/12 text-secondary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9fb2d7]">Role Overview</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">Job Description</h2>
          </div>
        </div>
        <p className="mt-6 whitespace-pre-line text-sm leading-8 text-[#c6d2ee] sm:text-base">{job.description}</p>
      </section>

      <section className="brand-card-light p-6 sm:p-8">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-white">Requirements</h2>
        {job.requirements && job.requirements.length > 0 ? (
          <ul className="mt-6 space-y-3">
            {job.requirements.map((requirement) => (
              <li key={requirement} className="flex gap-3 text-sm leading-7 text-[#c6d2ee] sm:text-base">
                <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-secondary" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-7 text-[#9bb0d6]">
            The employer has not shared a checklist yet, so treat the description above as the working brief.
          </p>
        )}
      </section>

      {job.tags && job.tags.length > 0 ? (
        <section className="brand-card-light p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-white">Skills and Tags</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#dce7ff]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
