import React, { useState, useEffect } from 'react';
import { Clock, Pause, Play, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

const QuestionTimer = ({ duration, onTimeUp, autoStart = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(autoStart);
  };

  const getProgressColor = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage > 50) return 'bg-success-500';
    if (percentage > 25) return 'bg-warning-500';
    return 'bg-error-500';
  };

  if (duration === 0) {
    return null;
  }

  const percentage = duration > 0 ? (timeLeft / duration) * 100 : 0;

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-600" />
          <span className="font-semibold text-gray-900">Timer</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={isRunning ? Pause : Play}
            onClick={toggleTimer}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={resetTimer}
          />
        </div>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900 font-mono">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {timeLeft <= 60 && (
        <div className="text-center text-sm text-error-600 font-medium">
          Time running out!
        </div>
      )}
    </div>
  );
};

export default QuestionTimer;
