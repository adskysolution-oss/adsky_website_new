'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneLandingPage = pathname === '/' || pathname === '/gig' || pathname === '/business';

  return (
    <AuthProvider>
      {isStandaloneLandingPage ? null : <Navbar />}
      <main className={`flex-grow ${isStandaloneLandingPage ? '' : 'pt-16'}`}>{children}</main>
      {isStandaloneLandingPage ? null : <Footer />}
    </AuthProvider>
  );
}
