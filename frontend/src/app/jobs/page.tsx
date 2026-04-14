'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ApplicationModal from '@/components/jobs/ApplicationModal';
import JobCard from '@/components/jobs/JobCard';
import JobCardSkeleton from '@/components/jobs/JobCardSkeleton';
import JobsEmptyState from '@/components/jobs/JobsEmptyState';
import JobsHero from '@/components/jobs/JobsHero';
import JobsPagination from '@/components/jobs/JobsPagination';
import { fetchJobs, JOB_CATEGORIES, JOB_SALARY_TYPES } from '@/lib/jobs';
import type { Job } from '@/types/job';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');
  const [salaryType, setSalaryType] = useState('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const loadJobs = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetchJobs({
        page,
        limit: 12,
        category,
        search,
        salaryType,
      });

      setJobs(response.jobs ?? []);
      setTotal(response.total ?? 0);
      setPages(response.pages ?? 1);
    } catch {
      setJobs([]);
      setTotal(0);
      setPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [category, page, salaryType, search]);

  useEffect(() => {
    void loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const resetFilters = () => {
    setSearch('');
    setSearchInput('');
    setCategory('All');
    setSalaryType('All');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <JobsHero
        total={total}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onClear={() => {
          setSearch('');
          setSearchInput('');
          setPage(1);
        }}
      />

      <section className="section-container py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="brand-card-light p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#9fb2d7]">
                <Filter className="h-4 w-4 text-secondary" />
                Filters
              </div>
              <p className="mt-2 text-sm leading-7 text-[#c6d2ee]">
                Browse by category and payout model. The listing grid, featured jobs, and detail pages now share the same design language and data formatting.
              </p>
            </div>
            <div className="text-sm text-[#9fb2d7]">
              <span className="font-bold text-white">{total}</span> results
              {search ? <span> for &ldquo;{search}&rdquo;</span> : null}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-5">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8ea4cf]">Categories</p>
              <div className="flex flex-wrap gap-2.5">
                {JOB_CATEGORIES.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setCategory(item);
                      setPage(1);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      category === item
                        ? 'bg-secondary text-[#05101f]'
                        : 'border border-white/10 bg-white/5 text-[#dce7ff] hover:border-secondary/40'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8ea4cf]">Compensation Type</p>
              <div className="flex flex-wrap gap-2.5">
                {JOB_SALARY_TYPES.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSalaryType(item);
                      setPage(1);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      salaryType === item
                        ? 'bg-white text-[#061020]'
                        : 'border border-white/10 bg-white/5 text-[#dce7ff] hover:border-secondary/40'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          {isLoading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <JobsEmptyState search={search} onReset={resetFilters} />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} onApply={setSelectedJob} />
              ))}
            </div>
          )}

          <JobsPagination page={page} pages={pages} onChange={setPage} />
        </div>
      </section>

      {selectedJob ? <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} /> : null}
    </div>
  );
}
