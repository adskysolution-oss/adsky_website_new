'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { X, ChevronRight, ChevronLeft, CheckCircle, Loader2, User, Phone, Mail, Calendar, MapPin, Clock } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  salaryAmount: number;
  salaryType: string;
  location?: string;
  category: string;
  companyName?: string;
  client?: { name: string; companyName?: string };
}

interface Props {
  job: Job;
  onClose: () => void;
}

const LANGUAGES = ['English', 'Hindi', 'Marathi', 'Telugu', 'Tamil', 'Kannada', 'Bengali', 'Gujarati'];

const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-sm transition-all';
const labelClass = 'block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5';

export default function ApplicationModal({ job, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    applicantName: '',
    applicantPhone: '',
    applicantEmail: '',
    applicantDob: '',
    applicantLanguages: [] as string[],
    applicantLocation: '',
    applicantAvailability: '',
    applicantNote: '',
  });

  const set = (key: keyof typeof form, value: string | string[]) =>
    setForm(f => ({ ...f, [key]: value }));

  const toggleLanguage = (lang: string) => {
    const curr = form.applicantLanguages;
    set('applicantLanguages', curr.includes(lang) ? curr.filter(l => l !== lang) : [...curr, lang]);
  };

  const validateStep1 = () => form.applicantName.trim().length >= 2 && form.applicantPhone.trim().length >= 10;
  const validateStep2 = () => form.applicantLanguages.length > 0 && form.applicantLocation.trim().length > 0;

  const handleNext = () => {
    if (step === 1 && !validateStep1()) {
      setError('Please enter your full name and a valid 10-digit phone number.');
      return;
    }
    if (step === 2 && !validateStep2()) {
      setError('Please select at least one language and enter your location.');
      return;
    }
    setError('');
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      await axios.post(
        'http://localhost:5000/api/applications',
        { ...form, jobId: job._id },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setSubmitted(true);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const companyDisplay = job.companyName || job.client?.companyName || job.client?.name || 'AdSky Partner';
  const salaryLabel = `₹${job.salaryAmount}/${job.salaryType === 'Gig' ? 'task' : job.salaryType === 'Hourly' ? 'hr' : job.salaryType === 'Monthly' ? 'mo' : 'fixed'}`;

  const STEPS = ['Personal Info', 'Work Preferences', 'Review & Submit'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-2 sm:px-4 modal-backdrop bg-black/50">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        className="bg-white dark:bg-dark-surface rounded-t-3xl sm:rounded-2xl w-full max-w-lg shadow-2xl max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-dark-surface rounded-t-3xl sm:rounded-t-2xl border-b border-gray-100 dark:border-gray-800 px-6 pt-5 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">{companyDisplay}</p>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mt-0.5 line-clamp-1">{job.title}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{salaryLabel} · {job.location || 'Remote'}</p>
            </div>
            <button onClick={onClose} className="ml-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X size={20} />
            </button>
          </div>

          {/* Step Indicator */}
          {!submitted && (
            <div className="flex items-center gap-2">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                    i + 1 < step ? 'bg-green-500 text-white' :
                    i + 1 === step ? 'bg-secondary text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${i + 1 === step ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{label}</span>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${i + 1 < step ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted! 🎉</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed max-w-xs mx-auto">
                  Thank you for applying! We will review your application and get back to you soon.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-left text-sm mb-6">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{job.title}</p>
                  <p className="text-gray-500">{companyDisplay} · {salaryLabel}</p>
                </div>
                <button onClick={onClose} className="w-full btn-primary py-3 rounded-xl font-bold">
                  Done
                </button>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Personal Information</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tell us a bit about yourself</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={labelClass}><User size={13} className="inline mr-1" />Full Name *</label>
                    <input type="text" value={form.applicantName} onChange={e => set('applicantName', e.target.value)}
                      placeholder="Enter your full name" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><Phone size={13} className="inline mr-1" />Phone Number *</label>
                    <input type="tel" value={form.applicantPhone} onChange={e => set('applicantPhone', e.target.value)}
                      placeholder="+91 98765 43210" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><Mail size={13} className="inline mr-1" />Email Address</label>
                    <input type="email" value={form.applicantEmail} onChange={e => set('applicantEmail', e.target.value)}
                      placeholder="name@email.com" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><Calendar size={13} className="inline mr-1" />Date of Birth</label>
                    <input type="date" value={form.applicantDob} onChange={e => set('applicantDob', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Work Preferences</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Help us match you better</p>
                </div>

                <div>
                  <label className={labelClass}>Languages you speak *</label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map(lang => (
                      <button key={lang} type="button" onClick={() => toggleLanguage(lang)}
                        className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                          form.applicantLanguages.includes(lang)
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary'
                        }`}>
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}><MapPin size={13} className="inline mr-1" />Your Location *</label>
                  <input type="text" value={form.applicantLocation} onChange={e => set('applicantLocation', e.target.value)}
                    placeholder="City, area (e.g. Pune, MH)" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}><Clock size={13} className="inline mr-1" />Availability</label>
                  <select value={form.applicantAvailability} onChange={e => set('applicantAvailability', e.target.value)} className={inputClass}>
                    <option value="">Select availability</option>
                    <option value="Full-time">Full-time (8 hrs/day)</option>
                    <option value="Part-time">Part-time (4 hrs/day)</option>
                    <option value="Weekends only">Weekends only</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Additional Note (optional)</label>
                  <textarea value={form.applicantNote} onChange={e => set('applicantNote', e.target.value)}
                    placeholder="Any relevant experience or message to the recruiter..." rows={3}
                    className={`${inputClass} resize-none`} />
                </div>
              </motion.div>
            ) : (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Review Your Application</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Please verify before submitting</p>
                </div>

                {/* Job summary */}
                <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Applying For</p>
                  <p className="font-bold text-gray-900 dark:text-white">{job.title}</p>
                  <p className="text-sm text-gray-500">{companyDisplay} · {salaryLabel}</p>
                </div>

                {/* Summary rows */}
                <div className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {[
                    { label: 'Name', value: form.applicantName },
                    { label: 'Phone', value: form.applicantPhone },
                    { label: 'Email', value: form.applicantEmail || '—' },
                    { label: 'Date of Birth', value: form.applicantDob || '—' },
                    { label: 'Languages', value: form.applicantLanguages.join(', ') || '—' },
                    { label: 'Location', value: form.applicantLocation || '—' },
                    { label: 'Availability', value: form.applicantAvailability || '—' },
                  ].map(row => (
                    <div key={row.label} className="flex items-center px-4 py-3">
                      <span className="text-xs font-semibold text-gray-500 w-28 flex-shrink-0">{row.label}</span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Footer Nav */}
          {!submitted && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              {step > 1 ? (
                <button onClick={() => { setStep(s => s - 1); setError(''); }}
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 font-semibold text-sm hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2">
                  <ChevronLeft size={16} /> Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <button onClick={handleNext}
                  className="btn-secondary px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5">
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={isSubmitting}
                  className="btn-secondary px-8 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 disabled:opacity-60">
                  {isSubmitting ? <><Loader2 size={15} className="animate-spin" /> Submitting...</> : <>Submit Application ✓</>}
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
