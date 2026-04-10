'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AUTH_API_URL, PASSWORD_REGEX, PASSWORD_REQUIREMENTS_TEXT } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'Worker' | 'Client'>('Worker');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!PASSWORD_REGEX.test(password)) {
      setError(PASSWORD_REQUIREMENTS_TEXT);
      setIsLoading(false);
      return;
    }

    try {
      const payload: Record<string, string> = { name, email, password, role };
      if (role === 'Client') payload.companyName = companyName;
      if (phone) payload.phone = phone;

      const res = await axios.post(`${AUTH_API_URL}/register`, payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      router.push('/onboarding');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 py-12 sm:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white dark:bg-dark-surface p-8 sm:p-10 rounded-2xl shadow-xl lg:shadow-none lg:border-none lg:bg-transparent border border-gray-100 dark:border-gray-800"
        >
          <div className="mb-8 block">
            <Link href="/" className="text-3xl font-bold tracking-tight">
              <span className="text-primary mr-1">AD</span>Sky
            </Link>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create an account</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Join the platform with a secure, production-ready account.</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole('Worker')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${role === 'Worker' ? 'border-primary bg-blue-50 dark:bg-blue-900/10 text-primary' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
              <UserIcon className="w-6 h-6 mb-2" />
              <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">I&apos;m a Worker</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('Client')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${role === 'Client' ? 'border-primary bg-blue-50 dark:bg-blue-900/10 text-primary' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
              <Briefcase className="w-6 h-6 mb-2" />
              <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">I&apos;m a Business</span>
            </button>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder={role === 'Client' ? 'Contact Person Name' : 'John Doe'} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
            </div>

            {role === 'Client' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required placeholder="Acme Corp Ltd." className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email <span className="text-red-500">*</span></label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@company.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Password <span className="text-red-500">*</span></label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Create a strong password" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{PASSWORD_REQUIREMENTS_TEXT}</p>
            </div>

            <div className="pt-2">
              <button disabled={isLoading} type="submit" className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 transition-all focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900">
                {isLoading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-center px-16 text-white border-l border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-6 leading-tight">Create a secure account for reliable execution.</h2>
          <ul className="space-y-6 text-gray-300 text-lg">
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3 flex-shrink-0 mt-1">✓</span>
              Strong password validation on both the client and server.
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3 flex-shrink-0 mt-1">✓</span>
              Secure authentication with JWT and protected account states.
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3 flex-shrink-0 mt-1">✓</span>
              Password recovery via time-limited, one-time reset links.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
