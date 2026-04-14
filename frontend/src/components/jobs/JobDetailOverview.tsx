import { Building2, CheckCircle, GraduationCap, IndianRupee, Layers, MapPin, Users } from 'lucide-react';
import { formatCompensation, formatPostedLabel, getCompanyName } from '@/lib/jobs';
import type { Job } from '@/types/job';

interface JobDetailOverviewProps {
  job: Job;
  onApply: () => void;
}

export default function JobDetailOverview({ job, onApply }: JobDetailOverviewProps) {
  const companyDisplay = getCompanyName(job);
  const compensation = formatCompensation(job);
  const postedLabel = formatPostedLabel(job.createdAt);

  return (
    <aside className="space-y-5">
      <section className="brand-card-light p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-secondary">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">{job.category}</p>
            <h1 className="mt-2 text-[1.8rem] font-black leading-tight tracking-[-0.05em] text-white">
              {job.title}
            </h1>
            <p className="mt-2 text-sm font-semibold text-[#b6c5e5]">{companyDisplay}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Compensation', value: compensation, icon: IndianRupee },
            { label: 'Experience', value: job.experienceLevel || 'Any level', icon: GraduationCap },
            { label: 'Openings', value: String(job.openings || 1), icon: Users },
            { label: 'Engagement', value: job.salaryType, icon: Layers },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.3rem] border border-white/8 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8fa6d2]">
                <item.icon className="h-4 w-4 text-secondary" />
                {item.label}
              </div>
              <p className="mt-2 text-sm font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#dce7ff]">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
            <MapPin className="h-4 w-4 text-secondary" />
            {job.location || 'Remote / Flexible'}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
            <CheckCircle className="h-4 w-4 text-secondary" />
            {postedLabel}
          </span>
        </div>

        <button onClick={onApply} className="btn-primary mt-6 w-full px-6 py-3.5">
          Start Application
        </button>
      </section>

      <section className="brand-card-light p-6">
        <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#9fb2d7]">Why this role stands out</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-[#c6d2ee]">
          <li className="flex gap-3">
            <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-secondary" />
            Fast decision-making with a streamlined application flow.
          </li>
          <li className="flex gap-3">
            <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-secondary" />
            Branded detail experience aligned with the Figma reference and responsive across breakpoints.
          </li>
          <li className="flex gap-3">
            <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-secondary" />
            Shared data formatting so cards, featured slots, and detail views stay consistent.
          </li>
        </ul>
      </section>
    </aside>
  );
}
