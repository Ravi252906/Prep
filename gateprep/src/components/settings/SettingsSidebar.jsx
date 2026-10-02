import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';

const SettingsSidebar = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'appearance', label: 'Appearance', icon: 'Palette' },
    { id: 'display', label: 'Display', icon: 'Monitor' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'study', label: 'Study Preferences', icon: 'BookOpen' },
    { id: 'exam', label: 'Exam Preferences', icon: 'FileText' },
    { id: 'privacy', label: 'Privacy & Security', icon: 'Shield' },
    { id: 'data', label: 'Data & Storage', icon: 'Database' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Accessibility' },
    { id: 'about', label: 'About', icon: 'Info' },
  ];

  return (
    <nav className="space-y-1">
      {sections.map((section) => {
        const Icon = Icons[section.icon];
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${isActive
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }
            `}
          >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{section.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default SettingsSidebar;
