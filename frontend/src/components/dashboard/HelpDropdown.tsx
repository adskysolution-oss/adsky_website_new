'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, MessageCircle, PhoneCall, HelpCircle } from 'lucide-react';

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

  const items = [
    {
      href: '/help/knowledge-base',
      icon: <BookOpen size={18} className="text-primary" />,
      title: 'Knowledge Base',
      sub: 'Read guides & FAQs',
    },
    {
      href: '/help/chat',
      icon: <MessageCircle size={18} className="text-primary" />,
      title: 'Chat Support',
      sub: 'Talk to an agent',
    },
    {
      href: '/help/request-call',
      icon: <PhoneCall size={18} className="text-primary" />,
      title: 'Request Callback',
      sub: 'We will call you',
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center gap-1 hover:text-blue-200 transition-colors text-sm font-medium"
      >
        Help <HelpCircle size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0 w-64 bg-white dark:bg-dark-surface rounded-xl shadow-2xl py-2 z-50 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800">
          <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
            Get Assistance
          </div>
          <div className="flex flex-col mt-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="mr-3">{item.icon}</span>
                <div>
                  <span className="text-sm font-bold block">{item.title}</span>
                  <span className="text-xs text-gray-500">{item.sub}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
