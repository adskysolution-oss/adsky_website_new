import { BriefcaseBusiness, Rocket, ShieldCheck } from 'lucide-react';

export type PlanSlug = 'standard' | 'enterprise' | 'custom';

export const pricingPlans = [
  {
    slug: 'standard' as PlanSlug,
    name: 'Standard',
    tagLine: 'For Growing Startups',
    priceLabel: '₹14,999',
    monthlyLabel: '/month',
    amount: 14999,
    icon: BriefcaseBusiness,
    ctaLabel: 'Get Started',
    features: [
      'Access to Candidate Dashboard',
      'Lead Management CRM',
      '5 Project Postings/Month',
      'Standard Workforce Support',
      'ISO 9001:2015 Compliance',
    ],
  },
  {
    slug: 'enterprise' as PlanSlug,
    name: 'Enterprise',
    tagLine: 'For Scalable Operations',
    priceLabel: '₹49,999',
    monthlyLabel: '/month',
    amount: 49999,
    icon: Rocket,
    ctaLabel: 'Get Started',
    recommended: true,
    features: [
      'Full 3-Panel Admin Ecosystem',
      'Unlimited Project Pipeline',
      'High-Fidelity CRM Setup',
      'Priority Consulting Support',
      'Global PIN Code Coverage',
      'Custom Automation Logic',
    ],
  },
  {
    slug: 'custom' as PlanSlug,
    name: 'Custom',
    tagLine: 'For Global Infra Structure',
    priceLabel: 'Quote',
    monthlyLabel: '',
    amount: 0,
    icon: ShieldCheck,
    ctaLabel: 'Get Started',
    features: [
      'Bespoke IT Architecture',
      'Dedicated Project Director',
      'On-site Talent Management',
      'Full Security Integration',
      'Annual Process Audit',
    ],
  },
];

export type PricingPlan = (typeof pricingPlans)[number];

export const getPlanBySlug = (slug?: string) =>
  pricingPlans.find((plan) => plan.slug === slug) || null;
