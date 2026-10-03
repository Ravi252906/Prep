import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// =========================
// DEFAULT REVISION DATA
// =========================
const DEFAULT_REVISION = {
  // Revision Items
  revisionItems: [],
  
  // Revision Stats
  stats: {
    totalTopicsRevised: 0,
    topicsDueToday: 0,
    revisionAccuracy: 0,
    revisionStreak: 0,
    longestRevisionStreak: 0,
    lastRevisionDate: null,
  },
  
  // Weak Topics
  weakTopics: [],
};

// =========================
// REVISION SCHEDULE
// =========================
const REVISION_SCHEDULE = [
  { level: 1, days: 0 },    // Same day
  { level: 2, days: 1 },    // After 1 day
  { level: 3, days: 3 },    // After 3 days
  { level: 4, days: 7 },    // After 7 days
  { level: 5, days: 14 },   // After 14 days
  { level: 6, days: 30 },   // After 30 days
];

// =========================
// REVISION CONTEXT
// =========================
const RevisionContext = createContext(null);

export const RevisionProvider = ({ children }) => {
  // =========================
  // STATE
  // =========================
  const [revision, setRevision] = useState(DEFAULT_REVISION);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const loadData = () => {
      try {
        const savedRevision = localStorage.getItem('gateprep_revision');
        if (savedRevision) {
          const parsed = JSON.parse(savedRevision);
          setRevision(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Error loading revision data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // SAVE REVISION
  // =========================
  const saveRevision = useCallback((newRevision) => {
    try {
      setRevision(prev => {
        const updated = { ...prev, ...newRevision };
        localStorage.setItem('gateprep_revision', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error saving revision:', error);
    }
  }, []);

  // =========================
  // ADD REVISION ITEM
  // =========================
  const addRevisionItem = useCallback((item) => {
    setRevision(prev => {
      const updated = {
        ...prev,
        revisionItems: [...prev.revisionItems, {
          ...item,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          revisionLevel: 0,
          lastRevised: null,
          nextRevision: new Date().toISOString(),
          status: 'due',
          priority: item.priority || 'medium',
        }]
      };
      localStorage.setItem('gateprep_revision', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE REVISION ITEM
  // =========================
  const updateRevisionItem = useCallback((itemId, updates) => {
    setRevision(prev => {
      const updated = {
        ...prev,
        revisionItems: prev.revisionItems.map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      };
      localStorage.setItem('gateprep_revision', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // MARK AS REVISED
  // =========================
  const markAsRevised = useCallback((itemId) => {
    setRevision(prev => {
      const item = prev.revisionItems.find(i => i.id === itemId);
      if (!item) return prev;

      const newLevel = Math.min(item.revisionLevel + 1, 6);
      const schedule = REVISION_SCHEDULE[newLevel - 1] || REVISION_SCHEDULE[REVISION_SCHEDULE.length - 1];
      const nextRevisionDate = new Date();
      nextRevisionDate.setDate(nextRevisionDate.getDate() + schedule.days);

      const today = new Date().toDateString();
      
      // Update streak
      let newStreak = prev.stats.revisionStreak;
      let newLongestStreak = prev.stats.longestRevisionStreak;
      
      if (prev.stats.lastRevisionDate !== today) {
        const lastDate = prev.stats.lastRevisionDate ? new Date(prev.stats.lastRevisionDate) : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
          newStreak = prev.stats.revisionStreak + 1;
          newLongestStreak = Math.max(prev.stats.longestRevisionStreak, newStreak);
        } else {
          newStreak = 1;
        }
      }

      const updated = {
        ...prev,
        revisionItems: prev.revisionItems.map(item =>
          item.id === itemId
            ? {
                ...item,
                revisionLevel: newLevel,
                lastRevised: new Date().toISOString(),
                nextRevision: nextRevisionDate.toISOString(),
                status: newLevel >= 6 ? 'completed' : 'upcoming',
              }
            : item
        ),
        stats: {
          ...prev.stats,
          totalTopicsRevised: prev.stats.totalTopicsRevised + 1,
          revisionStreak: newStreak,
          longestRevisionStreak: newLongestStreak,
          lastRevisionDate: today,
        }
      };
      
      localStorage.setItem('gateprep_revision', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // DELETE REVISION ITEM
  // =========================
  const deleteRevisionItem = useCallback((itemId) => {
    setRevision(prev => {
      const updated = {
        ...prev,
        revisionItems: prev.revisionItems.filter(item => item.id !== itemId)
      };
      localStorage.setItem('gateprep_revision', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // RESET REVISION PROGRESS
  // =========================
  const resetRevisionProgress = useCallback((itemId) => {
    setRevision(prev => {
      const updated = {
        ...prev,
        revisionItems: prev.revisionItems.map(item =>
          item.id === itemId
            ? {
                ...item,
                revisionLevel: 0,
                lastRevised: null,
                nextRevision: new Date().toISOString(),
                status: 'due',
              }
            : item
        )
      };
      localStorage.setItem('gateprep_revision', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE WEAK TOPICS
  // =========================
  const updateWeakTopics = useCallback((topics) => {
    setRevision(prev => {
      const updated = {
        ...prev,
        weakTopics: topics
      };
      localStorage.setItem('gateprep_revision', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // GET DUE REVISIONS
  // =========================
  const getDueRevisions = useCallback(() => {
    const now = new Date();
    return revision.revisionItems.filter(item => {
      const nextRevision = new Date(item.nextRevision);
      return nextRevision <= now && item.status !== 'completed';
    });
  }, [revision.revisionItems]);

  // =========================
  // GET DUE TODAY
  // =========================
  const getDueToday = useCallback(() => {
    const today = new Date().toDateString();
    return revision.revisionItems.filter(item => {
      const nextRevision = new Date(item.nextRevision);
      return nextRevision.toDateString() === today && item.status !== 'completed';
    });
  }, [revision.revisionItems]);

  // =========================
  // GET WEAK TOPICS
  // =========================
  const getWeakTopics = useCallback(() => {
    return revision.weakTopics.filter(topic => topic.accuracy < 60);
  }, [revision.weakTopics]);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    // State
    revision,
    isLoading,
    
    // Actions
    saveRevision,
    addRevisionItem,
    updateRevisionItem,
    markAsRevised,
    deleteRevisionItem,
    resetRevisionProgress,
    updateWeakTopics,
    
    // Getters
    getDueRevisions,
    getDueToday,
    getWeakTopics,
    
    // Constants
    REVISION_SCHEDULE,
  };

  return (
    <RevisionContext.Provider value={value}>
      {children}
    </RevisionContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================
export const useRevision = () => {
  const context = useContext(RevisionContext);
  if (!context) {
    throw new Error('useRevision must be used within RevisionProvider');
  }
  return context;
};

export default RevisionContext;
