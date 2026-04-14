'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, CheckCircle, ChevronLeft, ChevronRight, DollarSign, MapPin, Menu, Rocket, Settings2, Star, TrendingUp, UserRound, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import Footer from '@/components/Footer';

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

const trustedStats = [
  {
    eyebrow: 'Tasks Completed',
    value: '30 Million+',
    label: 'Delivering high-quality outcomes with precision and speed.',
  },
  {
    eyebrow: 'Strong Workforce',
    value: '1.5 Million+',
    label: 'Empowering businesses with a flexible, tech-driven workforce model.',
  },
  {
    eyebrow: 'Cities',
    value: '1000+',
    label: 'Enabling seamless execution across the country.',
  },
  {
    eyebrow: 'Pin Codes',
    value: '19000+',
    label: 'Reaching customers from metros to rural areas.',
  },
];

const howItWorks = [
  {
    step: '01',
    icon: Briefcase,
    title: 'Post Your Project',
    description: 'Define your requirements, timeline, and budget. Our AI matches you with qualified workers.',
  },
  {
    step: '02',
    icon: Users,
    title: 'Get Matched',
    description: 'Review verified profiles, ratings, and previous work. Select the best fit for your needs.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Track & Pay',
    description: 'Monitor progress in real-time. Release payments securely upon completion.',
  },
];

const businessFeatures = [
  'Pre-vetted talent across 500+ skills',
  'Flexible pricing with no hidden fees',
  'Real-time project tracking',
  'Dedicated account management',
];

const workerFeatures = [
  'Work from anywhere, anytime',
  'Weekly payouts with zero delays',
  'Skill development programs',
  'Build your professional portfolio',
];

const testimonials = [
  {
    role: 'Gig Partner',
    quote:
      'With Awign, I have been able to earn over 2 lakhs in 11 months while I manage my own small business in Cuttack. I have also had the power to choose my working hours and regulate my workload. Special thanks to my managers at Awign who have helped me on my way up here.',
    name: 'Hamza Yusuf',
    image: 'photo-1500648767791-00dcc994a43e',
  },
  {
    role: 'Field Associate',
    quote:
      'Awign helped me move from occasional shifts to a stable monthly income. I can accept assignments close to my home and still have enough flexibility to balance family responsibilities.',
    name: 'Nisha Verma',
    image: 'photo-1494790108377-be9c29b29330',
  },
  {
    role: 'Delivery Partner',
    quote:
      'The onboarding process was simple, payments are timely, and there is always clarity on what each project expects from us. It gave me confidence to take on more gigs every month.',
    name: 'Rahul Khan',
    image: 'photo-1506794778202-cad84cf45f1d',
  },
  {
    role: 'Survey Specialist',
    quote:
      'I love the freedom to choose assignments, and the training before each project makes the work feel organized and professional. It genuinely feels like a growth platform, not just a job board.',
    name: 'Pooja Menon',
    image: 'photo-1488426862026-3ee34a7d66df',
  },
];

const mediaLogos = [
  { label: 'moneycontrol', className: 'text-[#4ca232]' },
  { label: 'Outlook\nBUSINESS + MONEY', className: 'text-[#202020]' },
  { label: 'YOURSTORY', className: 'text-[#ef2f24]' },
  { label: 'PTI', className: 'text-[#ef3740]' },
  { label: 'people\nmatters', className: 'text-[#f28a00]' },
  { label: 'The Economic Times', className: 'text-[#202020]' },
  { label: 'CNBC\nTV18', className: 'text-[#1f4ca4]' },
];
const mediaLogoRows = [mediaLogos.slice(0, 3), mediaLogos.slice(3)] as const;

