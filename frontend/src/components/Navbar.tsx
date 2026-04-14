'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/business', label: 'For Businesses' },
  { href: '/gig', label: 'For Workers' },
  { href: '/services', label: 'Solutions' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (
    pathname?.startsWith('/office') ||
    pathname?.startsWith('/categories') ||
    pathname?.startsWith('/onboarding') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/explore')
  ) {
    return null;
  }

  const isHome = pathname === '/';
  const navClass = isHome || isScrolled
    ? 'border-b border-black/6 bg-white/88 shadow-[0_10px_30px_rgba(15,40,71,0.08)] backdrop-blur-md'
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${navClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-[-0.04em] text-slate-950">
          Awign
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
              {item.label}
            </Link>
          ))}
          <Link href="/register" className="rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="rounded-lg p-2 text-slate-800 md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-black/6 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
