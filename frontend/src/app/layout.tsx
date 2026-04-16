import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AD Sky Solution | Workforce & IT Consulting',
  description: 'Integrated IT solutions, strategic consulting, and workforce execution for growing businesses.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${manrope.className} min-h-screen flex flex-col`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
