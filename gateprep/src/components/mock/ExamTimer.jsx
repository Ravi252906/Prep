import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const ExamTimer = ({ duration, onTimeUp, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / (duration * 60)) * 100;
    if (percentage > 50) return 'text-success-600 bg-success-50';
    if (percentage > 20) return 'text-warning-600 bg-warning-50';
    return 'text-error-600 bg-error-50';
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${getTimerColor()}`}>
      <Clock className="w-5 h-5" />
      <span className="font-mono text-lg font-semibold">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default ExamTimer;
