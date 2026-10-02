import React from 'react';
import { Monitor, Text, Minimize2, Zap } from 'lucide-react';
import SettingRow from './SettingRow';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const DisplaySettings = () => {
  const { display, updateDisplay } = useSettings();
  const { success } = useToast();

  const handleChange = (key, value) => {
    updateDisplay(key, value);
    success('Display setting updated');
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Display Settings</h2>

        {/* Interface Density */}
        <SettingRow
          label="Interface Density"
          description="Choose how compact or comfortable the interface feels"
          icon={<Monitor className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={display.interfaceDensity}
            onChange={(e) => handleChange('interfaceDensity', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-800"
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
          </select>
        </SettingRow>

        {/* Font Size */}
        <SettingRow
          label="Font Size"
          description="Adjust the base font size throughout the application"
          icon={<Text className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={display.fontSize}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-800"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </SettingRow>

        {/* Reduced Motion */}
        <SettingRow
          label="Reduced Motion"
          description="Minimize animations and transitions for better performance"
          icon={<Minimize2 className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={display.reducedMotion ? 'enabled' : 'disabled'}
            onChange={(e) => handleChange('reducedMotion', e.target.value === 'enabled')}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-800"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </SettingRow>

        {/* Show Animations */}
        <SettingRow
          label="Show Animations"
          description="Enable or disable UI animations"
          icon={<Zap className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={display.showAnimations ? 'enabled' : 'disabled'}
            onChange={(e) => handleChange('showAnimations', e.target.value === 'enabled')}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-800"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </SettingRow>
      </div>

      <div className="card p-6 bg-primary-50 border-primary-200">
        <div className="flex items-start gap-3">
          <Monitor className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-primary-900">Display Information</h3>
            <p className="text-sm text-primary-700 mt-1">
              These settings control how the application looks and feels. Changes are applied immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;
