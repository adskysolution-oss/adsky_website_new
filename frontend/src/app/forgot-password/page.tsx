'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AuthField } from '@/components/auth/AuthField';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { authService } from '@/services/auth.service';
import { extractErrorMessage } from '@/lib/api';
import { isValidEmail } from '@/lib/validation';


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<{ email?: string; general?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setFormError({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setFormError({});

    try {
      await authService.forgotPassword(email.trim());
      setIsSubmitted(true);
    } catch (error) {
      setFormError({ 
        email: extractErrorMessage(error, 'Unable to process your request. Please try again later.') 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageShell
      panelPosition="left"
      sideEyebrow="Recover access"
      sideTitle="Reset your password without losing momentum."
      sideDescription="We’ll send a secure reset link to your registered email so you can safely create a new password and get back into your account."
      sideHighlights={[
        'Time-limited reset links for safer account recovery.',
        'Clear success and error states throughout the request flow.',
        'Responsive recovery screen that works cleanly across devices.',
      ]}
      sideImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1400"
    >
      <div className="mb-8">
        <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#2b64f0]">
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
        <div className="mb-3 inline-flex rounded-full border border-[#d9e6fb] bg-[#f4f8ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#355799]">
          Password recovery
        </div>
        <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[2.35rem]">
          Forgot your password?
        </h1>
        <p className="mt-3 max-w-[440px] text-sm leading-7 text-slate-500 sm:text-[0.98rem]">
          Enter your registered email address and we&apos;ll send a secure password reset link.
        </p>
      </div>

      {formError.general ? (
  <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" aria-live="polite">
    {formError.general}
  </div>
) : null}

      {isSubmitted ? (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-5 py-5 text-sm text-emerald-700" aria-live="polite">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Check your inbox</p>
              <p className="mt-1 leading-6">We have sent reset link to{email}</p>
              <p className="mt-3 text-xs leading-5 text-emerald-700/80">
                If you don&apos;t see it, check your spam folder and confirm you entered the correct email.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form noValidate className="space-y-5" onSubmit={handleSubmit}>
          <AuthField
            id="forgot-password-email"
            type="email"
            label="Email address"
            autoComplete="email"
            placeholder="name@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={formError.email}
            requiredMark
          />

          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#16233f] px-6 text-base font-semibold text-white transition-all hover:bg-[#1b2c4d] focus:outline-none focus:ring-4 focus:ring-[#dbe8ff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
          </button>
        </form>
      )}
    </AuthPageShell>
  );
}
