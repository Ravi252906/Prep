import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// =========================
// DEFAULT ANALYTICS DATA
// =========================
const DEFAULT_ANALYTICS = {
  // Overall Progress
  overallProgress: {
    totalQuestionsSolved: 0,
    pyqsAttempted: 0,
    mockTestsCompleted: 0,
    averageMockScore: 0,
    accuracy: 0,
    studyHours: 0,
    currentStreak: 0,
    strongestSubject: null,
    weakestSubject: null,
    syllabusCompletion: 0,
  },
  
  // Subject Performance
  subjectPerformance: {},
  
  // Topic Performance
  topicPerformance: {},
  
  // Mock Test Results
  mockTestResults: [],
  
  // Practice Results
  practiceResults: [],
  
  // Weekly Study Hours (for charts)
  weeklyStudyHours: [],
  
  // Performance Trends
  performanceTrends: [],
};

// =========================
// DEFAULT PLANNER DATA
// =========================
const DEFAULT_PLANNER = {
  // Tasks
  tasks: [],
  
  // Weekly Goals
  weeklyGoals: {
    studyHours: 20,
    questionsSolved: 100,
    pyqsCompleted: 20,
    mockTestsCompleted: 1,
    topicsCompleted: 5,
  },
  
  // Weekly Progress
  weeklyProgress: {
    studyHours: 0,
    questionsSolved: 0,
    pyqsCompleted: 0,
    mockTestsCompleted: 0,
    topicsCompleted: 0,
  },
  
  // Revision Tracker
  revisionTracker: [],
  
  // Study Streak
  studyStreak: {
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
  },
};

// =========================
// ANALYTICS CONTEXT
// =========================
const AnalyticsContext = createContext(null);

