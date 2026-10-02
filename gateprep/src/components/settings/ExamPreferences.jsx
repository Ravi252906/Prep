import React from 'react';
import { Clock, FileText, AlertTriangle, Eye, EyeOff, CheckCircle } from 'lucide-react';
import ToggleSwitch from '../ui/ToggleSwitch';
import SettingRow from './SettingRow';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const ExamPreferences = () => {
  const { examPreferences, updateExamPreference } = useSettings();
  const { success } = useToast();

  const handleChange = (key, value) => {
    updateExamPreference(key, value);
    success('Exam preference updated');
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Exam Preferences</h2>

        {/* Default Duration */}
        <SettingRow
          label="Default Mock Test Duration"
          description="Default time limit for mock tests (in minutes)"
          icon={<Clock className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={examPreferences.defaultDuration}
            onChange={(e) => handleChange('defaultDuration', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="120">120 minutes</option>
            <option value="150">150 minutes</option>
            <option value="180">180 minutes (GATE standard)</option>
            <option value="210">210 minutes</option>
          </select>
        </SettingRow>

        {/* Default Question Count */}
        <SettingRow
          label="Default Question Count"
          description="Number of questions in mock tests by default"
          icon={<FileText className="w-5 h-5 text-primary-500" />}
        >
          <select
            value={examPreferences.defaultQuestionCount}
            onChange={(e) => handleChange('defaultQuestionCount', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="30">30 questions</option>
            <option value="45">45 questions</option>
            <option value="65">65 questions (GATE standard)</option>
            <option value="85">85 questions</option>
          </select>
        </SettingRow>

        {/* Preferred Question Types */}
        <div className="py-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-medium text-gray-900">Preferred Question Types</p>
              <p className="text-sm text-gray-500 mt-1">Select question types to include in mock tests</p>
            </div>
          </div>
          <div className="flex gap-3 mt-3 flex-wrap">
            {[
              { id: 'mcq', label: 'MCQ (Single Correct)' },
              { id: 'msq', label: 'MSQ (Multiple Correct)' },
              { id: 'nat', label: 'NAT (Numerical Answer)' },
            ].map((type) => {
              const isSelected = examPreferences.preferredQuestionTypes?.includes(type.id);
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    const current = examPreferences.preferredQuestionTypes || [];
                    const newTypes = isSelected
                      ? current.filter(t => t !== type.id)
                      : [...current, type.id];
                    handleChange('preferredQuestionTypes', newTypes);
                  }}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all text-sm
                    ${isSelected
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Show Negative Marking */}
        <SettingRow
          label="Show Negative Marking"
          description="Display negative marking information during tests"
          icon={<AlertTriangle className="w-5 h-5 text-warning-500" />}
        >
          <ToggleSwitch
            checked={examPreferences.showNegativeMarking}
            onChange={(value) => handleChange('showNegativeMarking', value)}
          />
        </SettingRow>

        {/* Auto Submit on Timer */}
        <SettingRow
          label="Auto Submit on Timer Zero"
          description="Automatically submit test when timer reaches zero"
          icon={<Clock className="w-5 h-5 text-error-500" />}
        >
          <ToggleSwitch
            checked={examPreferences.autoSubmitOnTimer}
            onChange={(value) => handleChange('autoSubmitOnTimer', value)}
          />
        </SettingRow>

        {/* Show Explanations After Answer */}
        <SettingRow
          label="Show Explanations After Answer"
          description="Display answer explanations immediately after answering"
          icon={<Eye className="w-5 h-5 text-success-500" />}
        >
          <ToggleSwitch
            checked={examPreferences.showExplanationsAfterAnswer}
            onChange={(value) => handleChange('showExplanationsAfterAnswer', value)}
          />
        </SettingRow>

        {/* Enable Exam Warnings */}
        <SettingRow
          label="Enable Exam Warnings"
          description="Show warnings when attempting risky actions during exam"
          icon={<AlertTriangle className="w-5 h-5 text-warning-500" />}
        >
          <ToggleSwitch
            checked={examPreferences.enableExamWarnings}
            onChange={(value) => handleChange('enableExamWarnings', value)}
          />
        </SettingRow>
      </div>

      <div className="card p-6 bg-primary-50 border-primary-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-primary-900">Preferences Applied</h3>
            <p className="text-sm text-primary-700 mt-1">
              These preferences are used when you start new mock tests and practice sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPreferences;
