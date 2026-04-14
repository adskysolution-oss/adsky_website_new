'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  FileText,
  Headphones,
  LayoutGrid,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Users,
} from 'lucide-react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { AnimatePresence, motion } from 'framer-motion';

const offeringMenuItems = [
  {
    title: 'Egocentric Data for Robotics',
    description: 'Human POV, 4K egocentric video data built at scale for robotics and embodied AI.',
    icon: Sparkles,
  },
  {
    title: 'Data Annotation',
    description: 'Data collection and annotation at scale with 1.5M+ workforce.',
    icon: FileText,
  },
  {
    title: 'AI-First Tech Capability Centers',
    description: 'Build dedicated, on-site tech teams with AI-tracked productivity.',
    icon: Users,
  },
  {
    title: 'Promoter Deployment',
    description: 'Deploy promoters to generate leads and boost brand awareness.',
    icon: Briefcase,
  },
  {
    title: 'Ed-Tech',
    description: 'Onboard educators and mentors for all levels and skill sets.',
    icon: LayoutGrid,
  },
  {
    title: 'Audit',
    description: 'Comprehensive audit solutions for reliable quality.',
    icon: ShieldCheck,
  },
  {
    title: 'Content Moderation & Catalog Operations',
    description: 'Ensure quality with expert content moderation and cataloging operations.',
    icon: Headphones,
  },
  {
    title: 'Tele-calling',
    description: 'Diverse telecalling solutions catering to your requirements.',
    icon: Phone,
  },
  {
    title: 'Awign Expert',
    description: 'Effortlessly hire top talent on a contractual or project basis.',
    icon: Star,
  },
  {
    title: 'Merchant / Seller Onboarding',
    description: 'Expand your business outreach with our merchant onboarding services.',
    icon: Store,
  },
  {
    title: 'Visual Merchandising and Branding',
    description: "Optimize merchandising and branding with Awign's comprehensive solutions.",
    icon: LayoutGrid,
  },
  {
    title: 'Loyalty & Rewards',
    description: 'Boost engagement with loyalty programs that enhance retention and brand loyalty.',
    icon: Sparkles,
  },
  {
    title: 'Omnistaffing',
    description: 'Deploy expert promoters and field teams across India with operational control.',
    icon: Users,
  },
] as const;

const industries = [
  {
    title: 'FMCG/FMCD',
    description:
      'Offering reliable FMCG/FMCD solutions including audits, merchandising, market surveys, and background verification.',
    icon: Briefcase,
  },
  {
    title: 'BFSI',
    description:
      'Comprehensive services for BFSI players, including account onboarding, promoter deployment, and POSM execution.',
    icon: LayoutGrid,
  },
] as const;

