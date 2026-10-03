import React from 'react';
import * as Icons from 'lucide-react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications, onMarkRead, onMarkAllRead, onDelete, onClearAll }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900/50">
        <Icons.Bell className="h-12 w-12 text-slate-400" />
        <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
          No notifications
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          You're all caught up!
        </p>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      {/* Header Actions */}
      {unreadCount > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
          </p>
          <button
            onClick={onMarkAllRead}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Mark all as read
          </button>
        </div>
      )}

      {/* Notifications */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkRead={onMarkRead}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Clear All */}
      {notifications.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClearAll}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
