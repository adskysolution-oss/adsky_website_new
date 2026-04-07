'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      
      if (!res.data.onboardingCompleted) {
         router.push('/onboarding');
      } else {
         router.push('/office');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Visual Brand Side (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 relative overflow-hidden flex-col justify-center px-16 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-900/40" />
        
        <div className="relative z-10">
          <Link href="/" className="text-4xl font-bold tracking-tight mb-12 block">
            <span className="text-blue-400 mr-1">Work</span>Hustle
          </Link>
          <h2 className="text-4xl font-bold mb-6 leading-tight">Welcome back to the execution engine.</h2>
          <p className="text-blue-200 text-lg max-w-md line-clamp-4">
            Manage your gig workforce, track daily operations, and scale your business without the traditional HR constraints.
          </p>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 border-4 border-blue-400/20 rounded-full" />
        <div className="absolute -top-12 -right-12 w-64 h-64 border-4 border-white/10 rounded-full" />
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white dark:bg-dark-surface p-8 sm:p-10 rounded-2xl shadow-xl lg:shadow-none lg:border-none lg:bg-transparent border border-gray-100 dark:border-gray-800"
        >
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-3xl font-bold tracking-tight">
              <span className="text-primary mr-1">Work</span>Hustle
            </Link>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign in to your account</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Enter your credentials to access your dashboard.</p>
          
          {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email or Phone Number</label>
              <input 
                type="text" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Ex. 9876543210 or name@company.com" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
               <div className="flex justify-between items-center mb-1">
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                 <a href="#" className="text-sm text-primary hover:text-primary-hover font-medium">Forgot password?</a>
               </div>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <button disabled={isLoading} type="submit" className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 transition-all focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 mt-4">
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
