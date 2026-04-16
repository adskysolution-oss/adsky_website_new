'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '@/lib/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, ChevronRight } from 'lucide-react';
import ApplicationModal from '@/components/jobs/ApplicationModal';
import { formatCompensation, getCompanyName } from '@/lib/jobs';
import type { Job } from '@/types/job';
import { useAuth } from '@/context/AuthContext';

type Category = {
  _id: string;
  title: string;
  description: string;
  iconUrl?: string;
  isActive?: boolean;
};

type CategoryMeta = {
  displayTitle?: string;
  jobsLabel: string;
  workType: string;
  requirements: string;
  salary: string;
  overview: string;
  comingSoon?: boolean;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  'Delivery Jobs': {
    displayTitle: 'Delivery Partner Jobs',
    jobsLabel: '8 Jobs',
    workType: 'Field Work',
    requirements: 'Basic requirements: 18+ age, 2 wheeler required, Driving License',
    salary: 'Rs 20,000 - Rs 25,000 / month',
    overview:
      'AD Sky Solution partners with last-mile and hyperlocal companies to match delivery associates with flexible earning opportunities near their location.',
  },
  'Field Sales': {
    displayTitle: 'Field Survey Jobs',
    jobsLabel: '2 Jobs',
    workType: 'Field Work',
    requirements: 'Basic requirements: 18+ age, Two-wheeler, Android phone required',
    salary: 'Rs 10,000 - Rs 20,000 / month',
    overview:
      'Field survey roles are designed for people who enjoy on-ground engagement, accurate reporting, and structured assignment workflows.',
  },
  'Data Entry': {
    jobsLabel: 'Active Jobs',
    workType: 'Office / Remote',
    requirements: 'Basic requirements: typing speed, basic computer skills, attention to detail',
    salary: 'Salary shared after application',
    overview:
      'Data entry roles focus on clean execution, attention to detail, and simple repeatable tasks that fit office or remote work patterns.',
  },
  Marketing: {
    displayTitle: 'Sales and Marketing Jobs',
    jobsLabel: '1 Job',
    workType: 'Field Work',
    requirements: 'Basic requirements: 18+ age, Two-wheeler, Android phone required',
    salary: 'Rs 10,000 - Rs 30,000 / month',
    overview:
      'Sales and marketing assignments help businesses grow reach, generate leads, and convert local demand into measurable outcomes.',
  },
  'Work From Home': {
    displayTitle: 'Digital Gigs Jobs',
    jobsLabel: 'Jobs coming soon',
    workType: 'Work From Home',
    requirements: 'Basic requirements: 18+ age, laptop or Android phone required',
    salary: 'Earn up to Rs 20,000 / month',
    overview:
      'Remote digital gigs are built for flexible schedules and lightweight online work that can be completed from home.',
    comingSoon: true,
  },
  'Testing & QA': {
    displayTitle: 'Audit Jobs',
    jobsLabel: 'Jobs coming soon',
    workType: 'Field Work',
    requirements: 'Basic requirements: 18+ age, 2 wheeler required',
    salary: 'Rs 20,000+ / month',
    overview:
      'Audit and QA assignments focus on structured quality checks, mystery audits, and process validation across different locations.',
    comingSoon: true,
  },
};

