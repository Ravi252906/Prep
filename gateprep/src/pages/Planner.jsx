import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Target, Clock, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAnalytics } from '../context/AnalyticsContext';
import PlannerTask from '../components/planner/PlannerTask';
import PlannerCalendar from '../components/planner/PlannerCalendar';
import RevisionTracker from '../components/planner/RevisionTracker';
import WeeklyGoals from '../components/analytics/WeeklyGoals';
import StudyStreak from '../components/analytics/StudyStreak';
import ProgressBar from '../components/ui/ProgressBar';

const Planner = () => {
  const { planner, addTask, updateTask, deleteTask, completeTask, updateWeeklyGoals } = useAnalytics();
  const { tasks, weeklyGoals, weeklyProgress, studyStreak } = planner;
  
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskForm, setTaskForm] = useState({
    title: '',
    subject: '',
    topic: '',
    type: 'learn',
    duration: 1,
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
  });

  const handleAddTask = () => {
    addTask(taskForm);
    setTaskForm({
      title: '',
      subject: '',
      topic: '',
      type: 'learn',
      duration: 1,
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
    });
    setShowAddTask(false);
  };

  const handleEditTask = (task) => {
    setTaskForm(task);
    setShowAddTask(true);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleCompleteTask = (taskId) => {
    completeTask(taskId);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Filter tasks for this date
  };

  // Filter tasks for today
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.dueDate === today);
  const completedToday = todayTasks.filter(task => task.completed).length;
  const totalToday = todayTasks.length;
  const todayProgress = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  // Calculate daily progress
  const dailyTarget = 4; // hours
  const hoursCompleted = weeklyProgress.studyHours; // Simplified for demo
  const dailyProgress = Math.min(100, Math.round((hoursCompleted / dailyTarget) * 100));

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Study Planner</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Organize your study schedule and track goals</p>
        </div>
        <Button variant="primary" icon={Plus} size="md" onClick={() => setShowAddTask(true)}>
          Add Task
        </Button>
      </div>

      {/* Daily Study Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
              <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-slate-400">Daily Target</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-slate-100">{dailyTarget}h</p>
          <ProgressBar progress={dailyProgress} size="sm" className="mt-3" />
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{hoursCompleted}h completed today</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-success-50 dark:bg-success-900/20 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-success-600 dark:text-success-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-slate-400">Tasks Today</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-slate-100">{completedToday}/{totalToday}</p>
          <ProgressBar progress={todayProgress} size="sm" className="mt-3" />
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{totalToday - completedToday} pending</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-warning-50 dark:bg-warning-900/20 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-warning-600 dark:text-warning-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-slate-400">Study Time</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-slate-100">{hoursCompleted}h</p>
          <ProgressBar progress={dailyProgress} size="sm" className="mt-3" />
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{dailyTarget - hoursCompleted}h remaining</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <PlannerCalendar tasks={tasks} onDateClick={handleDateClick} />
        </div>

        {/* Study Streak */}
        <div>
          <StudyStreak
            currentStreak={studyStreak.currentStreak || 15}
            longestStreak={studyStreak.longestStreak || 15}
            lastStudyDate={studyStreak.lastStudyDate}
          />
        </div>
      </div>

      {/* Today's Tasks */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Today's Tasks</h2>
        {todayTasks.length === 0 ? (
          <div className="card p-8 text-center">
            <CalendarIcon className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-1">No tasks for today</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Add a task to get started with your study plan
            </p>
            <Button variant="primary" icon={Plus} onClick={() => setShowAddTask(true)}>
              Add First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {todayTasks.map(task => (
              <PlannerTask
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onComplete={handleCompleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* All Tasks */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">All Tasks</h2>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-gray-500 dark:text-slate-400">No tasks yet. Add your first task!</p>
            </div>
          ) : (
            tasks.map(task => (
              <PlannerTask
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onComplete={handleCompleteTask}
              />
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <WeeklyGoals goals={weeklyGoals} progress={weeklyProgress} />

        {/* Revision Tracker */}
        <RevisionTracker />
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
              {taskForm.id ? 'Edit Task' : 'Add New Task'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  placeholder="Enter task title"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={taskForm.subject}
                  onChange={(e) => setTaskForm({ ...taskForm, subject: e.target.value })}
                  placeholder="Enter subject"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Type</label>
                  <select
                    value={taskForm.type}
                    onChange={(e) => setTaskForm({ ...taskForm, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-700"
                  >
                    <option value="learn">Learn</option>
                    <option value="practice">Practice</option>
                    <option value="revision">Revision</option>
                    <option value="pyq">PYQ</option>
                    <option value="mock_test">Mock Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Duration (hours)</label>
                  <input
                    type="number"
                    value={taskForm.duration}
                    onChange={(e) => setTaskForm({ ...taskForm, duration: parseInt(e.target.value) })}
                    min="0.5"
                    step="0.5"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-700"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="secondary" onClick={() => setShowAddTask(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddTask}>
                {taskForm.id ? 'Update Task' : 'Add Task'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;
