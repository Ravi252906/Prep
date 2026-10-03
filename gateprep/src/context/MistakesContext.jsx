import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// =========================
// DEFAULT MISTAKES DATA
// =========================
const DEFAULT_MISTAKES = {
  mistakes: [],
};

// =========================
// MISTAKES CONTEXT
// =========================
const MistakesContext = createContext(null);

export const MistakesProvider = ({ children }) => {
  // =========================
  // STATE
  // =========================
  const [mistakes, setMistakes] = useState(DEFAULT_MISTAKES.mistakes);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const loadData = () => {
      try {
        const savedMistakes = localStorage.getItem('gateprep_mistakes');
        if (savedMistakes) {
          const parsed = JSON.parse(savedMistakes);
          setMistakes(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error('Error loading mistakes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // SAVE MISTAKES
  // =========================
  const saveMistakes = useCallback((newMistakes) => {
    try {
      setMistakes(newMistakes);
      localStorage.setItem('gateprep_mistakes', JSON.stringify(newMistakes));
    } catch (error) {
      console.error('Error saving mistakes:', error);
    }
  }, []);

  // =========================
  // ADD MISTAKE
  // =========================
  const addMistake = useCallback((mistake) => {
    const newMistake = {
      id: Date.now(),
      question: mistake.question,
      questionId: mistake.questionId || null,
      subject: mistake.subject,
      topic: mistake.topic,
      difficulty: mistake.difficulty || 'medium',
      attemptDate: mistake.attemptDate || new Date().toISOString(),
      reason: mistake.reason || 'incorrect',
      explanation: mistake.explanation || '',
      reviewed: false,
      reviewedAt: null,
      markedLearned: false,
      learnedAt: null,
      metadata: mistake.metadata || {},
    };

    setMistakes(prev => {
      const updated = [newMistake, ...prev];
      localStorage.setItem('gateprep_mistakes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE MISTAKE
  // =========================
  const updateMistake = useCallback((mistakeId, updates) => {
    setMistakes(prev => {
      const updated = prev.map(mistake =>
        mistake.id === mistakeId ? { ...mistake, ...updates } : mistake
      );
      localStorage.setItem('gateprep_mistakes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // DELETE MISTAKE
  // =========================
  const deleteMistake = useCallback((mistakeId) => {
    setMistakes(prev => {
      const updated = prev.filter(mistake => mistake.id !== mistakeId);
      localStorage.setItem('gateprep_mistakes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // MARK AS REVIEWED
  // =========================
  const markAsReviewed = useCallback((mistakeId) => {
    setMistakes(prev => {
      const updated = prev.map(mistake =>
        mistake.id === mistakeId
          ? { ...mistake, reviewed: true, reviewedAt: new Date().toISOString() }
          : mistake
      );
      localStorage.setItem('gateprep_mistakes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // MARK AS LEARNED
  // =========================
  const markAsLearned = useCallback((mistakeId) => {
    setMistakes(prev => {
      const updated = prev.map(mistake =>
        mistake.id === mistakeId
          ? { ...mistake, markedLearned: true, learnedAt: new Date().toISOString() }
          : mistake
      );
      localStorage.setItem('gateprep_mistakes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // GET MISTAKES BY SUBJECT
  // =========================
  const getMistakesBySubject = useCallback((subject) => {
    return mistakes.filter(mistake => mistake.subject === subject);
  }, [mistakes]);

  // =========================
  // GET MISTAKES BY TOPIC
  // =========================
  const getMistakesByTopic = useCallback((topic) => {
    return mistakes.filter(mistake => mistake.topic === topic);
  }, [mistakes]);

  // =========================
  // GET MISTAKES BY DIFFICULTY
  // =========================
  const getMistakesByDifficulty = useCallback((difficulty) => {
    return mistakes.filter(mistake => mistake.difficulty === difficulty);
  }, [mistakes]);

  // =========================
  // GET REVIEWED MISTAKES
  // =========================
  const getReviewedMistakes = useCallback(() => {
    return mistakes.filter(mistake => mistake.reviewed);
  }, [mistakes]);

  // =========================
  // GET UNREVIEWED MISTAKES
  // =========================
  const getUnreviewedMistakes = useCallback(() => {
    return mistakes.filter(mistake => !mistake.reviewed);
  }, [mistakes]);

  // =========================
  // GET LEARNED MISTAKES
  // =========================
  const getLearnedMistakes = useCallback(() => {
    return mistakes.filter(mistake => mistake.markedLearned);
  }, [mistakes]);

  // =========================
  // GET UNLEARNED MISTAKES
  // =========================
  const getUnlearnedMistakes = useCallback(() => {
    return mistakes.filter(mistake => !mistake.markedLearned);
  }, [mistakes]);

  // =========================
  // GET MISTAKE STATISTICS
  // =========================
  const getMistakeStatistics = useCallback(() => {
    const bySubject = {};
    const byTopic = {};
    const byDifficulty = {};

    mistakes.forEach(mistake => {
      // By subject
      bySubject[mistake.subject] = (bySubject[mistake.subject] || 0) + 1;

      // By topic
      const topicKey = `${mistake.subject}-${mistake.topic}`;
      byTopic[topicKey] = (byTopic[topicKey] || 0) + 1;

      // By difficulty
      byDifficulty[mistake.difficulty] = (byDifficulty[mistake.difficulty] || 0) + 1;
    });

    return {
      total: mistakes.length,
      reviewed: mistakes.filter(m => m.reviewed).length,
      unreviewed: mistakes.filter(m => !m.reviewed).length,
      learned: mistakes.filter(m => m.markedLearned).length,
      unlearned: mistakes.filter(m => !m.markedLearned).length,
      bySubject,
      byTopic,
      byDifficulty,
    };
  }, [mistakes]);

  // =========================
  // FILTER MISTAKES
  // =========================
  const filterMistakes = useCallback((filters) => {
    return mistakes.filter(mistake => {
      // Subject filter
      if (filters.subject && filters.subject !== 'all' && mistake.subject !== filters.subject) {
        return false;
      }

      // Topic filter
      if (filters.topic && filters.topic !== 'all' && mistake.topic !== filters.topic) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && filters.difficulty !== 'all' && mistake.difficulty !== filters.difficulty) {
        return false;
      }

      // Reviewed filter
      if (filters.reviewed !== undefined && filters.reviewed !== null) {
        if (filters.reviewed && !mistake.reviewed) return false;
        if (!filters.reviewed && mistake.reviewed) return false;
      }

      return true;
    });
  }, [mistakes]);

  // =========================
  // CLEAR ALL MISTAKES
  // =========================
  const clearAllMistakes = useCallback(() => {
    setMistakes([]);
    localStorage.setItem('gateprep_mistakes', JSON.stringify([]));
  }, []);

  // =========================
  // CLEAR LEARNED MISTAKES
  // =========================
  const clearLearnedMistakes = useCallback(() => {
    setMistakes(prev => {
      const updated = prev.filter(mistake => !mistake.markedLearned);
      localStorage.setItem('gateprep_mistakes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    // State
    mistakes,
    isLoading,
    
    // Actions
    addMistake,
    updateMistake,
    deleteMistake,
    markAsReviewed,
    markAsLearned,
    clearAllMistakes,
    clearLearnedMistakes,
    
    // Getters
    getMistakesBySubject,
    getMistakesByTopic,
    getMistakesByDifficulty,
    getReviewedMistakes,
    getUnreviewedMistakes,
    getLearnedMistakes,
    getUnlearnedMistakes,
    getMistakeStatistics,
    filterMistakes,
  };

  return (
    <MistakesContext.Provider value={value}>
      {children}
    </MistakesContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================
export const useMistakes = () => {
  const context = useContext(MistakesContext);
  if (!context) {
    throw new Error('useMistakes must be used within MistakesProvider');
  }
  return context;
};

export default MistakesContext;
