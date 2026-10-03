import React, { useState } from 'react';
import { 
  BookOpen, 
  PenTool, 
  RotateCcw, 
  FileText, 
  CheckCircle, 
  Clock, 
  Calendar,
  Trash2,
  Edit,
  Play
} from 'lucide-react';
import Button from '../ui/Button';
import { useAnalytics } from '../../context/AnalyticsContext';

const PlannerTask = ({ task, onEdit, onDelete, onComplete }) => {
  const { completeTask } = useAnalytics();
  const [isCompleting, setIsCompleting] = useState(false);

  const getTaskIcon = (type) => {
    switch (type) {
      case 'learn':
        return BookOpen;
      case 'practice':
        return PenTool;
      case 'revision':
        return RotateCcw;
      case 'pyq':
        return FileText;
      case 'mock_test':
        return CheckCircle;
      default:
        return BookOpen;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-400 border-error-200 dark:border-error-800';
      case 'medium':
        return 'bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-400 border-warning-200 dark:border-warning-800';
      case 'low':
        return 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 border-success-200 dark:border-success-800';
      default:
        return 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-400 border-gray-200 dark:border-slate-700';
    }
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return { text: 'No due date', color: 'text-gray-500' };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: 'Overdue', color: 'text-error-600' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-warning-600' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-warning-600' };
    } else {
      return { text: `Due in ${diffDays} days`, color: 'text-gray-500' };
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await completeTask(task.id);
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const Icon = getTaskIcon(task.type);
  const priorityColor = getPriorityColor(task.priority);
  const dueDateStatus = getDueDateStatus(task.dueDate);

  return (
    <div className={`card p-4 transition-all ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-4">
        {/* Complete Button */}
        <button
          onClick={handleComplete}
          disabled={task.completed || isCompleting}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-success-500 border-success-500 text-white'
              : 'border-gray-300 dark:border-slate-600 hover:border-primary-500'
          }`}
        >
          {task.completed && <CheckCircle className="w-4 h-4" />}
        </button>

        {/* Task Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
              <h4 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-slate-100'}`}>
                {task.title}
              </h4>
            </div>
            <div className="flex items-center gap-1">
              {!task.completed && (
                <>
                  <button
                    onClick={() => onEdit?.(task)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => onDelete?.(task.id)}
                    className="p-1.5 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-error-600" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColor}`}>
              {task.priority}
            </span>
            <div className="flex items-center gap-1 text-gray-500 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>{task.duration}h</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-slate-400">
              <Calendar className="w-4 h-4" />
              <span className={dueDateStatus.color}>{dueDateStatus.text}</span>
            </div>
          </div>

          {task.subject && (
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{task.subject}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlannerTask;