const jobCategories = [
  {
    title: 'Delivery Partner Jobs',
    workType: 'Field Work',
    countLabel: '8 Jobs',
    route: '/jobs?category=delivery-partner',
    details: ['Two-wheeler & driving licence required', 'Flexible delivery slots across your city'],
    salary: 'Earn Rs 18,000 - Rs 35,000 / month',
  },
  {
    title: 'Field Survey Jobs',
    workType: 'Field Work',
    countLabel: '2 Jobs',
    route: '/jobs?category=field-survey',
    details: ['Visit nearby locations and collect insights', 'Training and scripts provided before onboarding'],
    salary: 'Earn Rs 14,000 - Rs 24,000 / month',
  },
  {
    title: 'Quick Money',
    workType: 'Work From Home',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=quick-money',
    details: ['Short-duration tasks for quick payouts', 'Perfect for side income and part-time work'],
    salary: 'Micro gigs and incentive-based work',
  },
  {
    title: 'Data Entry Jobs',
    workType: 'Work From Home',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=data-entry',
    details: ['Simple computer-based tasks and form filling', 'Great fit for detail-oriented remote workers'],
    salary: 'Earn Rs 12,000 - Rs 20,000 / month',
  },
  {
    title: 'Exam Invigilator Jobs (Offline)',
    workType: 'Field Work',
    countLabel: '2 Jobs',
    route: '/jobs?category=exam-invigilator',
    details: ['Supervise exam centres and ensure compliance', 'Weekend and seasonal assignments available'],
    salary: 'Earn Rs 900 - Rs 1,500 / shift',
  },
  {
    title: 'Sales and Marketing Jobs',
    workType: 'Field Work',
    countLabel: '1 Job',
    route: '/jobs?category=sales-marketing',
    details: ['Promote products and generate leads locally', 'Ideal for confident communicators and promoters'],
    salary: 'Earn Rs 16,000 - Rs 30,000 / month',
  },
  {
    title: 'Digital Gigs Jobs',
    workType: 'Work From Home',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=digital-gigs',
    details: ['Online task-based work from anywhere', 'Great fit for students and remote workers'],
    salary: 'Remote gigs launching soon',
  },
  {
    title: 'Audit Jobs',
    workType: 'Field Work',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=audit',
    details: ['Conduct retail and merchandising audits', 'Capture photos and checklist-based observations'],
    salary: 'Earn Rs 17,000 - Rs 28,000 / month',
  },
  {
    title: 'Recruitment',
    workType: 'Work From Home',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=recruitment',
    details: ['Screen candidates and coordinate interviews', 'Strong communication skills preferred'],
    salary: 'Remote recruitment roles opening soon',
  },
  {
    title: 'Background Verification Jobs',
    workType: 'Field Work',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=background-verification',
    details: ['Visit addresses and verify profile details', 'Structured workflows with clear documentation'],
    salary: 'Earn Rs 18,000 - Rs 26,000 / month',
  },
  {
    title: 'Telecalling Jobs',
    workType: 'Work From Home',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=telecalling',
    details: ['Call leads and customers from your home', 'Day shifts and target-based incentives'],
    salary: 'Earn Rs 12,000 - Rs 22,000 / month',
  },
  {
    title: 'Awign Surveys Jobs',
    workType: 'Work From Home',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=awign-surveys',
    details: ['Participate in guided surveys and feedback tasks', 'Simple workflows with regular task updates'],
    salary: 'Survey-based earnings launching soon',
  },
  {
    title: 'Field Collection',
    workType: 'Field Work',
    countLabel: 'Jobs coming soon',
    route: '/jobs?category=field-collection',
    details: ['On-ground collection and customer follow-up', 'Requires local travel and confidence in communication'],
    salary: 'Earn Rs 18,000 - Rs 32,000 / month',
  },
] as const;
const jobCategoryColumns = [
  ['Delivery Partner Jobs', 'Exam Invigilator Jobs (Offline)'],
  ['Field Survey Jobs', 'Sales and Marketing Jobs', 'Audit Jobs'],
  ['Quick Money', 'Recruitment'],
  ['Digital Gigs Jobs', 'Background Verification Jobs', 'Awign Surveys Jobs'],
  ['Data Entry Jobs', 'Telecalling Jobs', 'Field Collection'],
] as const;

const serviceCards = [
  {
    icon: Briefcase,
    title: 'Egocentric Video Data for Robotics',
    description: 'High-quality human POV datasets for imitation learning and embodied AI',
    bullets: [
      '4K first-person video capture at massive scale',
      '1000+ hours of egocentric video per day',
      '98% robotics-grade annotation accuracy',
    ],
  },
  {
    icon: CheckCircle,
    title: 'Data Annotation',
    description: 'AI/ML-ready data annotation, tech-scaled for accuracy.',
    bullets: [
      '10Mn+ data points labeled monthly',
      '99%+ accuracy via quality checks',
      'Supports images, text, speech & videos',
      'Industry-specific annotation solutions',
    ],
  },
  {
    icon: Users,
    title: 'AI-First Tech Capability Centers',
    description: 'Build AI-first on-site Teams',
    bullets: [
      'On-site, time-zone aligned developers',
      'AI-tracked productivity & integration oversight',
      'Secure offices, enterprise-ready compliance',
      'Go live in 2-weeks with 5-10 engineers',
    ],
  },
  {
    icon: MapPin,
    title: 'Promoter Deployment',
    description: 'Convert prospects to customers across sectors.',
    bullets: [
      'Enhancing brand value through strategic up-selling and cross-selling',
      'Target the right audience for high quality lead generation',
      'In store promotion, customer promotion, BTL activities, and more!',
    ],
  },
  {
    icon: Briefcase,
    title: 'Audit',
    description: 'Full audits: stocks, compliance, fraud, competition via mystery/non-mystery audits.',
    bullets: [
      '4000+ audit parameters',
      '3500 retailers & 1.5M shipments audited',
      '50% reduction in seller claims after audit completion',
      '25+ data points captured against each shipment',
    ],
  },
];

const heroProfiles = [
  {
    name: 'Auditors',
    img: 'photo-1494790108377-be9c29b29330',
    className: 'left-[26%] top-[14%]',
    blobClassName: 'bg-[#6dcc87]',
    labelClassName: 'left-[26%] top-[38%]',
  },
  {
    name: 'Promoters',
    img: 'photo-1500648767791-00dcc994a43e',
    className: 'right-[24%] top-[14%]',
    blobClassName: 'bg-[#f4b313]',
    labelClassName: 'right-[24%] top-[38%]',
  },
];

const heroBottomProfiles = [
  {
    img: 'photo-1506794778202-cad84cf45f1d',
    className: 'left-[14%] bottom-[-7%]',
    blobClassName: 'bg-[#a66de0]',
  },
  {
    img: 'photo-1438761681033-6461ffad8d80',
    className: 'right-[14%] bottom-[-8%]',
    blobClassName: 'bg-[#20c7d6]',
  },
];

const offeringTabs = ['White Collar', 'Grey Collar', 'Blue Collar'] as const;

