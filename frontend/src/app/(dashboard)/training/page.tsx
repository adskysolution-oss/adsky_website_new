'use client';
import { ShieldAlert, CheckCircle } from 'lucide-react';

const modules = [
  {
    number: '01', title: 'What is POSH?', duration: '10 min',
    desc: 'An overview of the Prevention of Sexual Harassment at Workplace Act (POSH), 2013 and its significance.',
    topics: ['Definition of sexual harassment', 'Types of harassment', 'Why POSH matters'],
  },
  {
    number: '02', title: 'Your Rights at Work', duration: '15 min',
    desc: 'Understanding the rights of workers and employers under the POSH framework.',
    topics: ['Rights of complainant', 'Rights of respondent', 'Company obligations'],
  },
  {
    number: '03', title: 'Reporting Mechanisms', duration: '12 min',
    desc: 'How to file a complaint, what to expect, and timelines for resolution.',
    topics: ['Internal complaints committee', 'Filing a complaint', 'Inquiry process & timeline'],
  },
  {
    number: '04', title: 'Safe Working Environment', duration: '10 min',
    desc: 'Steps employers and employees can take to maintain a respectful and safe work culture.',
    topics: ['Prevention strategies', 'Bystander responsibility', 'Building a safe culture'],
  },
  {
    number: '05', title: 'AdSky Policy & Support', duration: '8 min',
    desc: `AdSky's zero-tolerance policy, how to report on our platform, and available support.`,
    topics: ['AdSky POSH policy', 'Platform reporting tool', 'Support channels'],
  },
];

export default function TrainingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
          <ShieldAlert size={20} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">POSH Training</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Prevention of Sexual Harassment at Workplace</p>
        </div>
      </div>

      {/* Certificate Banner */}
      <div className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white rounded-2xl p-7 mb-6 shadow-lg">
        <div className="flex items-start gap-4">
          <ShieldAlert size={40} className="text-purple-200 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold mb-1">Mandatory Compliance Training</h2>
            <p className="text-purple-200 text-sm mb-4">Complete all 5 modules to receive your POSH Compliance Certificate. Required for all platform users.</p>
            <div className="flex gap-3">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <div className="font-bold text-lg">5</div>
                <div className="text-xs text-purple-200">Modules</div>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <div className="font-bold text-lg">55 min</div>
                <div className="text-xs text-purple-200">Total</div>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <div className="font-bold text-lg">Certificate</div>
                <div className="text-xs text-purple-200">On completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {modules.map((mod, i) => (
          <div key={mod.number} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-400 font-bold text-sm flex-shrink-0">
                {mod.number}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{mod.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{mod.duration} • {mod.desc}</p>
                  </div>
                  {i === 0 ? (
                    <button className="flex-shrink-0 px-4 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition-colors">
                      Start
                    </button>
                  ) : (
                    <span className="flex-shrink-0 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-medium rounded-lg">
                      Locked
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {mod.topics.map(t => (
                    <span key={t} className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2.5 py-1 rounded-full">
                      <CheckCircle size={10} className="text-green-500" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-700 dark:text-blue-300">
        ℹ️ All training content is aligned with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.
      </div>
    </div>
  );
}
