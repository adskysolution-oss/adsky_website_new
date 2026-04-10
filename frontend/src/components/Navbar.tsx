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

  if (pathname?.startsWith('/office') || pathname?.startsWith('/categories') || pathname?.startsWith('/onboarding') || pathname?.startsWith('/admin') || pathname?.startsWith('/explore')) {
    return null;
  }

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#081a34]/92 backdrop-blur-md shadow-[0_18px_50px_rgba(8,26,52,0.28)] border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-extrabold tracking-[-0.04em] text-white flex items-center">
              <span className="text-[#ff5572] mr-1">AD</span>Sky
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center list-none">
            <Link href="/business" className="text-white/80 hover:text-white transition-colors text-sm font-semibold">
              Services <span className="ml-1 opacity-50">▾</span>
            </Link>
            <Link href="/jobs" className="text-white/80 hover:text-white transition-colors text-sm font-semibold">
              Careers <span className="ml-1 opacity-50">▾</span>
            </Link>
            <Link href="/services" className="text-white/80 hover:text-white transition-colors text-sm font-semibold">
              Solutions
            </Link>
            <Link href="/blogs" className="text-white/80 hover:text-white transition-colors text-sm font-semibold">
              Insights
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-white/75 hover:text-white transition-colors text-sm font-semibold">
              Sign In
            </Link>
            <Link href="/register" className="btn-secondary px-6 py-2.5 text-sm font-bold">
              Book Consultation
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0b1d3a] border-b border-white/10 shadow-xl p-4 flex flex-col space-y-4">
          <Link href="/business" className="font-semibold text-white">Services</Link>
          <Link href="/jobs" className="font-semibold text-white">Careers</Link>
          <Link href="/services" className="font-semibold text-white">Solutions</Link>
          <hr className="border-white/10" />
          <Link href="/login" className="font-semibold text-[#ff8ba0]">Sign In</Link>
        </div>
      )}
    </nav>
  );
}
