import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'light', label: 'Light', icon: Sun, description: 'Light mode' },
    { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark mode' },
    { id: 'system', label: 'System', icon: Monitor, description: 'Follow system preference' },
  ];

  return (
    <div className="flex gap-2">
      {themes.map((theme) => {
        const Icon = theme.icon;
        const isActive = currentTheme === theme.id;

        return (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`
              flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
              ${isActive
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }
            `}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{theme.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
