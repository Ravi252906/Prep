import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// =========================
// DEFAULT STUDY SESSION DATA
// =========================
const DEFAULT_STUDY_SESSIONS = {
  sessions: [],
  currentSession: null,
  totalStudyMinutes: 0,
  studyDaysThisMonth: 0,
  weeklyConsistency: 0,
  monthlyConsistency: 0,
};

// =========================
// STUDY SESSION CONTEXT
// =========================
const StudySessionContext = createContext(null);

export const StudySessionProvider = ({ children }) => {
  // =========================
  // STATE
  // =========================
  const [studySessions, setStudySessions] = useState(DEFAULT_STUDY_SESSIONS);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const loadData = () => {
      try {
        const savedSessions = localStorage.getItem('gateprep_study_sessions');
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions);
          setStudySessions(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Error loading study sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // SAVE STUDY SESSIONS
  // =========================
  const saveStudySessions = useCallback((newSessions) => {
    try {
      setStudySessions(prev => {
        const updated = { ...prev, ...newSessions };
        localStorage.setItem('gateprep_study_sessions', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error saving study sessions:', error);
    }
  }, []);

  // =========================
  // START SESSION
  // =========================
  const startSession = useCallback((sessionData) => {
    const newSession = {
      id: Date.now(),
      type: sessionData.type || 'practice', // practice, revision, mock_test, study
      subject: sessionData.subject || null,
      topic: sessionData.topic || null,
      duration: sessionData.duration || 25, // in minutes
      startTime: new Date().toISOString(),
      endTime: null,
      completed: false,
      paused: false,
      pausedTime: 0,
      metadata: sessionData.metadata || {},
    };

    setStudySessions(prev => ({
      ...prev,
      currentSession: newSession,
    }));

    return newSession;
  }, []);

  // =========================
  // PAUSE SESSION
  // =========================
  const pauseSession = useCallback(() => {
    setStudySessions(prev => {
      if (!prev.currentSession) return prev;

      return {
        ...prev,
        currentSession: {
          ...prev.currentSession,
          paused: true,
          pausedAt: new Date().toISOString(),
        }
      };
    });
  }, []);

  // =========================
  // RESUME SESSION
  // =========================
  const resumeSession = useCallback(() => {
    setStudySessions(prev => {
      if (!prev.currentSession) return prev;

      const pausedAt = prev.currentSession.pausedAt ? new Date(prev.currentSession.pausedAt) : new Date();
      const now = new Date();
      const pausedDuration = Math.floor((now - pausedAt) / 1000); // in seconds

      return {
        ...prev,
        currentSession: {
          ...prev.currentSession,
          paused: false,
          pausedAt: null,
          pausedTime: (prev.currentSession.pausedTime || 0) + pausedDuration,
        }
      };
    });
  }, []);

  // =========================
  // STOP SESSION
  // =========================
  const stopSession = useCallback((completed = false) => {
    setStudySessions(prev => {
      if (!prev.currentSession) return prev;

      const now = new Date();
      const startTime = new Date(prev.currentSession.startTime);
      const actualDuration = Math.floor((now - startTime) / 60000); // in minutes
      const pausedTime = Math.floor((prev.currentSession.pausedTime || 0) / 60); // convert to minutes
      const effectiveDuration = Math.max(0, actualDuration - pausedTime);

      const completedSession = {
        ...prev.currentSession,
        endTime: now.toISOString(),
        completed,
        actualDuration: effectiveDuration,
      };

      const updated = {
        ...prev,
        currentSession: null,
        sessions: [...prev.sessions, completedSession],
        totalStudyMinutes: prev.totalStudyMinutes + effectiveDuration,
      };

      localStorage.setItem('gateprep_study_sessions', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // DELETE SESSION
  // =========================
  const deleteSession = useCallback((sessionId) => {
    setStudySessions(prev => {
      const session = prev.sessions.find(s => s.id === sessionId);
      if (!session) return prev;

      const updated = {
        ...prev,
        sessions: prev.sessions.filter(s => s.id !== sessionId),
        totalStudyMinutes: Math.max(0, prev.totalStudyMinutes - (session.actualDuration || 0)),
      };

      localStorage.setItem('gateprep_study_sessions', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // GET STUDY ACTIVITY BY DATE
  // =========================
  const getStudyActivityByDate = useCallback((date) => {
    const targetDate = new Date(date).toDateString();
    return studySessions.sessions.filter(session => {
      const sessionDate = new Date(session.startTime).toDateString();
      return sessionDate === targetDate;
    });
  }, [studySessions.sessions]);

  // =========================
  // GET STUDY HOURS BY DATE
  // =========================
  const getStudyHoursByDate = useCallback((date) => {
    const sessions = getStudyActivityByDate(date);
    const totalMinutes = sessions.reduce((sum, session) => sum + (session.actualDuration || 0), 0);
    return (totalMinutes / 60).toFixed(1);
  }, [getStudyActivityByDate]);

  // =========================
  // GET STUDY ACTIVITY CALENDAR
  // =========================
  const getStudyActivityCalendar = useCallback((days = 365) => {
    const calendar = {};
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      
      const sessions = getStudyActivityByDate(dateStr);
      const totalMinutes = sessions.reduce((sum, session) => sum + (session.actualDuration || 0), 0);
      const hours = totalMinutes / 60;

      let intensity = 0;
      if (hours >= 3) intensity = 4;
      else if (hours >= 2) intensity = 3;
      else if (hours >= 1) intensity = 2;
      else if (hours > 0) intensity = 1;

      calendar[dateStr] = {
        date: dateStr,
        hours: hours.toFixed(1),
        intensity,
        sessionsCount: sessions.length,
        questionsSolved: sessions.reduce((sum, s) => sum + (s.metadata?.questionsSolved || 0), 0),
        revisionsCompleted: sessions.reduce((sum, s) => sum + (s.metadata?.revisionsCompleted || 0), 0),
        mockTestsCompleted: sessions.reduce((sum, s) => sum + (s.metadata?.mockTestsCompleted || 0), 0),
      };
    }

    return calendar;
  }, [getStudyActivityByDate]);

  // =========================
  // GET STUDY DAYS THIS MONTH
  // =========================
  const getStudyDaysThisMonth = useCallback(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const activeDays = new Set();
    studySessions.sessions.forEach(session => {
      const sessionDate = new Date(session.startTime);
      if (sessionDate >= firstDay) {
        activeDays.add(sessionDate.toDateString());
      }
    });

    return activeDays.size;
  }, [studySessions.sessions]);

  // =========================
  // CALCULATE CONSISTENCY
  // =========================
  const calculateConsistency = useCallback(() => {
    const now = new Date();
    const studyDaysThisMonth = getStudyDaysThisMonth();
    const daysInMonth = now.getDate();
    
    const monthlyConsistency = daysInMonth > 0 ? Math.round((studyDaysThisMonth / daysInMonth) * 100) : 0;

    // Weekly consistency (last 7 days)
    const last7Days = new Set();
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const sessions = getStudyActivityByDate(date);
      if (sessions.length > 0) {
        last7Days.add(date.toDateString());
      }
    }
    const weeklyConsistency = Math.round((last7Days.size / 7) * 100);

    return { weeklyConsistency, monthlyConsistency };
  }, [getStudyActivityByDate, getStudyDaysThisMonth]);

  // =========================
  // UPDATE CONTINUE LEARNING
  // =========================
  const updateContinueLearning = useCallback((activity) => {
    const continueLearning = {
      type: activity.type,
      id: activity.id,
      title: activity.title,
      subject: activity.subject,
      topic: activity.topic,
      progress: activity.progress,
      lastAccessed: new Date().toISOString(),
    };

    localStorage.setItem('gateprep_continue_learning', JSON.stringify(continueLearning));
  }, []);

  // =========================
  // GET CONTINUE LEARNING
  // =========================
  const getContinueLearning = useCallback(() => {
    try {
      const saved = localStorage.getItem('gateprep_continue_learning');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading continue learning:', error);
    }
    return null;
  }, []);

  // =========================
  // UPDATE STATS
  // =========================
  useEffect(() => {
    const stats = calculateConsistency();
    setStudySessions(prev => ({
      ...prev,
      studyDaysThisMonth: getStudyDaysThisMonth(),
      weeklyConsistency: stats.weeklyConsistency,
      monthlyConsistency: stats.monthlyConsistency,
    }));
  }, [studySessions.sessions, calculateConsistency, getStudyDaysThisMonth]);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    // State
    studySessions,
    isLoading,
    
    // Session Management
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    deleteSession,
    
    // Activity Analysis
    getStudyActivityByDate,
    getStudyHoursByDate,
    getStudyActivityCalendar,
    getStudyDaysThisMonth,
    calculateConsistency,
    
    // Continue Learning
    updateContinueLearning,
    getContinueLearning,
  };

  return (
    <StudySessionContext.Provider value={value}>
      {children}
    </StudySessionContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================
export const useStudySession = () => {
  const context = useContext(StudySessionContext);
  if (!context) {
    throw new Error('useStudySession must be used within StudySessionProvider');
  }
  return context;
};

export default StudySessionContext;
