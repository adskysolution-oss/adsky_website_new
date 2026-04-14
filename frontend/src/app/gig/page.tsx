'use client';

import Link from 'next/link';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, ChevronLeft, ChevronRight, Menu, Rocket, Settings2, Star, UserRound } from 'lucide-react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

const trustedBrandCards = [
  'FASTag',
  'wipro',
  'amazon',
  'BRITANNIA',
  'Groww',
  'OLA',
  'bigbasket',
  'TATA 1mg',
  'upGrad',
  'Quikr',
  'SWIGGY',
  'Uber',
  'unacademy',
  'zomato',
  'airtel',
  'Pidilite',
  'tcs',
  'indiamart',
];

const trustedBrandRowOne = trustedBrandCards.slice(0, 9);
const trustedBrandRowTwo = trustedBrandCards.slice(9, 18);

const jobCategories = [
  { title: 'Delivery Partner Jobs', workType: 'Field Work', countLabel: '8 Jobs', route: '/jobs?category=delivery-partner' },
  { title: 'Field Survey Jobs', workType: 'Field Work', countLabel: '2 Jobs', route: '/jobs?category=field-survey' },
  { title: 'Quick Money', workType: 'Work From Home', countLabel: 'Jobs coming soon', route: '/jobs?category=quick-money' },
  { title: 'Data Entry Jobs', workType: 'Work From Home', countLabel: 'Jobs coming soon', route: '/jobs?category=data-entry' },
  { title: 'Exam Invigilator Jobs (Offline)', workType: 'Field Work', countLabel: '2 Jobs', route: '/jobs?category=exam-invigilator' },
  { title: 'Sales and Marketing Jobs', workType: 'Field Work', countLabel: '1 Job', route: '/jobs?category=sales-marketing' },
  { title: 'Digital Gigs Jobs', workType: 'Work From Home', countLabel: 'Jobs coming soon', route: '/jobs?category=digital-gigs' },
  { title: 'Audit Jobs', workType: 'Field Work', countLabel: 'Jobs coming soon', route: '/jobs?category=audit' },
  { title: 'Recruitment', workType: 'Work From Home', countLabel: 'Jobs coming soon', route: '/jobs?category=recruitment' },
  { title: 'Background Verification Jobs', workType: 'Field Work', countLabel: 'Jobs coming soon', route: '/jobs?category=background-verification' },
  { title: 'Telecalling Jobs', workType: 'Work From Home', countLabel: 'Jobs coming soon', route: '/jobs?category=telecalling' },
  { title: 'Field Collection', workType: 'Field Work', countLabel: 'Jobs coming soon', route: '/jobs?category=field-collection' },
] as const;

const jobCategoryColumns = [
  ['Delivery Partner Jobs', 'Exam Invigilator Jobs (Offline)'],
  ['Field Survey Jobs', 'Sales and Marketing Jobs', 'Audit Jobs'],
  ['Quick Money', 'Recruitment'],
  ['Digital Gigs Jobs', 'Background Verification Jobs', 'Telecalling Jobs'],
  ['Data Entry Jobs', 'Field Collection', 'Delivery Partner Jobs'],
] as const;

const whyWorkContent = {
  title: 'Skill Development',
  description: 'Access free training programs and certifications to enhance your professional skills.',
  buttonLabel: 'Explore Jobs',
  route: '/jobs',
} as const;

const whyWorkIcons = [
  { key: 'star', icon: Star, accent: false },
  { key: 'user', icon: UserRound, accent: false },
  { key: 'settings', icon: Settings2, accent: false },
  { key: 'wallet', icon: Briefcase, accent: true },
  { key: 'rocket', icon: Rocket, accent: false },
] as const;

