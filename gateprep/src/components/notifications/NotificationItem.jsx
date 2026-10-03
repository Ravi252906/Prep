import React from 'react';
import * as Icons from 'lucide-react';

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  const getTypeIcon = (type) => {
    const iconMap = {
      info: 'Info',
      success: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle',
    };
    return iconMap[type] || 'Bell';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      info: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
      success: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30',
      warning: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30',
      error: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    };
    return colorMap[type] || colorMap.info;
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      revision: 'RotateCcw',
      weak_topic: 'AlertTriangle',
      goal: 'Target',
      mock_test: 'FileText',
      streak: 'Flame',
      achievement: 'Award',
      weekly_goal: 'Calendar',
      daily_challenge: 'Zap',
      milestone: 'Trophy',
    };
    return iconMap[category] || 'Bell';
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const Icon = Icons[getTypeIcon(notification.type)];
  const CategoryIcon = Icons[getCategoryIcon(notification.category)];
  const typeColor = getTypeColor(notification.type);

  return (
    <div
      className={`
        rounded-xl
        border
        p-4
        transition-all
        hover:shadow-md
        ${
          notification.read
            ? 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50'
            : 'border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/20'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-lg p-2 ${typeColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {notification.title}
            </h4>
            {!notification.read && (
              <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0" />
            )}
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            {notification.message}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
              <CategoryIcon className="h-3 w-3" />
              <span>{formatTime(notification.createdAt)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {notification.action && (
                <a
                  href={notification.action}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {notification.actionLabel || 'View'}
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          {!notification.read && (
            <button
              onClick={() => onMarkRead && onMarkRead(notification.id)}
              className="rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              title="Mark as read"
            >
              <Icons.Check className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onDelete && onDelete(notification.id)}
            className="rounded p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete"
          >
            <Icons.X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
