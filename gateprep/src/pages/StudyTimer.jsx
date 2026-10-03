import React from 'react';
import * as Icons from 'lucide-react';
import { useStudySession } from '../context/StudySessionContext';
import { useGamification } from '../context/GamificationContext';
import { useAnalytics } from '../context/AnalyticsContext';
import StudyTimer from '../components/study/StudyTimer';

const StudyTimerPage = () => {
  const { startSession, pauseSession, resumeSession, stopSession, currentSession } = useStudySession();
  const { addXP, updateStudyStats } = useGamification();
  const { updateOverallProgress } = useAnalytics();

  const handleStartSession = (duration) => {
    startSession({
      type: 'study',
      duration,
    });
  };

  const handlePauseSession = () => {
    pauseSession();
  };

  const handleResumeSession = () => {
    resumeSession();
  };

  const handleStopSession = (completed) => {
    if (completed) {
      // Award XP for completing a study session
      addXP(10, 'Completed study session');
      updateStudyStats({ studyMinutes: (currentSession?.duration || 25) });
      updateOverallProgress({ studyHours: (currentSession?.duration || 25) / 60 });
    }
    stopSession(completed);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Study Timer
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Use the Pomodoro technique to stay focused
        </p>
      </div>

      {/* Timer */}
      <div className="max-w-md mx-auto">
        <StudyTimer
          onStartSession={handleStartSession}
          onPauseSession={handlePauseSession}
          onResumeSession={handleResumeSession}
          onStopSession={handleStopSession}
        />
      </div>

      {/* Tips */}
      <div className="mt-8 max-w-md mx-auto">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Study Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <Icons.Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Work in focused 25-minute intervals</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Take short 5-minute breaks between sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>After 4 sessions, take a longer 15-30 minute break</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Eliminate distractions during focus time</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudyTimerPage;
