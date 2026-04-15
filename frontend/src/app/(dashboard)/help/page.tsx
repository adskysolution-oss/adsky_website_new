'use client';
import Link from 'next/link';
import {
  MessageCircle, PhoneCall, BookOpen, HelpCircle, ChevronRight,
  Zap, Shield, Briefcase, CreditCard, User, AlertCircle,
  CheckCircle, Clock, Star
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: 'How do I apply for a job?',
    a: 'Go to the Jobs tab, browse available listings, and click "Apply Now" on any job card. Fill in your details and submit your application in under 2 minutes.',
  },
  {
    q: 'When will I get paid?',
    a: 'Payments are processed within 24–48 hours after task completion and verification. You can track your earnings in the app.',
  },
  {
    q: 'How can I improve my profile score?',
    a: 'Complete all sections in your profile – including phone, skills, availability, and a profile picture. A 100% profile gets 3× more job matches.',
  },
  {
    q: 'What if a client doesn\'t mark my task complete?',
    a: 'Tasks are auto-marked complete after 72 hours if no dispute is raised. You can also raise a ticket via the "Chat Support" option below.',
  },
  {
    q: 'Can I work multiple jobs at once?',
    a: 'Yes! You can apply to and take on multiple gigs simultaneously, as long as they don\'t conflict in schedule.',
  },
  {
    q: 'How do I change my preferred job category?',
    a: 'Go to your Profile → Availability section and update your skill tags. The job feed will refresh automatically.',
  },
];

const supportChannels = [
  {
    icon: <MessageCircle size={24} />,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    badge: 'Fastest',
    badgeColor: 'bg-green-100 text-green-700',
    href: '/office/help/chat',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    cta: 'Start Chat',
  },
  {
    icon: <PhoneCall size={24} />,
    title: 'Request a Call',
    description: 'Schedule a callback from our team',
    badge: '8am–8pm',
    badgeColor: 'bg-orange-100 text-orange-700',
    href: '/office/help/request-call',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    cta: 'Request Call',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Knowledge Base',
    description: 'Browse guides, tutorials & documentation',
    badge: '200+ Articles',
    badgeColor: 'bg-purple-100 text-purple-700',
    href: '/office/help/knowledge-base',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    cta: 'Browse Articles',
  },
];

const helpCategories = [
  { icon: <User size={18} />, label: 'Account & Profile', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: <Briefcase size={18} />, label: 'Jobs & Applications', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  { icon: <CreditCard size={18} />, label: 'Payments & Earnings', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: <Shield size={18} />, label: 'Safety & Trust', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { icon: <Zap size={18} />, label: 'Getting Started', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { icon: <AlertCircle size={18} />, label: 'Dispute & Reports', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="text-center">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={28} className="text-primary" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">How can we help?</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-md mx-auto">
          Search our knowledge base or reach out directly. We're here 7 days a week.
        </p>

        {/* Search */}
        <div className="mt-5 relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Support Channels */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {supportChannels.map((ch, i) => (
            <Link key={i} href={ch.href}
              className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${ch.bg} ${ch.color} flex items-center justify-center`}>
                  {ch.icon}
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ch.badgeColor}`}>{ch.badge}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{ch.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{ch.description}</p>
              <div className={`flex items-center gap-1 text-sm font-bold ${ch.color} group-hover:gap-2 transition-all`}>
                {ch.cta} <ChevronRight size={15} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Help Categories */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {helpCategories.map((cat, i) => (
            <button key={i}
              className="flex items-center gap-3 p-4 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-all text-left">
              <div className={`w-9 h-9 rounded-lg ${cat.bg} ${cat.color} flex items-center justify-center flex-shrink-0`}>
                {cat.icon}
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          {searchQuery && (
            <span className="text-xs text-gray-400">{filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
            <HelpCircle size={32} className="mx-auto mb-2 text-gray-300" />
            <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <div key={i}
                className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">{faq.q}</span>
                  <div className={`flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronRight size={18} className={`${openFaq === i ? 'rotate-90' : ''} text-gray-400`} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-green-800 dark:text-green-300 text-sm">All Systems Operational</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">Platform, payments, and job matching are running normally.</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-semibold">
          <Clock size={12} /> Updated just now
        </div>
      </div>

      {/* Feedback */}
      <div className="text-center py-2">
        <p className="text-sm text-gray-500">Was this page helpful?</p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Star size={14} className="text-yellow-400" /> Yes, helpful
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Not really
          </button>
        </div>
      </div>
    </div>
  );
}
