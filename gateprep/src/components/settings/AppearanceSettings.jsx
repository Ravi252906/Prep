import React from 'react';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import SettingRow from './SettingRow';
import ThemeSelector from './ThemeSelector';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const AppearanceSettings = () => {
  const { theme, setTheme } = useSettings();
  const { success } = useToast();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    success(`Theme changed to ${newTheme}`);
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Appearance</h2>

        {/* Theme Selector */}
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-4">
            <Palette className="w-5 h-5 text-primary-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Theme</p>
              <p className="text-sm text-gray-500 mt-1">Choose your preferred color scheme</p>
            </div>
          </div>
          <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
        </div>

        <div className="border-t border-gray-100 dark:border-slate-700 my-4" />

        {/* Theme Description */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Sun className="w-5 h-5 text-warning-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Light Mode</p>
              <p className="text-sm text-gray-500">Clean and bright interface for daytime use</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Moon className="w-5 h-5 text-primary-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-500">Dark interface for comfortable nighttime use</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">System Default</p>
              <p className="text-sm text-gray-500">Automatically matches your system's theme preference</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6 bg-primary-50 border-primary-200">
        <div className="flex items-start gap-3">
          <Palette className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-primary-900">Theme Information</h3>
            <p className="text-sm text-primary-700 mt-1">
              Your theme preference is saved locally and will persist across sessions. 
              The theme applies to all pages in GATEPrep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
