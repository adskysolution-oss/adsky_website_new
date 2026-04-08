'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, LogOut, FileText, Share2, Award, Download, 
  AlertCircle, ShieldAlert, Star, Camera, ChevronDown 
} from 'lucide-react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  const menuItems = [
    { href: '/profile', icon: <User size={16} />, label: 'My Profile' },
    { href: '/profile?tab=picture', icon: <Camera size={16} />, label: 'Profile Picture' },
    { href: '/applications', icon: <FileText size={16} />, label: 'Application History' },
    { href: '/referrals', icon: <Share2 size={16} />, label: 'My Referrals' },
    { href: '/campus', icon: <Award size={16} />, label: 'Campus Ambassador', dividerAfter: true },
    { href: '/download', icon: <Download size={16} />, label: 'Download App' },
    { href: '/report', icon: <AlertCircle size={16} />, label: 'Report Wrongdoings' },
    { href: '/training', icon: <ShieldAlert size={16} />, label: 'POSH Training', dividerAfter: true },
    { href: '/rate-us', icon: <Star size={16} />, label: 'Rate Us' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 w-9 h-9 rounded-full bg-white text-primary font-bold items-center justify-center shadow-sm hover:ring-2 hover:ring-blue-300 transition-all border border-blue-200"
        aria-label="Profile menu"
      >
        <User size={18} />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-60 bg-[#111827] rounded-xl shadow-2xl py-1.5 z-50 text-white border border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-800 mb-1">
            <p className="text-xs text-gray-400 font-medium">My Account</p>
          </div>

          {menuItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 transition-colors text-gray-200 hover:text-white"
              >
                <span className="text-gray-400 flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
              {item.dividerAfter && <div className="border-b border-gray-800 my-1" />}
            </div>
          ))}

          <div className="border-t border-gray-800 mt-1 pt-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-900/30 transition-colors w-full text-left text-red-400"
            >
              <LogOut size={16} className="flex-shrink-0" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
