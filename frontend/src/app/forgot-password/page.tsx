'use client';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { AUTH_API_URL } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${AUTH_API_URL}/forgot-password`, { email });
      setSuccess(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to send reset instructions right now.');
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
              <Mail size={22} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot your password?</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-6">
              Enter your registered email address and we&apos;ll send you a secure reset link.
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
                  <p className="font-semibold">Check your inbox</p>
                  <p className="mt-1 leading-6">{success}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <button disabled={isLoading} type="submit" className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all">
                {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
