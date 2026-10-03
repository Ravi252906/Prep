import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// =========================
// DEFAULT NOTIFICATION DATA
// =========================
const DEFAULT_NOTIFICATIONS = {
  notifications: [],
};

// =========================
// NOTIFICATION CONTEXT
// =========================
const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  // =========================
  // STATE
  // =========================
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS.notifications);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const loadData = () => {
      try {
        const savedNotifications = localStorage.getItem('gateprep_notifications');
        if (savedNotifications) {
          const parsed = JSON.parse(savedNotifications);
          setNotifications(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // SAVE NOTIFICATIONS
  // =========================
  const saveNotifications = useCallback((newNotifications) => {
    try {
      setNotifications(newNotifications);
      localStorage.setItem('gateprep_notifications', JSON.stringify(newNotifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }, []);

  // =========================
  // ADD NOTIFICATION
  // =========================
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      title: notification.title,
      message: notification.message,
      type: notification.type || 'info', // info, success, warning, error
      category: notification.category || 'general', // revision, weak_topic, goal, mock_test, streak, achievement, weekly_goal, daily_challenge, milestone
      read: false,
      createdAt: new Date().toISOString(),
      action: notification.action || null,
      actionLabel: notification.actionLabel || null,
      relatedId: notification.relatedId || null,
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, 100); // Keep only last 100
      localStorage.setItem('gateprep_notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // MARK AS READ
  // =========================
  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev => {
      const updated = prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      localStorage.setItem('gateprep_notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // MARK ALL AS READ
  // =========================
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(notif => ({ ...notif, read: true }));
      localStorage.setItem('gateprep_notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // DELETE NOTIFICATION
  // =========================
  const deleteNotification = useCallback((notificationId) => {
    setNotifications(prev => {
      const updated = prev.filter(notif => notif.id !== notificationId);
      localStorage.setItem('gateprep_notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // CLEAR ALL NOTIFICATIONS
  // =========================
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    localStorage.setItem('gateprep_notifications', JSON.stringify([]));
  }, []);

  // =========================
  // GET UNREAD COUNT
  // =========================
  const getUnreadCount = useCallback(() => {
    return notifications.filter(notif => !notif.read).length;
  }, [notifications]);

  // =========================
  // GET NOTIFICATIONS BY CATEGORY
  // =========================
  const getNotificationsByCategory = useCallback((category) => {
    return notifications.filter(notif => notif.category === category);
  }, [notifications]);

  // =========================
  // CREATE REVISION DUE NOTIFICATION
  // =========================
  const createRevisionDueNotification = useCallback((topicName, subject) => {
    addNotification({
      title: 'Revision Due',
      message: `It's time to revise ${topicName} in ${subject}`,
      type: 'warning',
      category: 'revision',
      action: '/revision',
      actionLabel: 'Start Revision',
      relatedId: topicName,
    });
  }, [addNotification]);

  // =========================
  // CREATE WEAK TOPIC NOTIFICATION
  // =========================
  const createWeakTopicNotification = useCallback((topicName, subject, accuracy) => {
    addNotification({
      title: 'Weak Topic Alert',
      message: `Your accuracy in ${topicName} (${subject}) is ${accuracy}%. Consider revising.`,
      type: 'warning',
      category: 'weak_topic',
      action: '/revision',
      actionLabel: 'Revise Now',
      relatedId: topicName,
    });
  }, [addNotification]);

  // =========================
  // CREATE STUDY GOAL NOTIFICATION
  // =========================
  const createStudyGoalNotification = useCallback((goalType, remaining) => {
    addNotification({
      title: 'Study Goal Reminder',
      message: `You have ${remaining} ${goalType} remaining for today's goal`,
      type: 'info',
      category: 'goal',
      action: '/planner',
      actionLabel: 'View Planner',
    });
  }, [addNotification]);

  // =========================
  // CREATE MOCK TEST NOTIFICATION
  // =========================
  const createMockTestNotification = useCallback((testName) => {
    addNotification({
      title: 'Mock Test Due',
      message: `You have a mock test scheduled: ${testName}`,
      type: 'info',
      category: 'mock_test',
      action: '/mock-tests',
      actionLabel: 'Take Test',
    });
  }, [addNotification]);

  // =========================
  // CREATE STREAK NOTIFICATION
  // =========================
  const createStreakNotification = useCallback((streakCount) => {
    addNotification({
      title: 'Streak Alert',
      message: `Your ${streakCount}-day streak is about to break! Complete an activity today.`,
      type: 'warning',
      category: 'streak',
      action: '/practice',
      actionLabel: 'Start Practice',
    });
  }, [addNotification]);

  // =========================
  // CREATE ACHIEVEMENT NOTIFICATION
  // =========================
  const createAchievementNotification = useCallback((achievementName) => {
    addNotification({
      title: 'Achievement Unlocked!',
      message: `Congratulations! You've earned the "${achievementName}" achievement.`,
      type: 'success',
      category: 'achievement',
      action: '/achievements',
      actionLabel: 'View Achievements',
    });
  }, [addNotification]);

  // =========================
  // CREATE WEEKLY GOAL NOTIFICATION
  // =========================
  const createWeeklyGoalNotification = useCallback((goalType, progress) => {
    addNotification({
      title: 'Weekly Goal Progress',
      message: `You've completed ${progress}% of your weekly ${goalType} goal`,
      type: 'success',
      category: 'weekly_goal',
      action: '/analytics',
      actionLabel: 'View Analytics',
    });
  }, [addNotification]);

  // =========================
  // CREATE DAILY CHALLENGE NOTIFICATION
  // =========================
  const createDailyChallengeNotification = useCallback((challengeName) => {
    addNotification({
      title: 'Daily Challenge Available',
      message: `New daily challenge: ${challengeName}`,
      type: 'info',
      category: 'daily_challenge',
      action: '/dashboard',
      actionLabel: 'Start Challenge',
    });
  }, [addNotification]);

  // =========================
  // CREATE MILESTONE NOTIFICATION
  // =========================
  const createMilestoneNotification = useCallback((milestoneDescription) => {
    addNotification({
      title: 'Milestone Reached!',
      message: milestoneDescription,
      type: 'success',
      category: 'milestone',
    });
  }, [addNotification]);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    // State
    notifications,
    isLoading,
    
    // Actions
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    
    // Getters
    getUnreadCount,
    getNotificationsByCategory,
    
    // Notification Creators
    createRevisionDueNotification,
    createWeakTopicNotification,
    createStudyGoalNotification,
    createMockTestNotification,
    createStreakNotification,
    createAchievementNotification,
    createWeeklyGoalNotification,
    createDailyChallengeNotification,
    createMilestoneNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export default NotificationContext;
