'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { Bell, CheckCircle, Info, AlertTriangle, DollarSign, Loader2 } from 'lucide-react';

interface Notification {
  _id: string;
  type: 'success' | 'info' | 'alert' | 'payment';
  title: string;
  details: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

const typeConfig: Record<string, { icon: React.ReactElement; color: string; label: string }> = {
  success: { icon: <CheckCircle size={20} />, color: 'text-green-500 bg-green-50 dark:bg-green-900/20', label: 'Success' },
  info: { icon: <Info size={20} />, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20', label: 'Info' },
  alert: { icon: <AlertTriangle size={20} />, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20', label: 'Alert' },
  payment: { icon: <DollarSign size={20} />, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20', label: 'Payment' },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'success' | 'info' | 'alert' | 'payment'>('all');
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await apiClient.get('/notifications');
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    } catch { /* ignore */ }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    try {
      await apiClient.put('/notifications/mark-all-read');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch { /* ignore */ }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await apiClient.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch { /* ignore */ }
  };

  const filtered = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  type FilterKey = 'all' | 'unread' | 'success' | 'info' | 'alert' | 'payment';

  const filterTabs: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: `Unread${unreadCount > 0 ? ` (${unreadCount})` : ''}` },
    { key: 'success', label: 'Success' },
    { key: 'info', label: 'Info' },
    { key: 'alert', label: 'Alerts' },
    { key: 'payment', label: 'Payments' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Bell size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{notifications.length} total, {unreadCount} unread</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="text-sm text-primary font-semibold hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {filterTabs.map(tab => (
          <button key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === tab.key
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-48">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 py-16 flex flex-col items-center text-center shadow-sm">
          <Bell size={40} className="text-gray-300 dark:text-gray-600 mb-3" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">No notifications</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {filter === 'all' ? "You don't have any notifications yet." : `No ${filter} notifications found.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(n => {
            const cfg = typeConfig[n.type] || typeConfig.info;
            return (
              <div
                key={n._id}
                onClick={() => !n.read && handleMarkRead(n._id)}
                className={`flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                  !n.read
                    ? 'bg-blue-50/60 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                    : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                      {n.title}
                      {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(n.createdAt)}</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 leading-relaxed">{n.details}</p>
                  <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