const heroTiles = [
  { title: 'Telecallers', img: 'photo-1494790108377-be9c29b29330', className: 'col-start-2 row-start-1' },
  { title: 'Auditors', img: 'photo-1488426862026-3ee34a7d66df', className: 'col-start-4 row-start-1' },
  { title: 'Promoters', img: 'photo-1500648767791-00dcc994a43e', className: 'col-start-3 row-start-2' },
  { title: 'Proctors', img: 'photo-1494790108377-be9c29b29330', className: 'col-start-2 row-start-3' },
  { title: 'Content Moderators', img: 'photo-1544005313-94ddf0286df2', className: 'col-start-3 row-start-3' },
  { title: 'Data Collectors', img: 'photo-1506794778202-cad84cf45f1d', className: 'col-start-4 row-start-3' },
  { title: 'Experts', img: 'photo-1500648767791-00dcc994a43e', className: 'col-start-5 row-start-3' },
  { title: 'Invigilators', img: 'photo-1500648767791-00dcc994a43e', className: 'col-start-1 row-start-4' },
  { title: 'Mentors', img: 'photo-1506794778202-cad84cf45f1d', className: 'col-start-2 row-start-4' },
  { title: 'Data Annotators', img: 'photo-1500648767791-00dcc994a43e', className: 'col-start-4 row-start-4' },
] as const;

const jobHowItWorks = [
  { step: '1', title: 'Download the Awign App', description: 'Kickstart your journey with the app and create your worker profile in minutes.', preview: 'app' },
  { step: '2', title: 'Explore Work Opportunities', description: 'Select a work opportunity and read the requirements carefully.', preview: 'jobs' },
  { step: '3', title: 'Apply', description: 'Fill the dream application form and apply for work. Get a call from us!', preview: 'apply' },
  { step: '4', title: 'Screening & Training', description: 'Complete the online interview and training once selected.', preview: 'training' },
  { step: '5', title: 'Work & Earn', description: 'Sign the offer letter and start working on tasks to earn!', preview: 'earn' },
] as const;

const stats = [
  {
    label: 'Tasks Completed',
    value: '30 Million+',
    description: 'Delivering high-quality outcomes with precision and speed.',
  },
  {
    label: 'Strong Workforce',
    value: '1.5 Million+',
    description: 'Empowering businesses with a flexible, tech-driven workforce model.',
  },
  {
    label: 'Cities',
    value: '1000+',
    description: 'Enabling seamless execution across the country.',
  },
  {
    label: 'Pin Codes',
    value: '19000+',
    description: 'Reaching customers from metros to rural areas.',
  },
] as const;

const testimonials = [
  {
    name: 'Shanu Agrawal',
    image: 'photo-1500648767791-00dcc994a43e',
    quote:
      'Through my association with Awign, I have earned more than INR 2 lakhs in the last three years by undertaking calling and auditing projects. It would not even be possible to work as a parent and earn money over large periods if it were not for Awign.',
  },
  {
    name: 'Partha Arun Xavier',
    image: 'photo-1506794778202-cad84cf45f1d',
    quote:
      'I remember there were days when we could only afford one meal and some days we managed through limited portions. After I started working on gigs via Awign, life changed completely. I loved the flexibility and now I am able to support my family with confidence.',
  },
  {
    name: 'Hamza Yusuf',
    image: 'photo-1494790108377-be9c29b29330',
    quote:
      'With Awign, I have been able to earn over 2 lakhs in 11 months while I manage my own small business in Cuttack. I also have the power to choose my working hours and regulate my workload. Special thanks to my managers at Awign.',
  },
  {
    name: 'Asha Thomas',
    image: 'photo-1488426862026-3ee34a7d66df',
    quote:
      'The work opportunities are structured and professional. I can choose assignments based on my availability, and every project has helped me build new confidence and communication skills.',
  },
  {
    name: 'Mohit Sinha',
    image: 'photo-1544005313-94ddf0286df2',
    quote:
      'Awign made flexible work feel dependable. The onboarding, training, and payouts are transparent, which made it easy for me to commit long term and recommend it to others.',
  },
] as const;

function TrustedCardMarquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="logo-marquee relative overflow-hidden">
      <div className={`flex gap-4 ${reverse ? 'trusted-scroll-reverse' : 'trusted-scroll'}`}>
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex flex-shrink-0 items-center gap-4">
            {items.map((brand) => (
              <div
                key={`${copy}-${brand}`}
                className="flex h-[72px] min-w-[196px] items-center justify-center rounded-2xl border border-white/6 bg-[#1f1f1f] px-6 text-center text-[1.1rem] font-semibold tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                {brand}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AwignMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M32 8 46 48c.5 1.6-.7 3.2-2.4 3.2h-6.2a2.6 2.6 0 0 1-2.4-1.7l-3-8.8-3.1 8.8a2.6 2.6 0 0 1-2.4 1.7h-6.1c-1.8 0-3-1.7-2.4-3.4L32 8Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="m22.8 34.8 9.2-8.6 9.1 8.6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function JobsPreview({ preview }: { preview: (typeof jobHowItWorks)[number]['preview'] }) {
  if (preview === 'app') {
    return (
      <div className="relative w-full overflow-hidden rounded-[16px] bg-[#214bbb] p-4 text-left shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
        <div className="mb-5 text-[0.72rem] font-medium text-white/80">Download the Awign App</div>
        <div className="mb-6 text-[1rem] font-bold leading-[1.1] text-white">India&apos;s Largest Gig Work Platform</div>
        <div className="rounded-[14px] bg-white p-3 text-[#243548]">
          <div className="mb-2 text-[0.78rem] font-semibold">500k+</div>
          <div className="mb-2 text-[0.72rem] text-slate-500">Downloads</div>
          <div className="text-[0.68rem] leading-4 text-slate-400">Apply online to kick-start a progressive career!</div>
        </div>
      </div>
    );
  }

  if (preview === 'jobs') {
    return (
      <div className="w-full overflow-hidden rounded-[14px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
        <div className="grid grid-cols-[140px_minmax(0,1fr)]">
          <div className="bg-[#50545d] p-3">
            <div className="rounded-[10px] bg-white p-3">
              <div className="mb-2 h-2 w-16 rounded-full bg-[#df4d4d]" />
              <div className="mb-2 text-[0.7rem] font-semibold text-slate-700">Delivery Partner For Zomato</div>
              <div className="h-8 rounded-[8px] bg-[#214bbb]" />
            </div>
          </div>
          <div className="space-y-2 p-3 text-left text-[0.63rem] text-slate-500">
            <div className="rounded-[10px] border border-slate-200 p-2">
              <div className="font-semibold text-slate-800">Delivery Partner Jobs</div>
              <div className="mt-1 flex gap-1 text-[0.56rem]"><span className="rounded-full bg-[#baff45] px-1.5 py-0.5 text-slate-800">9 Jobs</span><span className="rounded-full bg-slate-100 px-1.5 py-0.5">Field work</span></div>
            </div>
            <div className="rounded-[10px] border border-slate-200 p-2">
              <div className="font-semibold text-slate-800">Exam Invigilator Jobs</div>
              <div className="mt-1 flex gap-1 text-[0.56rem]"><span className="rounded-full bg-[#baff45] px-1.5 py-0.5 text-slate-800">3 Jobs</span><span className="rounded-full bg-slate-100 px-1.5 py-0.5">Field work</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (preview === 'apply') {
    return (
      <div className="w-full overflow-hidden rounded-[14px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
        <div className="grid grid-cols-[150px_minmax(0,1fr)]">
          <div className="bg-[#214bbb] p-3 text-left text-white">
            <div className="mb-4 text-[0.72rem] font-semibold">In-App Interview</div>
            <div className="rounded-[12px] bg-white p-3 text-[#243548]">
              <div className="mb-2 text-[0.65rem] font-semibold">Do you have or can arrange an android phone?</div>
              <div className="h-6 rounded-[6px] bg-slate-100" />
            </div>
          </div>
          <div className="space-y-2 p-3 text-left text-[0.62rem] text-slate-500">
            <div className="rounded-[10px] border border-slate-200 p-2">
              <div className="font-semibold text-slate-800">Station Supervisor for Online Food Delivery App</div>
              <div className="mt-2 h-5 rounded-[6px] bg-[#214bbb]" />
            </div>
            <div className="rounded-[10px] border border-slate-200 p-2">
              <div className="font-semibold text-slate-800">Delivery Partner for Online App</div>
              <div className="mt-2 h-5 rounded-[6px] bg-[#214bbb]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (preview === 'training') {
    return (
      <div className="w-full overflow-hidden rounded-[14px] bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
        <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3">
          <div className="rounded-[10px] border border-slate-200 bg-slate-50 p-2 text-left text-[0.56rem] text-slate-500">
            <div className="mb-2 font-semibold text-slate-800">Confirm Status</div>
            <div className="h-6 rounded bg-white" />
            <div className="mt-2 h-5 rounded bg-[#214bbb]" />
          </div>
          <div className="rounded-[10px] border border-slate-200 bg-white p-2 text-left text-[0.56rem] text-slate-500">
            <div className="mb-2 flex gap-2">
              <span className="rounded bg-slate-100 px-2 py-1">Allocated</span>
              <span className="rounded bg-slate-100 px-2 py-1">Done</span>
            </div>
            <div className="h-24 rounded bg-slate-50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[250px]">
      <div className="rounded-[12px] bg-white p-3 text-left text-slate-800 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
        <div className="mb-3 flex items-center justify-between text-[0.72rem]">
          <span className="text-slate-600">Withdrawable Earnings</span>
          <span className="font-semibold">1500</span>
        </div>
        <div className="mb-1 flex items-center justify-between text-[0.72rem] text-slate-400">
          <span>Upcoming Earnings</span>
          <span>0</span>
        </div>
        <div className="mb-3 h-px bg-slate-200" />
        <div className="mb-4 flex items-center justify-between text-[0.78rem]">
          <span>Total Withdraw</span>
          <span className="font-bold text-[#d19b00]">1500</span>
        </div>
        <div className="mb-3 flex h-10 items-center justify-center rounded-[8px] bg-[#214bbb] text-[0.78rem] font-semibold text-white">
          Proceed <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </div>
      </div>
      <div className="absolute -bottom-8 left-1/2 w-[260px] -translate-x-1/2 rounded-[10px] bg-white p-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[0.82rem] font-semibold text-slate-700">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#35c16d] text-white">?</span>
            Successful
          </div>
          <span className="text-sm font-semibold text-slate-700">1,500</span>
        </div>
        <div className="text-[0.68rem] leading-4 text-slate-400">Date: 22 Feb 2023</div>
        <div className="text-[0.68rem] leading-4 text-slate-400">Ref ID: 765432123456787</div>
      </div>
    </div>
  );
}

export default function GigPage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const visibleTestimonials = useMemo(
    () => Array.from({ length: Math.min(3, testimonials.length) }, (_, offset) => testimonials[(testimonialIndex + offset) % testimonials.length]),
    [testimonialIndex],
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <section className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_72%_70%,rgba(22,73,122,0.55),transparent_26%),radial-gradient(circle_at_12%_36%,rgba(28,69,130,0.35),transparent_28%),linear-gradient(90deg,#040607_0%,#07101c_45%,#081521_100%)] text-white">
        <div className="max-w-[1300px] !ml-[200px] mr-[1000px]  px-6 pt-7 lg:px-8 !mt-[30px] ">
         <nav className="flex w-full items-center justify-between rounded-[32px] bg-[rgba(39,43,49,0.92)] px-10 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md    ">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5">
                <AwignMark className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] font-semibold tracking-[0.02em] text-white">awign</span>
                <span className="text-[10px] font-medium text-white/60">A Mynavi company</span>
              </div>
            </div>

            <div className="hidden items-center gap-14 md:flex">
              <div className="flex items-center gap-14 text-[15px] font-semibold text-white/90">
                <Link href="/business" className="transition-colors hover:text-white">For Business</Link>
                <Link href="/blogs" className="transition-colors hover:text-white">Blogs</Link>
              </div>
              <Button asChild size="md" variant="primary">
                <Link href="/register">
                  Login / Signup
                </Link>
              </Button>
            </div>

            <button className="text-white md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </nav>
        </div>

        <div className=" grid min-h-[calc(100vh-120px)] w-full max-w-[1280px] items-center gap-16 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_1fr] lg:px-8 !ml-[220px] pl-[100px] ">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex max-w-[560px] flex-col items-start justify-center">
            <div className="mb-5 text-[1.2rem] font-medium uppercase tracking-[0.04em] text-white/82">India&apos;s Largest</div>
            <h1 className="mb-7 text-balance text-[4.25rem] font-semibold leading-[1.03] tracking-[-0.05em] text-white">Gig Work &amp; Part Time Jobs Platform</h1>
            <p className="mb-12 max-w-[560px] text-[1.02rem] leading-[1.35] text-white/84 sm:text-[1.15rem] lg:text-[1.25rem]">Part-time, Full-time, Onsite, and Remote work opportunities!</p>
            <Button asChild size="lg" variant="secondary" className="min-w-[340px]">
              <Link href="/jobs">
                Find Work
              </Link>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="hidden justify-end lg:flex">
            <div className="grid grid-cols-5 grid-rows-4">
              {heroTiles.map((tile, index) => (
                <div key={`${tile.title}-${index}`} className={`${tile.className} flex h-[128px] w-[160px] flex-col justify-between border border-white/12 bg-[rgba(9,20,32,0.42)] p-3`}>
                  <div className="text-center text-[0.82rem] font-medium text-white/92">{tile.title}</div>
                  <div className="flex justify-center">
                    <img src={`https://images.unsplash.com/${tile.img}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=280`} alt={tile.title} className="h-[84px] w-[84px] object-cover grayscale" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Section variant="black" spacing="md">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 w-full">
          <TrustedCardMarquee items={trustedBrandRowOne} />
          <TrustedCardMarquee items={trustedBrandRowTwo} reverse />
        </div>
      </Section>

      <Section variant="white" spacing="lg">
        <div className="mx-auto w-full max-w-[1200px]">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-14 max-w-[760px] text-center sm:mb-16">
              <h2 className="mb-3 leading-[1.12] text-[#111827]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>Job Categories</h2>
            </motion.div>

            <div className="grid items-start gap-12 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-14">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:pt-2">
                <div className="relative overflow-hidden">
                  <img src="/image.png" alt="Job categories representative" className="h-[640px] w-full object-contain object-top" style={{ maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)' }} />
                </div>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4 pt-2 xl:flex-nowrap xl:items-start xl:justify-center">
                {jobCategoryColumns.map((column, columnIndex) => (
                  <div key={column.join('-')} className="flex w-full max-w-[220px] flex-col items-center gap-5 sm:w-[210px] xl:w-[200px]">
                    {column.map((title, itemIndex) => {
                      const category = jobCategories.find((item) => item.title === title);
                      if (!category) return null;

                      return (
                        <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: columnIndex * 0.06 + itemIndex * 0.04 }} className="group w-full">
                          <div className="flex min-h-[148px] flex-col rounded-[26px] bg-[linear-gradient(180deg,#112a52_0%,#071633_100%)] px-5 py-5 text-white shadow-[0_14px_34px_rgba(17,24,39,0.08)]">
                            <div className="flex flex-1 flex-col items-center text-center u1">
                              <h3 className="mb-4 max-w-[180px] leading-[1.25]" style={{ fontSize: '0.98rem', fontWeight: 700 }}>{category.title}</h3>
                              <div className="mt-auto flex flex-wrap justify-center gap-2">
                                <span className="inline-flex rounded-full bg-[#baff45] px-3 py-1 text-xs font-semibold text-[#111827]">{category.workType}</span>
                                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#111827]">{category.countLabel}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
        </div>
      </Section>

      <Section variant="white" spacing="lg" className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto w-full max-w-[1200px] !ml-[40px]">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-16 max-w-[760px] text-center sm:mb-20">
              <h2 className="leading-[1.12]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>Why work with us?</h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto w-full overflow-hidden rounded-[34px] bg-[radial-gradient(circle_at_88%_28%,rgba(30,66,129,0.95),rgba(7,18,38,0.98)_44%,#000_76%)] shadow-[0_26px_70px_rgba(6,17,35,0.2)]" style={{ maxWidth: '1100px' }}>
              <div className="grid min-h-[580px] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative flex items-center justify-center px-12 py-14 sm:px-16 sm:py-[72px]">
                  <div className="absolute left-[-120px] top-1/2 h-[640px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_72%_50%,rgba(27,63,128,0.9),rgba(7,18,38,0.96)_52%,transparent_74%)]" />
                  <div className="relative flex w-full items-center justify-center">
                    <div className="flex h-[152px] w-[152px] items-center justify-center rounded-full bg-white text-[#424d5f] shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
                      <AwignMark className="h-[76px] w-[76px]" />
                    </div>
                    <div className="absolute left-[58%] top-1/2 flex -translate-y-1/2 flex-col items-center gap-7">
                      {whyWorkIcons.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.key} className={`flex items-center justify-center rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.12)] ${index === 0 ? 'relative h-[88px] w-[88px] bg-[#d1d1d1]' : item.accent ? 'h-[60px] w-[60px] bg-[#c9ff45] text-[#273448]' : 'h-[60px] w-[60px] bg-white text-[#8d8d8d]'}`}>
                            {index === 0 ? (
                              <>
                                <div className="absolute right-0 top-0 h-[88px] w-[88px] rounded-full border-[10px] border-transparent border-r-black/90 border-t-black/90" />
                                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white text-[#f2b300]">
                                  <Icon className="h-6 w-6 fill-current" />
                                </div>
                              </>
                            ) : (
                              <Icon className="h-7 w-7" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center px-12 py-14 text-center text-white sm:px-16 sm:py-[72px] lg:text-left">
                  <div className="mx-auto flex max-w-[520px] flex-col items-center lg:items-start">
                    <div className="mb-28 inline-flex rounded-full bg-[#444c59] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                      <button type="button" className="rounded-full px-8 py-3 text-[18px] font-medium text-white transition-colors">For Jobs</button>
                      <button type="button" className="rounded-full bg-[#c9ff45] px-8 py-3 text-[18px] font-medium text-[#273448] transition-colors">For Business</button>
                    </div>
                    <div className="flex flex-col items-center lg:items-start">
                      <h3 className="mb-4 text-white leading-[1.18]" style={{ fontSize: '3rem', fontWeight: 700 }}>{whyWorkContent.title}</h3>
                      <p className="mb-14 max-w-[520px] text-[22px] leading-[1.5] text-white/88">{whyWorkContent.description}</p>
                      <Link href={whyWorkContent.route} className="inline-flex h-[62px] min-w-[308px] items-center justify-center gap-3 rounded-full border border-[#d9d9d9] bg-white px-8 text-[18px] font-medium text-[#1d1d1d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-transform hover:scale-[1.01]">
                        {whyWorkContent.buttonLabel}
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
      </Section>

      <section className="w-full overflow-hidden bg-[radial-gradient(circle_at_0%_100%,rgba(20,49,96,0.88),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(56,52,15,0.4),transparent_24%),linear-gradient(180deg,#020202_0%,#03060d_100%)] py-28 text-white sm:py-32 lg:py-36">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8 !ml-[220px]">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-[760px] text-center sm:mb-14">
              <h2 className="leading-[1.12] text-white" style={{ fontSize: '2.5rem', fontWeight: 700 }}>How It Works</h2>
              <p className="mt-3 text-[1.02rem] leading-8 text-white/82 sm:mt-4">We ensure reliable execution of your job-seeking journey. Here&apos;s how we do it:</p>
            </motion.div>

            <div className="mx-auto mb-12 hidden w-full items-center xl:flex">
              <div className="h-px flex-1 bg-white/70" />
              {jobHowItWorks.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[1.15rem] font-bold text-[#17345d]">{step.step}</div>
                  {index < jobHowItWorks.length - 1 ? <div className="h-px w-[100px] bg-white/70 xl:w-[130px]" /> : null}
                </div>
              ))}
            </div>

            <div className="mx-auto grid w-full gap-5 xl:grid-cols-5">
              {jobHowItWorks.map((item, index) => (
                <motion.article key={item.step} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.1 }} className="rounded-[28px] bg-[linear-gradient(180deg,#2f3136_0%,#2a2a2b_100%)] px-6 pb-6 pt-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
                  <div className="mb-6 flex items-center justify-center xl:hidden"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-[#17345d]">{item.step}</div></div>
                  <h3 className="mb-4 text-[1.05rem] font-medium leading-[1.35] text-white lg:min-h-[58px] UTT34">{item.title}</h3>
                  <p className="mx-auto mb-7 max-w-[320px] text-[0.96rem] font-semibold leading-[1.15] text-white">{item.description}</p>
                  <div className="mx-auto flex min-h-[270px] w-full max-w-[290px] items-center justify-center rounded-[20px] bg-transparent"><JobsPreview preview={item.preview} /></div>
                </motion.article>
              ))}
            </div>
        </div>
      </section>

      <Section variant="lightGray" spacing="md">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 justify-items-center gap-12 md:grid-cols-2 md:justify-center xl:grid-cols-4 xl:gap-14">
            {stats.map((stat) => (
              <div key={stat.label} className="flex w-full max-w-[240px] flex-col items-center text-center">
                <div className="mb-3 text-[0.95rem] font-semibold text-[#4c82ff]">{stat.label}</div>
                <div className="mb-3 text-[3rem] font-bold leading-none tracking-[-0.04em] text-[#1e1e1e]">{stat.value}</div>
                <p className="max-w-[220px] text-[0.9rem] leading-6 text-[#6b7280]">{stat.description}</p>
              </div>
            ))}
          </div>
      </Section>

      <Section variant="lightGray" spacing="lg">
          <div className="mx-auto w-full max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-14 max-w-[760px] text-center !ml-[200px]"
          >
            <h2 className="text-[#252525]" style={{ fontSize: '2.25rem', fontWeight: 700 }}>People Love Working With Us</h2>
            <p className="mt-3 text-[1rem] leading-7 text-[#7c828a]">Here&apos;s what our Awignites have to say</p>
          </motion.div>

          <div className="mx-auto grid max-w-[1080px] gap-6 lg:grid-cols-3">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.article
                key={`${testimonial.name}-${testimonialIndex}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="min-h-[300px] rounded-[24px] bg-[radial-gradient(circle_at_70%_15%,rgba(28,74,148,0.78),rgba(8,18,34,0.98)_50%,#030303_100%)] px-5 py-5 text-white shadow-[0_22px_50px_rgba(0,0,0,0.16)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 overflow-hidden rounded-full border border-white/15">
                      <img
                        src={`https://images.unsplash.com/${testimonial.image}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=220`}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                  </div>
                  <div className="text-[2.2rem] font-bold leading-none text-white/90">&ldquo;</div>
                </div>
                <p className="text-[0.92rem] leading-6 text-white/82">{testimonial.quote}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => setTestimonialIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c8ced5] text-[#7b8592] transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setTestimonialIndex(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${index === testimonialIndex ? 'bg-[#20364d]' : 'bg-[#d4d8dc]'}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => setTestimonialIndex((current) => (current + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8dde2] text-[#c5cad0] transition-colors hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          </div>
      </Section>

      <Footer   />
    </div>
  );
}
