import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AD Sky Solution | Workforce & IT Consulting',
  description: 'Integrated IT solutions, strategic consulting, and workforce execution for growing businesses.',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '64x64', type: 'image/png' },
      { url: '/icon.png', sizes: '128x128', type: 'image/png' },
      { url: '/icon.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
