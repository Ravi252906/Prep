import React from 'react';
import { Accessibility, Text, Contrast, Minimize2, Keyboard, Eye } from 'lucide-react';
import ToggleSwitch from '../ui/ToggleSwitch';
import SettingRow from './SettingRow';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const AccessibilitySettings = () => {
  const { accessibility, updateAccessibility } = useSettings();
  const { success } = useToast();

  const handleChange = (key, value) => {
    updateAccessibility(key, value);
    success(`Accessibility setting updated`);
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Accessibility Settings</h2>

        {/* Larger Text */}
        <SettingRow
          label="Larger Text"
          description="Increase text size for better readability"
          icon={<Text className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={accessibility.largerText}
            onChange={(value) => handleChange('largerText', value)}
          />
        </SettingRow>

        {/* High Contrast Mode */}
        <SettingRow
          label="High Contrast Mode"
          description="Increase contrast for better visibility"
          icon={<Contrast className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={accessibility.highContrastMode}
            onChange={(value) => handleChange('highContrastMode', value)}
          />
        </SettingRow>

        {/* Reduced Motion */}
        <SettingRow
          label="Reduced Motion"
          description="Minimize animations and transitions"
          icon={<Minimize2 className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={accessibility.reducedMotion}
            onChange={(value) => handleChange('reducedMotion', value)}
          />
        </SettingRow>

        {/* Keyboard Friendly Navigation */}
        <SettingRow
          label="Keyboard-Friendly Navigation"
          description="Enhance keyboard navigation throughout the app"
          icon={<Keyboard className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={accessibility.keyboardFriendlyNavigation}
            onChange={(value) => handleChange('keyboardFriendlyNavigation', value)}
          />
        </SettingRow>

        {/* Readable Interface Mode */}
        <SettingRow
          label="Readable Interface Mode"
          description="Optimize interface for maximum readability"
          icon={<Eye className="w-5 h-5 text-primary-500" />}
        >
          <ToggleSwitch
            checked={accessibility.readableInterfaceMode}
            onChange={(value) => handleChange('readableInterfaceMode', value)}
          />
        </SettingRow>
      </div>

      <div className="card p-6 bg-primary-50 border-primary-200">
        <div className="flex items-start gap-3">
          <Accessibility className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-primary-900">Accessibility Information</h3>
            <p className="text-sm text-primary-700 mt-1">
              These settings help customize the application for your accessibility needs. 
              Changes are applied immediately and saved to your local storage.
            </p>
          </div>
        </div>
      </div>

      <div className="card p-6 bg-gray-50 border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Keyboard Shortcuts</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Navigate settings</span>
            <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Tab</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Activate button</span>
            <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Enter / Space</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Close modal</span>
            <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
