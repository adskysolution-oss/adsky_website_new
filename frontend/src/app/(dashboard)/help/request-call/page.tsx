'use client';
import { useState } from 'react';
import { PhoneCall, CheckCircle, Loader2, Clock } from 'lucide-react';

const issueTypes = [
  'Payment Not Received', 'Account Verification', 'Job Application Issue',
  'Profile / KYC Problem', 'Technical Issue', 'Billing Query', 'Other'
];

const timeSlots = [
  '9:00 AM – 10:00 AM', '10:00 AM – 11:00 AM', '11:00 AM – 12:00 PM',
  '2:00 PM – 3:00 PM', '3:00 PM – 4:00 PM', '4:00 PM – 5:00 PM',
  '5:00 PM – 6:00 PM',
];

export default function RequestCallPage() {
  const [form, setForm] = useState({
    name: '', phone: '', issue: '', timeSlot: '', notes: ''
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
          <PhoneCall size={20} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Request a Callback</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">We'll call you at your preferred time</p>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        {[
          { icon: <Clock size={16} />, text: 'Mon–Sat, 9am–6pm' },
          { icon: <PhoneCall size={16} />, text: 'Calls in 30–60 mins' },
          { icon: <CheckCircle size={16} />, text: 'Free support' },
        ].map(item => (
          <div key={item.text} className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-2 rounded-full">
            {item.icon} {item.text}
          </div>
        ))}
      </div>

      {submitted ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-3" size={44} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Callback Scheduled! 📞</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Our support team will call <strong>{form.phone}</strong> during your chosen slot:
          </p>
          <p className="text-primary font-bold">{form.timeSlot}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">Please keep your phone handy and ensure you have a good signal.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-7 shadow-sm space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name <span className="text-red-500">*</span></label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input type="tel" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Issue Type <span className="text-red-500">*</span></label>
            <select required value={form.issue} onChange={e => setForm(f => ({ ...f, issue: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
            >
              <option value="">Select type of issue</option>
              {issueTypes.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Preferred Callback Time <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map(slot => (
                <button key={slot} type="button" onClick={() => setForm(f => ({ ...f, timeSlot: slot }))}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-left ${
                    form.timeSlot === slot
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Additional Notes (optional)</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={3} placeholder="Briefly describe your issue to help us prepare..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all resize-none"
            />
          </div>

          <button type="submit" disabled={isLoading || !form.timeSlot}
            className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg disabled:opacity-50 transition-all"
          >
            {isLoading ? <><Loader2 size={16} className="animate-spin" /> Scheduling...</> : <><PhoneCall size={16} /> Schedule Callback</>}
          </button>
          {!form.timeSlot && <p className="text-center text-xs text-gray-400">Please select a preferred callback time slot</p>}
        </form>
      )}
    </div>
  );
}
