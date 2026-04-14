'use client';

import { Search, X } from 'lucide-react';

interface JobsHeroProps {
  total: number;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onClear: () => void;
}

export default function JobsHero({ total, searchInput, onSearchInputChange, onClear }: JobsHeroProps) {
  return (
    <section className="gradient-bg border-b border-white/6 py-12 sm:py-14">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-5">
            <span className="hero-chip-dot" />
            Live Job Marketplace
          </div>
          <h1 className="heading-md text-white">
            Discover flexible work that matches your
            <span className="text-gradient"> pace and skills.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#dce7ff]/78 sm:text-lg">
            Search live openings, compare compensation quickly, and move from browsing to applying without leaving the page.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#9fb2d7]">
            {total > 0 ? `${total} active opportunities` : 'Fresh opportunities added weekly'}
          </p>

          <div className="relative mt-8">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#89a1cf]" />
            <input
              type="text"
              value={searchInput}
              onChange={(event) => onSearchInputChange(event.target.value)}
              placeholder="Search roles, skills, companies, or locations"
              className="w-full rounded-[1.6rem] border border-white/10 bg-white/8 px-14 py-4 text-base text-white shadow-[0_20px_60px_rgba(3,8,22,0.26)] backdrop-blur-xl outline-none transition focus:border-secondary/50"
            />
            {searchInput ? (
              <button
                onClick={onClear}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/8 text-[#dce7ff] transition hover:bg-white/14"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
