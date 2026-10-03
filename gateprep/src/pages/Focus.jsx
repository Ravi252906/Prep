import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Target, Sparkles } from 'lucide-react';
import { subjectsData } from '../data/subjects';
import { useStudySession } from '../context/StudySessionContext';
import { useGamification } from '../context/GamificationContext';

const Focus = () => {
  const { startSession, endSession, currentSession } = useStudySession();
  const { addXP, updateStreak } = useGamification();
  const [selectedSubject, setSelectedSubject] = useState('DBMS');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [duration, setDuration] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [sessionComplete, setSessionComplete] = useState(false);

  const durations = [
    { label: '25 min', value: 25 },
    { label: '45 min', value: 45 },
    { label: '60 min', value: 60 },
    { label: '90 min', value: 90 },
  ];

  const subjects = subjectsData.map(s => s.name);

  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const handleStart = () => {
    setIsRunning(true);
    startSession({
      subject: selectedSubject,
      topic: selectedTopic,
      duration: duration,
      startTime: new Date().toISOString(),
    });
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(duration * 60);
    setSessionComplete(false);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setSessionComplete(true);

    endSession({
      duration: duration,
      subject: selectedSubject,
      topic: selectedTopic,
    });

    addXP(duration * 2);
    updateStreak();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeRemaining) / (duration * 60)) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Focus Mode
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Distraction-free study sessions
          </p>
        </div>

        {!sessionComplete ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Topic (Optional)
                </label>
                <input
                  type="text"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="Specific topic to focus on"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Session Duration
              </label>
              <div className="flex flex-wrap gap-3">
                {durations.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => {
                      if (!isRunning) {
                        setDuration(d.value);
                        setTimeRemaining(d.value * 60);
                      }
                    }}
                    disabled={isRunning}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      duration === d.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    } disabled:opacity-50`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="relative inline-block">
                <svg className="w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-200 dark:text-slate-700"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                    className="text-blue-600 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-slate-800 dark:text-slate-200">
                    {formatTime(timeRemaining)}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    {isRunning ? 'Focusing...' : 'Ready to start'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Start Session
                </button>
              ) : (
                <>
                  <button
                    onClick={handlePause}
                    className="flex items-center gap-2 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors"
                  >
                    <Pause className="w-5 h-5" />
                    Pause
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-8 text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Session Complete!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Great job! You focused for {duration} minutes on {selectedSubject}.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+{duration * 2}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">XP Earned</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{duration}m</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Study Time</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors mx-auto"
            >
              <Target className="w-5 h-5" />
              Start New Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Focus;
