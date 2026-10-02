import React from 'react';
import { Bell, Clock, Target, BookOpen, BarChart3, Calendar, Award, Megaphone } from 'lucide-react';
import ToggleSwitch from '../ui/ToggleSwitch';
import SettingRow from './SettingRow';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const NotificationSettings = () => {
  const { notifications, updateNotification, updateAllNotifications } = useSettings();
  const { success } = useToast();

  const handleMasterToggle = (value) => {
    updateAllNotifications(value);
    success(value ? 'All notifications enabled' : 'All notifications disabled');
  };

  const handleToggle = (key, value) => {
    updateNotification(key, value);
    success(`${value ? 'Enabled' : 'Disabled'} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Notification Preferences</h2>
        
        {/* Master Toggle */}
        <SettingRow
          label="Enable All Notifications"
          description="Turn on or off all notification types at once"
        >
          <ToggleSwitch
            checked={notifications.masterToggle}
            onChange={handleMasterToggle}
          />
        </SettingRow>

        <div className="border-t border-gray-100 dark:border-slate-700 my-4" />

        {/* Individual Toggles */}
        <SettingRow
          label="Study Reminders"
          description="Get reminded to maintain your study schedule"
          icon={<Clock className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={notifications.studyReminders}
            onChange={(value) => handleToggle('studyReminders', value)}
            disabled={!notifications.masterToggle}
          />
        </SettingRow>

        <SettingRow
          label="Daily Goals"
          description="Notifications about your daily study goals"
          icon={<Target className="w-5 h-5 text-success-500" />}
        >
          <ToggleSwitch
            checked={notifications.dailyGoals}
            onChange={(value) => handleToggle('dailyGoals', value)}
            disabled={!notifications.masterToggle}
          />
        </SettingRow>

        <SettingRow
          label="Mock Test Reminders"
          description="Reminders for scheduled mock tests"
          icon={<Calendar className="w-5 h-5 text-warning-500" />}
        >
          <ToggleSwitch
            checked={notifications.mockTestReminders}
            onChange={(value) => handleToggle('mockTestReminders', value)}
            disabled={!notifications.masterToggle}
          />
        </SettingRow>

        <SettingRow
          label="New Practice Questions"
          description="Notify when new practice questions are added"
          icon={<BookOpen className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={notifications.newPracticeQuestions}
            onChange={(value) => handleToggle('newPracticeQuestions', value)}
            disabled={!notifications.masterToggle}
          />
        </SettingRow>

        <SettingRow
          label="Performance Reports"
          description="Weekly performance and progress reports"
          icon={<BarChart3 className="w-5 h-5 text-error-500" />}
        >
          <ToggleSwitch
            checked={notifications.performanceReports}
            onChange={(value) => handleToggle('performanceReports', value)}
            disabled={!notifications.masterToggle}
          />
        </SettingRow>

        <SettingRow
          label="Planner Reminders"
          description="Reminders from your study planner"
          icon={<Calendar className="w-5 h-5 text-warning-500" />}
        >
          <ToggleSwitch
            checked={notifications.plannerReminders}
            onChange={(value) => handleToggle('plannerReminders', value)}
            disabled={!notifications.masterToggle}
          />
        </SettingRow>

        <SettingRow
          label="Achievement Notifications"
          description="Celebrate when you unlock achievements"
          icon={<Award className="w-5 h-5 text-success-500" />}
        >
          <ToggleSwitch
            checked={notifications.achievementNotifications}
            onChange={(value) => handleToggle('achievementNotifications', value)}
            disabled={!notifications.masterToggle}
          />
        </SettingRow>

        <SettingRow
          label="General App Notifications"
          description="General app updates and announcements"
          icon={<Megaphone className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={notifications.generalAppNotifications}
            onChange={(value) => handleToggle('generalAppNotifications', value)}
            disabled={!notifications.masterToggle}
          />
        </SettingRow>
      </div>

      <div className="card p-6 bg-primary-50 border-primary-200">
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-primary-900">About Notifications</h3>
            <p className="text-sm text-primary-700 mt-1">
              Notifications are currently stored locally in your browser. In a production environment, 
              these would be delivered through push notifications or email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
