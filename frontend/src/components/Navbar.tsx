'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/business', label: 'Services' },
  { href: '/jobs', label: 'Careers' },
  { href: '/services', label: 'Solutions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blogs', label: 'Insights' },
];

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

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#081a34]/92 backdrop-blur-md shadow-[0_18px_50px_rgba(8,26,52,0.28)] border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-extrabold tracking-[-0.04em] text-white flex items-center">
              <span className="text-[#ff5572] mr-1">AD</span>Sky
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 items-center list-none">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0b1d3a] border-b border-white/10 shadow-xl p-4 flex flex-col space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-2xl px-4 py-3 font-semibold ${
                isActive(item.href) ? 'bg-white/10 text-white' : 'text-white/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <hr className="border-white/10" />
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-[#ff8ba0] px-4 py-2">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
