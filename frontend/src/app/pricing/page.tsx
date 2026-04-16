'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Check, Zap, Star, Shield, Rocket, BriefcaseBusiness,
  ArrowRight, Users, ChevronDown, HelpCircle, X
} from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    tagline: 'For individuals & small teams',
    price: { monthly: 2999, annual: 1999 },
    currency: '₹',
    period: '/mo',
    cta: 'Get Started',
    ctaHref: '/pricing/basic',
    highlight: false,
    icon: BriefcaseBusiness,
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-500',
    borderColor: 'border-gray-200 dark:border-gray-800',
    features: [
      { text: 'Up to 5 job postings/month', included: true },
      { text: 'Basic workforce matching', included: true },
      { text: 'Email support', included: true },
      { text: 'Candidate dashboard', included: true },
      { text: 'Analytics & reporting', included: false },
      { text: 'Priority placement', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'Custom integrations', included: false },
    ],
  },
  {
    name: 'Pro',
    tagline: 'For growing businesses',
    price: { monthly: 14999, annual: 9999 },
    currency: '₹',
    period: '/mo',
    cta: 'Start Free Trial',
    ctaHref: '/pricing/pro',
    highlight: true,
    badge: 'Most Popular',
    icon: Rocket,
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    iconColor: 'text-violet-500',
    borderColor: 'border-violet-500 dark:border-violet-600',
    features: [
      { text: 'Unlimited job postings', included: true },
      { text: 'Advanced AI job matching', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Full candidate dashboard', included: true },
      { text: 'Analytics & reporting', included: true },
      { text: 'Priority placement', included: true },
      { text: 'Dedicated account manager', included: false },
      { text: 'Custom integrations', included: false },
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For large-scale operations',
    price: { monthly: 49999, annual: 39999 },
    currency: '₹',
    period: '/mo',
    cta: 'Get Started',
    ctaHref: '/pricing/enterprise',
    highlight: false,
    icon: Shield,
    gradient: 'from-gray-700 to-gray-900',
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-700 dark:text-gray-300',
    borderColor: 'border-gray-200 dark:border-gray-800',
    features: [
      { text: 'Unlimited job postings', included: true },
      { text: 'Full 3-panel admin ecosystem', included: true },
      { text: '24/7 priority support + SLA', included: true },
      { text: 'Custom candidate pipelines', included: true },
      { text: 'Advanced analytics & BI tools', included: true },
      { text: 'Global PIN code coverage', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom integrations & API', included: true },
    ],
  },
];

const faqs = [
  { q: 'Can I switch plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of the next billing cycle.' },
  { q: 'Is there a free trial?', a: 'The Pro plan comes with a 14-day free trial — no credit card required. Basic plan has no trial but is affordable to try.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and NEFT/RTGS for enterprise payments via Cashfree.' },
  { q: 'What happens after I cancel?', a: 'You retain access until the end of your billing period. Your data is preserved for 90 days after cancellation.' },
];

const logos = ['Zomato', 'Swiggy', 'Dunzo', 'Delhivery', 'Porter', 'BigBasket'];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(100,50,255,0.12),transparent_60%)] bg-gray-50 dark:bg-[#020817]">
      {/* Hero */}
      <div className="pt-20 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-full text-sm font-bold text-violet-600 dark:text-violet-400 mb-6">
          <Zap size={14} /> Simple, Transparent Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
          Scale your workforce<br />
          <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">without limits</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-base sm:text-lg leading-relaxed mb-8">
          From solo recruiters to enterprise teams — choose the plan that grows with you.
          Cancel anytime, no hidden fees.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-xl p-1.5 shadow-sm">
          <button onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${!annual ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            Monthly
          </button>
          <button onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${annual ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            Annual
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${annual ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}>–33%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = annual ? plan.price.annual : plan.price.monthly;

            return (
              <div key={plan.name}
                className={`relative bg-white dark:bg-[#111827] rounded-2xl border-2 ${plan.borderColor} shadow-sm transition-all hover:shadow-lg ${plan.highlight ? 'md:-mt-4 md:scale-[1.02]' : ''}`}>

                {/* Recommended Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-black rounded-full shadow-lg shadow-violet-500/30">
                      <Star size={11} fill="white" /> {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-7">
                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 rounded-xl ${plan.iconBg} ${plan.iconColor} flex items-center justify-center`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white text-lg">{plan.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">{plan.currency}</span>
                      <span className="text-5xl font-black text-gray-900 dark:text-white leading-none">
                        {price.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-sm mb-1.5">{plan.period}</span>
                    </div>
                    {annual && (
                      <p className="text-xs text-gray-400 mt-1 line-through">₹{plan.price.monthly.toLocaleString()}/mo</p>
                    )}
                    {annual && (
                      <p className="text-xs text-green-500 font-bold mt-0.5">
                        Save ₹{((plan.price.monthly - plan.price.annual) * 12).toLocaleString()}/yr
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href={plan.ctaHref}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm mb-6 transition-all ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30'
                        : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                    }`}>
                    {plan.cta} <ArrowRight size={16} />
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-gray-100 dark:border-gray-800 mb-5" />

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-3 text-sm ${!f.included ? 'opacity-40' : ''}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          f.included ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                        }`}>
                          {f.included ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                        </div>
                        <span className={`leading-relaxed ${f.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-[#111827] dark:to-[#0d1f35] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Need something custom?</p>
            <h3 className="text-xl font-black text-white">Let&apos;s build a plan for your scale</h3>
            <p className="text-gray-400 text-sm mt-1">Dedicated infra, SLA guarantees, API access, and white-labeling available.</p>
          </div>
          <Link href="/contact"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap shadow-sm">
            Talk to Sales <ArrowRight size={15} />
          </Link>
        </div>

        {/* Trusted By */}
        <div className="mt-14 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by leading companies</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {logos.map(logo => (
              <span key={logo} className="text-lg font-black text-gray-300 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-500 transition-colors">
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* Feature Comparison (condensed) */}
        <div className="mt-16 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Complete Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs font-bold text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/30">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  {plans.map(p => (
                    <th key={p.name} className={`px-6 py-4 text-center ${p.highlight ? 'text-violet-600 dark:text-violet-400' : ''}`}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {[
                  ['Job Postings', '5/month', 'Unlimited', 'Unlimited'],
                  ['Candidate Profiles', '100', 'Unlimited', 'Unlimited'],
                  ['Analytics', '—', 'Basic', 'Advanced + BI'],
                  ['Support', 'Email', 'Chat + Email', '24/7 + SLA'],
                  ['API Access', '—', 'Limited', 'Full Access'],
                  ['Custom Branding', '—', '—', '✓'],
                  ['Account Manager', '—', '—', 'Dedicated'],
                ].map(([feature, ...values]) => (
                  <tr key={feature} className="hover:bg-gray-50 dark:hover:bg-gray-800/20">
                    <td className="px-6 py-3.5 font-medium text-gray-700 dark:text-gray-300">{feature}</td>
                    {values.map((v, i) => (
                      <td key={i} className="px-6 py-3.5 text-center text-gray-500 dark:text-gray-400">
                        {v === '✓' ? <Check size={16} className="text-green-500 mx-auto" /> : v === '—' ? <span className="text-gray-300">—</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={22} className="text-primary" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">{faq.q}</span>
                  <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Users size={14} /> Join 10,000+ workers and businesses on the platform
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-500 max-w-sm mx-auto text-sm mb-6">Create your free account. No credit card required for Basic plan.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register"
              className="flex items-center gap-2 justify-center px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:brightness-110 text-white font-bold rounded-xl shadow-md shadow-violet-500/20 transition-all">
              <Zap size={16} /> Start for Free
            </Link>
            <Link href="/jobs"
              className="flex items-center gap-2 justify-center px-8 py-3.5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
