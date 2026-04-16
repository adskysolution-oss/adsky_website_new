import { BriefcaseBusiness, Rocket, ShieldCheck } from 'lucide-react';

export type PlanSlug = 'basic' | 'pro' | 'enterprise' | 'custom';

export const pricingPlans = [
  {
    slug: 'basic' as PlanSlug,
    name: 'Basic',
    tagLine: 'For individuals & small teams',
    priceLabel: '₹2,999',
    monthlyLabel: '/month',
    amount: 2999,
    icon: BriefcaseBusiness,
    ctaLabel: 'Get Started',
    features: [
      'Up to 5 job postings/month',
      'Basic workforce matching',
      'Email support',
      'Candidate dashboard',
    ],
  },
  {
    slug: 'pro' as PlanSlug,
    name: 'Pro',
    tagLine: 'For growing businesses',
    priceLabel: '₹14,999',
    monthlyLabel: '/month',
    amount: 14999,
    icon: Rocket,
    ctaLabel: 'Start Free Trial',
    recommended: true,
    features: [
      'Unlimited job postings',
      'Advanced AI job matching',
      'Priority email & chat support',
      'Full candidate dashboard',
      'Analytics & reporting',
    ],
  },
  {
    slug: 'enterprise' as PlanSlug,
    name: 'Enterprise',
    tagLine: 'For large-scale operations',
    priceLabel: '₹49,999',
    monthlyLabel: '/month',
    amount: 49999,
    icon: ShieldCheck,
    ctaLabel: 'Get Started',
    features: [
      'Full 3-panel admin ecosystem',
      '24/7 priority support + SLA',
      'Custom candidate pipelines',
      'Advanced analytics & BI tools',
      'Global PIN code coverage',
    ],
  },
  {
    slug: 'custom' as PlanSlug,
    name: 'Custom',
    tagLine: 'For custom requirements',
    priceLabel: 'Quote',
    monthlyLabel: '',
    amount: 0,
    icon: ShieldCheck,
    ctaLabel: 'Contact Sales',
    features: [
      'Bespoke IT Architecture',
      'Dedicated Project Director',
      'On-site Talent Management',
      'Full Security Integration',
    ],
  },
];

export type PricingPlan = (typeof pricingPlans)[number];

export const getPlanBySlug = (slug?: string) =>
  pricingPlans.find((plan) => plan.slug === slug) || null;
