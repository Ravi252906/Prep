import React, { useState } from 'react';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import ProfileSettings from '../components/settings/ProfileSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import DisplaySettings from '../components/settings/DisplaySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import StudyPreferences from '../components/settings/StudyPreferences';
import ExamPreferences from '../components/settings/ExamPreferences';
import PrivacySettings from '../components/settings/PrivacySettings';
import DataSettings from '../components/settings/DataSettings';
import AccessibilitySettings from '../components/settings/AccessibilitySettings';
import AboutSettings from '../components/settings/AboutSettings';
import DangerZone from '../components/settings/DangerZone';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const { isAuthenticated } = useSettings();

  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return <ProfileSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'display':
        return <DisplaySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'study':
        return <StudyPreferences />;
      case 'exam':
        return <ExamPreferences />;
      case 'privacy':
        return <PrivacySettings />;
      case 'data':
        return <DataSettings />;
      case 'accessibility':
        return <AccessibilitySettings />;
      case 'about':
        return <AboutSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Settings</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="card p-4">
          <SettingsSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          {renderSection()}
          
          {/* Danger Zone - shown on all sections except about */}
          {activeSection !== 'about' && (
            <div className="mt-6">
              <DangerZone />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
