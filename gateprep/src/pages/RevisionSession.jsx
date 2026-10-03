import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useRevision } from '../context/RevisionContext';
import { useGamification } from '../context/GamificationContext';
import { useStudySession } from '../context/StudySessionContext';

const RevisionSession = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { revision, markAsRevised } = useRevision();
  const { addXP, updateStudyStats } = useGamification();
  const { startSession, stopSession } = useStudySession();

  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeSection, setActiveSection] = useState('concepts');
  const [sessionStarted, setSessionStarted] = useState(false);

  const revisionItem = revision.revisionItems.find(item => item.id === parseInt(topicId));

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    setIsTimerRunning(true);
    startSession({
      type: 'revision',
      subject: revisionItem?.subject,
      topic: revisionItem?.topicName,
      duration: 25,
    });
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResumeTimer = () => {
    setIsTimerRunning(true);
  };

  const handleFinishRevision = () => {
    setIsTimerRunning(false);
    stopSession(true);
    
    // Mark as revised
    markAsRevised(parseInt(topicId));
    
    // Award XP
    addXP(20, 'Completed revision');
    updateStudyStats({ revisionsCompleted: (revision.stats.totalTopicsRevised || 0) + 1 });
    
    navigate('/revision');
  };

  const handleMarkDifficult = () => {
    // Mark topic as difficult (could integrate with weak topics)
    alert('Topic marked as difficult');
  };

  const handlePrevious = () => {
    navigate('/revision');
  };

  const sections = [
    { id: 'concepts', label: 'Key Concepts', icon: 'Lightbulb' },
    { id: 'formulas', label: 'Formulas', icon: 'FileText' },
    { id: 'notes', label: 'Short Notes', icon: 'StickyNote' },
    { id: 'mistakes', label: 'Common Mistakes', icon: 'AlertTriangle' },
    { id: 'practice', label: 'Practice Questions', icon: 'PenTool' },
    { id: 'history', label: 'Revision History', icon: 'History' },
  ];

  if (!revisionItem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)]">
        <Icons.AlertTriangle className="h-16 w-16 text-slate-400" />
        <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
          Revision Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          This revision item does not exist or has been deleted.
        </p>
        <button
          onClick={() => navigate('/revision')}
          className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Icons.ArrowLeft className="mr-2 h-4 w-4" />
          Back to Revision Center
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={handlePrevious}
          className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <Icons.ArrowLeft className="mr-2 h-4 w-4" />
          Back to Revision Center
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {revisionItem.topicName}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {revisionItem.subject}
            </p>
          </div>
          
          {sessionStarted && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 dark:bg-slate-800">
                <Icons.Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <span className="text-lg font-mono font-semibold text-slate-900 dark:text-slate-100">
                  {formatTime(timer)}
                </span>
              </div>
              
              {!isTimerRunning ? (
                <button
                  onClick={handleResumeTimer}
                  className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                  <Icons.Play className="mr-2 h-4 w-4" />
                  Resume
                </button>
              ) : (
                <button
                  onClick={handlePauseTimer}
                  className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                >
                  <Icons.Pause className="mr-2 h-4 w-4" />
                  Pause
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Progress
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {revisionItem.progress || 0}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-blue-600 dark:bg-blue-500 transition-all"
            style={{ width: `${revisionItem.progress || 0}%` }}
          />
        </div>
      </div>

      {!sessionStarted ? (
        /* Start Session Card */
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Icons.BookOpen className="mx-auto h-16 w-16 text-blue-600 dark:text-blue-400" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Ready to Revise?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Start your revision session for {revisionItem.topicName}. This will track your revision time and award XP upon completion.
          </p>
          <button
            onClick={handleStartSession}
            className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Icons.Play className="mr-2 h-4 w-4" />
            Start Revision Session
          </button>
        </div>
      ) : (
        <>
          {/* Section Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
              {sections.map((section) => {
                const Icon = Icons[section.icon];
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
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
                      whitespace-nowrap
                      ${
                        activeSection === section.id
                          ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                          : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Content */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            {activeSection === 'concepts' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Key Concepts
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Concept 1</h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Add your key concepts here for revision.
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">Concept 2</h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Add more concepts as needed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'formulas' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Important Formulas
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
                    <p className="font-mono text-sm text-slate-900 dark:text-slate-100">
                      Formula 1: Add your formulas here
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
                    <p className="font-mono text-sm text-slate-900 dark:text-slate-100">
                      Formula 2: Add more formulas
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notes' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Short Notes
                </h3>
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Add your short notes here for quick revision.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'mistakes' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Common Mistakes
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                    <p className="text-sm text-red-900 dark:text-red-400">
                      Mistake 1: Avoid this common error
                    </p>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                    <p className="text-sm text-red-900 dark:text-red-400">
                      Mistake 2: Watch out for this
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'practice' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Practice Questions
                </h3>
                <button
                  onClick={() => navigate('/practice')}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <Icons.PenTool className="mr-2 h-4 w-4" />
                  Start Practice
                </button>
              </div>
            )}

            {activeSection === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Revision History
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        Revision Level {revisionItem.revisionLevel || 0}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {revisionItem.lastRevised
                          ? new Date(revisionItem.lastRevised).toLocaleDateString()
                          : 'Not revised yet'}
                      </p>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {revisionItem.revisionLevel || 0}/6
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              <button
                onClick={handleMarkDifficult}
                className="inline-flex items-center rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/20"
              >
                <Icons.AlertTriangle className="mr-2 h-4 w-4" />
                Mark Difficult
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Icons.ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
              <button
                onClick={handleFinishRevision}
                className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                <Icons.Check className="mr-2 h-4 w-4" />
                Finish Revision
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RevisionSession;
