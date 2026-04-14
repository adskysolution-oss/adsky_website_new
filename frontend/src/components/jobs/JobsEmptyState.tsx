import { BriefcaseBusiness, RotateCcw } from 'lucide-react';

interface JobsEmptyStateProps {
  search: string;
  onReset?: () => void;
}

export default function JobsEmptyState({ search, onReset }: JobsEmptyStateProps) {
  return (
    <div className="brand-card-light mx-auto max-w-2xl px-6 py-14 text-center sm:px-10">
      <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-white/6 text-secondary">
        <BriefcaseBusiness className="h-8 w-8" />
      </div>
      <h3 className="mt-6 text-2xl font-black tracking-[-0.04em] text-white">No matching jobs yet</h3>
      <p className="mt-3 text-sm leading-7 text-[#9bb0d6] sm:text-base">
        {search
          ? `Nothing matched "${search}" this time. Try a broader skill, city, or role name.`
          : 'There are no published jobs in this view right now. As new openings go live, they will show up here automatically.'}
      </p>
      {onReset ? (
        <button onClick={onReset} className="btn-secondary mt-7 px-6 py-3">
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </button>
      ) : null}
    </div>
  );
}
