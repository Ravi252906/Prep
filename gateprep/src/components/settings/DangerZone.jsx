import React, { useState } from 'react';
import { AlertTriangle, RotateCcw, Trash2, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import ConfirmModal from '../ui/ConfirmModal';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const DangerZone = () => {
  const { resetSettings, clearAllData, signOut } = useSettings();
  const { success, error } = useToast();
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
    title: '',
    message: '',
  });

  const handleResetSettings = () => {
    setConfirmModal({
      isOpen: true,
      action: 'resetSettings',
      title: 'Reset All Settings',
      message: 'This will reset all your settings to default values including theme, notifications, study preferences, exam preferences, display settings, and accessibility settings. Your profile and progress data will be preserved. This action cannot be undone.',
    });
  };

  const handleClearStudyData = () => {
    setConfirmModal({
      isOpen: true,
      action: 'clearStudyData',
      title: 'Clear Study Data',
      message: 'This will permanently delete all your study data including practice progress, mock test results, planner data, and notes. Your profile and settings will be preserved. This action cannot be undone.',
    });
  };

  const handleSignOut = () => {
    setConfirmModal({
      isOpen: true,
      action: 'signOut',
      title: 'Sign Out',
      message: 'You will be signed out from your account. Your data will remain saved locally on this device.',
    });
  };

  const handleConfirm = () => {
    switch (confirmModal.action) {
      case 'resetSettings':
        resetSettings();
        success('All settings reset to defaults');
        break;
      case 'clearStudyData':
        clearAllData();
        success('Study data cleared successfully');
        break;
      case 'signOut':
        signOut();
        success('Signed out successfully');
        break;
      default:
        break;
    }
    setConfirmModal({ isOpen: false, action: null, title: '', message: '' });
  };

  return (
    <>
      <div className="card p-6 border border-error-200 dark:border-error-800">
        <h2 className="text-lg font-semibold text-error-600 dark:text-error-400 mb-4">Danger Zone</h2>

        {/* Reset Settings */}
        <div className="flex items-center justify-between py-3 border-b border-error-100 dark:border-error-800">
          <div>
            <p className="font-medium text-gray-900 dark:text-slate-100">Reset All Settings</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">Reset all settings to default values</p>
          </div>
          <Button variant="danger" size="sm" icon={RotateCcw} onClick={handleResetSettings}>
            Reset
          </Button>
        </div>

        {/* Clear Study Data */}
        <div className="flex items-center justify-between py-3 border-b border-error-100 dark:border-error-800">
          <div>
            <p className="font-medium text-gray-900 dark:text-slate-100">Clear Study Data</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">Delete all practice and mock test data</p>
          </div>
          <Button variant="danger" size="sm" icon={Trash2} onClick={handleClearStudyData}>
            Clear
          </Button>
        </div>

        {/* Sign Out */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-slate-100">Sign Out</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">Sign out from your account</p>
          </div>
          <Button variant="danger" size="sm" icon={LogOut} onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, action: null, title: '', message: '' })}
        onConfirm={handleConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        variant="danger"
      />
    </>
  );
};

export default DangerZone;
