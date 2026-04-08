'use client';
import { useState } from 'react';
import { BookOpen, Search, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    category: '🚀 Getting Started',
    items: [
      { q: 'How do I create an account on AdSky?', a: 'Click "Create Account" on the homepage, choose your role (Worker or Business), fill in your details, and verify your email. The whole process takes less than 2 minutes!' },
      { q: 'What roles can I sign up as?', a: 'You can sign up as a Worker (gig worker looking for jobs), Client (business hiring workers), IT Vendor (providing IT services), or Gig Vendor (providing workforce at scale).' },
      { q: 'How do I complete my profile?', a: 'After registration, go through the onboarding process. Add your skills, availability, location, and bank details. A complete profile boosts your visibility by 3x.' },
    ]
  },
  {
    category: '💰 Payments',
    items: [
      { q: 'How and when do I get paid?', a: 'Payments are processed within 3–5 business days after task completion is verified. Funds are transferred directly to your registered bank account.' },
      { q: 'What payment methods are supported?', a: 'We support direct bank transfer (NEFT/IMPS), UPI, and in some regions, Paytm wallet.' },
      { q: 'Is there a minimum payout threshold?', a: 'Yes, the minimum payout amount is ₹100. Once your earnings cross this threshold, you can request a payout from your wallet.' },
    ]
  },
  {
    category: '🏢 Jobs & Tasks',
    items: [
      { q: 'How do I apply for a job?', a: 'Browse jobs in the Categories section or on the Office dashboard. Click on any job and hit "Apply Now". You may need to answer a few screening questions.' },
      { q: 'Can I apply to multiple jobs at once?', a: 'Yes! You can apply to as many jobs as you want. Track all your applications in the Application History section.' },
      { q: 'What happens after I apply?', a: 'The client will review your profile and application. If shortlisted, you\'ll receive a notification and further instructions.' },
    ]
  },
  {
    category: '🔒 Safety & Security',
    items: [
      { q: 'How does AdSky verify workers?', a: 'Workers go through a KYC process including identity verification with Aadhaar/PAN and bank account verification before receiving payments.' },
      { q: 'What should I do if I encounter fraud?', a: 'Report it immediately using the "Report Wrongdoings" feature in your profile menu. Our safety team responds within 24–48 hours.' },
      { q: 'Is my personal data safe?', a: 'Yes. We are GDPR-compliant and use industry-standard encryption. Your data is never sold to third parties.' },
    ]
  },
];

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const filtered = faqs.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen size={28} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Knowledge Base</h1>
        <p className="text-gray-500 dark:text-gray-400">Find answers to frequently asked questions</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for answers..."
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
        />
      </div>

      {/* FAQ Sections */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No results found for "{search}"</p>
          <p className="text-sm mt-1">Try different keywords or browse all categories below</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map(cat => (
            <div key={cat.category}>
              <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">{cat.category}</h2>
              <div className="space-y-2">
                {cat.items.map(item => (
                  <div key={item.q} className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpen(open === item.q ? null : item.q)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">{item.q}</span>
                      {open === item.q ? <ChevronUp size={18} className="text-primary flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
                    </button>
                    {open === item.q && (
                      <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-10 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-6 text-center">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Didn't find what you need?</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Our support team is available 9am–6pm, Mon–Sat</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="/help/chat" className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover transition-colors">Chat with Us</a>
          <a href="/help/request-call" className="px-5 py-2.5 bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-700 text-sm font-bold rounded-lg hover:border-primary transition-colors text-gray-700 dark:text-gray-300">Request a Call</a>
        </div>
      </div>
    </div>
  );
}
