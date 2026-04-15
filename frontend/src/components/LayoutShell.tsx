'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneLandingPage = pathname === '/' || pathname === '/gig' || pathname === '/business';
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/register' ||
     pathname === '/onboarding' ||
    pathname === '/forgot-password' ||
   
    pathname.startsWith('/reset-password/');
  const hideSharedChrome = isStandaloneLandingPage || isAuthPage;

  return (
    <AuthProvider>
      {hideSharedChrome ? null : <Navbar />}
      <main className={`flex-grow ${hideSharedChrome ? '' : 'pt-16'}`}>{children}</main>
      {hideSharedChrome ? null : <Footer />}
    </AuthProvider>
  );
}
