'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ProfileDropdown from '@/components/dashboard/ProfileDropdown';
import HelpDropdown from '@/components/dashboard/HelpDropdown';
import NotificationDropdown from '@/components/dashboard/NotificationDropdown';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Route guard: protect all dashboard routes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const navLinks = [
    { href: '/business', label: 'Business' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/blogs', label: 'Blog' },
    { href: '/explore', label: 'Explore' },
    { href: '/office', label: 'Office', highlight: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex flex-col">
      {/* Dashboard Top Navbar */}
      <nav className="w-full !h-[50px] !pt-[10px] !pl-[10px] bg-primary py-3 px-4 sm:px-6 lg:px-8 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center flex-shrink-0">
              <span className="text-blue-200 mr-1">Ad</span>Sky
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <div className="hidden  !pl-[500px] !gap-6 lg:flex items-center gap-5 mr-4 opacity-90 border-r border-white/20 pr-6">
                <Link href="/business" className="font-semibold text-sm hover:text-white/80 transition-colors">Business</Link>
                <Link href="/jobs" className="font-semibold text-sm hover:text-white/80 transition-colors">Jobs</Link>
                <Link href="/blogs" className="font-semibold text-sm hover:text-white/80 transition-colors">Blog</Link>
              </div>
              <Link href="/explore" className="px-3 !ml-[20px] py-2 hover:bg-white/10 rounded-md font-medium text-sm transition-colors">Explore</Link>
              <Link href="/office" className="px-4 !ml-[20px] py-2 hover:bg-white/10 rounded-md font-medium text-sm transition-colors">Office</Link>
            </div>
          </div>

          {/* Right Area */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 absolute right-1 !pr-[10px] !pt-10px ">
            <HelpDropdown />
            <NotificationDropdown />
            <ProfileDropdown />
            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/20 pt-3">
            <div className="flex flex-col gap-1 max-w-screen-xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                    link.highlight ? 'bg-blue-900 text-white' : 'hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
