import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// =========================
// DEFAULT SETTINGS
// =========================
const DEFAULT_SETTINGS = {
  // Theme
  theme: 'light', // 'light', 'dark', 'system'
  
  // Notifications
  notifications: {
    studyReminders: true,
    dailyGoals: true,
    mockTestReminders: true,
    newPracticeQuestions: true,
    performanceReports: true,
    plannerReminders: true,
    achievementNotifications: true,
    generalAppNotifications: true,
    masterToggle: true,
  },
  
  // Study Preferences
  studyPreferences: {
    targetYear: '2025',
    studyDuration: '6',
    dailyStudyGoal: '4',
    preferredStudyTime: 'evening',
    weeklyStudyDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    difficultyPreference: 'medium',
    preferredSubjects: [],
    revisionReminders: true,
  },
  
  // Exam Preferences
  examPreferences: {
    defaultDuration: '180',
    defaultQuestionCount: '65',
    preferredQuestionTypes: ['mcq', 'msq', 'nat'],
    showNegativeMarking: true,
    autoSubmitOnTimer: false,
    showExplanationsAfterAnswer: true,
    enableExamWarnings: true,
  },
  
  // Display Settings
  display: {
    interfaceDensity: 'comfortable', // 'compact', 'comfortable'
    fontSize: 'medium', // 'small', 'medium', 'large'
    reducedMotion: false,
    showAnimations: true,
  },
  
  // Accessibility
  accessibility: {
    largerText: false,
    highContrastMode: false,
    reducedMotion: false,
    keyboardFriendlyNavigation: true,
    readableInterfaceMode: false,
  },
};

