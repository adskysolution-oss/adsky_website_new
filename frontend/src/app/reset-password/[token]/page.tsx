'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AuthField } from '@/components/auth/AuthField';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { authService } from '@/services/auth.service';
import { extractErrorMessage } from '@/lib/api';
import {
  PASSWORD_REGEX,
  PASSWORD_REQUIREMENTS_TEXT,
} from '@/lib/validation';

type ResetErrors = {
  password?: string;
  confirmPassword?: string;
};

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = useMemo(() => String(params?.token || ''), [params]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ResetErrors>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timeout = window.setTimeout(() => router.push('/login'), 2000);
    return () => window.clearTimeout(timeout);
  }, [router, success]);

  const validate = () => {
    const nextErrors: ResetErrors = {};

    if (!PASSWORD_REGEX.test(password)) {
      nextErrors.password = PASSWORD_REQUIREMENTS_TEXT;
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('This password reset link is invalid.');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(token , { newPassword: password });
      setSuccess('Your password has been successfully updated.');
    } catch (requestError) {
      setError(
        extractErrorMessage(
          requestError,
          'Unable to reset your password right now. Please try again.',
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageShell
      panelPosition="right"
      sideEyebrow="New password"
      sideTitle="Finish recovery with a fresh, secure password."
      sideDescription="Set a strong password that meets the platform security rules and you’ll be redirected back to sign in."
      sideHighlights={[
        'Strong password policy enforced before submission.',
        'Clear inline feedback for mismatched or weak passwords.',
        'Automatic redirect to login after a successful reset.',
      ]}
      sideImage="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1400"
    >
      <div className="mb-8">
        <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#2b64f0]">
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
        <div className="mb-3 inline-flex rounded-full border border-[#d9e6fb] bg-[#f4f8ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#355799]">
          Reset password
        </div>
        <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[2.35rem]">
          Set a new password
        </h1>
        <p className="mt-3 max-w-[440px] text-sm leading-7 text-slate-500 sm:text-[0.98rem]">
          Create a strong password to finish securing your account and return to the login flow.
        </p>
      </div>

      {error ? (
        <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" aria-live="polite">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-5 py-5 text-sm text-emerald-700" aria-live="polite">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Password updated</p>
              <p className="mt-1 leading-6">{success}</p>
              <p className="mt-3 text-xs leading-5 text-emerald-700/80">Redirecting you to login…</p>
            </div>
          </div>
        </div>
      ) : (
        <form noValidate className="space-y-5" onSubmit={handleSubmit}>
          <AuthField
            id="reset-password"
            type="password"
            label="New password"
            autoComplete="new-password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
            hint={PASSWORD_REQUIREMENTS_TEXT}
            requiredMark
          />

          <AuthField
            id="reset-confirm-password"
            type="password"
            label="Confirm password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={errors.confirmPassword}
            requiredMark
          />

          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#16233f] px-6 text-base font-semibold text-white transition-all hover:bg-[#1b2c4d] focus:outline-none focus:ring-4 focus:ring-[#dbe8ff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Updating password...' : 'Reset Password'}
          </button>
        </form>
      )}
    </AuthPageShell>
  );
}