const whyWorkTabs = {
  jobs: {
    title: 'Find flexible gigs that fit your schedule',
    description: 'Discover opportunities, build reliable income, and grow with guided support from Awign.',
    buttonLabel: 'Explore Jobs',
  },
  business: {
    title: '175+ Large Enterprises Trust Us',
    description: 'Proven track record of excellence and reliability.',
    buttonLabel: 'Share Requirement',
  },
} as const;

const whyWorkIcons = [
  { key: 'star', icon: Star, accent: false },
  { key: 'user', icon: UserRound, accent: false },
  { key: 'settings', icon: Settings2, accent: false },
  { key: 'money', icon: DollarSign, accent: true },
  { key: 'pin', icon: MapPin, accent: false },
  { key: 'rocket', icon: Rocket, accent: false },
];

function AwignMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" fill="none" className={className} aria-hidden="true">
      <path d="M26 9L39 41C39.3 41.9 38.5 42.7 37.6 42.3L26 37.8L14.4 42.3C13.5 42.7 12.7 41.9 13 41L26 9Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M18.8 27.2L26 19.2L33.2 27.2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.5 34L26 27.6L30.5 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrustedCardMarquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="logo-marquee relative overflow-hidden w-full ">
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

export default function Home() {
  const [activeWhyWorkTab, setActiveWhyWorkTab] = useState<'jobs' | 'business'>('business');
  const activeWhyWorkContent = whyWorkTabs[activeWhyWorkTab];
  const [activeOfferingTab, setActiveOfferingTab] = useState<(typeof offeringTabs)[number]>('White Collar');
  const [activeJobCategory, setActiveJobCategory] = useState('Field Survey Jobs');
  const [activeTestimonial, setActiveTestimonial] = useState(3);
  const shellClass = 'mx-auto flex w-full justify-center px-6 lg:px-8';
  const shellInnerClass = 'mx-auto w-full max-w-[1200px]';
  const homeCenteredShellStyle = { maxWidth: '1120px', marginLeft: 'auto', marginRight: 'auto' } as const;
  const homeWideShellStyle = { maxWidth: '1180px', marginLeft: 'auto', marginRight: 'auto' } as const;
  const heroShellClass = 'w-full max-w-[1220px]';
  const navbarInnerClass = 'w-full max-w-[1280px]';
  const currentTestimonial = testimonials[activeTestimonial];

  const goToPreviousTestimonial = () => {
    setActiveTestimonial((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const goToNextTestimonial = () => {
    setActiveTestimonial((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900" style={{ fontFamily: '"Montserrat Variable", sans-serif' }}>
      <section className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_50%_34%,rgba(33,94,146,0.72),rgba(7,22,41,0.95)_40%,#01060e_78%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(18,167,134,0.18),transparent_28%),radial-gradient(circle_at_80%_34%,rgba(28,74,148,0.18),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.18))]" />

        <div className={`${shellClass} absolute left-0 right-0 top-7 z-30`}>
          <nav className={`${navbarInnerClass} flex items-center justify-between rounded-[32px] bg-[rgba(39,43,49,0.92)] px-10 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md`}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5">
                <div className="h-4 w-4 rotate-45 border border-white/90" />
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] font-semibold tracking-[0.02em] text-white">awign</span>
                <span className="text-[10px] font-medium text-white/60">A Mynavi company</span>
              </div>
            </div>

            <div className="hidden items-center gap-14 md:flex">
              <div className="flex items-center gap-14 text-[15px] font-semibold text-white/90">
                <Link href="/gig" className="transition-colors hover:text-white">For Jobs</Link>
                <Link href="/business" className="transition-colors hover:text-white">For Business</Link>
                <Link href="/blogs" className="transition-colors hover:text-white">Blogs</Link>
              </div>
              <Button asChild size="md" variant="primary">
                <Link href="/register">Login / Signup</Link>
              </Button>
            </div>

            <button className="text-white md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </nav>
        </div>

        <div className={shellClass}>
          <div className={`${heroShellClass} relative z-10 flex min-h-[calc(100vh-6rem)] flex-col items-center px-4 pb-10 pt-[70px] sm:pt-[84px]`}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex max-w-[960px] flex-col items-center text-center !mt-[15%]"
            >
              <div className="mb-6 text-[21px] font-medium uppercase tracking-[0.02em] text-white/85">India&apos;s #1</div>
              <h1 className="mb-6 max-w-[980px] text-balance text-[3.9rem] font-semibold leading-[1.06] tracking-[-0.04em] text-white lg:text-[4.25rem]">
                Work-as-a-Service Platform!
              </h1>
              <p className="mb-10 max-w-[980px] text-[22px] font-normal leading-[1.45] text-white/82">
                Part-time, Full-time, Onsite, and Remote work opportunities!
              </p>

              <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-10">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.01em] text-white/90">For Jobs</span>
                  <Button asChild size="lg" variant="secondary" className="min-w-[302px]">
                    <Link href="/jobs">Explore Jobs</Link>
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.01em] text-white/90">For Business</span>
                  <Button asChild size="lg" variant="outline" className="min-w-[302px]">
                    <Link href="/services">Explore Solutions</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="relative mt-16 h-[420px] w-full max-w-[1120px] overflow-hidden sm:mt-20 lg:h-[455px]">
              <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" viewBox="0 0 1120 455" fill="none" preserveAspectRatio="none">
                <path d="M332 250C398 245 410 278 430 325C442 356 456 372 484 384" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round" />
                <path d="M790 250C724 245 712 278 692 325C680 356 666 372 638 384" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round" />
              </svg>

              {heroProfiles.map((profile) => (
                <div key={profile.name}>
                  <div className={`absolute z-10 hidden h-[132px] w-[132px] overflow-hidden lg:block ${profile.className}`}>
                    <div className={`absolute inset-0 ${profile.blobClassName}`} style={{ borderRadius: '35% 65% 58% 42% / 42% 38% 62% 58%' }} />
                    <img
                      src={`https://images.unsplash.com/${profile.img}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=260`}
                      alt={profile.name}
                      className="absolute inset-[8px] h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-[32px] object-cover grayscale"
                    />
                  </div>
                  <div className={`absolute z-10 hidden -translate-x-1/2 text-[18px] font-medium text-white lg:block ${profile.labelClassName}`}>
                    {profile.name}
                  </div>
                </div>
              ))}

              {heroBottomProfiles.map((profile) => (
                <div key={profile.img} className={`absolute hidden h-[120px] w-[120px] overflow-hidden lg:block ${profile.className}`}>
                  <div className={`absolute inset-0 ${profile.blobClassName}`} style={{ borderRadius: '44% 56% 63% 37% / 46% 38% 62% 54%' }} />
                  <img
                    src={`https://images.unsplash.com/${profile.img}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=220`}
                    alt=""
                    className="absolute inset-[8px] h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-[28px] object-cover grayscale"
                  />
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="absolute left-1/2 bottom-[-26px] z-20 h-[340px] w-[260px] -translate-x-1/2 overflow-hidden lg:h-[380px] lg:w-[286px]"
              >
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700"
                  alt="Professional"
                  className="h-full w-full object-cover object-top grayscale"
                  style={{ filter: 'drop-shadow(0 20px 80px rgba(0,0,0,0.45))' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Section variant="black" spacing="md">
        <div className="w-full px-4 md:px-6">
          <div style={homeWideShellStyle} className="flex flex-col items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-[760px] text-center sm:mb-14">
              <h2 className="text-center text-white" style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Trusted By 175+ Large Enterprises</h2>
            </motion.div>

            <div className="mx-auto flex w-full flex-col gap-6 px-4 sm:px-6" style={{ maxWidth: '1120px' }}>
              <TrustedCardMarquee items={trustedBrandRowOne} />
              <TrustedCardMarquee items={trustedBrandRowTwo} reverse />
            </div>
          </div>
        </div>
      </Section>

      <Section variant="lightGray" spacing="lg">
        <div className="w-full px-4 md:px-6">
          <div style={homeCenteredShellStyle}>
            <div className="mx-auto inline-grid max-w-full grid-cols-1 justify-center justify-items-center gap-14 md:grid-cols-2 md:gap-14 xl:grid-cols-4 xl:gap-16">
            {trustedStats.map((stat, index) => (
            <motion.div
              key={stat.eyebrow}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="mx-auto flex w-full max-w-[250px] flex-col items-center text-center"
            >
              <div className="mb-3 text-[1.05rem] font-bold text-[#4c82ff]">{stat.eyebrow}</div>
              <div className="mb-3 text-[2rem] font-bold leading-none tracking-[-0.04em] text-[#111827]">{stat.value}</div>
              <p className="max-w-[240px] text-[1.02rem] leading-7 text-[#4b5563]">{stat.label}</p>
            </motion.div>
          ))}
            </div>
          </div>
        </div>
      </Section>

      <Section variant="white" spacing="lg">
        <div className="w-full px-4 md:px-6">
          <div style={homeCenteredShellStyle} className="flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-16 max-w-[760px] text-center sm:mb-20">
            <h2 className="leading-[1.12]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>Why work with us?</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto w-full overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_88%_28%,rgba(30,66,129,0.95),rgba(7,18,38,0.98)_44%,#000_76%)] shadow-[0_26px_70px_rgba(6,17,35,0.2)]"
            style={{ maxWidth: '960px' }}
          >
            <div className="grid min-h-[580px] w-full items-center justify-center justify-items-center lg:grid-cols-2 gap-4">
              <div className="relative flex items-center justify-center px-10 py-12 sm:px-14 sm:py-16">
                <div className="absolute left-[-80px] top-1/2 h-[560px] w-[360px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_72%_50%,rgba(27,63,128,0.9),rgba(7,18,38,0.96)_52%,transparent_74%)]" />

                <div className="relative flex w-full items-center justify-center">
                  <div className="flex h-[152px] w-[152px] items-center justify-center rounded-full bg-white text-[#424d5f] shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
                    <AwignMark className="h-[76px] w-[76px]" />
                  </div>

                  <div className="absolute left-[58%] top-1/2 flex -translate-y-1/2 flex-col items-center gap-5">
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#d1d1d1] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                      <div className="absolute right-0 top-0 h-[88px] w-[88px] rounded-full border-[10px] border-transparent border-r-black/90 border-t-black/90" />
                      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white text-[#f2b300]">
                        <Star className="h-6 w-6 fill-current" />
                      </div>
                    </div>

                    {whyWorkIcons.slice(1).map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setActiveWhyWorkTab(item.accent ? 'business' : 'jobs')}
                          className={`flex h-[60px] w-[60px] items-center justify-center rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-transform hover:scale-105 ${
                            item.accent ? 'bg-[#c9ff45] text-[#273448]' : 'bg-white text-[#8d8d8d]'
                          }`}
                        >
                          <Icon className="h-7 w-7" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="relative flex items-center px-10 py-12 text-center text-white sm:px-14 sm:py-16 lg:text-left">
                <div className="mx-auto flex max-w-[520px] flex-col items-center lg:items-start">
                  <div className="mb-20 inline-flex rounded-full bg-[#444c59] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <button
                      type="button"
                      onClick={() => setActiveWhyWorkTab('jobs')}
                      className={`rounded-full px-8 py-3 text-[18px] font-medium transition-colors ${activeWhyWorkTab === 'jobs' ? 'bg-[#c9ff45] text-[#273448]' : 'text-white'}`}
                    >
                      For Jobs
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveWhyWorkTab('business')}
                      className={`rounded-full px-8 py-3 text-[18px] font-medium transition-colors ${activeWhyWorkTab === 'business' ? 'bg-[#c9ff45] text-[#273448]' : 'text-white'}`}
                    >
                      For Business
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeWhyWorkTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center lg:items-start"
                    >
                      <h3 className="mb-4 text-white leading-[1.18]" style={{ fontSize: '2.7rem', fontWeight: 700 }}>
                        {activeWhyWorkContent.title}
                      </h3>
                      <p className="mb-12 max-w-[520px] text-[21px] leading-[1.5] text-white/88">
                        {activeWhyWorkContent.description}
                      </p>
                      <Button
                        asChild
                        size="xl"
                        variant="secondary"
                        className="min-w-[308px] h-[62px]"
                      >
                        <Link href={activeWhyWorkTab === 'business' ? '/business' : '/jobs'} className="gap-3">
                          {activeWhyWorkContent.buttonLabel}
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </Section>

      <section 
        className="w-full overflow-hidden pt-[120px] pb-[160px] text-white"
        style={{
          backgroundColor: '#000',
          backgroundImage: 'url(/images/new-home-page/desktop/yellow-shade.svg), url(/images/new-home-page/desktop/green-shade.svg), radial-gradient(circle at 84% 18%, rgba(31,78,136,0.72), rgba(8,18,34,0.98) 44%, #000 82%)',
          backgroundPosition: '0 100%, 100% 0, 0 0',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="w-full px-4 md:px-6">
          <div style={homeWideShellStyle} className="w-full flex flex-col items-center justify-center !mt-[5%]">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-14 flex max-w-[760px] flex-col items-center text-center sm:mb-16 !w-[100%]">
              <h2 className="mb-9 !mt-[5%] text-white" style={{ fontSize: '2.2rem', fontWeight: 600 }}>Our Offerings</h2>

              <div className="mb-10 !ml-[40%] flex items-center gap-10 rounded-full p-2.5 !mt-[10%] !mb-[10%] w-full">
                {offeringTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveOfferingTab(tab)}
                    className={`flex-1 max-w-[18%] rounded-full px-8 py-3 text-[1.15rem] transition-colors ${
                      activeOfferingTab === tab ? 'bg-[#c9ff45] text-[#212121]' : 'bg-[#3a3a3d] text-white/78'
                    }`}
                    style={{ padding: '0.5% 1%' }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <p className="text-[1.5rem] font-semibold leading-8 text-white mt-[5%] !mb-[5%]">Cognitive, Desk-based, Tech-centric</p>
            </motion.div>

            <div className="logo-marquee relative overflow-hidden">
              <div className="offerings-scroll flex gap-6">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex flex-shrink-0 items-stretch gap-6">
                    {serviceCards.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <motion.article
                          key={`${copy}-${service.title}`}
                          initial={{ opacity: 0, y: 22 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: index * 0.06 }}
                          className="flex min-h-[440px] w-[340px] flex-shrink-0 flex-col rounded-[28px] border border-white/10 bg-[rgba(49,49,49,0.92)] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                        >
                          <div className="mb-6 flex items-start justify-between">
                            <div className="flex !mt-[5%] !mb-[5%] !ml-[5%] h-8 w-8 items-center justify-center rounded-md text-white/80">
                              <Icon className="h-8 w-8" />
                            </div>
                            <div className="flex flex-col items-center gap-1 text-white/50">
                              <span className="h-1 w-1 rounded-full bg-current" />
                              <span className="h-1 w-1 rounded-full bg-current" />
                              <span className="h-1 w-1 rounded-full bg-current" />
                            </div>
                          </div>

                          <h3 className="mb-4 !mb-[3%] !ml-[5%] leading-[1.18] text-white" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                            {service.title}
                          </h3>
                          <p className="mb-4 !mb-[3%] !ml-[5%] text-[0.9rem] leading-6 text-white/75">{service.description}</p>

                          <ul className="mb-6 !ml-[10%] flex flex-1 list-disc flex-col gap-2 pl-5 text-[0.85rem] leading-5 text-white/78 marker:text-white/80">
                            {service.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>

                          <Link
                            href="/services"
                            className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-[0.98rem] font-semibold text-[#1f1f1f] transition-transform hover:scale-[1.01]"
                          >
                            Know More
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </motion.article>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <div className="h-[3px] w-20 rounded-full bg-white/55" />
            </div>
          </div>
          </div>
      </section>

      <Section variant="white" spacing="lg">
        <div className="w-full px-4 md:px-6">
          <div style={homeWideShellStyle} className="flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-16 max-w-[760px] text-center sm:mb-20">
            <h2 className="mb-3 leading-[1.12] text-[#111827]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>Job Categories</h2>
          </motion.div>

          <div className="mx-auto grid items-start justify-center gap-12 lg:grid-cols-[360px_minmax(0,680px)] lg:gap-12">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative mx-auto w-full max-w-[360px] lg:mx-0 lg:pt-2">
                <div className="relative overflow-hidden">
                  <img
                    src="/image.png"
                    alt="Job categories representative"
                    className="h-[700px] w-full object-contain object-top"
                    style={{ maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)' }}
                  />
                </div>
              </motion.div>

              <div className="mx-auto flex max-w-[680px] flex-wrap justify-center gap-5 pt-2 xl:flex-nowrap xl:items-start xl:justify-center">
                {jobCategoryColumns.map((column, columnIndex) => (
                  <div key={column.join('-')} className="flex w-full min-w-[220px] flex-col items-center gap-5 sm:w-[210px] xl:w-[200px]">
                    {column.map((title, itemIndex) => {
                      const category = jobCategories.find((item) => item.title === title);
                      if (!category) return null;
                      const isActive = activeJobCategory === category.title;

                      return (
                        <motion.div
                          key={category.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: columnIndex * 0.06 + itemIndex * 0.04 }}
                          onHoverStart={() => setActiveJobCategory(category.title)}
                          onFocus={() => setActiveJobCategory(category.title)}
                          onClick={() => setActiveJobCategory(category.title)}
                          className="group w-full"
                        >
                          <motion.div
                            layout
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            className={`flex h-full min-h-[148px] flex-col rounded-[26px] px-5 py-5 shadow-[0_14px_34px_rgba(17,24,39,0.08)] ${
                              isActive
                                ? 'bg-[#c9ff45] text-[#151515]'
                                : 'bg-[linear-gradient(180deg,#112a52_0%,#071633_100%)] text-white'
                            }`}
                      >
                        <div className="flex flex-1 flex-col items-center text-center !pt-[10%]">
                          <h3 className="mb-4 max-w-[180px] leading-[1.25]" style={{ fontSize: '1.5rem', fontWeight: 700 ,textAlign:'start'}}>
                            {category.title}
                          </h3>

                          {isActive ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.22 }}
                              className="flex flex-1 flex-col items-center text-center u2"
                            >
                              <div className="mb-3 flex flex-wrap justify-center gap-2">
                                <span className="inline-flex rounded-full bg-black/10 px-3 py-1 text-xs font-semibold text-[#151515]">
                                  {category.workType}
                                </span>
                                <span className="inline-flex rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-[#151515]">
                                  {category.countLabel}
                                </span>
                              </div>

                              <ul className="mb-4 flex flex-1 list-disc flex-col gap-1.5 pl-5 text-left text-[0.8rem] leading-5 text-[#24311a] marker:text-[#24311a]">
                                {category.details.map((detail) => (
                                  <li key={detail}>{detail}</li>
                                ))}
                              </ul>

                              <p className="mb-4 text-center text-[0.8rem] font-medium leading-5 text-[#24311a]">{category.salary}</p>

                              <Link
                                href={category.route}
                                className="inline-flex h-10 items-center justify-center rounded-full bg-[#111827] px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                              >
                                Explore
                              </Link>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0.9 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="mt-auto flex flex-wrap justify-center gap-2"
                            >
                              <span className="inline-flex rounded-full bg-[#baff45] !px-3 !py-1 text-xs font-semibold text-[#111827]">
                                {category.workType}
                              </span>
                              <span className="inline-flex rounded-full bg-white !px-3 !py-1 text-xs font-semibold text-[#111827]">
                                {category.countLabel}
                              </span>
                            </motion.div>
                          )}
                        </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="lightGray" spacing="lg">
          <div className={`${shellInnerClass} grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20`}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative order-1 mx-auto h-96 w-full max-w-[720px] overflow-hidden rounded-2xl shadow-2xl lg:h-[500px] lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Business team"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-2 flex justify-center lg:justify-start">
              <div className="w-full max-w-[620px] text-left">
                <h2 className="mb-4 leading-[1.15]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>Built for Modern Businesses</h2>
                <p className="mb-8 text-lg leading-8 text-slate-500">
                  Access a flexible workforce that scales with your needs. Execute projects faster with verified professionals.
                </p>
                <div className="space-y-3">
                  {businessFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-base leading-7"
                    >
                      <CheckCircle className="!mt-0.5 h-6 w-6 flex-shrink-0 text-[#030213]" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
                <Button asChild size="md" variant="primary" className="!mt-8 gap-2">
                  <Link href="/business">
                    Start Hiring
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
      </Section>

      <Section variant="white" spacing="md">
          <div className={`${shellInnerClass} mx-auto grid items-center justify-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20`}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-2 flex flex-col items-center justify-center lg:order-1 lg:items-start lg:justify-start text-center lg:text-left mx-auto max-w-[620px]">
              <div className="w-full max-w-[620px] text-left">
                <h2 className="mb-4 leading-[1.15]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>Earn on Your Terms</h2>
                <p className="mb-8 text-lg leading-8 text-slate-500">
                  Join millions earning flexible income. Choose projects that match your skills and schedule.
                </p>
                <div className="space-y-3">
                  {workerFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-base leading-7"
                    >
                      <TrendingUp className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#030213]" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
                <Button asChild size="md" className="mt-8 gap-2 bg-[#c9ff45] text-[#111827] hover:bg-[#b0eb2f]">
                  <Link href="/jobs">
                    Join as Worker
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-1 relative mx-auto h-96 w-full max-w-[720px] overflow-hidden rounded-2xl shadow-2xl lg:order-2 lg:h-[500px] lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1714976326831-660970f3de8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Professionals working"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
      </Section>

      <Section className="mt-16 border-t border-white/20 bg-[radial-gradient(circle_at_0%_100%,rgba(20,49,96,0.88),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(56,52,15,0.4),transparent_24%),linear-gradient(180deg,#020202_0%,#03060d_100%)] text-white" spacing="lg">
          <div className="w-full px-4 md:px-6">
            <div style={homeWideShellStyle} className="flex flex-col items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-[860px] text-center sm:mb-14">
              <h2 className="leading-[1.12] text-white" style={{ fontSize: '2.5rem', fontWeight: 700 }}>How It Works</h2>
              <p className="!mt-3 text-[1.02rem] leading-8 text-white/82 sm:mt-4">
                We ensure reliable execution of your core business operations. Here&apos;s how we do it:
              </p>
            </motion.div>

            <div className="mx-auto mb-12 hidden w-full max-w-[980px] items-center px-4 lg:flex">
              <div className="h-px flex-1 bg-white/70" />
              {['1', '2', '3'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[1.15rem] font-bold text-[#17345d]">
                    {step}
                  </div>
                  {index < 2 ? <div className="h-px w-[190px] bg-white/70 xl:w-[250px]" /> : null}
                </div>
              ))}
            </div>

            <div className="mx-auto grid w-full max-w-[1120px] gap-6 lg:grid-cols-3 lg:gap-6 xl:gap-8">
              {howItWorks.map((item, index) => (
                <motion.article
                  key={item.step}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.14 }}
                  className="rounded-[28px] bg-[linear-gradient(180deg,#2f3136_0%,#2a2a2b_100%)] px-7 pb-7 pt-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
                >
                  <div className="!mb-6 flex items-center justify-center lg:hidden">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-[#17345d]">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="!mb-4 mt-[10%] text-[1.05rem] font-medium leading-[1.35] text-white lg:min-h-[58px] UTT43">
                    {index === 0 && 'Project Configuration on Awign App'}
                    {index === 1 && 'Task Allocation and Fulfillment'}
                    {index === 2 && 'Payment and Completion'}
                  </h3>

                  <p className="mx-auto mb-8 max-w-[320px] text-[0.96rem] font-semibold leading-[1.15] text-white">
                    {index === 0 && "We'll configure your task on our platform within 24 hours and share your requirements with our trained workforce"}
                    {index === 1 && 'Our automated system allocates tasks to the workforce in 10 milliseconds and ensures quality through algorithms and manual checks.'}
                    {index === 2 && 'Our native app offers payment capability, 99.5% of the workforce gets paid every 7 days with ZERO complaints.'}
                  </p>

                  <div className="mx-auto flex min-h-[270px] w-full max-w-[290px] items-center justify-center rounded-[20px] bg-transparent">
                    {index === 0 ? (
                      <div className="w-full rounded-[14px] bg-white p-4 text-left shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                        <div className="mb-5 flex items-center justify-between">
                          <div className="text-[1.05rem] font-bold tracking-tight text-[#214bbb]">paytm</div>
                          <div className="rounded-full border border-slate-200 px-3 py-1 text-[0.72rem] text-slate-600">Active</div>
                        </div>
                        <div className="mb-1 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-slate-400">Merchant onboarding</div>
                        <div className="mb-2 text-[1rem] font-semibold text-slate-800">Merchant onboarding for paytm</div>
                        <p className="mb-5 text-[0.82rem] leading-5 text-slate-500">This Project is for proctors who are performing Online Invigilation for the exam</p>
                        <div className="flex h-11 items-center justify-center rounded-[10px] bg-[#214bbb] text-sm font-semibold text-white">View</div>
                      </div>
                    ) : null}

                    {index === 1 ? (
                      <div className="w-full overflow-hidden rounded-[12px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                        <div className="grid grid-cols-5 bg-slate-50 text-left text-[0.62rem] text-slate-500">
                          {['Name', 'Created', 'Allocated', 'Delivered', 'Picked Up'].map((label) => (
                            <div key={label} className="border-b border-r border-slate-200 px-2 py-2 last:border-r-0">{label}</div>
                          ))}
                        </div>
                        {[
                          ['Saurabh Dixit', '38', '20', '16', '20'],
                          ['Anil Sharma', '0', '0', '0', '0'],
                          ['Sham Jain', '16', '16', '14', '16'],
                        ].map((row) => (
                          <div key={row[0]} className="grid grid-cols-5 text-left text-[0.72rem] text-slate-700">
                            {row.map((cell, cellIndex) => (
                              <div key={`${row[0]}-${cellIndex}`} className="min-h-[44px] border-b border-r border-slate-200 px-2 py-3 last:border-r-0">
                                {cell}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {index === 2 ? (
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
                          <div className="text-[0.58rem] leading-4 text-slate-400">Payments after 3 PM will be processed next day at 8 PM</div>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 w-[260px] -translate-x-1/2 rounded-[10px] bg-white p-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                          <div className="mb-1 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[0.82rem] font-semibold text-slate-700">
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#35c16d] text-white">✓</span>
                              Successful
                            </div>
                            <span className="text-sm font-semibold text-slate-700">1,500</span>
                          </div>
                          <div className="text-[0.68rem] leading-4 text-slate-400">Date: 22 Feb 2023</div>
                          <div className="text-[0.68rem] leading-4 text-slate-400">Ref ID: 765432123456787</div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
            </div>
          </div>
      </Section>

      <Section variant="lightGray" spacing="lg">
          <div className="w-full px-4 md:px-6">
            <div style={homeCenteredShellStyle} className="flex flex-col items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-14 max-w-[760px] text-center">
              <h2 className="text-[#252525]" style={{ fontSize: '2.45rem', fontWeight: 700 }}>What People Say</h2>
            </motion.div>

            <div className="mx-auto max-w-[860px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="mx-auto grid w-full max-w-[860px] items-center justify-center gap-10 md:grid-cols-[190px_minmax(0,520px)] md:gap-12"
                >
                  <div className="flex w-full justify-center">
                    <div className="h-[174px] w-[174px] overflow-hidden rounded-full bg-[#dceaf0] shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
                      <img
                        src={`https://images.unsplash.com/${currentTestimonial.image}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=420`}
                        alt={currentTestimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="w-full max-w-[520px] text-center">
                    <span className="mb-4 inline-flex rounded-full bg-[#c9ff45] px-4 py-1.5 text-[0.9rem] font-semibold text-[#283320]">
                      {currentTestimonial.role}
                    </span>
                    <p className="mb-4 text-[1.02rem] leading-7 text-[#70757d]">
                      {currentTestimonial.quote}
                    </p>
                    <div className="text-[1.05rem] font-bold text-[#252525]">{currentTestimonial.name}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-14 flex items-center justify-center gap-5">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={goToPreviousTestimonial}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8090a4] text-[#5a6d83] transition-colors hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-3 w-3 rounded-full transition-colors ${index === activeTestimonial ? 'bg-[#193552]' : 'bg-[#d0d0cb]'}`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={goToNextTestimonial}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9ddd9] text-[#b9bfc5] transition-colors hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="pt-28 text-center sm:pt-32">
              <h2 className="text-[#252525]" style={{ fontSize: '2.45rem', fontWeight: 700 }}>Blogs</h2>
            </div>
            </div>
          </div>
      </Section>

      <Section variant="lightGray" spacing="lg" className="relative pt-24 sm:pt-28 lg:pt-32">
        <div className="pointer-events-none absolute left-[2%] top-[4%] hidden h-28 w-28 text-[#dfe7fb] opacity-60 md:block">
          <Star className="h-full w-full fill-current stroke-none" />
        </div>
        <div className="pointer-events-none absolute right-[4%] top-[22%] hidden h-28 w-28 rotate-12 rounded-[28px] bg-[#dfe7fb] opacity-45 md:block" style={{ clipPath: 'polygon(18% 0, 100% 26%, 71% 100%, 0 73%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[190px] bg-black" />

        <div className="relative z-10 w-full px-4 md:px-6 text-center">
          <div style={homeCenteredShellStyle} className="flex flex-col items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-[860px] text-center">
              <h2 className="text-[#203d6e]" style={{ fontSize: '2.2rem', fontWeight: 700 }}>In Media</h2>
              <p className="mt-3 text-[1.05rem] leading-8 text-[#53627b]">
                We&apos;re making headlines - click to explore what the buzz is all about
              </p>
            </motion.div>

            <div className="mx-auto mb-20 flex max-w-[840px] flex-col items-center gap-10">
              {mediaLogoRows.map((row, rowIndex) => (
                <div key={`media-row-${rowIndex}`} className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
                  {row.map((logo, logoIndex) => (
                    <motion.div
                      key={logo.label}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: rowIndex * 0.08 + logoIndex * 0.05 }}
                      className={`min-w-[140px] text-center text-[1.15rem] font-bold leading-[1.05] whitespace-pre-line ${logo.className}`}
                    >
                      {logo.label}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            <div className="relative mx-auto flex w-full max-w-[860px] flex-col items-center justify-center gap-7 pb-10 md:flex-row md:items-stretch">
              <motion.article
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="min-h-[255px] rounded-[26px] bg-[radial-gradient(circle_at_70%_85%,rgba(28,74,148,0.9),rgba(32,32,34,0.98)_48%,#232325_100%)] px-7 py-8 text-white shadow-[0_26px_60px_rgba(0,0,0,0.2)]"
              >
                <div className="mb-10 text-[0.95rem] font-medium text-white/78">For Business</div>
                <h3 className="mb-6 max-w-[360px] text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em]">
                  Want to Optimize Your Core Operations?
                </h3>
                <p className="mb-8 text-[1.55rem] font-medium leading-none text-white/92">Let&apos;s Talk!</p>
                <Button asChild size="md" variant="secondary" className="px-7 bg-white text-[#283548]">
                  <Link href="/business">
                    Book a meeting
                  </Link>
                </Button>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="min-h-[255px] rounded-[26px] bg-[radial-gradient(circle_at_70%_85%,rgba(28,74,148,0.9),rgba(32,32,34,0.98)_48%,#232325_100%)] px-7 py-8 text-white shadow-[0_26px_60px_rgba(0,0,0,0.2)]"
              >
                <div className="mb-10 text-[0.95rem] font-medium text-white/78">For Work</div>
                <h3 className="mb-6 max-w-[300px] text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em]">
                  Looking For Work?
                </h3>
                <p className="mb-8 max-w-[320px] text-[1.55rem] font-medium leading-[1.18] text-white/92">
                  Discover Flexible Work Opportunities Now!
                </p>
                <Button asChild size="md" variant="secondary" className="px-7 bg-white text-[#283548]">
                  <Link href="/jobs">
                    Explore Jobs
                  </Link>
                </Button>
              </motion.article>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