export const AnalyticsProvider = ({ children }) => {
  // =========================
  // STATE
  // =========================
  const [analytics, setAnalytics] = useState(DEFAULT_ANALYTICS);
  const [planner, setPlanner] = useState(DEFAULT_PLANNER);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const loadData = () => {
      try {
        // Load analytics
        const savedAnalytics = localStorage.getItem('gateprep_analytics');
        if (savedAnalytics) {
          const parsed = JSON.parse(savedAnalytics);
          setAnalytics(prev => ({ ...prev, ...parsed }));
        }

        // Load planner
        const savedPlanner = localStorage.getItem('gateprep_planner');
        if (savedPlanner) {
          const parsed = JSON.parse(savedPlanner);
          setPlanner(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Error loading analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // SAVE ANALYTICS
  // =========================
  const saveAnalytics = useCallback((newAnalytics) => {
    try {
      setAnalytics(prev => {
        const updated = { ...prev, ...newAnalytics };
        localStorage.setItem('gateprep_analytics', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error saving analytics:', error);
    }
  }, []);

  // =========================
  // SAVE PLANNER
  // =========================
  const savePlanner = useCallback((newPlanner) => {
    try {
      setPlanner(prev => {
        const updated = { ...prev, ...newPlanner };
        localStorage.setItem('gateprep_planner', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error saving planner:', error);
    }
  }, []);

  // =========================
  // UPDATE OVERALL PROGRESS
  // =========================
  const updateOverallProgress = useCallback((updates) => {
    setAnalytics(prev => {
      const updated = {
        ...prev,
        overallProgress: { ...prev.overallProgress, ...updates }
      };
      localStorage.setItem('gateprep_analytics', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE SUBJECT PERFORMANCE
  // =========================
  const updateSubjectPerformance = useCallback((subjectId, updates) => {
    setAnalytics(prev => {
      const updated = {
        ...prev,
        subjectPerformance: {
          ...prev.subjectPerformance,
          [subjectId]: {
            ...prev.subjectPerformance[subjectId],
            ...updates
          }
        }
      };
      localStorage.setItem('gateprep_analytics', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE TOPIC PERFORMANCE
  // =========================
  const updateTopicPerformance = useCallback((topicId, updates) => {
    setAnalytics(prev => {
      const updated = {
        ...prev,
        topicPerformance: {
          ...prev.topicPerformance,
          [topicId]: {
            ...prev.topicPerformance[topicId],
            ...updates
          }
        }
      };
      localStorage.setItem('gateprep_analytics', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // ADD MOCK TEST RESULT
  // =========================
  const addMockTestResult = useCallback((result) => {
    setAnalytics(prev => {
      const updated = {
        ...prev,
        mockTestResults: [...prev.mockTestResults, result],
        overallProgress: {
          ...prev.overallProgress,
          mockTestsCompleted: prev.overallProgress.mockTestsCompleted + 1,
          averageMockScore: calculateAverageMockScore([...prev.mockTestResults, result]),
        }
      };
      localStorage.setItem('gateprep_analytics', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // ADD PRACTICE RESULT
  // =========================
  const addPracticeResult = useCallback((result) => {
    setAnalytics(prev => {
      const updated = {
        ...prev,
        practiceResults: [...prev.practiceResults, result],
        overallProgress: {
          ...prev.overallProgress,
          totalQuestionsSolved: prev.overallProgress.totalQuestionsSolved + result.totalQuestions,
          accuracy: calculateOverallAccuracy([...prev.practiceResults, result]),
        }
      };
      localStorage.setItem('gateprep_analytics', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // ADD TASK
  // =========================
  const addTask = useCallback((task) => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        tasks: [...prev.tasks, { ...task, id: Date.now(), createdAt: new Date().toISOString() }]
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE TASK
  // =========================
  const updateTask = useCallback((taskId, updates) => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        tasks: prev.tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = useCallback((taskId) => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== taskId)
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // COMPLETE TASK
  // =========================
  const completeTask = useCallback((taskId) => {
    setPlanner(prev => {
      const task = prev.tasks.find(t => t.id === taskId);
      if (!task) return prev;

      const updated = {
        ...prev,
        tasks: prev.tasks.map(t => 
          t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
        ),
        weeklyProgress: {
          ...prev.weeklyProgress,
          studyHours: prev.weeklyProgress.studyHours + (task.duration || 0),
        }
      };
      
      // Update study streak
      const today = new Date().toDateString();
      if (prev.studyStreak.lastStudyDate !== today) {
        const lastDate = prev.studyStreak.lastStudyDate ? new Date(prev.studyStreak.lastStudyDate) : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
          updated.studyStreak = {
            ...prev.studyStreak,
            currentStreak: prev.studyStreak.currentStreak + 1,
            longestStreak: Math.max(prev.studyStreak.longestStreak, prev.studyStreak.currentStreak + 1),
            lastStudyDate: today,
          };
        } else if (!lastDate || lastDate.toDateString() !== today) {
          updated.studyStreak = {
            ...prev.studyStreak,
            currentStreak: 1,
            lastStudyDate: today,
          };
        }
      }
      
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // ADD REVISION
  // =========================
  const addRevision = useCallback((revision) => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        revisionTracker: [...prev.revisionTracker, { ...revision, id: Date.now(), createdAt: new Date().toISOString() }]
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE REVISION
  // =========================
  const updateRevision = useCallback((revisionId, updates) => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        revisionTracker: prev.revisionTracker.map(rev => 
          rev.id === revisionId ? { ...rev, ...updates } : rev
        )
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // DELETE REVISION
  // =========================
  const deleteRevision = useCallback((revisionId) => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        revisionTracker: prev.revisionTracker.filter(rev => rev.id !== revisionId)
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE WEEKLY GOALS
  // =========================
  const updateWeeklyGoals = useCallback((updates) => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        weeklyGoals: { ...prev.weeklyGoals, ...updates }
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE WEEKLY PROGRESS
  // =========================
  const updateWeeklyProgress = useCallback((updates) => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        weeklyProgress: { ...prev.weeklyProgress, ...updates }
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // RESET WEEKLY PROGRESS
  // =========================
  const resetWeeklyProgress = useCallback(() => {
    setPlanner(prev => {
      const updated = {
        ...prev,
        weeklyProgress: {
          studyHours: 0,
          questionsSolved: 0,
          pyqsCompleted: 0,
          mockTestsCompleted: 0,
          topicsCompleted: 0,
        }
      };
      localStorage.setItem('gateprep_planner', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // GENERATE RECOMMENDATIONS
  // =========================
  const generateRecommendations = useCallback(() => {
    const recommendations = [];
    
    // Analyze weak subjects
    const subjects = Object.entries(analytics.subjectPerformance);
    const weakSubjects = subjects
      .filter(([_, data]) => data.accuracy < 60)
      .sort((a, b) => a[1].accuracy - b[1].accuracy)
      .slice(0, 3);
    
    weakSubjects.forEach(([subject, data]) => {
      recommendations.push({
        type: 'weak_subject',
        priority: 'high',
        title: `Focus on ${subject}`,
        description: `Your accuracy in ${subject} is ${data.accuracy}%. Consider revising weak topics.`,
        action: 'practice',
        subject,
      });
    });
    
    // Analyze topics needing revision
    const topicsNeedingRevision = Object.entries(analytics.topicPerformance)
      .filter(([_, data]) => data.lastPracticed && new Date(data.lastPracticed) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .slice(0, 3);
    
    topicsNeedingRevision.forEach(([topic, data]) => {
      recommendations.push({
        type: 'revision',
        priority: 'medium',
        title: `Revise ${topic}`,
        description: `You haven't practiced ${topic} in over 7 days. Time for a quick revision.`,
        action: 'revise',
        topic,
      });
    });
    
    // Check if mock test needed
    const daysSinceLastMock = analytics.mockTestResults.length > 0
      ? Math.floor((Date.now() - new Date(analytics.mockTestResults[analytics.mockTestResults.length - 1].date).getTime()) / (1000 * 60 * 60 * 24))
      : Infinity;
    
    if (daysSinceLastMock > 7) {
      recommendations.push({
        type: 'mock_test',
        priority: 'high',
        title: 'Take a Mock Test',
        description: `You haven't taken a mock test in ${daysSinceLastMock} days. Test your preparation.`,
        action: 'mock_test',
      });
    }
    
    // Check incomplete topics
    const incompleteTopics = Object.entries(analytics.topicPerformance)
      .filter(([_, data]) => data.progress < 80)
      .slice(0, 2);
    
    incompleteTopics.forEach(([topic, data]) => {
      recommendations.push({
        type: 'incomplete_topic',
        priority: 'medium',
        title: `Complete ${topic}`,
        description: `You've completed ${data.progress}% of ${topic}. Finish the remaining topics.`,
        action: 'learn',
        topic,
      });
    });
    
    return recommendations;
  }, [analytics]);

  // =========================
  // HELPER FUNCTIONS
  // =========================
  const calculateAverageMockScore = (results) => {
    if (results.length === 0) return 0;
    const total = results.reduce((sum, r) => sum + r.score, 0);
    return Math.round(total / results.length);
  };

  const calculateOverallAccuracy = (results) => {
    if (results.length === 0) return 0;
    const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
    const totalAttempted = results.reduce((sum, r) => sum + r.attempted, 0);
    return totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  };

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    // State
    analytics,
    planner,
    isLoading,
    
    // Analytics
    saveAnalytics,
    updateOverallProgress,
    updateSubjectPerformance,
    updateTopicPerformance,
    addMockTestResult,
    addPracticeResult,
    
    // Planner
    savePlanner,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    addRevision,
    updateRevision,
    deleteRevision,
    updateWeeklyGoals,
    updateWeeklyProgress,
    resetWeeklyProgress,
    
    // Recommendations
    generateRecommendations,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

export default AnalyticsContext;
