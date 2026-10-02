import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Play } from 'lucide-react';
import Button from './ui/Button';

const CountdownCard = ({ examDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = examDate - new Date();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [examDate]);

  const examDateFormatted = examDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-8 text-white shadow-xl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {getGreeting()}, Ravi 👋
            </h1>
            <p className="text-primary-100 text-sm">Let's continue your GATE preparation</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={Play}
            className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          >
            Continue Studying
          </Button>
        </div>

        {/* Exam info */}
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary-200" />
          <span className="text-primary-100 text-sm">GATE 2027 Exam</span>
          <span className="text-primary-200 mx-2">•</span>
          <span className="text-white font-medium">{examDateFormatted}</span>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-2">
                <p className="text-4xl font-bold">{item.value}</p>
              </div>
              <p className="text-xs text-primary-200 uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownCard;
