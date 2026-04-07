'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on dashboard routes
  if (pathname?.startsWith('/office') || pathname?.startsWith('/categories') || pathname?.startsWith('/onboarding') || pathname?.startsWith('/admin') || pathname?.startsWith('/explore')) {
     return null;
  }

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-[#0b1120]/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
              <span className="text-primary mr-1">Ad</span>Sky
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center list-none">
            <Link href="/business" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm font-semibold">
              For Business <span className="ml-1 opacity-50">▾</span>
            </Link>
            <Link href="/jobs" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm font-semibold">
              For Jobs <span className="ml-1 opacity-50">▾</span>
            </Link>
            <Link href="/blogs" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm font-semibold">
              Blogs
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm font-semibold">
              Log in
            </Link>
            <Link href="/register" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-primary/30">
              Sign up
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 dark:text-gray-300">
               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Placeholder */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-gray-800 shadow-xl p-4 flex flex-col space-y-4">
            <Link href="/business" className="font-semibold text-gray-800 dark:text-white">For Business</Link>
            <Link href="/jobs" className="font-semibold text-gray-800 dark:text-white">For Jobs</Link>
            <hr className="border-gray-200 dark:border-gray-800"/>
            <Link href="/login" className="font-semibold text-primary">Log in</Link>
        </div>
      )}
    </nav>
  );
}
