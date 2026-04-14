export default function JobCardSkeleton() {
  return (
    <div className="brand-card-light animate-pulse p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="h-5 w-28 rounded-full bg-white/8" />
          <div className="h-7 w-4/5 rounded-xl bg-white/8" />
          <div className="h-4 w-2/5 rounded-full bg-white/8" />
        </div>
        <div className="h-13 w-13 rounded-2xl bg-white/8" />
      </div>
      <div className="mt-5 flex gap-2">
        <div className="h-9 w-32 rounded-full bg-white/8" />
        <div className="h-9 w-28 rounded-full bg-white/8" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3.5 rounded-full bg-white/8" />
        <div className="h-3.5 rounded-full bg-white/8" />
        <div className="h-3.5 w-2/3 rounded-full bg-white/8" />
      </div>
      <div className="mt-6 flex gap-3">
        <div className="h-11 flex-1 rounded-full bg-white/8" />
        <div className="h-11 w-24 rounded-full bg-white/8" />
      </div>
    </div>
  );
}
