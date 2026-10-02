import React, { useState } from 'react';
import { Shield, Eye, Trash2, LogOut, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import ToggleSwitch from '../ui/ToggleSwitch';
import SettingRow from './SettingRow';
import ConfirmModal from '../ui/ConfirmModal';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const PrivacySettings = () => {
  const { clearAllData, signOut } = useSettings();
  const { success, error } = useToast();
  const [privacySettings, setPrivacySettings] = useState({
    showProfileInfo: true,
    showStudyStats: true,
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
    title: '',
    message: '',
  });

  const handleClearActivityData = () => {
    setConfirmModal({
      isOpen: true,
      action: 'clearActivity',
      title: 'Clear Local Activity Data',
      message: 'This will clear your recent activity, session data, and temporary files. Your profile and settings will be preserved. This action cannot be undone.',
    });
  };

  const handleClearPracticeHistory = () => {
    setConfirmModal({
      isOpen: true,
      action: 'clearPractice',
      title: 'Clear Practice History',
      message: 'This will permanently delete all your practice question history, scores, and progress. This action cannot be undone.',
    });
  };

  const handleClearMockTestHistory = () => {
    setConfirmModal({
      isOpen: true,
      action: 'clearMockTests',
      title: 'Clear Mock Test History',
      message: 'This will permanently delete all your mock test results, performance data, and history. This action cannot be undone.',
    });
  };

  const handleResetSettings = () => {
    setConfirmModal({
      isOpen: true,
      action: 'resetSettings',
      title: 'Reset Application Settings',
      message: 'This will reset all your settings to default values including theme, notifications, study preferences, and exam preferences. Your profile and progress data will be preserved.',
    });
  };

  const handleSignOutAll = () => {
    setConfirmModal({
      isOpen: true,
      action: 'signOutAll',
      title: 'Sign Out from All Sessions',
      message: 'This will sign you out from all local sessions on this device. You will need to sign in again to access your account.',
    });
  };

  const handleConfirm = () => {
    switch (confirmModal.action) {
      case 'clearActivity':
        // Demo - clear activity data
        success('Activity data cleared');
        break;
      case 'clearPractice':
        // Demo - clear practice history
        success('Practice history cleared');
        break;
      case 'clearMockTests':
        // Demo - clear mock test history
        success('Mock test history cleared');
        break;
      case 'resetSettings':
        // Reset settings would be handled by context
        success('Settings reset to defaults');
        break;
      case 'signOutAll':
        signOut();
        success('Signed out from all sessions');
        break;
      default:
        break;
    }
    setConfirmModal({ isOpen: false, action: null, title: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Privacy Settings</h2>

        {/* Show Profile Information */}
        <SettingRow
          label="Show Profile Information"
          description="Allow your profile to be visible in the application"
          icon={<Eye className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={privacySettings.showProfileInfo}
            onChange={(value) => {
              setPrivacySettings({ ...privacySettings, showProfileInfo: value });
              success('Profile visibility updated');
            }}
          />
        </SettingRow>

        {/* Show Study Statistics */}
        <SettingRow
          label="Show Study Statistics"
          description="Display your study statistics and progress"
          icon={<Eye className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={privacySettings.showStudyStats}
            onChange={(value) => {
              setPrivacySettings({ ...privacySettings, showStudyStats: value });
              success('Statistics visibility updated');
            }}
          />
        </SettingRow>
      </div>

      <div className="card p-6 border border-warning-200">
        <h2 className="text-lg font-semibold text-warning-600 mb-4">Data Management</h2>

        {/* Clear Activity Data */}
        <SettingRow
          label="Clear Local Activity Data"
          description="Remove recent activity and temporary files"
          icon={<Trash2 className="w-5 h-5 text-warning-500" />}
          divider
        >
          <Button variant="secondary" size="sm" onClick={handleClearActivityData}>
            Clear
          </Button>
        </SettingRow>

        {/* Clear Practice History */}
        <SettingRow
          label="Clear Practice History"
          description="Delete all practice question history and progress"
          icon={<Trash2 className="w-5 h-5 text-warning-500" />}
          divider
        >
          <Button variant="secondary" size="sm" onClick={handleClearPracticeHistory}>
            Clear
          </Button>
        </SettingRow>

        {/* Clear Mock Test History */}
        <SettingRow
          label="Clear Mock Test History"
          description="Delete all mock test results and performance data"
          icon={<Trash2 className="w-5 h-5 text-warning-500" />}
        >
          <Button variant="secondary" size="sm" onClick={handleClearMockTestHistory}>
            Clear
          </Button>
        </SettingRow>
      </div>

      <div className="card p-6 border border-error-200">
        <h2 className="text-lg font-semibold text-error-600 mb-4">Danger Zone</h2>

        {/* Reset Settings */}
        <SettingRow
          label="Reset Application Settings"
          description="Reset all settings to default values"
          icon={<Shield className="w-5 h-5 text-error-500" />}
          divider
        >
          <Button variant="danger" size="sm" onClick={handleResetSettings}>
            Reset
          </Button>
        </SettingRow>

        {/* Sign Out All */}
        <SettingRow
          label="Sign Out from All Sessions"
          description="Sign out from all local sessions on this device"
          icon={<LogOut className="w-5 h-5 text-error-500" />}
        >
          <Button variant="danger" size="sm" onClick={handleSignOutAll}>
            Sign Out
          </Button>
        </SettingRow>
      </div>

      <div className="card p-6 bg-gray-50 border-gray-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Privacy Notice</h3>
            <p className="text-sm text-gray-600 mt-1">
              All data is stored locally in your browser. No data is sent to external servers. 
              Clearing browser data will delete all your GATEPrep information.
            </p>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, action: null, title: '', message: '' })}
        onConfirm={handleConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        variant="warning"
      />
    </div>
  );
};

export default PrivacySettings;
