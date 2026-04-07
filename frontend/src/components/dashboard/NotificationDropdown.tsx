'use client';
import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dummyNotifications = [
    { id: 1, type: 'success', title: 'Profile Updated', details: 'Your onboarding profile is saved.', time: '2 mins ago' },
    { id: 2, type: 'info', title: 'New Job Matching', details: 'A new delivery job matches your criteria.', time: '1 hour ago' },
    { id: 3, type: 'alert', title: 'Action Required', details: 'Please verify your email address.', time: '1 day ago' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 hover:text-blue-200 transition-colors"
      >
        <Bell size={20} />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-primary animate-pulse"></span>
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0 w-80 bg-white dark:bg-dark-surface rounded-xl shadow-2xl py-2 z-50 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800">
          <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
             <span className="text-sm font-bold text-gray-900 dark:text-white mb-0">Notifications</span>
             <button className="text-xs text-primary font-semibold hover:underline">Mark all read</button>
          </div>
          <div className="flex flex-col max-h-80 overflow-y-auto">
            {dummyNotifications.map(n => (
              <div key={n.id} className="flex px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-50 dark:border-gray-800 cursor-pointer transition-colors">
                <div className="mt-1 mr-3">
                  {n.type === 'success' && <CheckCircle className="text-green-500" size={18} />}
                  {n.type === 'info' && <Info className="text-blue-500" size={18} />}
                  {n.type === 'alert' && <AlertTriangle className="text-yellow-500" size={18} />}
                </div>
                <div>
                   <h5 className="text-sm font-bold text-gray-900 dark:text-white">{n.title}</h5>
                   <p className="text-xs text-gray-500 leading-tight mt-1">{n.details}</p>
                   <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                </div>
              </div>
            ))}
            <button className="w-full text-center py-3 text-sm text-primary font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20">
               View All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
