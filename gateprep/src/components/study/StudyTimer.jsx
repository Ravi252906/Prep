import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

const StudyTimer = ({ onStartSession, onPauseSession, onResumeSession, onStopSession }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(25);
  const intervalRef = useRef(null);

  const presets = [25, 45, 60, 90];

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    onStartSession && onStartSession(selectedPreset);
  };

  const handlePause = () => {
    setIsPaused(true);
    onPauseSession && onPauseSession();
  };

  const handleResume = () => {
    setIsPaused(false);
    onResumeSession && onResumeSession();
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(selectedPreset * 60);
    onStopSession && onStopSession(false);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(selectedPreset * 60);
    onStopSession && onStopSession(true);
  };

  const handlePresetChange = (minutes) => {
    if (!isRunning) {
      setSelectedPreset(minutes);
      setTimeLeft(minutes * 60);
    }
  };

  const progress = ((selectedPreset * 60 - timeLeft) / (selectedPreset * 60)) * 100;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Study Timer
        </h3>
        <div className="flex items-center gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetChange(preset)}
              disabled={isRunning}
              className={`
                rounded-lg
                px-3
                py-1.5
                text-xs
                font-medium
                transition-colors
                ${
                  selectedPreset === preset && !isRunning
                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }
                ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {preset}m
            </button>
          ))}
        </div>
      </div>

      {/* Timer Display */}
      <div className="relative mb-6">
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="h-48 w-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-200 dark:text-slate-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="text-blue-600 dark:text-blue-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-mono font-bold text-slate-900 dark:text-slate-100">
                {formatTime(timeLeft)}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-500">
                {isPaused ? 'Paused' : isRunning ? 'Focusing' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Icons.Play className="mr-2 h-4 w-4" />
            Start
          </button>
        ) : (
          <>
            {!isPaused ? (
              <button
                onClick={handlePause}
                className="inline-flex items-center rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
              >
                <Icons.Pause className="mr-2 h-4 w-4" />
                Pause
              </button>
            ) : (
              <button
                onClick={handleResume}
                className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                <Icons.Play className="mr-2 h-4 w-4" />
                Resume
              </button>
            )}
            <button
              onClick={handleStop}
              className="inline-flex items-center rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Icons.Square className="mr-2 h-4 w-4" />
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyTimer;
