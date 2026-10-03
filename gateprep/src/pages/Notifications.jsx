import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import NotificationList from '../components/notifications/NotificationList';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications, getNotificationsByCategory } = useNotifications();
  
  const [filter, setFilter] = useState('all');

  const filteredNotifications = filter === 'all'
    ? notifications
    : getNotificationsByCategory(filter);

  const handleMarkRead = (notificationId) => {
    markAsRead(notificationId);
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleDelete = (notificationId) => {
    deleteNotification(notificationId);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      clearAllNotifications();
    }
  };

  const categories = [
    { id: 'all', label: 'All', icon: 'Bell' },
    { id: 'revision', label: 'Revision', icon: 'RotateCcw' },
    { id: 'weak_topic', label: 'Weak Topics', icon: 'AlertTriangle' },
    { id: 'goal', label: 'Goals', icon: 'Target' },
    { id: 'mock_test', label: 'Mock Tests', icon: 'FileText' },
    { id: 'streak', label: 'Streak', icon: 'Flame' },
    { id: 'achievement', label: 'Achievements', icon: 'Award' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Notifications
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Stay updated with your progress and reminders
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category) => {
            const Icon = Icons[category.icon];
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-colors
                  whitespace-nowrap
                  ${
                    filter === category.id
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <NotificationList
        notifications={filteredNotifications}
        onMarkRead={handleMarkRead}
        onMarkAllRead={handleMarkAllRead}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
      />
    </div>
  );
};

export default Notifications;
