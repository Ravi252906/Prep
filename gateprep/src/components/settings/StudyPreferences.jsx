import React from 'react';
import { Calendar, Clock, Target, BookOpen, CheckCircle } from 'lucide-react';
import SettingRow from './SettingRow';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const StudyPreferences = () => {
  const { studyPreferences, updateStudyPreference } = useSettings();
  const { success } = useToast();

  const handleChange = (key, value) => {
    updateStudyPreference(key, value);
    success('Study preference updated');
  };

  const handleDayToggle = (day) => {
    const currentDays = studyPreferences.weeklyStudyDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    updateStudyPreference('weeklyStudyDays', newDays);
    success('Study days updated');
  };

  const days = [
    { id: 'monday', label: 'Mon' },
    { id: 'tuesday', label: 'Tue' },
    { id: 'wednesday', label: 'Wed' },
    { id: 'thursday', label: 'Thu' },
    { id: 'friday', label: 'Fri' },
    { id: 'saturday', label: 'Sat' },
    { id: 'sunday', label: 'Sun' },
  ];

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Study Preferences</h2>

        {/* Target Year */}
        <SettingRow
          label="Target GATE Year"
          description="The year you're planning to take the GATE exam"
          icon={<Calendar className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={studyPreferences.targetYear}
            onChange={(e) => handleChange('targetYear', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>
        </SettingRow>

        {/* Study Duration */}
        <SettingRow
          label="Study Duration"
          description="How many months you plan to prepare"
          icon={<Clock className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={studyPreferences.studyDuration}
            onChange={(e) => handleChange('studyDuration', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="9">9 months</option>
            <option value="12">12 months</option>
            <option value="18">18 months</option>
          </select>
        </SettingRow>

        {/* Daily Study Goal */}
        <SettingRow
          label="Daily Study Goal"
          description="Target hours of study per day"
          icon={<Target className="w-5 h-5 text-success-500" />}
        >
          <select
            value={studyPreferences.dailyStudyGoal}
            onChange={(e) => handleChange('dailyStudyGoal', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="2">2 hours</option>
            <option value="4">4 hours</option>
            <option value="6">6 hours</option>
            <option value="8">8 hours</option>
            <option value="10">10 hours</option>
          </select>
        </SettingRow>

        {/* Preferred Study Time */}
        <SettingRow
          label="Preferred Study Time"
          description="When do you prefer to study?"
          icon={<Clock className="w-5 h-5 text-warning-500" />}
        >
          <select
            value={studyPreferences.preferredStudyTime}
            onChange={(e) => handleChange('preferredStudyTime', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="morning">Morning (6 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
            <option value="evening">Evening (6 PM - 12 AM)</option>
            <option value="night">Night (12 AM - 6 AM)</option>
          </select>
        </SettingRow>

        {/* Weekly Study Days */}
        <div className="py-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-medium text-gray-900">Weekly Study Days</p>
              <p className="text-sm text-gray-500 mt-1">Select the days you plan to study</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {days.map((day) => {
              const isSelected = studyPreferences.weeklyStudyDays?.includes(day.id);
              return (
                <button
                  key={day.id}
                  onClick={() => handleDayToggle(day.id)}
                  className={`
                    w-10 h-10 rounded-lg font-medium transition-all
                    ${isSelected
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Preference */}
        <SettingRow
          label="Difficulty Preference"
          description="Preferred difficulty level for practice questions"
          icon={<Target className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={studyPreferences.difficultyPreference}
            onChange={(e) => handleChange('difficultyPreference', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="mixed">Mixed</option>
          </select>
        </SettingRow>

        {/* Revision Reminders */}
        <SettingRow
          label="Revision Reminders"
          description="Get reminded to revise previously studied topics"
          icon={<BookOpen className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={studyPreferences.revisionReminders ? 'enabled' : 'disabled'}
            onChange={(e) => handleChange('revisionReminders', e.target.value === 'enabled')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </SettingRow>
      </div>

      <div className="card p-6 bg-success-50 border-success-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-success-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-success-900">Preferences Saved</h3>
            <p className="text-sm text-success-700 mt-1">
              Your study preferences are used to personalize your dashboard, planner, and practice sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPreferences;
