'use client';
import { useState } from 'react';
import { Award, CheckCircle, Loader2 } from 'lucide-react';

type CampusFormKey = 'name' | 'college' | 'city' | 'year' | 'phone' | 'email' | 'motivation';

interface CampusField {
  label: string;
  key: CampusFormKey;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  required: boolean;
}

export default function CampusPage() {
  const [form, setForm] = useState<Record<CampusFormKey, string>>({
    name: '', college: '', city: '', year: '', phone: '', email: '', motivation: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
  };

  const perks = [
    { emoji: '💰', title: 'Earn ₹5,000–₹20,000/month', desc: 'Monthly stipend + performance bonuses' },
    { emoji: '🏅', title: 'Certificate of Excellence', desc: 'Recognized by industry leaders' },
    { emoji: '📈', title: 'Career Growth', desc: 'Priority placement in full-time roles' },
    { emoji: '🤝', title: 'Exclusive Network', desc: 'Connect with 500+ campus ambassadors' },
  ];

  const fields: CampusField[] = [
    { label: 'Full Name', key: 'name', placeholder: 'John Doe', type: 'text', required: true },
    { label: 'College / University', key: 'college', placeholder: 'IIT Bombay', type: 'text', required: true },
    { label: 'City', key: 'city', placeholder: 'Mumbai', type: 'text', required: true },
    { label: 'Year of Study', key: 'year', placeholder: '3rd Year', type: 'text', required: true },
    { label: 'Phone', key: 'phone', placeholder: '+91 9876543210', type: 'tel', required: true },
    { label: 'Email', key: 'email', placeholder: 'john@college.edu', type: 'email', required: true },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Award size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Ambassador Program</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Represent AdSky at your college and earn rewards</p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-600 to-primary rounded-2xl p-7 text-white mb-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">Now Open for Applications</span>
          <h2 className="text-2xl font-bold mt-3 mb-2">Be the Face of AdSky at Your Campus</h2>
          <p className="text-blue-100 text-sm">Represent India&apos;s fastest growing gig platform, earn while you study, and build real leadership experience.</p>
        </div>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {perks.map(p => (
          <div key={p.title} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
            <span className="text-2xl mb-2 block">{p.emoji}</span>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{p.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Application Form */}
      {submitted ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-3" size={40} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">We&apos;ll review your application and reach out within 3–5 days.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 dark:text-white mb-5">Apply Now</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={form[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Why do you want to be a Campus Ambassador?</label>
              <textarea
                required
                value={form.motivation}
                onChange={e => setForm(prev => ({ ...prev, motivation: e.target.value }))}
                placeholder="Tell us why you'd be a great fit..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all resize-none"
              />
            </div>
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all">
              {isLoading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Award size={16} /> Submit Application</>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
