'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Mail, KeyRound, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

type Step = 'email' | 'otp' | 'password' | 'done';

const API = 'http://localhost:5000/api/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [devOTP, setDevOTP] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    try {
      const res = await axios.post(`${API}/forgot-password`, { email });
      if (res.data.devOTP) setDevOTP(res.data.devOTP);
      setStep('otp');
    } catch (err: any) {
      if (!err.response) {
        setError('Cannot reach server. Make sure the backend is running on port 5000.');
      } else {
        setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    try {
      const res = await axios.post(`${API}/verify-otp`, { email, otp });
      setResetToken(res.data.resetToken);
      setStep('password');
    } catch (err: any) {
      if (!err.response) {
        setError('Cannot reach server. Make sure the backend is running on port 5000.');
      } else {
        setError(err.response?.data?.message || 'OTP verification failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match'); return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters'); return;
    }
    setIsLoading(true); setError('');
    try {
      await axios.post(`${API}/reset-password`, { email, resetToken, newPassword });
      setStep('done');
    } catch (err: any) {
      if (!err.response) {
        setError('Cannot reach server. Make sure the backend is running on port 5000.');
      } else {
        setError(err.response?.data?.message || 'Password reset failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 'email', label: 'Email', icon: <Mail size={14} /> },
    { id: 'otp', label: 'OTP', icon: <KeyRound size={14} /> },
    { id: 'password', label: 'Reset', icon: <Lock size={14} /> },
  ];

  const stepIndex = { email: 0, otp: 1, password: 2, done: 3 };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
          
          {step !== 'done' ? (
            <>
              {/* Step Indicator */}
              <div className="flex items-center mb-8">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      stepIndex[step] > i ? 'bg-green-500 text-white' :
                      stepIndex[step] === i ? 'bg-primary text-white' :
                      'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}>
                      {stepIndex[step] > i ? <CheckCircle size={14} /> : s.icon}
                    </div>
                    <span className={`ml-2 text-xs font-semibold mr-4 ${stepIndex[step] >= i ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>{s.label}</span>
                    {i < steps.length - 1 && (
                      <div className={`h-px flex-1 w-8 mr-4 ${stepIndex[step] > i ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Step: Email */}
              {step === 'email' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Forgot Password?</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Enter your registered email and we'll send you an OTP.</p>
                  <form onSubmit={handleRequestOTP} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <input
                        type="email" required value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                    <button disabled={isLoading} type="submit" className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all">
                      {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </form>
                </>
              )}

              {/* Step: OTP */}
              {step === 'otp' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Enter OTP</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">A 6-digit OTP was sent to <strong>{email}</strong></p>
                  {devOTP && (
                    <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm">
                      <span className="text-yellow-700 dark:text-yellow-400 font-medium">Dev mode OTP: </span>
                      <span className="font-bold tracking-widest text-yellow-800 dark:text-yellow-300">{devOTP}</span>
                    </div>
                  )}
                  <form onSubmit={handleVerifyOTP} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">6-Digit OTP</label>
                      <input
                        type="text" required value={otp} maxLength={6}
                        onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 123456"
                        className="w-full px-4 py-3 text-center tracking-[0.5em] text-2xl font-bold rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                    <button disabled={isLoading} type="submit" className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all">
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button type="button" onClick={() => { setStep('email'); setError(''); }} className="w-full text-center text-sm text-gray-500 hover:text-primary transition-colors">
                      ← Change email / Resend OTP
                    </button>
                  </form>
                </>
              )}

              {/* Step: New Password */}
              {step === 'password' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Set New Password</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Choose a strong, new password for your account.</p>
                  <form onSubmit={handleResetPassword} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                      <input
                        type="password" required value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                      <input
                        type="password" required value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                    <button disabled={isLoading} type="submit" className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all">
                      {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            /* Step: Done */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Reset!</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Your password has been successfully reset. You can now log in with your new password.</p>
              <button onClick={() => router.push('/login')} className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all">
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