export default function OfficeDashboard() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const { isAuthenticated } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchOfficeData = async () => {
      try {
        if (!isAuthenticated) {
          setLoading(false);
          return;
        }

        const [categoriesRes, jobsRes] = await Promise.all([
          apiClient.get<Category[]>('/categories'),
          apiClient.get<{ jobs: Job[] }>('/jobs', {
            params: selectedCategory ? { category: selectedCategory } : undefined,
          }),
        ]);

        setCategories(categoriesRes.data ?? []);
        setJobs(jobsRes.data.jobs ?? []);
      } catch (err) {
        console.error('Dashboard data fetch failed', err);
        setCategories([]);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchOfficeData();
  }, [selectedCategory, isAuthenticated]);

  const activeCategory = useMemo(
    () => categories.find((category) => category.title === selectedCategory) ?? null,
    [categories, selectedCategory],
  );

  const activeMeta = useMemo(() => {
    if (activeCategory?.title) {
      return CATEGORY_META[activeCategory.title];
    }

    if (selectedCategory) {
      return CATEGORY_META[selectedCategory];
    }

    return null;
  }, [activeCategory, selectedCategory]);

  const otherCategories = useMemo(() => {
    return categories.filter((category) => category.title !== (activeCategory?.title ?? selectedCategory));
  }, [activeCategory, categories, selectedCategory]);

  const activeCategoryTitle =
    (activeMeta?.displayTitle ?? activeCategory?.title ?? selectedCategory) || 'Job Opportunities';
  const activeRequirements =
    activeMeta?.requirements ??
    activeCategory?.description ??
    'Detailed requirements will be shared during the application process.';
  const activeSalary = activeMeta?.salary ?? 'Compensation shared after application';
  const activeWorkType = activeMeta?.workType ?? 'Flexible';
  const activeJobsLabel = activeMeta?.jobsLabel ?? `${jobs.length} roles`;
  const activeOverview =
    activeMeta?.overview ??
    activeCategory?.description ??
    'Browse available jobs, review their requirements, and apply to the ones that best match your schedule.';

  return (
    <div className="mx-auto w-full max-w-[1380px] px-4 py-8 sm:px-6 lg:px-8">
      <div className=" !mb-6 !mt-6  !ml-[50px] flex items-center gap-2 text-sm text-[#6b84c4]">
        <Link href="/categories" className="font-medium transition-colors hover:text-[#2144b3]">
          Job Categories
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-500">{activeCategoryTitle}</span>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className=" !ml-[50px] space-y-6">
          <section className="rounded-[28px] border border-[#e6edf5] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] bg-[#eef4ff] text-[34px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  {activeCategory?.iconUrl || <Briefcase className="h-8 w-8 text-[#2144b3]" />}
                </div>

                <div>
                  <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-[#182338]">
                    {activeCategoryTitle}
                  </h1>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#e9fff0] px-2.5 py-1 text-[11px] font-semibold text-[#2f9e57]">
                      {activeJobsLabel}
                    </span>
                    <span className="rounded-full bg-[#eef3ff] px-2.5 py-1 text-[11px] font-semibold text-[#6b84c4]">
                      {activeWorkType}
                    </span>
                  </div>

                  <p className="mt-5 text-[1.1rem] font-semibold text-[#1d2a44]">{activeSalary}</p>
                  <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-[#43506a]">
                    {activeRequirements}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 !ml-[40px] border-t border-[#edf1f6] pt-8">
              <h2 className="text-[1.6rem] font-semibold tracking-[-0.02em] text-[#182338]">
                Description
              </h2>
              <p className="mt-3 max-w-4xl text-[1rem] leading-8 text-[#596781]">
                {activeOverview}
              </p>
            </div>

            <div className="mt-10">
              <div className="mb-5 !ml-[40px] flex items-center justify-between gap-4">
                <h2 className="text-[1.6rem] font-semibold tracking-[-0.02em] text-[#182338]">
                  Available Jobs
                </h2>
                <span className="rounded-full bg-[#f6f9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b84c4]">
                  {jobs.length} role{jobs.length === 1 ? '' : 's'}
                </span>
              </div>

              {loading ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div
                      key={index}
                      className="rounded-[24px] border border-[#efe1ad] bg-[#fff7de] p-5"
                    >
                      <div className="h-6 w-2/3 animate-pulse rounded bg-[#f2e7bd]" />
                      <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-[#f2e7bd]" />
                      <div className="mt-6 h-4 w-full animate-pulse rounded bg-[#f2e7bd]" />
                      <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-[#f2e7bd]" />
                      <div className="mt-8 h-10 w-32 animate-pulse rounded-full bg-[#e9d98d]" />
                    </div>
                  ))}
                </div>
              ) : jobs.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {jobs.map((job, index) => {
                    const companyDisplay = getCompanyName(job);
                    const compensation = formatCompensation(job);
                    const requirementsPreview =
                      job.requirements && job.requirements.length > 0
                        ? `Basic requirements: ${job.requirements.join(', ')}`
                        : activeRequirements;

                    return (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="flex h-full flex-col rounded-[24px] border border-[#efe1ad] bg-[#fff7de] p-5 shadow-[0_12px_28px_rgba(195,162,64,0.08)]"
                      >
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-[#182338]">
                              {job.title}
                            </h3>
                            <p className="mt-1 text-sm text-[#6c768a]">
                              {companyDisplay} | {job.location || 'Multiple cities'}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 text-[0.98rem] leading-7 text-[#596781]">
                          {requirementsPreview}
                        </p>

                        <p className="mt-5 text-[1.1rem] font-semibold text-[#1d2a44]">
                          {compensation}
                        </p>

                        <p className="mt-3 text-sm leading-7 text-[#66748f] line-clamp-3">
                          {job.description}
                        </p>

                        <div className="mt-auto pt-6">
                          <button
                            type="button"
                            onClick={() => setSelectedJob(job)}
                            className="inline-flex items-center rounded-full bg-[#2144b3] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#18358f]"
                          >
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-[#d7e2ef] bg-[#fbfdff] px-6 py-12 text-center">
                  
                  <h3 className="!mt-3 text-xl font-semibold text-[#182338]">
                    No active jobs in this category right now
                  </h3>
                  <p className="mx-auto !mt-2  ml- 3max-w-xl text-sm leading-7 text-[#66748f]">
                    Browse the categories on the right to switch tracks, or come back later for
                    fresh openings in this category.
                  </p>
                  <Link
                    href="/categories"
                    className="mt-6 inline-flex rounded-full border border-[#2144b3] px-5 py-3 text-sm font-semibold text-[#162f80] transition-colors hover:bg-[#eef4ff]"
                  >
                    Explore Other Categories
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside>
          <div className="sticky right-0 top-24 !ml-[200px] !w-[400px] ">
            <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[#182338]">
              Explore Categories
            </h2>

            <div className="mt-5 !space-y-6">
              {loading ? (
                Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-[#e6edf5] bg-white p-5"
                  >
                    <div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" />
                    <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
                    <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                  </div>
                ))
              ) : (
                otherCategories.map((category, index) => {
                  const meta = CATEGORY_META[category.title] ?? {
                    jobsLabel: 'Active Jobs',
                    workType: 'Field Work',
                    requirements: category.description,
                    salary: 'Compensation shared after application',
                    overview: category.description,
                  };

                  return (
                    <motion.div
                      key={category._id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Link
                        href={`/office?category=${encodeURIComponent(category.title)}`}
                        className="group block rounded-[24px] border border-[#e6edf5] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#5a7cff] hover:shadow-[0_20px_40px_rgba(38,79,179,0.12)]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eef4ff] text-[30px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                            {category.iconUrl}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-[#182338]">
                              {meta.displayTitle ?? category.title}
                            </h3>

                            <div className="mt-2 flex flex-wrap gap-2">
                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                  meta.comingSoon
                                    ? 'bg-[#fff3d8] text-[#b7791f]'
                                    : 'bg-[#e9fff0] text-[#2f9e57]'
                                }`}
                              >
                                {meta.jobsLabel}
                              </span>
                              <span className="rounded-full bg-[#eef3ff] px-2.5 py-1 text-[11px] font-semibold text-[#6b84c4]">
                                {meta.workType}
                              </span>
                            </div>

                            <p className="mt-4 text-sm leading-7 text-[#66748f]">
                              {meta.requirements}
                            </p>

                            <div className="mt-4 flex items-center justify-between gap-4">
                              <p className="text-sm font-semibold text-[#1d2a44]">{meta.salary}</p>
                              <span className="flex items-center text-sm font-semibold text-[#2144b3]">
                                View
                                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </aside>
      </div>

      {selectedJob ? (
        <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      ) : null}
    </div>
  );
}
