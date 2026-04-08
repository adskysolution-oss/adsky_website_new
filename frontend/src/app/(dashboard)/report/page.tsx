'use client';
import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const categories = [
  'Payment Issue', 'Fraud / Scam', 'Workplace Harassment', 
  'Fake Job Posting', 'Identity Misuse', 'Other'
];

export default function ReportPage() {
  const [form, setForm] = useState({ category: '', description: '', contact: '', anonymous: false });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
          <AlertCircle size={20} className="text-red-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Report Wrongdoings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Help us keep the community safe and fair</p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
        <div className="flex gap-2">
          <AlertCircle size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 dark:text-amber-300">All reports are taken seriously and reviewed within 24–48 hours. You can submit anonymously.</p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-3" size={40} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Report Submitted</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Thank you for helping us maintain a fair and safe platform. Our team will review your report within 24–48 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Category <span className="text-red-500">*</span></label>
            <select required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
            >
              <option value="">Select a category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description <span className="text-red-500">*</span></label>
            <textarea required value={form.description} rows={5}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Please describe in detail what happened. Include names, dates, and any evidence if available."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Contact (optional)</label>
            <input type="text" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
              placeholder="Your phone or email (only if you want us to follow up)"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="anon" checked={form.anonymous} onChange={e => setForm(f => ({ ...f, anonymous: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            />
            <label htmlFor="anon" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Submit this report anonymously</label>
          </div>

          <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg disabled:opacity-50 transition-all">
            {isLoading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><AlertCircle size={16} /> Submit Report</>}
          </button>
        </form>
      )}
    </div>
  );
}