// =========================
// SETTINGS CONTEXT
// =========================
const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  // =========================
  // STATE
  // =========================
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const loadSettings = () => {
      try {
        // Load settings
        const savedSettings = localStorage.getItem('gateprep_settings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings(prev => ({ ...prev, ...parsed }));
        }

        // Load theme separately for immediate application
        const savedTheme = localStorage.getItem('gateprep_theme');
        if (savedTheme) {
          setSettings(prev => ({ ...prev, theme: savedTheme }));
        }

        // Load user
        const savedUser = localStorage.getItem('gateprep_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        // Load auth state
        const savedAuth = localStorage.getItem('gateprep_auth');
        if (savedAuth === 'true') {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // =========================
  // APPLY THEME
  // =========================
  useEffect(() => {
    const applyTheme = () => {
      const { theme } = settings;
      let effectiveTheme = theme;

      if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      document.documentElement.setAttribute('data-theme', effectiveTheme);
    };

    applyTheme();

    // Listen for system theme changes
    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.theme]);

  // =========================
  // SAVE SETTINGS
  // =========================
  const saveSettings = useCallback((newSettings) => {
    try {
      setSettings(prev => {
        const updated = { ...prev, ...newSettings };
        localStorage.setItem('gateprep_settings', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, []);

  // =========================
  // THEME MANAGEMENT
  // =========================
  const setTheme = useCallback((theme) => {
    setSettings(prev => {
      const updated = { ...prev, theme };
      localStorage.setItem('gateprep_theme', theme);
      localStorage.setItem('gateprep_settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // NOTIFICATION MANAGEMENT
  // =========================
  const updateNotification = useCallback((key, value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        notifications: { ...prev.notifications, [key]: value }
      };
      localStorage.setItem('gateprep_settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateAllNotifications = useCallback((value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        notifications: Object.keys(prev.notifications).reduce((acc, key) => {
          acc[key] = value;
          return acc;
        }, {})
      };
      localStorage.setItem('gateprep_settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // STUDY PREFERENCES MANAGEMENT
  // =========================
  const updateStudyPreference = useCallback((key, value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        studyPreferences: { ...prev.studyPreferences, [key]: value }
      };
      localStorage.setItem('gateprep_settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // EXAM PREFERENCES MANAGEMENT
  // =========================
  const updateExamPreference = useCallback((key, value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        examPreferences: { ...prev.examPreferences, [key]: value }
      };
      localStorage.setItem('gateprep_settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // DISPLAY MANAGEMENT
  // =========================
  const updateDisplay = useCallback((key, value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        display: { ...prev.display, [key]: value }
      };
      localStorage.setItem('gateprep_settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // ACCESSIBILITY MANAGEMENT
  // =========================
  const updateAccessibility = useCallback((key, value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        accessibility: { ...prev.accessibility, [key]: value }
      };
      localStorage.setItem('gateprep_settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // AUTHENTICATION MANAGEMENT
  // =========================
  const signIn = useCallback((userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('gateprep_user', JSON.stringify(userData));
      localStorage.setItem('gateprep_auth', 'true');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('gateprep_user');
    localStorage.removeItem('gateprep_auth');
  }, []);

  const updateUser = useCallback((userData) => {
    try {
      setUser(prev => ({ ...prev, ...userData }));
      localStorage.setItem('gateprep_user', JSON.stringify({ ...user, ...userData }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }, [user]);

  // =========================
  // RESET SETTINGS
  // =========================
  const resetSettings = useCallback(() => {
    try {
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem('gateprep_settings', JSON.stringify(DEFAULT_SETTINGS));
      localStorage.setItem('gateprep_theme', DEFAULT_SETTINGS.theme);
    } catch (error) {
      console.error('Error resetting settings:', error);
    }
  }, []);

  // =========================
  // CLEAR ALL DATA
  // =========================
  const clearAllData = useCallback(() => {
    try {
      // Clear GATEPrep-specific data only
      const keysToRemove = [
        'gateprep_settings',
        'gateprep_theme',
        'gateprep_user',
        'gateprep_auth',
        'gateprep_notifications',
        'gateprep_study_preferences',
        'gateprep_exam_preferences',
        'gateprep_practice_progress',
        'gateprep_mocktest_progress',
        'gateprep_planner_data',
        'gateprep_notes',
      ];
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Reset state
      setSettings(DEFAULT_SETTINGS);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }, []);

  // =========================
  // EXPORT DATA
  // =========================
  const exportData = useCallback(() => {
    try {
      const data = {
        settings: settings,
        user: user,
        isAuthenticated: isAuthenticated,
        exportDate: new Date().toISOString(),
        version: '1.0.0',
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gateprep-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting data:', error);
      return false;
    }
  }, [settings, user, isAuthenticated]);

  // =========================
  // IMPORT DATA
  // =========================
  const importData = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          // Validate data structure
          if (!data.version || !data.settings) {
            throw new Error('Invalid data format');
          }
          
          // Restore settings
          setSettings(data.settings);
          localStorage.setItem('gateprep_settings', JSON.stringify(data.settings));
          
          if (data.theme) {
            setTheme(data.theme);
          }
          
          // Restore user if exists
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('gateprep_user', JSON.stringify(data.user));
          }
          
          // Restore auth state
          if (data.isAuthenticated) {
            setIsAuthenticated(true);
            localStorage.setItem('gateprep_auth', 'true');
          }
          
          resolve(true);
        } catch (error) {
          console.error('Error importing data:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  }, [setTheme]);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    // State
    settings,
    user,
    isAuthenticated,
    isLoading,
    
    // Theme
    theme: settings.theme,
    setTheme,
    
    // Notifications
    notifications: settings.notifications,
    updateNotification,
    updateAllNotifications,
    
    // Study Preferences
    studyPreferences: settings.studyPreferences,
    updateStudyPreference,
    
    // Exam Preferences
    examPreferences: settings.examPreferences,
    updateExamPreference,
    
    // Display
    display: settings.display,
    updateDisplay,
    
    // Accessibility
    accessibility: settings.accessibility,
    updateAccessibility,
    
    // Auth
    signIn,
    signOut,
    updateUser,
    
    // Settings Management
    saveSettings,
    resetSettings,
    clearAllData,
    exportData,
    importData,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export default SettingsContext;
