'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, Clock3, Loader2, Mail, MapPin, Phone, User, X } from 'lucide-react';
import { APPLICATIONS_API_URL } from '@/lib/auth';
import { formatCompensation, getCompanyName } from '@/lib/jobs';
import type { Job } from '@/types/job';

interface Props {
  job: Job;
  onClose: () => void;
}

const LANGUAGES = ['English', 'Hindi', 'Marathi', 'Telugu', 'Tamil', 'Kannada', 'Bengali', 'Gujarati'];

const inputClass =
  'w-full rounded-[1.15rem] border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#7f95bf] focus:border-secondary/40';
const labelClass = 'mb-2 block text-xs font-black uppercase tracking-[0.16em] text-[#9fb2d7]';

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

  const updateForm = (key: keyof typeof form, value: string | string[]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleLanguage = (language: string) => {
    const current = form.applicantLanguages;
    updateForm(
      'applicantLanguages',
      current.includes(language) ? current.filter((item) => item !== language) : [...current, language],
    );
  };

  const validateStepOne =
    form.applicantName.trim().length >= 2 && /^\d{10,}$/.test(form.applicantPhone.replace(/\D/g, ''));
  const validateStepTwo = form.applicantLanguages.length > 0 && form.applicantLocation.trim().length > 1;

  const handleContinue = () => {
    if (step === 1 && !validateStepOne) {
      setError('Please enter your full name and a valid phone number.');
      return;
    }

    if (step === 2 && !validateStepTwo) {
      setError('Please select at least one language and tell us your location.');
      return;
    }

    setError('');
    setStep((current) => current + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      await axios.post(
        APPLICATIONS_API_URL,
        { ...form, jobId: job._id },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {},
      );

      setSubmitted(true);
    } catch (submitError: unknown) {
      const axiosError = submitError as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'We could not submit the application just now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const companyDisplay = getCompanyName(job);
  const compensation = formatCompensation(job);
  const steps = ['Profile', 'Preferences', 'Review'];

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-2 py-2 sm:items-center sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 48 }}
        className="brand-card-light w-full max-w-2xl overflow-hidden rounded-[1.9rem]"
      >
        <div className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-6 py-5 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">{companyDisplay}</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">Apply for {job.title}</h2>
              <p className="mt-2 text-sm text-[#b6c5e5]">
                {compensation} {' | '} {job.location || 'Remote / Flexible'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-[#dce7ff] transition hover:bg-white/12"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {!submitted ? (
            <div className="mt-5 flex items-center gap-3">
              {steps.map((label, index) => (
                <div key={label} className="flex flex-1 items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
                      index + 1 < step
                        ? 'bg-secondary text-[#05101f]'
                        : index + 1 === step
                          ? 'bg-white text-[#061020]'
                          : 'bg-white/8 text-[#9fb2d7]'
                    }`}
                  >
                    {index + 1 < step ? 'OK' : index + 1}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-[0.16em] ${index + 1 === step ? 'text-white' : 'text-[#7f95bf]'}`}>
                    {label}
                  </span>
                  {index < steps.length - 1 ? <div className="h-px flex-1 bg-white/10" /> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-6 sm:px-7">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/14 text-secondary">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-3xl font-black tracking-[-0.05em] text-white">Application submitted</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#b6c5e5] sm:text-base">
                  Your details have been shared for review. We kept the flow short so applicants can complete it quickly on mobile or desktop.
                </p>
                <div className="mt-6 rounded-[1.4rem] border border-white/8 bg-white/5 p-4 text-left">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Role Summary</p>
                  <p className="mt-2 text-lg font-bold text-white">{job.title}</p>
                  <p className="mt-1 text-sm text-[#b6c5e5]">{companyDisplay} {' | '} {compensation}</p>
                </div>
                <button onClick={onClose} className="btn-primary mt-7 px-7 py-3">
                  Close
                </button>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="step-1" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="space-y-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Step 1</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Personal details</h3>
                  <p className="mt-2 text-sm leading-7 text-[#9bb0d6]">We only ask for the essentials needed to move your application forward.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass}><User className="mr-2 inline h-3.5 w-3.5" />Full Name</label>
                    <input className={inputClass} value={form.applicantName} onChange={(event) => updateForm('applicantName', event.target.value)} placeholder="Aarav Sharma" />
                  </div>
                  <div>
                    <label className={labelClass}><Phone className="mr-2 inline h-3.5 w-3.5" />Phone</label>
                    <input className={inputClass} value={form.applicantPhone} onChange={(event) => updateForm('applicantPhone', event.target.value)} placeholder="9876543210" />
                  </div>
                  <div>
                    <label className={labelClass}><Mail className="mr-2 inline h-3.5 w-3.5" />Email</label>
                    <input className={inputClass} value={form.applicantEmail} onChange={(event) => updateForm('applicantEmail', event.target.value)} placeholder="name@example.com" />
                  </div>
                  <div>
                    <label className={labelClass}><Calendar className="mr-2 inline h-3.5 w-3.5" />Date of Birth</label>
                    <input type="date" className={inputClass} value={form.applicantDob} onChange={(event) => updateForm('applicantDob', event.target.value)} />
                  </div>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div key="step-2" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="space-y-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Step 2</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Work preferences</h3>
                  <p className="mt-2 text-sm leading-7 text-[#9bb0d6]">This helps recruiters identify fit faster when the same component is reused across roles.</p>
                </div>
                <div>
                  <label className={labelClass}>Languages</label>
                  <div className="flex flex-wrap gap-2.5">
                    {LANGUAGES.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => toggleLanguage(language)}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                          form.applicantLanguages.includes(language)
                            ? 'bg-secondary text-[#05101f]'
                            : 'border border-white/10 bg-white/5 text-[#dce7ff] hover:border-secondary/40'
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}><MapPin className="mr-2 inline h-3.5 w-3.5" />Location</label>
                    <input className={inputClass} value={form.applicantLocation} onChange={(event) => updateForm('applicantLocation', event.target.value)} placeholder="Pune, Maharashtra" />
                  </div>
                  <div>
                    <label className={labelClass}><Clock3 className="mr-2 inline h-3.5 w-3.5" />Availability</label>
                    <select className={inputClass} value={form.applicantAvailability} onChange={(event) => updateForm('applicantAvailability', event.target.value)}>
                      <option value="">Select availability</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Weekends only">Weekends only</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Additional Note</label>
                    <textarea
                      rows={4}
                      className={`${inputClass} resize-none`}
                      value={form.applicantNote}
                      onChange={(event) => updateForm('applicantNote', event.target.value)}
                      placeholder="Share relevant experience, preferred shift, or anything the recruiter should know."
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step-3" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="space-y-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Step 3</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Review submission</h3>
                  <p className="mt-2 text-sm leading-7 text-[#9bb0d6]">A compact review step keeps the modal reusable across different jobs and still trustworthy for applicants.</p>
                </div>

                <div className="rounded-[1.4rem] border border-white/8 bg-white/5 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Applying For</p>
                  <p className="mt-2 text-lg font-bold text-white">{job.title}</p>
                  <p className="mt-1 text-sm text-[#b6c5e5]">{companyDisplay} {' | '} {compensation}</p>
                </div>

                <div className="overflow-hidden rounded-[1.4rem] border border-white/8">
                  {[
                    ['Full Name', form.applicantName],
                    ['Phone', form.applicantPhone],
                    ['Email', form.applicantEmail || 'Not provided'],
                    ['Date of Birth', form.applicantDob || 'Not provided'],
                    ['Languages', form.applicantLanguages.join(', ') || 'Not selected'],
                    ['Location', form.applicantLocation || 'Not provided'],
                    ['Availability', form.applicantAvailability || 'Not provided'],
                    ['Note', form.applicantNote || 'No additional note'],
                  ].map(([label, value], index) => (
                    <div key={label} className={`grid gap-2 bg-white/3 px-4 py-3 sm:grid-cols-[150px_minmax(0,1fr)] ${index !== 0 ? 'border-t border-white/8' : ''}`}>
                      <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8ea4cf]">{label}</span>
                      <span className="text-sm text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error ? <div className="mt-5 rounded-[1.2rem] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}

          {!submitted ? (
            <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
              {step > 1 ? (
                <button onClick={() => { setError(''); setStep((current) => current - 1); }} className="btn-secondary px-5 py-3">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <button onClick={handleContinue} className="btn-primary px-6 py-3">
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={isSubmitting} className="btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-70">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
