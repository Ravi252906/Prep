import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const PlannerCalendar = ({ tasks, onDateClick }) => {
  const { planner } = useAnalytics();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-slate-400" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-slate-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-slate-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first day of the month */}
        {[...Array(startingDayOfWeek)].map((_, i) => (
          <div key={`empty-${i}`} className="h-24" />
        ))}

        {/* Days of the month */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isToday = date.toDateString() === today.toDateString();
          const dayTasks = getTasksForDate(date);
          const completedTasks = dayTasks.filter(t => t.completed).length;
          const hasTasks = dayTasks.length > 0;

          return (
            <button
              key={day}
              onClick={() => onDateClick?.(date)}
              className={`
                h-24 rounded-lg p-2 text-left transition-all hover:bg-gray-50 dark:hover:bg-slate-800
                ${isToday ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500' : 'border border-gray-200 dark:border-slate-700'}
              `}
            >
              <div className={`text-sm font-medium ${isToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-slate-100'}`}>
                {day}
              </div>
              {hasTasks && (
                <div className="mt-1 space-y-1">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-slate-400">{dayTasks.length}</span>
                  </div>
                  {completedTasks > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-success-500" />
                      <span className="text-xs text-success-600 dark:text-success-400">{completedTasks}</span>
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlannerCalendar;
