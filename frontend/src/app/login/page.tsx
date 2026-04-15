'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AuthField } from '@/components/auth/AuthField';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { useAuth } from '@/context/AuthContext';
import { authApi, extractAuthErrorMessage, isValidEmail } from '@/lib/auth';

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const nextErrors: LoginErrors = {};

    if (!isValidEmail(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.post('/login', {
        email: email.trim(),
        password,
      });

      await login(response.data.token, response.data.role);

      if (!response.data.onboardingCompleted) {
        router.push('/onboarding');
      } else {
        router.push('/office');
      }
    } catch (error) {
      setFormError(
        extractAuthErrorMessage(error, 'Unable to sign in right now. Please try again.'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageShell
      panelPosition="left"
      sideEyebrow="Secure sign in"
      sideTitle="Access your workforce dashboard without the friction."
      sideDescription="Manage operations, monitor performance, and keep your execution workflow moving from one secure workspace."
      sideHighlights={[
        'JWT-backed sessions with protected profile loading.',
        'Clear validation and accurate API error feedback.',
        'Built for keyboard-friendly, production-ready access.',
      ]}
      sideImage="https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=1400"
    >
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full border border-[#d9e6fb] bg-[#f4f8ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#355799]">
          Welcome back
        </div>
        <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[2.35rem]">
          Sign in to your account
        </h1>
        <p className="mt-3 max-w-[420px] text-sm leading-7 text-slate-500 sm:text-[0.98rem]">
          Enter your credentials to access your dashboard, continue onboarding, or resume work where you left off.
        </p>
      </div>

      {formError ? (
        <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" aria-live="polite">
          {formError}
        </div>
      ) : null}

      <form noValidate className="!space-y-5 mt-[10px] " onSubmit={handleLogin}>
        <AuthField
          id="login-email"
          type="email"
          label="Email address"
          autoComplete="email"
          placeholder="name@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          requiredMark
          className="!p-[10px]"
        />

        <AuthField
          id="login-password"
          type="password"
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
          className="!p-[10px]"
          requiredMark
        />

        <div className="flex items-center justify-between  gap-4 text-sm">
          <span className="text-slate-500">Need help accessing your account?</span>
          <Link href="/forgot-password" className="font-semibold !text-[#1f4fd0] transition-colors hover:text-[#1f4fd0]">
            Forgot password
          </Link>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#16233f] px-6 text-base font-semibold text-white transition-all hover:bg-[#1b2c4d] focus:outline-none focus:ring-4 focus:ring-[#dbe8ff] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
          {!isLoading ? <ArrowRight className="h-4 w-4" /> : null}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-[#2b64f0] hover:text-[#1f4fd0]">
          Create one
        </Link>
      </p>
    </AuthPageShell>
  );
}
