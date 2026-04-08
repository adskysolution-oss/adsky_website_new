'use client';
import { Download, Smartphone, QrCode, Star } from 'lucide-react';

export default function DownloadPage() {
  const features = [
    { emoji: '⚡', text: 'Apply to 1000+ daily gig jobs' },
    { emoji: '💰', text: 'Get paid directly to your bank' },
    { emoji: '📊', text: 'Real-time earnings dashboard' },
    { emoji: '🔔', text: 'Instant job match notifications' },
    { emoji: '🛡️', text: 'Verified & secure platform' },
    { emoji: '🌍', text: '500+ cities across India' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Download size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Download the App</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Get the full AdSky experience on your phone</p>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 text-white mb-6 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="relative z-10">
          <Smartphone size={48} className="mb-4 text-blue-300" />
          <h2 className="text-2xl font-bold mb-2">AdSky – Work, Earn, Grow</h2>
          <p className="text-blue-200 text-sm mb-6 max-w-md">India's #1 gig platform. Find jobs near you, track tasks, get paid fast — all from your phone.</p>

          <div className="flex flex-wrap gap-4">
            <a href="#" className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl transition-colors border border-gray-700">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.34.07 2.27.74 3.04.8 1.17-.24 2.28-.93 3.51-.79 1.48.18 2.6.83 3.32 2.08-3.16 1.9-2.54 5.81.52 7.07-.62 1.62-1.44 3.2-2.39 3.72zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              <div>
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="font-bold text-sm">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl transition-colors border border-gray-700">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M3.18 23.76a.89.89 0 01-.59-.21.88.88 0 01-.3-.67V1.12A.88.88 0 012.59.45a.89.89 0 01.59.21l12.49 11.5-12.49 11.5zm14.04-7.25l-2.73-2.51 2.73-2.51 3.33 1.93a1 1 0 010 1.16l-3.33 1.93zm-3.76-3.48L1.97 24.33l-.02.02L.8 24.49l12.37-11.46.29.0zM2.69 0l11.77 10.94-.29.27L1.97-.33l.72.33z"/></svg>
              <div>
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-bold text-sm">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6 shadow-sm">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4">Why use the app?</h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map(f => (
            <div key={f.text} className="flex items-start gap-2">
              <span className="text-lg">{f.emoji}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* QR & Ratings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col items-center text-center">
          <QrCode size={48} className="text-gray-400 mb-3" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Scan to Download</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Point your phone camera at the QR code to download</p>
        </div>
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col items-center text-center">
          <div className="flex gap-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />)}
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on 50,000+ reviews</p>
          <p className="text-xs text-gray-400 mt-2">App Store & Google Play</p>
        </div>
      </div>
    </div>
  );
}
