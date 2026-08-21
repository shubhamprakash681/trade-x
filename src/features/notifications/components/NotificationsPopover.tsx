'use client';

import { useState } from 'react';
import { useNotifications } from '../hooks/useNotificationQueries';
import { Bell } from 'lucide-react';

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications } = useNotifications(10); // Fetch top 10 recent notifications
  
  const unreadCount = notifications?.length || 0; // The backend doesn't strictly have 'unread' so we just show count for demo

  return (
    <div className="relative">
      <button 
        className="relative inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {!notifications || notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-slate-500">
                  No new notifications
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {notifications.map((notification) => {
                    const time = new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                      <li key={notification.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-sm text-slate-900">
                            {notification.symbol} - {notification.title}
                          </span>
                          <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                            {time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {notification.message}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
