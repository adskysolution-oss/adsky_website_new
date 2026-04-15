'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
} from 'lucide-react';
import axios from 'axios';

const onboardingSchema = z.object({
  personalDetails: z.object({
    name: z.string().min(2, 'Name is required'),
    gender: z.enum(['Male', 'Female', 'Others']),
    dob: z.string().min(1, 'Date of birth is required'),
    languages: z.array(z.string()).min(1, 'At least one language is required'),
    referralCode: z.string().optional(),
    whatsappUpdates: z.boolean(),
  }),
  preferences: z.object({
    locationType: z.enum(['Current', 'Manual']),
    locationArea: z.string().optional(),
    travelDistance: z.string().min(1, 'Travel distance limit is required'),
  }),
  availability: z.object({
    availabilityType: z.enum(['Full-time', 'Part-time']),
    shift: z.enum(['Day', 'Night', 'Flexible']),
    workingDays: z.enum(['Weekdays', 'Weekends', 'All week']),
    hoursPerDay: z.string().min(1, 'Hours per day is required'),
    joiningTime: z.string().min(1, 'Joining time is required'),
  }),
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept terms'),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

const STEPS = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'personal', title: 'Personal Details' },
  { id: 'preferences', title: 'Work Preferences' },
  { id: 'availability', title: 'Availability' },
  { id: 'confirmation', title: 'Confirmation' },
  { id: 'terms', title: 'Terms' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      personalDetails: {
        name: '',
        gender: undefined,
        dob: '',
        languages: [],
        whatsappUpdates: true,
        referralCode: '',
      } as any,
      preferences: { locationType: 'Current', travelDistance: '' } as any,
      availability: { hoursPerDay: '4' } as any,
    },
  });

  const formData = watch();
  const totalVisibleSteps = STEPS.length - 1;
  const progressWidth = currentStep > 0 ? (currentStep / totalVisibleSteps) * 100 : 0;

  const handleNext = async () => {
    let stepValid = false;

    if (currentStep === 0) stepValid = true;
    else if (currentStep === 1) stepValid = await trigger('personalDetails');
    else if (currentStep === 2) stepValid = await trigger('preferences');
    else if (currentStep === 3) stepValid = await trigger('availability');
    else if (currentStep === 4) stepValid = true;

    if (stepValid && currentStep < STEPS.length - 1) {
      if (currentStep !== 0 && currentStep !== 4){
      await autoSave(formData);
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const autoSave = async (data: Partial<OnboardingData>) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = {
          ...data.personalDetails,
          ...data.preferences,
          ...data.availability,
        };
        await axios.put('http://localhost:5000/api/auth/profile/onboarding', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      console.error('Auto-save failed', e);
    }
  };

  const onSubmit = async (data: OnboardingData) => {
    setIsSaving(true);
    try {
      const payload = {
        ...data.personalDetails,
        ...data.preferences,
        ...data.availability,
        onboardingCompleted: true,
      };

      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/profile/onboarding', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('onboardingCompleted', 'true');
      router.push('/office');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[960px] items-center justify-center">
        <div className="w-full !ml-[500px] overflow-hidden rounded-[28px] border border-gray-200 bg-white text-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-gray-800 dark:bg-dark-surface dark:text-white">
          {currentStep > 0 && (
            <div className="border-b border-gray-200 !h-[50px] px-6 py-4 sm:px-8 dark:border-gray-800">
              <div className="flex items-center !pt-[10px] !pl-[2px] !pr-[2px] gap-4">
                <div className="shrink-0 text-xl font-bold tracking-tight">
                  <span className="mr-1 text-primary">Work</span>Hustle
                </div>

                <div className="hidden flex-1 sm:block">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>

                <div className="shrink-0 text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Step {currentStep} of {totalVisibleSteps}
                </div>
              </div>
            </div>
          )}

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex min-h-[560px] w-full max-w-2xl flex-col"
              >
                {currentStep === 0 && (
                  <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                      <User size={40} />
                    </div>

                    <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                      Glad to have you with us!
                    </h2>

                    <p className="mx-auto mb-8 max-w-md text-lg leading-8 text-gray-500 dark:text-gray-400">
                      Let us know your preferences so we can match you with the perfect gig
                      opportunities.
                    </p>

                    <button
                      onClick={handleNext}
                      className="w-full !mt-[50px] max-w-[320px] rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-primary-hover"
                    >
                      Fill my work preferences
                    </button>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="flex-1 !pt-[10px] !pl-[10px] !pr-[10px] !mt-[10px] !ml-[10px] !mr-[10px] space-y-16">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                        Personal Details
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Take a first step towards a brighter future!
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        What's your name?
                      </label>
                      <input
                        {...register('personalDetails.name')}
                        className="w-full !h-[40px] rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#151c2e] dark:text-white"
                        placeholder="Enter name matching PAN card"
                      />
                      {errors.personalDetails?.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.personalDetails.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        What is your gender?
                      </label>
                      <div className="space-y-2">
                        {['Male', 'Female', 'Others'].map((opt) => (
                          <label
                            key={opt}
                            className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-dark-bg"
                          >
                            <input
                              type="radio"
                              value={opt}
                              {...register('personalDetails.gender')}
                              className="mr-3 h-4 w-4 text-primary"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                      {errors.personalDetails?.gender && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.personalDetails.gender.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        Date of birth
                      </label>
                      <input
                        type="date"
                        {...register('personalDetails.dob')}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#151c2e] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        Languages you speak fluently
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['English', 'Hindi', 'Marathi', 'Telugu', 'Tamil', 'Kannada'].map(
                          (lang) => {
                            const selected = formData.personalDetails?.languages?.includes(lang);
                            return (
                              <button
                                key={lang}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const curr = formData.personalDetails.languages || [];
                                  setValue(
                                    'personalDetails.languages',
                                    selected
                                      ? curr.filter((l) => l !== lang)
                                      : [...curr, lang],
                                  );
                                }}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                  selected
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {lang}
                              </button>
                            );
                          },
                        )}
                      </div>
                      {errors.personalDetails?.languages && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.personalDetails.languages.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center border-t border-gray-100 pt-4 dark:border-gray-800">
                      <input
                        type="checkbox"
                        {...register('personalDetails.whatsappUpdates')}
                        id="wa"
                        className="mr-3 h-5 w-5 rounded border-gray-300 text-green-500"
                      />
                      <label
                        htmlFor="wa"
                        className="flex cursor-pointer items-center font-medium text-gray-700 dark:text-gray-300"
                      >
                        Receive updates on WhatsApp{' '}
                        <span className="ml-1 font-bold text-green-500">W</span>
                      </label>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="flex-1 space-y-6 !pt-[10px] !pl-[10px] !pr-[10px] !mt-[10px] !ml-[10px] !mr-[10px]">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                        Work Preferences
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Share your work preferences with us and we'll match you with the
                        perfect gig!
                      </p>
                    </div>

                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/10">
                      <button
                        onClick={() => setValue('preferences.locationType', 'Current')}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-white py-3 font-bold text-primary shadow-sm dark:bg-dark-surface"
                      >
                        <MapPin className="h-4 w-4" />
                        Use my current location
                      </button>

                      <div className="my-3 text-center text-xs font-semibold uppercase text-gray-500">
                        Or enter manually
                      </div>

                      <input
                        {...register('preferences.locationArea')}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#151c2e] dark:text-white"
                        placeholder="Search by area, street, locality"
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        How far can you travel from your current location in a day?
                      </label>
                      <div className="space-y-3">
                        {[
                          "Can't travel, WFH only",
                          'Can travel up to 5 kms',
                          'Can travel 5-20 kms',
                          'Can travel more than 20 kms',
                          'Flexible with both',
                        ].map((opt) => (
                          <label
                            key={opt}
                            className={`flex cursor-pointer items-center rounded-xl border p-4 transition-all ${
                              formData.preferences?.travelDistance === opt
                                ? 'border-primary bg-blue-50 dark:bg-blue-900/10'
                                : 'border-gray-200 hover:border-blue-300 dark:border-gray-700'
                            }`}
                          >
                            <input
                              type="radio"
                              value={opt}
                              {...register('preferences.travelDistance')}
                              className="hidden"
                            />
                            <span className="font-medium">{opt}</span>
                            {formData.preferences?.travelDistance === opt && (
                              <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
                            )}
                          </label>
                        ))}
                      </div>
                      {errors.preferences?.travelDistance && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.preferences.travelDistance.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="flex-1 space-y-6 !pt-[10px] !pl-[10px] !pr-[10px] !mt-[10px] !ml-[10px] !mr-[10px]">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                        Availability
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                          formData.availability?.availabilityType === 'Full-time'
                            ? 'border-primary bg-blue-50 font-bold text-primary dark:bg-blue-900/10'
                            : 'border-gray-200 font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-dark-bg'
                        }`}
                      >
                        <input
                          type="radio"
                          value="Full-time"
                          {...register('availability.availabilityType')}
                          className="hidden"
                        />
                        Full-time
                      </label>

                      <label
                        className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                          formData.availability?.availabilityType === 'Part-time'
                            ? 'border-primary bg-blue-50 font-bold text-primary dark:bg-blue-900/10'
                            : 'border-gray-200 font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-dark-bg'
                        }`}
                      >
                        <input
                          type="radio"
                          value="Part-time"
                          {...register('availability.availabilityType')}
                          className="hidden"
                        />
                        Part-time
                      </label>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        Preferred Shift
                      </label>
                      <select
                        {...register('availability.shift')}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#151c2e] dark:text-white"
                      >
                        <option value="">Select Shift</option>
                        <option value="Day">Day Shift</option>
                        <option value="Night">Night Shift</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        Working Days
                      </label>
                      <select
                        {...register('availability.workingDays')}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#151c2e] dark:text-white"
                      >
                        <option value="">Select Days</option>
                        <option value="Weekdays">Weekdays Only (Mon-Fri)</option>
                        <option value="Weekends">Weekends Only</option>
                        <option value="All week">All week</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        How many hours per day? ({formData.availability?.hoursPerDay || 4} hrs)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="1"
                        {...register('availability.hoursPerDay')}
                        className="w-full accent-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-gray-200">
                        Joining Time
                      </label>
                      <select
                        {...register('availability.joiningTime')}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-[#151c2e] dark:text-white"
                      >
                        <option value="">Select Time</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within a week">Within a week</option>
                        <option value="1 month">1 month</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="flex flex-1 flex-col justify-center py-6 text-center !pt-[10px] !pl-[10px] !pr-[10px] !mt-[10px] !ml-[10px] !mr-[10px]">
                    <div className="mx-auto !ml-[150px] !mb-[20px] mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500">
                      <Check size={48} strokeWidth={3} />
                    </div>

                    <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                      You're almost there!
                    </h2>

                    <p className="mx-auto mb-8 max-w-sm text-gray-500 dark:text-gray-400">
                      Your profile has been built up. We are ready to match you with top
                      companies.
                    </p>

                    <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-6 text-left dark:border-gray-800 dark:bg-dark-bg">
                      <div className="mb-2 border-b border-gray-200 pb-2 font-bold dark:border-gray-700">
                        Summary
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-200">
                            Name:
                          </span>{' '}
                          {formData.personalDetails?.name}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-200">
                            Travel:
                          </span>{' '}
                          {formData.preferences?.travelDistance}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-gray-200">
                            Target Shift:
                          </span>{' '}
                          {formData.availability?.shift}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="flex-1 space-y-6 !pt-[10px] !pl-[10px] !pr-[10px] !mt-[10px] !ml-[10px] !mr-[10px]">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Terms & Conditions
                    </h2>

                    <div className="mb-6 h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-600 dark:border-gray-700 dark:bg-dark-bg dark:text-gray-400">
                      By using WorkHustle, you agree to our Terms of Service. You agree that
                      your profile details will be shared with prospective clients matching
                      your geographical and functional criteria. We reserve the right to ban
                      accounts involved in fraudulent executions.
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        {...register('termsAccepted')}
                        id="terms"
                        className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-primary"
                      />
                      <label
                        htmlFor="terms"
                        className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        I have read and agree to all terms and conditions outlined above.
                      </label>
                    </div>

                    {errors.termsAccepted && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.termsAccepted.message}
                      </p>
                    )}
                  </div>
                )}

                {currentStep > 0 && (
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-800">
                    <button
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-6 py-3 font-semibold text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      <ChevronLeft className="mr-1 inline h-5 w-5" />
                      Back
                    </button>

                    {currentStep < STEPS.length - 1 ? (
                      <button
                        onClick={handleNext}
                        className="flex items-center rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-primary-hover"
                      >
                        Next
                        <ChevronRight className="ml-1 inline h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSaving}
                        className="flex items-center rounded-xl bg-green-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-green-700 disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Go to Dashboard'}
                        <Check className="ml-2 inline h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
