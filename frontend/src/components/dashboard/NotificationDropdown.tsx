'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Bell, CheckCircle, Info, AlertTriangle, DollarSign } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Notification {
  _id: string;
  type: 'success' | 'info' | 'alert' | 'payment';
  title: string;
  details: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const typeIcon = {
  success: <CheckCircle className="text-green-500" size={18} />,
  info: <Info className="text-blue-500" size={18} />,
  alert: <AlertTriangle className="text-yellow-500" size={18} />,
  payment: <DollarSign className="text-emerald-500" size={18} />,
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await apiClient.get('/notifications');
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    } catch {
      // fallback: show empty
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Calling an async function from an effect is fine, 
    // but some linters prefer the explicit self-invoking function pattern 
    // to avoid potential "setState in effect" warnings if multiple states update.
    const load = async () => {
      await fetchNotifications();
    };
    void load();
  }, [fetchNotifications]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = async () => {
    if (!isAuthenticated) return;
    try {
      await apiClient.put('/notifications/mark-all-read');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch { /* ignore */ }
  };

  const handleMarkRead = async (id: string) => {
    if (!isAuthenticated) return;
    try {
      await apiClient.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch { /* ignore */ }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) fetchNotifications(); }}
        className="relative p-1.5 hover:text-blue-200 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-primary text-[9px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-white dark:bg-dark-surface rounded-xl shadow-2xl py-2 z-50 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800">
          <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs text-primary font-semibold hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="flex flex-col max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-10 text-center text-gray-400 text-sm">
                <Bell size={32} className="mx-auto mb-2 opacity-30" />
                No notifications yet
              </div>
            ) : (
              notifications.slice(0, 5).map(n => (
                <div
                  key={n._id}
                  onClick={() => handleMarkRead(n._id)}
                  className={`flex px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-50 dark:border-gray-800 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                >
                  <div className="mt-0.5 mr-3 flex-shrink-0">
                    {typeIcon[n.type] || <Info className="text-blue-500" size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {n.title}
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />}
                    </h5>
                    <p className="text-xs text-gray-500 leading-tight mt-0.5">{n.details}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{timeAgo(n.createdAt)}</span>
                  </div>
                </div>
              ))
            )}

            <Link
              href="/notifications"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-sm text-primary font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              View All Notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
