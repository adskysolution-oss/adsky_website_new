'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Briefcase, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AuthField } from '@/components/auth/AuthField';
import { AuthPageShell } from '@/components/auth/AuthPageShell';
import { useAuth } from '@/context/AuthContext';
import {
  authApi,
  extractAuthErrorMessage,
  isValidEmail,
  isValidPhone,
  PASSWORD_REGEX,
  PASSWORD_REQUIREMENTS_TEXT,
} from '@/lib/auth';

type Role = 'Worker' | 'Client';

type RegisterErrors = {
  name?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

const roleOptions: Array<{ value: Role; label: string; icon: typeof UserRound; description: string }> = [
  {
    value: 'Worker',
    label: "I'm a Worker",
    icon: UserRound,
    description: 'Create a worker account to discover gigs and complete onboarding.',
  },
  {
    value: 'Client',
    label: "I'm a Business",
    icon: Briefcase,
    description: 'Create a client account to manage operations and request workforce support.',
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<Role>('Worker');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roleDescription = useMemo(
    () => roleOptions.find((option) => option.value === role)?.description ?? '',
    [role],
  );

  const validate = () => {
    const nextErrors: RegisterErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }

    if (role === 'Client' && companyName.trim().length < 2) {
      nextErrors.companyName = 'Company name is required for business accounts.';
    }

    if (!isValidEmail(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!isValidPhone(phone)) {
      nextErrors.phone = 'Enter a valid phone number.';
    }

    if (!PASSWORD_REGEX.test(password)) {
      nextErrors.password = PASSWORD_REQUIREMENTS_TEXT;
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const payload: Record<string, string> = {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        phone: phone.trim(),
      };

      if (role === 'Client') {
        payload.companyName = companyName.trim();
      }

      const response = await authApi.post('/register', payload);
      await login(response.data.token, response.data.role);
      router.push('/onboarding');
    } catch (error) {
      setFormError(
        extractAuthErrorMessage(error, 'Unable to create your account right now. Please try again.'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageShell
      panelPosition="right"
      sideEyebrow="Create account"
      sideTitle="Set up a secure account that’s ready for real-world execution."
      sideDescription="Whether you are joining as a worker or a business, the registration flow is designed to be reliable, responsive, and easy to complete."
      sideHighlights={[
        'Worker and business sign-up paths with clear role selection.',
        'Strong password validation before data reaches the server.',
        'Smooth onboarding handoff after successful registration.',
      ]}
      sideImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1400"
    >
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full border border-[#d9e6fb] bg-[#f4f8ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#355799]">
          Create your account
        </div>
        <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[2.35rem]">
          Join the platform
        </h1>
        <p className="mt-3 max-w-[470px] text-sm leading-7 text-slate-500 sm:text-[0.98rem]">
          Choose the right account type, complete the required details, and we&apos;ll take you straight into onboarding.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roleOptions.map((option) => {
          const Icon = option.icon;
          const isActive = option.value === role;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setRole(option.value)}
              className={`rounded-[24px] border px-4 py-4 text-left transition-all ${
                isActive
                  ? 'border-[#2b64f0] bg-[#eef4ff] shadow-[0_10px_30px_rgba(43,100,240,0.12)]'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#16233f] text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-slate-900">{option.label}</div>
              <div className="mt-1 text-xs leading-5 text-slate-500">{option.description}</div>
            </button>
          );
        })}
      </div>

      <p className="mb-6 text-sm leading-6 text-slate-500">{roleDescription}</p>

      {formError ? (
        <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" aria-live="polite">
          {formError}
        </div>
      ) : null}

      <form noValidate className="space-y-4" onSubmit={handleRegister}>
        <AuthField
          id="register-name"
          type="text"
          label="Full name"
          placeholder={role === 'Client' ? 'Contact person name' : 'John Doe'}
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
          requiredMark
        />

        {role === 'Client' ? (
          <AuthField
            id="register-company"
            type="text"
            label="Company name"
            placeholder="Acme Corp Ltd."
            autoComplete="organization"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            error={errors.companyName}
            requiredMark
          />
        ) : null}

        <AuthField
          id="register-email"
          type="email"
          label="Email address"
          placeholder="name@company.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          requiredMark
        />

        <AuthField
          id="register-phone"
          type="tel"
          label="Phone number"
          placeholder="+91 98765 43210"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          error={errors.phone}
          requiredMark
        />

        <AuthField
          id="register-password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
          hint={PASSWORD_REQUIREMENTS_TEXT}
          requiredMark
        />

        <AuthField
          id="register-confirm-password"
          type="password"
          label="Confirm password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
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
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#2b64f0] hover:text-[#1f4fd0]">
          Sign in
        </Link>
      </p>
    </AuthPageShell>
  );
}
