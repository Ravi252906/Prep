import React, { useState } from 'react';
import * as Icons from 'lucide-react';

const StreakCalendar = ({ calendarData, currentStreak, longestStreak }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const getIntensityColor = (intensity) => {
    const colors = {
      0: 'bg-slate-100 dark:bg-slate-800',
      1: 'bg-emerald-200 dark:bg-emerald-900/40',
      2: 'bg-emerald-400 dark:bg-emerald-700/60',
      3: 'bg-emerald-600 dark:bg-emerald-600',
      4: 'bg-emerald-800 dark:bg-emerald-500',
    };
    return colors[intensity] || colors[0];
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar grid for last 12 weeks
  const generateCalendarGrid = () => {
    const weeks = [];
    const today = new Date();
    
    for (let week = 11; week >= 0; week--) {
      const weekDays = [];
      for (let day = 6; day >= 0; day--) {
        const date = new Date(today);
        date.setDate(date.getDate() - (week * 7 + (6 - day)));
        const dateStr = date.toDateString();
        const dayData = calendarData[dateStr] || { intensity: 0, hours: 0 };
        
        weekDays.push({
          date: dateStr,
          ...dayData,
        });
      }
      weeks.push(weekDays);
    }
    
    return weeks;
  };

  const weeks = generateCalendarGrid();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Study Activity
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Last 12 weeks
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {currentStreak}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Current
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {longestStreak}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Best
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[300px]">
          {/* Day labels */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div />
            {days.map((day) => (
              <div
                key={day}
                className="text-[10px] font-medium text-slate-500 dark:text-slate-500 text-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Weeks */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-8 gap-1">
              <div className="text-[10px] text-slate-500 dark:text-slate-500 flex items-center">
                {weekIndex % 2 === 0 ? months[new Date(week[0].date).getMonth()] : ''}
              </div>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`
                    h-3
                    w-3
                    rounded-sm
                    cursor-pointer
                    transition-all
                    hover:ring-2
                    hover:ring-blue-500
                    ${getIntensityColor(day.intensity)}
                  `}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  title={`${day.date}: ${day.hours} hours`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-3">
        <span className="text-[10px] text-slate-500 dark:text-slate-500">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-3 w-3 rounded-sm ${getIntensityColor(level)}`}
          />
        ))}
        <span className="text-[10px] text-slate-500 dark:text-slate-500">More</span>
      </div>

      {/* Tooltip */}
      {hoveredDay && hoveredDay.intensity > 0 && (
        <div className="absolute z-10 mt-2 rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg">
          <p className="font-medium">
            {new Date(hoveredDay.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
          <p className="text-slate-300">
            {hoveredDay.hours} hours studied
          </p>
          <p className="text-slate-300">
            {hoveredDay.sessionsCount} sessions
          </p>
        </div>
      )}
    </div>
  );
};

export default StreakCalendar;
