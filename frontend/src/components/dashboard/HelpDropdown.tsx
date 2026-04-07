'use client';
import { useState, useRef, useEffect } from 'react';
import { HelpCircle, FileText, MessageCircle, PhoneCall, BookOpen } from 'lucide-react';

export default function HelpDropdown() {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center hover:text-blue-200 transition-colors text-sm font-medium"
      >
        Help <HelpCircle size={16} className="ml-1" />
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0 w-64 bg-white dark:bg-dark-surface rounded-xl shadow-2xl py-2 z-50 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800">
          <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Get Assistance</div>
          <div className="flex flex-col mt-2">
            <button className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full text-left">
              <BookOpen size={18} className="mr-3 text-primary" />
              <div>
                <span className="text-sm font-bold block">Knowledge Base</span>
                <span className="text-xs text-gray-500">Read guides & FAQs</span>
              </div>
            </button>
            <button className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full text-left">
              <MessageCircle size={18} className="mr-3 text-primary" />
               <div>
                <span className="text-sm font-bold block">Chat Support</span>
                <span className="text-xs text-gray-500">Talk to an agent</span>
              </div>
            </button>
            <button className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full text-left hover:text-primary">
              <PhoneCall size={18} className="mr-3 text-primary" />
               <div>
                <span className="text-sm font-bold block">Request Callback</span>
                <span className="text-xs text-gray-500">We will call you</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