const heroBannerCards = [
  { title: 'Proctors', image: 'photo-1494790108377-be9c29b29330' },
  { title: 'Tech Experts', image: 'photo-1504384308090-c894fdcc538d' },
  { title: 'AI/ML Integration', image: 'photo-1516321318423-f06f85e504b3' },
  { title: 'Data Collectors', image: 'photo-1506794778202-cad84cf45f1d' },
  { title: 'Seller Onboarding', image: 'photo-1520607162513-77705c0f0d4a' },
  { title: 'Content Moderators', image: 'photo-1516321165247-4aa89a48be28' },
  { title: 'Skilled staff', image: 'photo-1521737604893-d14cc237f11d' },
  { title: 'Telecallers', image: 'photo-1552664730-d307ca884978' },
  { title: 'Auditors', image: 'photo-1484981138541-3d074aa97716' },
  { title: 'Invigilators', image: 'photo-1522202176988-66273c2fd55f' },
  { title: 'Promoters', image: 'photo-1519085360753-af0119f7cbe7' },
  { title: 'Educators', image: 'photo-1500648767791-00dcc994a43e' },
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

const offeringTabs = {
  white: {
    label: 'White Collar',
    subtitle: 'Cognitive, Desk-based, Tech-centric',
    cards: [
      {
        title: 'Egocentric Video Data for Robotics',
        description: 'High-quality human POV datasets for imitation learning and embodied AI.',
        bullets: [
          '4K first-person capture at scale',
          '1000+ hours of egocentric video per day',
          '98% robotics-grade annotation accuracy',
        ],
      },
      {
        title: 'Data Annotation',
        description: 'AI/ML-ready data annotation, tech-scaled for accuracy.',
        bullets: [
          '10Mn+ data points labeled monthly',
          '99%+ accuracy via quality checks',
          'Supports images, text, speech and video',
        ],
      },
      {
        title: 'AI-First Tech Capability Centers',
        description: 'Build AI-first on-site teams with measurable productivity.',
        bullets: [
          'On-site, time-zone aligned developers',
          'AI-tracked productivity and integration',
          'Go live in 2 weeks with 5-10 engineers',
        ],
      },
    ],
  },
  grey: {
    label: 'Grey Collar',
    subtitle: 'Hybrid roles, tech-assisted but operational',
    cards: [
      {
        title: 'Telecalling',
        description:
          'Flexible inbound and outbound telecalling through virtual call centers and configured modules.',
        bullets: [
          '1,00,000+ daily telecalling capacity',
          '1,80,000+ registered and trained telecallers',
          'Secure number masking and call recording',
        ],
      },
      {
        title: 'Content Moderation & Catalog Operations',
        description: 'Compliance-focused cataloging and video moderation, scalable and cost-effective.',
        bullets: [
          '98% SLA adherence',
          'Full stack service - editing, listing and verification',
          '3Mn+ content moderated monthly',
        ],
      },
      {
        title: 'Merchant / Seller Onboarding',
        description: 'Streamlined merchant and customer onboarding across tier 1-3 cities.',
        bullets: [
          '50,000+ merchants onboarded',
          'Faster account setup and verification',
          'Ground network with mobile-first proofing',
        ],
      },
    ],
  },
  blue: {
    label: 'Blue Collar',
    subtitle: 'Manual, Field-intensive roles',
    cards: [
      {
        title: 'Omni-staffing',
        description: 'Skilled PAN India merchandising and loyalty program execution.',
        bullets: [
          'Managed or unmanaged staffing options',
          'Fixed and variable payment models',
          '1.5 million+ skilled professionals PAN India',
        ],
      },
      {
        title: 'Visual Merchandising and Branding',
        description: "Optimize merchandising and branding with Awign's comprehensive solutions.",
        bullets: ['PAN India execution', 'Industry agnostic expertise', 'Value-driven approach'],
      },
      {
        title: 'Market & Employee Survey',
        description: 'Insight-driven market and employee surveys for strategic decisions.',
        bullets: [
          '50K+ outlets and workplaces surveyed',
          '35% faster data collection',
          'Geo-tagged, image and voice proof',
        ],
      },
    ],
  },
} as const;

const whyWorkFeatures = [
  {
    title: 'Execution at Scale',
    description:
      'Pan-India workforce orchestration with platform-led control, audits, and performance visibility.',
  },
  {
    title: 'Faster Turnaround',
    description:
      'Deploy, monitor, and iterate faster with trained talent pools and structured fulfilment workflows.',
  },
  {
    title: 'Built for Quality',
    description:
      'SLA-backed delivery, rigorous checks, and live reporting make every operation measurable.',
  },
] as const;

const clientSuccessStories = [
  {
    title: '60,000+ Customers Onboarded: Awign Unlocks Revenue Growth for Top Indian Bank',
    metric: '5,000+',
    detail: 'Workforce across 250+ cities',
    image: '/success-story1.jpg',
  },
  {
    title: 'Pan-India Rollout: Merchant Network Expansion Delivered with Operational Precision',
    metric: '250+',
    detail: 'Cities activated within 45 days',
    image: '/success-story-2.jpg',
  },
] as const;

const howItWorksSteps = [
  {
    number: '1',
    title: 'Project Configuration on Awign App',
    description:
      'We configure your task within 24 hours and share your requirements with our trained workforce.',
  },
  {
    number: '2',
    title: 'Task Allocation and Fulfillment',
    description:
      'Our automated system allocates tasks in milliseconds and ensures quality through algorithms and manual checks.',
  },
  {
    number: '3',
    title: 'Payment and Completion',
    description:
      'Our native app offers payment capability, ensuring the workforce gets paid every week with zero complaints.',
  },
] as const;

const mediaLogos = [
  'moneycontrol',
  'Outlook Business + Money',
  'YOURSTORY',
  'PTI',
  'people matters',
  'The Economic Times',
  'CNBC TV18',
] as const;

function AwignMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M32 8 46 48c.5 1.6-.7 3.2-2.4 3.2h-6.2a2.6 2.6 0 0 1-2.4-1.7l-3-8.8-3.1 8.8a2.6 2.6 0 0 1-2.4 1.7h-6.1c-1.8 0-3-1.7-2.4-3.4L32 8Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="m22.8 34.8 9.2-8.6 9.1 8.6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BusinessPage() {
  const [openMenu, setOpenMenu] = useState<'offerings' | 'industries' | null>(null);
  const [activeOfferingTab, setActiveOfferingTab] = useState<keyof typeof offeringTabs>('white');
  const [activeStory, setActiveStory] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nextStory = () => setActiveStory((current) => (current + 1) % clientSuccessStories.length);
  const previousStory = () => setActiveStory((current) => (current - 1 + clientSuccessStories.length) % clientSuccessStories.length);

  const currentOffering = offeringTabs[activeOfferingTab];
  const currentStory = clientSuccessStories[activeStory];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#101828]">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_34%,rgba(71,148,95,0.28),transparent_24%),radial-gradient(circle_at_85%_38%,rgba(60,76,164,0.32),transparent_26%),linear-gradient(90deg,#12170d_0%,#040505_32%,#07142a_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0.06)_60%,transparent_100%)] opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[repeating-linear-gradient(90deg,transparent_0,transparent_72px,rgba(255,255,255,0.08)_72px,rgba(255,255,255,0.08)_74px)] opacity-10" />
        <div className="pointer-events-none absolute left-[10%] top-[32%] hidden h-24 w-24 text-white/18 lg:block">
          <Star className="h-full w-full fill-current stroke-none" />
        </div>
        <div className="pointer-events-none absolute right-[12%] top-[56%] hidden h-20 w-20 rounded-[28px] bg-white/12 opacity-30 lg:block" style={{ clipPath: 'polygon(12% 0, 100% 34%, 66% 100%, 0 70%)' }} />

        <div ref={dropdownRef} className="relative z-20 !ml-[250px] !mt-[30px] mx-auto flex w-full max-w-[1240px] justify-center px-6 pt-7 lg:px-8">
          <div className="w-full">
            <nav className="flex w-full items-center justify-between rounded-[32px] bg-[rgba(39,43,49,0.96)] px-8 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5">
                  <AwignMark className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[17px] font-semibold tracking-[0.02em] text-white">awign</span>
                  <span className="text-[10px] font-medium text-white/60">A Mynavi company</span>
                </div>
                <span className="hidden border-l border-white/10 pl-3 text-[13px] text-white/80 md:inline-flex">For Business</span>
              </div>

              <div className="hidden items-center gap-8 lg:flex">
                <button
                  type="button"
                  onClick={() => setOpenMenu((current) => (current === 'offerings' ? null : 'offerings'))}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${openMenu === 'offerings' ? 'bg-[#c9ff45] text-[#1f2328]' : 'text-white/92 hover:text-white'}`}
                >
                  Offerings
                  <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === 'offerings' ? 'rotate-180' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenMenu((current) => (current === 'industries' ? null : 'industries'))}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${openMenu === 'industries' ? 'bg-[#c9ff45] text-[#1f2328]' : 'text-white/92 hover:text-white'}`}
                >
                  Industries
                  <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === 'industries' ? 'rotate-180' : ''}`} />
                </button>
                <Link href="/gig" className="text-[15px] font-semibold text-white/92 transition-colors hover:text-white">For Gig</Link>
                <Link href="/blogs" className="text-[15px] font-semibold text-white/92 transition-colors hover:text-white">Blogs</Link>
              </div>

              <div className="hidden items-center gap-5 lg:flex">
                <Button asChild size="md" variant="outline" className="border-[#b6ff47] text-white">
                  <Link href="/business">
                    Book a Meeting
                  </Link>
                </Button>
                <Button asChild size="md" variant="primary">
                  <Link href="/login">
                    Login
                  </Link>
                </Button>
              </div>
            </nav>

            <div className="mt-2 flex justify-end pr-8">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-[0.95rem] font-medium text-[#1f2328] shadow-[0_10px_18px_rgba(0,0,0,0.12)]">
                <Phone className="h-4 w-4" />
                9999999999
              </div>
            </div>
            <AnimatePresence>
              {openMenu === 'offerings' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 rounded-[28px] bg-[rgba(43,43,45,0.98)] px-10 py-10 text-white shadow-[0_26px_60px_rgba(0,0,0,0.28)]"
                >
                  <div className="mb-8 text-[1.05rem] font-semibold uppercase tracking-[0.02em] text-white/92">Offerings</div>
                  <div className="grid gap-x-10 gap-y-9 md:grid-cols-2 xl:grid-cols-3">
                    {offeringMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-start gap-4">
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-white text-[#2b2b2d]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-[1rem] font-semibold leading-5 text-white">{item.title}</div>
                            <p className="mt-2 text-[0.95rem] leading-5 text-white/80">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {openMenu === 'industries' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 rounded-[28px] bg-[rgba(43,43,45,0.98)] px-10 py-10 text-white shadow-[0_26px_60px_rgba(0,0,0,0.28)]"
                >
                  <div className="mb-8 text-[1.05rem] font-semibold uppercase tracking-[0.02em] text-white/92">Industries</div>
                  <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
                    {industries.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-start gap-4">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-white text-[#2b2b2d]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-[1.1rem] font-semibold text-white">{item.title}</div>
                            <p className="mt-2 max-w-[420px] text-[1rem] leading-6 text-white/80">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] !ml-[200] mt-[40px] pt-[50px] flex-col items-center px-6 pb-0 pt-16 text-center lg:px-8 lg:pt-20">
          <div className="relative w-full max-w-[840px] !ml[350px] rounded-[40px] bg-[rgba(6,8,14,0.52)] px-10 py-16 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-[2px]">
            <div className="absolute inset-y-0 left-1/2 hidden w-[180px] -translate-x-1/2 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_14px,rgba(255,255,255,0.08)_14px,rgba(255,255,255,0.08)_17px)] opacity-35 md:block" />
            <div className="relative z-10">
              <div className="mb-3 text-[1rem] font-medium uppercase tracking-[0.04em] text-white/88">INDIA&apos;S #1</div>
              <h1 className="mx-auto mb-4 max-w-[760px] text-balance text-[4rem] font-semibold leading-[1.04] tracking-[-0.05em] text-white lg:text-[4.35rem]">
                Work-as-a-Service Platform!
              </h1>
              <p className="mx-auto mb-10 max-w-[760px] text-[1.15rem] leading-[1.45] text-white/85 lg:text-[1.35rem]">
                We guarantee seamless execution of your core business operations at scale!
              </p>
              <Link href="/business" className="inline-flex h-[64px] min-w-[280px] items-center justify-center rounded-full bg-white px-10 text-[1.05rem] font-semibold text-[#243548] transition-transform hover:scale-[1.01]">
                Share Requirement
              </Link>
              <div className="mx-auto mt-10 max-w-[640px] rounded-full bg-[radial-gradient(circle_at_center,#d4ff57_0%,#a4d335_38%,rgba(164,211,53,0.16)_100%)] px-6 py-3 text-[1.05rem] font-medium text-[#26372a]">
                Save up to <span className="font-bold">30%</span> of your revenue with our cost-effective solutions.
              </div>
            </div>
          </div>

          <div className="logo-marquee relative mt-12 w-full overflow-hidden !ml-[200px] !pl-[100px] pb-8">
            <div className="offerings-scroll flex gap-6 !mt-[80px] ">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex flex-shrink-0 items-stretch gap-6">
                  {heroBannerCards.map((card) => (
                    <div key={`${copy}-${card.title}`} className="flex w-[196px] flex-shrink-0 flex-col overflow-hidden rounded-[22px] bg-[rgba(0,0,0,0.42)] shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
                      <div className="h-[220px] bg-[#0d1118]">
                        <img
                          src={`https://images.unsplash.com/${card.image}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=420`}
                          alt={card.title}
                          className="h-full w-full object-cover grayscale"
                        />
                      </div>
                      <div className="px-4 py-4 text-center text-[0.98rem] font-medium text-white">{card.title}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] px-6 py-24 !ml-[150px] !mt-[30px] lg:px-8">
        <div className="mx-auto max-w-[1100px] !ml-[200px]">
          <div className="mx-auto max-w-[980px] overflow-hidden rounded-[36px] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-[#dfe6f2]">
            <div className="relative aspect-[16/9] bg-[#081224]">
              <img src="/hero-bg.jpg" alt="Awign business video showcase" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.48),rgba(2,6,23,0.18))]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button type="button" className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-[1rem] font-semibold text-[#0f172a] shadow-[0_16px_40px_rgba(15,23,42,0.2)] transition-transform hover:scale-[1.02]">
                  <CirclePlay className="h-6 w-6" />
                  Watch Awign in Action
                </button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 rounded-[24px] bg-[rgba(7,12,22,0.72)] px-5 py-4 text-left text-white backdrop-blur-sm">
                <div>
                  <div className="text-[0.8rem] uppercase tracking-[0.24em] text-white/60">Featured Walkthrough</div>
                  <div className="mt-1 text-[1.1rem] font-semibold">How enterprise teams run workforce operations on Awign</div>
                </div>
                <div className="text-[0.95rem] text-white/80">Product, deployment, live monitoring, and payout orchestration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] px-6 py-20 !ml-[200px] !mt-[60px] lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="max-w-[240px] text-center">
                <div className="text-[0.9rem] font-semibold text-[#4c82ff]">{stat.label}</div>
                <div className="mt-3 text-[2.5rem] font-bold leading-none tracking-[-0.04em] text-[#111827]">{stat.value}</div>
                <p className="mt-4 text-[0.95rem] leading-7 text-[#6b7280]">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Section variant="black" spacing="md">
        <div className="mx-auto w-full max-w-[1200px] !ml-[100px]">
          <div className="mx-auto max-w-[760px] !ml-[180px] text-center">
            <h2 className="text-[2.9rem] font-semibold tracking-[-0.04em] text-white">Our Offerings</h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {(Object.entries(offeringTabs) as Array<
                [keyof typeof offeringTabs, (typeof offeringTabs)[keyof typeof offeringTabs]]
              >).map(([key, tab]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveOfferingTab(key)}
                  className={`inline-flex min-w-[136px] items-center justify-center rounded-full px-6 py-3 text-[1rem] font-medium transition-colors ${
                    activeOfferingTab === key
                      ? 'bg-[#c9ff45] text-[#111827]'
                      : 'bg-[#2a2a2a] text-white/90 hover:bg-[#363636]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <p className="mt-10 text-[1.05rem] font-semibold text-white">{currentOffering.subtitle}</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-[1200px] gap-7 lg:grid-cols-3">
            {currentOffering.cards.map((card) => (
              <div
                key={card.title}
                className="flex min-h-[400px] flex-col rounded-[30px] bg-[#2d2d2d] px-7 py-8 shadow-[0_22px_50px_rgba(0,0,0,0.24)]"
              >
                <h3 className="text-[1.8rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white">{card.title}</h3>
                <p className="mt-5 text-[1rem] leading-7 text-white/84">{card.description}</p>
                <ul className="mt-7 space-y-3 text-[1rem] leading-7 text-white/90">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-[11px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/80" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button type="button" size="md" variant="secondary" className="gap-2 text-[#1f2937]">
                    Know More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="white" spacing="md">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="text-[2.8rem] font-semibold tracking-[-0.04em] text-[#111827]">Why Work With Us?</h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[1.08rem] leading-8 text-[#6b7280]">
            We combine platform intelligence, field execution, and a large verified workforce so your core operations
            move faster without sacrificing quality.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {whyWorkFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[28px] border border-[#e5e7eb] bg-[#f8fafc] px-7 py-8 text-left shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111827] text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-[1.4rem] font-semibold tracking-[-0.03em] text-[#111827]">{feature.title}</h3>
                <p className="mt-4 text-[0.98rem] leading-7 text-[#6b7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="lightGray" spacing="md" className="pt-6 pb-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <h2 className="text-[2.9rem] font-semibold tracking-[-0.04em] text-[#1f2937]">Clients Success Stories</h2>
          </div>

          <div className="mx-auto mt-12 max-w-[1060px] overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(15,23,42,0.14)] ring-1 ring-[#e5e7eb] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex min-h-[510px] flex-col justify-between bg-[radial-gradient(circle_at_25%_75%,rgba(201,86,48,0.48),transparent_30%),linear-gradient(180deg,#140707_0%,#120506_100%)] px-10 py-12 text-white">
              <div className="max-w-[420px] text-[1.18rem] leading-9 text-white/95">{currentStory.title}</div>
              <div>
                <div className="text-[4rem] font-semibold leading-none tracking-[-0.05em] text-white">{currentStory.metric}</div>
                <div className="mt-3 text-[1.35rem] text-white/90">{currentStory.detail}</div>
              </div>
            </div>
            <div className="min-h-[510px] bg-[#e5ddd4]">
              <img src={currentStory.image} alt={currentStory.title} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={previousStory}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#94a3b8] text-[#334155] transition-colors hover:bg-[#f8fafc]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4">
              {clientSuccessStories.map((story, index) => (
                <button
                  key={story.title}
                  type="button"
                  onClick={() => setActiveStory(index)}
                  className={`h-4 w-4 rounded-full transition-colors ${activeStory === index ? 'bg-[#0f172a]' : 'bg-[#d1d5db]'}`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextStory}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#94a3b8] text-[#334155] transition-colors hover:bg-[#f8fafc]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Section>
      <Section variant="transparent" spacing="lg" className="bg-[radial-gradient(circle_at_12%_88%,rgba(43,73,143,0.36),transparent_22%),linear-gradient(180deg,#030303_0%,#050505_100%)] text-white">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="text-[2.9rem] font-semibold tracking-[-0.04em] text-white">How It Works</h2>
          <p className="mx-auto mt-4 max-w-[760px] text-[1.08rem] leading-8 text-white/84">
            We ensure reliable execution of your core business operations. Here is how we do it.
          </p>

          <div className="relative mx-auto mt-14 hidden max-w-[1080px] items-center justify-between md:flex">
            <div className="absolute left-[72px] right-[72px] top-1/2 h-px -translate-y-1/2 bg-white/60" />
            {howItWorksSteps.map((step) => (
              <div
                key={step.number}
                className="relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white text-[1.9rem] font-semibold text-[#1e3a5f]"
              >
                {step.number}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-[1200px] gap-6 lg:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <div
                key={step.number}
                className="rounded-[30px] bg-[#2d2d2d] px-7 py-8 text-left shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[1.35rem] font-semibold text-[#16355c] md:hidden">
                  {step.number}
                </div>
                <h3 className="text-center text-[1.85rem] font-semibold tracking-[-0.04em] text-white lg:min-h-[84px]">
                  {step.title}
                </h3>
                <p className="mx-auto mt-5 max-w-[330px] text-center text-[1rem] font-medium leading-7 text-white/92">
                  {step.description}
                </p>
                <div className="mt-8 overflow-hidden rounded-[20px] bg-white/92 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                  {index === 0 ? (
                    <div className="space-y-4 text-left text-[#0f172a]">
                      <div className="rounded-[18px] bg-[#1f49c6] px-4 py-5 text-[1.15rem] font-semibold text-white">
                        Project Configuration
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center text-[0.72rem] text-[#475569]">
                        <div className="rounded-xl bg-[#f8fafc] px-2 py-3">500K+ reviews</div>
                        <div className="rounded-xl bg-[#f8fafc] px-2 py-3">500K+ downloads</div>
                        <div className="rounded-xl bg-[#f8fafc] px-2 py-3">Rated 3+ stars</div>
                      </div>
                    </div>
                  ) : null}
                  {index === 1 ? (
                    <div className="overflow-hidden rounded-[16px] border border-[#d5dbe6] text-left text-[0.72rem] text-[#475569]">
                      <div className="grid grid-cols-5 bg-[#f8fafc] font-semibold text-[#334155]">
                        {['Name', 'Created', 'Allocated', 'Delivered', 'Picked Up'].map((cell) => (
                          <div key={cell} className="border-r border-[#dbe2ea] px-2 py-2 last:border-r-0">
                            {cell}
                          </div>
                        ))}
                      </div>
                      {[
                        ['Saurabh Dixit', '38', '20', '16', '20'],
                        ['Anil Sharma', '0', '0', '0', '0'],
                        ['Sham Jain', '16', '16', '14', '16'],
                      ].map((row) => (
                        <div key={row[0]} className="grid grid-cols-5 border-t border-[#dbe2ea] bg-white">
                          {row.map((cell) => (
                            <div key={cell} className="border-r border-[#dbe2ea] px-2 py-3 last:border-r-0">
                              {cell}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {index === 2 ? (
                    <div className="space-y-4 text-left text-[#0f172a]">
                      <div className="rounded-[18px] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-[#e5e7eb]">
                        <div className="flex items-center justify-between text-[0.82rem] text-[#475569]">
                          <span>Withdrawable Earnings</span>
                          <span className="text-[1rem] font-semibold text-[#1f2937]">1500</span>
                        </div>
                        <div className="mt-4 rounded-xl bg-[#1f49c6] px-4 py-3 text-center text-[0.92rem] font-semibold text-white">
                          Proceed
                        </div>
                      </div>
                      <div className="rounded-[18px] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-[#e5e7eb]">
                        <div className="flex items-center justify-between text-[1rem] font-semibold text-[#1f2937]">
                          <span>Successful</span>
                          <span>1,500</span>
                        </div>
                        <div className="mt-2 text-[0.8rem] text-[#64748b]">Ref ID: 765432123456787</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section variant="lightGray" spacing="lg" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-[2%] top-10 hidden h-28 w-28 rounded-[36px] bg-[#dfe7ff] opacity-50 blur-[2px] lg:block"
          style={{ clipPath: 'polygon(30% 0, 100% 22%, 60% 100%, 0 70%)' }}
        />
        <div
          className="pointer-events-none absolute right-[4%] top-28 hidden h-28 w-28 rounded-[34px] bg-[#dfe7ff] opacity-50 blur-[2px] lg:block"
          style={{ clipPath: 'polygon(12% 0, 100% 36%, 66% 100%, 0 74%)' }}
        />
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="text-[2.8rem] font-semibold tracking-[-0.04em] text-[#17356c]">In Media</h2>
          <p className="mx-auto mt-4 max-w-[760px] text-[1.05rem] leading-8 text-[#5870a6]">
            We&apos;re making headlines - click to explore what the buzz is all about.
          </p>
          <div className="mx-auto mt-14 grid max-w-[860px] grid-cols-2 items-center gap-x-12 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {mediaLogos.map((logo) => (
              <div
                key={logo}
                className="text-center text-[1.6rem] font-bold tracking-[-0.04em] text-[#111827] first:text-[#2f9a45] [&:nth-child(3)]:text-[#e62020] [&:nth-child(4)]:text-[#d92d20]"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
