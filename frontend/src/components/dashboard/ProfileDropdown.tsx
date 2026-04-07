'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, FileText, Share2, Award, Download, AlertCircle, ShieldAlert, Star } from 'lucide-react';

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-white text-primary font-bold flex items-center justify-center overflor-hidden shadow-sm hover:ring-2 hover:ring-blue-300 transition-all border border-blue-200"
      >
        <User size={20} />
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 w-64 bg-[#111827] rounded-xl shadow-2xl py-2 z-50 text-white border border-gray-800">
          <Link href="/profile" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors">
            <User size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">My Profile</span>
          </Link>
          <div className="flex flex-col">
          <button className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left">
            <User size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">Profile Picture</span>
          </button>
          <Link href="/applications" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left">
            <FileText size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">Application History</span>
          </Link>
          <Link href="/referrals" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left">
            <Share2 size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">My Referrals</span>
          </Link>
          <Link href="/campus" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left border-b border-gray-800 pb-4 mb-2">
            <Award size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">Campus Ambassador</span>
          </Link>

          <Link href="/download" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left">
            <Download size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">Download App</span>
          </Link>
          <Link href="/report" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left">
            <AlertCircle size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">Report Wrongdoings</span>
          </Link>
           <Link href="/training" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left border-b border-gray-800 pb-4 mb-2">
            <ShieldAlert size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">POSH Training</span>
          </Link>

          <button className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left">
            <Star size={18} className="mr-3 text-gray-400" />
            <span className="text-sm font-medium">Rate Us</span>
          </button>
          <button onClick={handleLogout} className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors w-full text-left text-red-400">
            <LogOut size={18} className="mr-3 text-red-400" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
