import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useRevision } from '../../context/RevisionContext';
import { useAnalytics } from '../../context/AnalyticsContext';

const SmartStudyCard = () => {
  const navigate = useNavigate();
  const { getDueToday, getWeakTopics } = useRevision();
  const { analytics } = useAnalytics();

  const dueToday = getDueToday();
  const weakTopics = getWeakTopics();

  // Smart recommendation logic
  const getRecommendation = () => {
    // Priority 1: Overdue revisions
    if (dueToday.length > 0) {
      const item = dueToday[0];
      return {
        type: 'revision',
        title: item.topicName,
        subject: item.subject,
        reason: `Revision is due today`,
        estimatedTime: '25 min',
        action: () => navigate(`/revision/${item.id}`),
        icon: 'Clock',
        color: 'amber',
      };
    }

    // Priority 2: Weak topics
    if (weakTopics.length > 0) {
      const topic = weakTopics[0];
      return {
        type: 'weak_topic',
        title: topic.topicName,
        subject: topic.subject,
        reason: `Accuracy is ${topic.accuracy}% - needs attention`,
        estimatedTime: '30 min',
        action: () => navigate(`/revision/${topic.id}`),
        icon: 'AlertTriangle',
        color: 'red',
      };
    }

    // Priority 3: Low progress subject
    const subjects = Object.entries(analytics.subjectPerformance);
    const lowProgressSubjects = subjects.filter(([_, data]) => data.progress < 50);
    if (lowProgressSubjects.length > 0) {
      const [subject, data] = lowProgressSubjects[0];
      return {
        type: 'subject',
        title: subject,
        subject: subject,
        reason: `Only ${data.progress}% complete - focus on this subject`,
        estimatedTime: '45 min',
        action: () => navigate(`/subjects/${subject.toLowerCase().replace(/\s+/g, '-')}`),
        icon: 'BookOpen',
        color: 'blue',
      };
    }

    // Default: Practice
    return {
      type: 'practice',
      title: 'Practice Questions',
      subject: 'General',
      reason: 'Keep your skills sharp with regular practice',
      estimatedTime: '30 min',
      action: () => navigate('/practice'),
      icon: 'PenTool',
      color: 'emerald',
    };
  };

  const recommendation = getRecommendation();

  const colorClasses = {
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-900/30',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-900/30',
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-900/30',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-900/30',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
  };

  const colors = colorClasses[recommendation.color];
  const Icon = Icons[recommendation.icon];

  return (
    <div
      className={`
        ${colors.bg}
        rounded-xl
        border
        ${colors.border}
        p-4
        shadow-sm
        transition-all
        hover:shadow-md
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          ${colors.iconBg}
          rounded-lg
          p-2
        `}>
          <Icons.Brain className={`h-5 w-5 ${colors.text}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              What should I study now?
            </h3>
            <span className={`
              inline-flex
              items-center
              rounded-full
              px-2
              py-0.5
              text-[10px]
              font-medium
              ${colors.text}
            `}>
              AI Recommended
            </span>
          </div>
          
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
            {recommendation.title}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
            {recommendation.subject}
          </p>
          
          <div className="flex items-center gap-2 mb-3">
            <Icon className={`h-3 w-3 ${colors.text}`} />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {recommendation.reason}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
              <Icons.Clock className="h-3 w-3" />
              <span>{recommendation.estimatedTime}</span>
            </div>
            <button
              onClick={recommendation.action}
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartStudyCard;
