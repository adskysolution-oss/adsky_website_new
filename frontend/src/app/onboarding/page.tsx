'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, CheckCircle2, ChevronLeft, ChevronRight, User } from 'lucide-react';
import axios from 'axios';

const onboardingSchema = z.object({
  personalDetails: z.object({
    name: z.string().min(2, "Name is required"),
    gender: z.enum(["Male", "Female", "Others"]),
    dob: z.string().min(1, "Date of birth is required"),
    languages: z.array(z.string()).min(1, "At least one language is required"),
    referralCode: z.string().optional(),
    whatsappUpdates: z.boolean(),
  }),
  preferences: z.object({
    locationType: z.enum(["Current", "Manual"]),
    locationArea: z.string().optional(),
    travelDistance: z.string().min(1, "Travel distance limit is required")
  }),
  availability: z.object({
    availabilityType: z.enum(["Full-time", "Part-time"]),
    shift: z.enum(["Day", "Night", "Flexible"]),
    workingDays: z.enum(["Weekdays", "Weekends", "All week"]),
    hoursPerDay: z.string().min(1, "Hours per day is required"),
    joiningTime: z.string().min(1, "Joining time is required")
  }),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept terms")
});

type OnboardingData = z.infer<typeof onboardingSchema>;

const STEPS = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'personal', title: 'Personal Details' },
  { id: 'preferences', title: 'Work Preferences' },
  { id: 'availability', title: 'Availability' },
  { id: 'confirmation', title: 'Confirmation' },
  { id: 'terms', title: 'Terms' }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      personalDetails: { name: '', gender: undefined, dob: '', languages: [], whatsappUpdates: true, referralCode: '' } as any,
      preferences: { locationType: "Current", travelDistance: '' } as any,
      availability: { hoursPerDay: "4" } as any
    }
  });

  const formData = watch();

  const handleNext = async () => {
    let stepValid = false;
    
    // Trigger validation for current step fields
    if (currentStep === 0) stepValid = true;
    else if (currentStep === 1) stepValid = await trigger('personalDetails');
    else if (currentStep === 2) stepValid = await trigger('preferences');
    else if (currentStep === 3) stepValid = await trigger('availability');
    else if (currentStep === 4) stepValid = true;
    
    if (stepValid && currentStep < STEPS.length - 1) {
      autoSave(formData);
      setCurrentStep(prev => prev + 1);
    }
  };

  const autoSave = async (data: Partial<OnboardingData>) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = {
          ...data.personalDetails,
          ...data.preferences,
          ...data.availability
        };
        await axios.put('http://localhost:5000/api/auth/profile/onboarding', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (e) {
      console.error("Auto-save failed", e);
    }
  };

  const onSubmit = async (data: OnboardingData) => {
    setIsSaving(true);
    try {
      // Final save and update onboardingCompleted flag
      const payload = {
        ...data.personalDetails,
        ...data.preferences,
        ...data.availability,
        onboardingCompleted: true
      };
      
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/profile/onboarding', payload, {
        headers: { Authorization: `Bearer ${token}` }
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
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-dark-bg overflow-y-auto">
      {/* Header / Progress */}
      <div className="sticky top-0 z-10 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
           <div className="text-xl font-bold tracking-tight">
             <span className="text-primary mr-1">Work</span>Hustle
           </div>
           
           <div className="w-1/2 hidden sm:block">
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-primary transition-all duration-500 ease-out"
                   style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                 />
              </div>
           </div>
           
           <div className="text-sm font-semibold text-gray-500">
             Step {currentStep + 1} of {STEPS.length}
           </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 min-h-[80vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-dark-surface rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-100 dark:border-gray-800"
          >
            {/* --- STEP 0: WELCOME --- */}
            {currentStep === 0 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Glad to have you with us!</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Let us know your preferences so we can match you with the perfect gig opportunities.</p>
                
                <button 
                  onClick={handleNext}
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-md transition-all text-lg"
                >
                  Fill my work preferences
                </button>
              </div>
            )}

            {/* --- STEP 1: PERSONAL --- */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
                <p className="text-sm text-gray-500 mb-6">Take a first step towards a brighter future!</p>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">What's your name?</label>
                  <input {...register("personalDetails.name")} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] focus:ring-2 focus:ring-primary outline-none" placeholder="Enter name matching PAN card" />
                  {errors.personalDetails?.name && <p className="text-red-500 text-xs mt-1">{errors.personalDetails.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">What is your gender?</label>
                  <div className="space-y-2">
                    {["Male", "Female", "Others"].map(opt => (
                      <label key={opt} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                        <input type="radio" value={opt} {...register("personalDetails.gender")} className="mr-3 w-4 h-4 text-primary" />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors.personalDetails?.gender && <p className="text-red-500 text-xs mt-1">{errors.personalDetails.gender.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Date of birth</label>
                  <input type="date" {...register("personalDetails.dob")} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] focus:ring-2 focus:ring-primary outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Languages you speak fluently</label>
                  {/* Simplistic mock of multi-select */}
                  <div className="flex flex-wrap gap-2">
                    {["English", "Hindi", "Marathi", "Telugu", "Tamil", "Kannada"].map(lang => {
                       const selected = formData.personalDetails?.languages?.includes(lang);
                       return (
                         <button 
                           key={lang}
                           onClick={(e) => {
                             e.preventDefault();
                             const curr = formData.personalDetails.languages || [];
                             setValue("personalDetails.languages", selected ? curr.filter(l => l !== lang) : [...curr, lang]);
                           }}
                           className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${selected ? 'border-primary bg-primary text-white' : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
                         >
                           {lang}
                         </button>
                       )
                    })}
                  </div>
                  {errors.personalDetails?.languages && <p className="text-red-500 text-xs mt-1">{errors.personalDetails.languages.message}</p>}
                </div>

                <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                  <input type="checkbox" {...register("personalDetails.whatsappUpdates")} id="wa" className="w-5 h-5 text-green-500 rounded border-gray-300 mr-3" />
                  <label htmlFor="wa" className="font-medium text-gray-700 dark:text-gray-300 select-none cursor-pointer flex items-center">
                    Receive updates on WhatsApp <span className="ml-1 text-green-500 font-bold">W</span>
                  </label>
                </div>
              </div>
            )}

            {/* --- STEP 2: PREFERENCES --- */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-2">Work Preferences</h2>
                <p className="text-sm text-gray-500 mb-6">Share your work preferences with us and we'll match you with the perfect gig!</p>

                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900">
                   <button 
                     onClick={() => setValue("preferences.locationType", "Current")}
                     className="w-full py-3 bg-white dark:bg-dark-surface text-primary border border-primary rounded-lg font-bold flex items-center justify-center shadow-sm"
                   >
                     📍 Use my current location
                   </button>
                   <div className="text-center text-xs text-gray-500 my-3 font-semibold uppercase">Or enter manually</div>
                   <input 
                     {...register("preferences.locationArea")} 
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151c2e] focus:ring-2 focus:ring-primary outline-none" 
                     placeholder="Search by area, street, locality" 
                   />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">How far can you travel from your current location in a day?</label>
                  <div className="space-y-3">
                    {[
                      "Can't travel, WFH only", 
                      "Can travel up to 5 kms", 
                      "Can travel 5-20 kms", 
                      "Can travel more than 20 kms", 
                      "Flexible with both"
                    ].map(opt => (
                      <label key={opt} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.preferences?.travelDistance === opt ? 'border-primary bg-blue-50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}>
                        <input type="radio" value={opt} {...register("preferences.travelDistance")} className="hidden" />
                        <span className="font-medium">{opt}</span>
                        {formData.preferences?.travelDistance === opt && <CheckCircle2 className="ml-auto text-primary w-5 h-5" />}
                      </label>
                    ))}
                  </div>
                  {errors.preferences?.travelDistance && <p className="text-red-500 text-xs mt-1">{errors.preferences.travelDistance.message}</p>}
                </div>
              </div>
            )}

            {/* --- STEP 3: AVAILABILITY --- */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-2">Availability</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <label className={`p-4 border rounded-xl text-center cursor-pointer transition-all ${formData.availability?.availabilityType === 'Full-time' ? 'border-primary bg-blue-50 dark:bg-blue-900/10 text-primary font-bold' : 'border-gray-200 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-dark-bg'}`}>
                    <input type="radio" value="Full-time" {...register("availability.availabilityType")} className="hidden" />
                    Full-time
                  </label>
                  <label className={`p-4 border rounded-xl text-center cursor-pointer transition-all ${formData.availability?.availabilityType === 'Part-time' ? 'border-primary bg-blue-50 dark:bg-blue-900/10 text-primary font-bold' : 'border-gray-200 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-dark-bg'}`}>
                    <input type="radio" value="Part-time" {...register("availability.availabilityType")} className="hidden" />
                    Part-time
                  </label>
                </div>

                <div>
                   <label className="block text-sm font-semibold mb-2">Preferred Shift</label>
                   <select {...register("availability.shift")} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] focus:ring-2 focus:ring-primary outline-none">
                      <option value="">Select Shift</option>
                      <option value="Day">Day Shift</option>
                      <option value="Night">Night Shift</option>
                      <option value="Flexible">Flexible</option>
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-semibold mb-2">Working Days</label>
                   <select {...register("availability.workingDays")} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] focus:ring-2 focus:ring-primary outline-none">
                      <option value="">Select Days</option>
                      <option value="Weekdays">Weekdays Only (Mon-Fri)</option>
                      <option value="Weekends">Weekends Only</option>
                      <option value="All week">All week</option>
                   </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">How many hours per day? ({formData.availability?.hoursPerDay || 4} hrs)</label>
                  <input type="range" min="1" max="12" step="1" {...register("availability.hoursPerDay")} className="w-full accent-primary" />
                </div>

                <div>
                   <label className="block text-sm font-semibold mb-2">Joining Time</label>
                   <select {...register("availability.joiningTime")} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] focus:ring-2 focus:ring-primary outline-none">
                      <option value="">Select Time</option>
                      <option value="Immediately">Immediately</option>
                      <option value="Within a week">Within a week</option>
                      <option value="1 month">1 month</option>
                   </select>
                </div>
              </div>
            )}

            {/* --- STEP 4: CONFIRMATION --- */}
            {currentStep === 4 && (
              <div className="text-center py-6">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={48} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-bold mb-4">You're almost there!</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your profile has been built up. We are ready to match you with top companies.</p>
                
                <div className="bg-gray-50 dark:bg-dark-bg p-6 rounded-xl border border-gray-100 dark:border-gray-800 text-left mb-6">
                  <div className="font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">Summary</div>
                  <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <div><span className="font-semibold text-gray-900 dark:text-gray-200">Name:</span> {formData.personalDetails?.name}</div>
                    <div><span className="font-semibold text-gray-900 dark:text-gray-200">Travel:</span> {formData.preferences?.travelDistance}</div>
                    <div><span className="font-semibold text-gray-900 dark:text-gray-200">Target Shift:</span> {formData.availability?.shift}</div>
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 5: TERMS --- */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
                <div className="h-48 overflow-y-auto bg-gray-50 dark:bg-dark-bg p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  By using WorkHustle, you agree to our Terms of Service. You agree that your profile details will be shared with prospective clients matching your geographical and functional criteria. We reserve the right to ban accounts involved in fraudulent executions.
                </div>

                <div className="flex items-start">
                  <input type="checkbox" {...register("termsAccepted")} id="terms" className="w-5 h-5 text-primary rounded border-gray-300 mt-1 mr-3" />
                  <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300 select-none cursor-pointer text-sm">
                    I have read and agree to all terms and conditions outlined above.
                  </label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted.message}</p>}
              </div>
            )}

            {/* FOOTER ACTIONS */}
            {currentStep > 0 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                <button 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-3 font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 inline mr-1" /> Back
                </button>
                
                {currentStep < STEPS.length - 1 ? (
                  <button 
                    onClick={handleNext}
                    className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all flex items-center"
                  >
                    Next <ChevronRight className="w-5 h-5 inline ml-1" />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSaving}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center"
                  >
                    {isSaving ? "Saving..." : "Go to Dashboard"} <Check className="w-5 h-5 inline ml-2" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
