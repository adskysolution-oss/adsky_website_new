'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { AUTH_API_URL, PASSWORD_REGEX, PASSWORD_REQUIREMENTS_TEXT } from '@/lib/auth';

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = useMemo(() => String(params?.token || ''), [params]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timeout = window.setTimeout(() => router.push('/login'), 1800);
      return () => window.clearTimeout(timeout);
    }
  }, [router, success]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('This password reset link is invalid.');
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setError(PASSWORD_REQUIREMENTS_TEXT);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${AUTH_API_URL}/reset-password/${token}`, {
        newPassword,
      });
      setSuccess(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to reset password right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Lock size={22} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Set a new password</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-6">
              Create a strong password to finish securing your account.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-5 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-semibold">Password updated</p>
                  <p className="mt-1 leading-6">{success}</p>
                  <p className="mt-2 text-xs opacity-80">Redirecting you to login...</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{PASSWORD_REQUIREMENTS_TEXT}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <button disabled={isLoading} type="submit" className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all">
                {isLoading ? 'Updating password...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
