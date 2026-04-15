'use client';

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
  comingSoon?: boolean;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  'Delivery Jobs': {
    displayTitle: 'Delivery Partner Jobs',
    jobsLabel: '8 Jobs',
    workType: 'Field Work',
    requirements: 'Basic requirements: 18+ age, 2 wheeler required, Driving License',
    salary: '₹20,000 - ₹25,000 / month',
  },
  'Field Sales': {
    displayTitle: 'Field Survey Jobs',
    jobsLabel: '2 Jobs',
    workType: 'Field Work',
    requirements: 'Basic requirements: 18+ age, Two-wheeler, Android phone required',
    salary: '₹10,000 - ₹20,000 / month',
  },
  'Data Entry': {
    jobsLabel: 'Active Jobs',
    workType: 'Office / Remote',
    requirements: 'Basic requirements: typing speed, basic computer skills, attention to detail',
    salary: 'Salary shared after application',
  },
  Marketing: {
    displayTitle: 'Sales and Marketing Jobs',
    jobsLabel: '1 Job',
    workType: 'Field Work',
    requirements: 'Basic requirements: 18+ age, Two-wheeler, Android phone required',
    salary: '₹10,000 - ₹30,000 / month',
  },
  'Work From Home': {
    displayTitle: 'Digital Gigs Jobs',
    jobsLabel: 'Jobs coming soon',
    workType: 'Work From Home',
    requirements: 'Basic requirements: 18+ age, laptop or Android phone required',
    salary: 'Earn up to ₹20,000 / month',
    comingSoon: true,
  },
  'Testing & QA': {
    displayTitle: 'Audit Jobs',
    jobsLabel: 'Jobs coming soon',
    workType: 'Field Work',
    requirements: 'Basic requirements: 18+ age, 2 wheeler required',
    salary: '₹20,000+ / month',
    comingSoon: true,
  },
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = useMemo(() => {
    return categories.filter((cat) => {
      if (!showActiveOnly) return true;
      return !CATEGORY_META[cat.title]?.comingSoon;
    });
  }, [categories, showActiveOnly]);

  return (
    <div className="mx-auto w-full max-w-[1380px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] !pl-[80px]">
        <div>
          <div className="!mb-[20px] !mt-[20px]   flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[720px]">
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-gray-900 md:text-4xl">
                Job Categories
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Explore the work opportunities by categories!
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowActiveOnly((prev) => !prev)}
              className={`inline-flex items-center gap-3 self-start rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                showActiveOnly
                  ? 'border-[#7ea2ff] bg-[#eef4ff] text-[#2144b3]'
                  : 'border-[#dbe4f0] bg-white text-slate-600'
              }`}
            >
              <span
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  showActiveOnly ? 'bg-[#2f67ff]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    showActiveOnly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </span>
              Active Jobs
            </button>
          </div>

          {loading ? (
            <div className="  grid grid-cols-1 gap-5 xl:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-[190px] rounded-[10px] border border-[#e6edf5] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)]"
                >
                  <div className="mb-4 h-14 w-14 animate-pulse rounded-2xl bg-[#edf4ff]" />
                  <div className="mb-3 h-6 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="mb-2 h-4 w-full animate-pulse rounded bg-slate-100" />
                  <div className="mb-5 h-4 w-4/5 animate-pulse rounded bg-slate-100" />
                  <div className="h-5 w-1/3 animate-pulse rounded bg-slate-100" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {visibleCategories.map((cat, idx) => {
                const meta = CATEGORY_META[cat.title] ?? {
                  jobsLabel: 'Active Jobs',
                  workType: 'Field Work',
                  requirements: cat.description,
                  salary: 'Salary shared after application',
                };

                const displayTitle = meta.displayTitle ?? cat.title;
                const isComingSoon = Boolean(meta.comingSoon);
                const cardClassName = `group block rounded-[24px] border bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-300 ${
                  isComingSoon
                    ? 'cursor-default border-[#e6edf5]'
                    : 'cursor-pointer border-[#e6edf5] hover:-translate-y-1 hover:border-[#5a7cff] hover:shadow-[0_20px_40px_rgba(38,79,179,0.12)]'
                }`;

                const cardContent = (
                  <div className="flex min-h-[190px] flex-col">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eef4ff] text-[30px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                        {cat.iconUrl}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-[#182338]">
                          {displayTitle}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              isComingSoon
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

                        <p className="mt-5 text-[0.98rem] leading-7 text-[#66748f]">
                          {meta.requirements}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto border-t border-[#edf1f6] pt-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[1.02rem] font-semibold text-[#1d2a44]">
                          {meta.salary}
                        </p>

                        {isComingSoon ? (
                          <span className="text-sm font-semibold text-[#2f67ff]">
                            Notify Me
                          </span>
                        ) : (
                          <span className="flex items-center text-sm font-semibold text-[#2f67ff]">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </div>

                      {isComingSoon ? (
                        <p className="mt-3 text-xs leading-5 text-slate-400">
                          Click on notify me and we&apos;ll notify you when new opportunities
                          are available.
                        </p>
                      ) : null}
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={cat._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    {isComingSoon ? (
                      <div className={cardClassName}>{cardContent}</div>
                    ) : (
                      <Link
                        href={`/office?category=${encodeURIComponent(cat.title)}`}
                        className={cardClassName}
                      >
                        {cardContent}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <aside className="hidden xl:block relative">
          <div className="rounded-[28px] !mr-[150px] !ml-[200px] w-[400px] h-[400px] !mt-[100px] border border-[#dfe8f2] bg-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
            <div className="mx-auto mb-8 flex h-[100px] w-[300px] !mt-[50px] !ml-[50px] items-center justify-center rounded-[34px] bg-[linear-gradient(180deg,#2454ea,#1332a6)] text-white shadow-[0_20px_40px_rgba(36,84,234,0.25)]">
              <div className="text-center">
                <div className="mb-3 text-xs uppercase tracking-[0.18em] text-white/70">
                  App Preview
                </div>
                <div className="text-2xl font-semibold">AD Sky</div>
              </div>
            </div>

            <h3 className="text-center text-2xl font-semibold text-[#182338]">
              Download App
            </h3>
            <p className="mt-3 text-center text-sm leading-7 text-[#6b7280]">
              Download our Android app from Google Play Store
            </p>

            <button
              type="button"
              className="!mt-[50px] !ml-[130px] mx-auto mt-6 flex rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white"
            >
              Get it on Google Play
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
