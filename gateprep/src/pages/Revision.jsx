import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useRevision } from '../context/RevisionContext';
import { useAnalytics } from '../context/AnalyticsContext';
import RevisionStats from '../components/revision/RevisionStats';
import RevisionQueue from '../components/revision/RevisionQueue';
import WeakTopicCard from '../components/revision/WeakTopicCard';
import QuickRevisionCard from '../components/revision/QuickRevisionCard';

const Revision = () => {
  const navigate = useNavigate();
  const { revision, getDueToday, getWeakTopics, markAsRevised } = useRevision();
  const { analytics } = useAnalytics();

  const [activeTab, setActiveTab] = useState('queue');
  const [stats, setStats] = useState({
    topicsDueToday: 0,
    weakTopics: 0,
    revisedThisWeek: 0,
    revisionAccuracy: 0,
  });

  useEffect(() => {
    const dueToday = getDueToday();
    const weakTopics = getWeakTopics();
    
    setStats({
      topicsDueToday: dueToday.length,
      weakTopics: weakTopics.length,
      revisedThisWeek: revision.stats.totalTopicsRevised || 0,
      revisionAccuracy: revision.stats.revisionAccuracy || 0,
    });
  }, [revision, getDueToday, getWeakTopics]);

  const handleStartRevision = (item) => {
    navigate(`/revision/${item.id}`);
  };

  const handleViewTopic = (item) => {
    // Navigate to subject detail page
    const slug = item.subject.toLowerCase().replace(/\s+/g, '-');
    navigate(`/subjects/${slug}`);
  };

  const handleMarkRevised = (itemId) => {
    markAsRevised(itemId);
  };

  const handleReviseWeakTopic = (topic) => {
    navigate(`/revision/${topic.id}`);
  };

  const handleOpenQuickRevision = (type) => {
    switch (type) {
      case 'formulas':
        navigate('/notes');
        break;
      case 'concepts':
        navigate('/subjects');
        break;
      case 'notes':
        navigate('/notes');
        break;
      case 'mistakes':
        navigate('/mistakes');
        break;
      case 'pyq':
        navigate('/practice');
        break;
      case 'topics':
        navigate('/revision');
        break;
      default:
        navigate('/revision');
    }
  };

  const quickRevisionCards = [
    {
      type: 'formulas',
      title: 'Formulas',
      description: 'Quick formula reference',
      count: 0,
    },
    {
      type: 'concepts',
      title: 'Important Concepts',
      description: 'Key concept summaries',
      count: 0,
    },
    {
      type: 'notes',
      title: 'Short Notes',
      description: 'Your revision notes',
      count: 0,
    },
    {
      type: 'mistakes',
      title: 'Previous Mistakes',
      description: 'Review your mistakes',
      count: 0,
    },
    {
      type: 'pyq',
      title: 'PYQ Revision',
      description: 'Previous year questions',
      count: 0,
    },
    {
      type: 'topics',
      title: 'Frequently Asked Topics',
      description: 'High-yield topics',
      count: 0,
    },
  ];

  const tabs = [
    { id: 'queue', label: 'Revision Queue', icon: 'List' },
    { id: 'weak', label: 'Weak Topics', icon: 'AlertTriangle' },
    { id: 'quick', label: 'Quick Revision', icon: 'Zap' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Revision Center
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Track and manage your revision schedule
        </p>
      </div>

      {/* Stats */}
      <RevisionStats stats={stats} />

      {/* Tabs */}
      <div className="mt-6">
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
          {tabs.map((tab) => {
            const Icon = Icons[tab.icon];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-colors
                  border-b-2
                  ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'queue' && (
          <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Revision Queue
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Topics scheduled for revision
              </p>
            </div>
            <div className="p-6">
              <RevisionQueue
                items={revision.revisionItems}
                onStartRevision={handleStartRevision}
                onViewTopic={handleViewTopic}
                onMarkRevised={handleMarkRevised}
              />
            </div>
          </div>
        )}

        {activeTab === 'weak' && (
          <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Weak Topics
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Topics that need more attention
              </p>
            </div>
            <div className="p-6">
              {revision.weakTopics.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {revision.weakTopics.map((topic) => (
                    <WeakTopicCard
                      key={topic.id}
                      topic={topic}
                      onRevise={handleReviseWeakTopic}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900/50">
                  <Icons.CheckCircle className="h-12 w-12 text-emerald-500" />
                  <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    No weak topics identified
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                    Keep practicing to maintain strong performance
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'quick' && (
          <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Quick Revision
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Access revision resources quickly
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quickRevisionCards.map((card) => (
                  <QuickRevisionCard
                    key={card.type}
                    card={card}
                    onOpen={handleOpenQuickRevision}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Revision;
