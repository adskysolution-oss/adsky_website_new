'use client';

import Link from 'next/link';
import Image from 'next/image';
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

  const navClass = isScrolled
    ? 'bg-[#0b1829] shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-b border-white/10'
    : 'bg-[#0d1e35] border-b border-white/8';

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${navClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20 shadow-[0_0_12px_rgba(255,255,255,0.1)]">
            <Image
              src="/logo.png"
              alt="AD Sky Solution"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-base font-bold uppercase tracking-widest text-white drop-shadow-sm">
            AD Sky Solution
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0d1e35] transition hover:bg-white/90 shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="rounded-lg p-2 text-white/80 hover:text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen ? (
        <div className="border-t border-white/10 bg-[#0b1829] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0d1e35]"
            >
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
