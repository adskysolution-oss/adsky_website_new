'use client';
import { useState, useEffect } from 'react';
import { Share2, Copy, CheckCircle, Users } from 'lucide-react';

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    // Generate a referral code based on userId stored or a default
    const generateCode = () => {
      const code = 'ADSKY' + Math.random().toString(36).substring(2, 7).toUpperCase();
      setReferralCode(code);
    };
    generateCode();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'People Referred', value: '0', icon: <Users size={20} className="text-primary" /> },
    { label: 'Successful Joins', value: '0', icon: <CheckCircle size={20} className="text-green-500" /> },
    { label: 'Referral Earnings', value: '₹0', icon: <span className="text-yellow-500 font-bold text-lg">₹</span> },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Share2 size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Referrals</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Invite friends and earn rewards</p>
        </div>
      </div>

      {/* Referral Code Card */}
      <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <p className="text-blue-200 text-sm font-medium mb-2">Your Referral Code</p>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold tracking-widest">{referralCode}</span>
          <button onClick={handleCopy}
            className="ml-auto flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
          >
            {copied ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy</>}
          </button>
        </div>
        <p className="text-blue-200 text-xs mt-3">Share this code with friends. Earn ₹100 for every successful signup!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center shadow-sm">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4">How Referrals Work</h2>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Share your code', desc: 'Copy and share your unique referral code with friends via WhatsApp, SMS or email' },
            { step: '2', title: 'They sign up', desc: 'Your friend registers on AdSky using your referral code' },
            { step: '3', title: 'You both earn', desc: 'Once they complete their first task, you earn ₹100 as a referral bonus!' },
          ].map(item => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center flex-shrink-0">{item.step}</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
