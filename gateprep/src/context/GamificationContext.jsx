import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// =========================
// LEVEL DEFINITIONS
// =========================
const LEVELS = [
  { name: 'Beginner', minXP: 0, maxXP: 100 },
  { name: 'Learner', minXP: 100, maxXP: 300 },
  { name: 'Explorer', minXP: 300, maxXP: 600 },
  { name: 'Problem Solver', minXP: 600, maxXP: 1000 },
  { name: 'Achiever', minXP: 1000, maxXP: 1500 },
  { name: 'GATE Warrior', minXP: 1500, maxXP: 2500 },
  { name: 'Expert', minXP: 2500, maxXP: 4000 },
  { name: 'Master', minXP: 4000, maxXP: Infinity },
];

// =========================
// ACHIEVEMENT DEFINITIONS
// =========================
const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 'first_step',
    name: 'First Step',
    description: 'Complete your first practice question',
    icon: 'Footprints',
    condition: (data) => data.questionsSolved >= 1,
    xpReward: 10,
  },
  {
    id: '100_questions',
    name: '100 Questions',
    description: 'Solve 100 practice questions',
    icon: 'Target',
    condition: (data) => data.questionsSolved >= 100,
    xpReward: 50,
  },
  {
    id: 'revision_master',
    name: 'Revision Master',
    description: 'Complete 50 revisions',
    icon: 'RotateCcw',
    condition: (data) => data.revisionsCompleted >= 50,
    xpReward: 100,
  },
  {
    id: '7_day_streak',
    name: '7 Day Streak',
    description: 'Maintain a 7-day study streak',
    icon: 'Flame',
    condition: (data) => data.maxStreak >= 7,
    xpReward: 100,
  },
  {
    id: 'mock_master',
    name: 'Mock Master',
    description: 'Complete 10 mock tests',
    icon: 'Award',
    condition: (data) => data.mockTestsCompleted >= 10,
    xpReward: 150,
  },
  {
    id: 'pyq_explorer',
    name: 'PYQ Explorer',
    description: 'Attempt 50 previous year questions',
    icon: 'BookOpen',
    condition: (data) => data.pyqsAttempted >= 50,
    xpReward: 75,
  },
  {
    id: 'consistency_king',
    name: 'Consistency King',
    description: 'Maintain a 30-day study streak',
    icon: 'Crown',
    condition: (data) => data.maxStreak >= 30,
    xpReward: 200,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a mock test with 90%+ accuracy',
    icon: 'Zap',
    condition: (data) => data.bestMockAccuracy >= 90,
    xpReward: 125,
  },
];

// =========================
// DEFAULT GAMIFICATION DATA
// =========================
const DEFAULT_GAMIFICATION = {
  // XP and Level
  currentXP: 0,
  totalXP: 0,
  currentLevel: 0,
  
  // Achievements
  achievements: [],
  
  // Daily Challenge
  dailyChallenge: {
    id: null,
    tasks: [],
    progress: {},
    completed: false,
    startDate: null,
    xpReward: 50,
  },
  
  // Weekly Challenge
  weeklyChallenge: {
    id: null,
    tasks: [],
    progress: {},
    completed: false,
    startDate: null,
    xpReward: 200,
  },
  
  // Study Stats for achievements
  questionsSolved: 0,
  revisionsCompleted: 0,
  mockTestsCompleted: 0,
  pyqsAttempted: 0,
  maxStreak: 0,
  bestMockAccuracy: 0,
};

// =========================
// GAMIFICATION CONTEXT
// =========================
const GamificationContext = createContext(null);

export const GamificationProvider = ({ children }) => {
  // =========================
  // STATE
  // =========================
  const [gamification, setGamification] = useState(DEFAULT_GAMIFICATION);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const loadData = () => {
      try {
        const savedGamification = localStorage.getItem('gateprep_gamification');
        if (savedGamification) {
          const parsed = JSON.parse(savedGamification);
          setGamification(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Error loading gamification data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // SAVE GAMIFICATION
  // =========================
  const saveGamification = useCallback((newGamification) => {
    try {
      setGamification(prev => {
        const updated = { ...prev, ...newGamification };
        localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error saving gamification:', error);
    }
  }, []);

  // =========================
  // ADD XP
  // =========================
  const addXP = useCallback((amount, reason) => {
    setGamification(prev => {
      const newTotalXP = prev.totalXP + amount;
      const newCurrentXP = prev.currentXP + amount;
      
      // Calculate new level
      let newLevel = 0;
      for (let i = 0; i < LEVELS.length; i++) {
        if (newTotalXP >= LEVELS[i].minXP) {
          newLevel = i;
        }
      }
      
      const updated = {
        ...prev,
        currentXP: newCurrentXP,
        totalXP: newTotalXP,
        currentLevel: newLevel,
      };
      
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // GET CURRENT LEVEL INFO
  // =========================
  const getCurrentLevelInfo = useCallback(() => {
    return LEVELS[gamification.currentLevel] || LEVELS[0];
  }, [gamification.currentLevel]);

  // =========================
  // GET XP TO NEXT LEVEL
  // =========================
  const getXPToNextLevel = useCallback(() => {
    const currentLevelInfo = LEVELS[gamification.currentLevel];
    if (!currentLevelInfo) return 0;
    
    if (currentLevelInfo.maxXP === Infinity) return 0;
    
    return currentLevelInfo.maxXP - gamification.totalXP;
  }, [gamification.currentLevel, gamification.totalXP]);

  // =========================
  // GET LEVEL PROGRESS
  // =========================
  const getLevelProgress = useCallback(() => {
    const currentLevelInfo = LEVELS[gamification.currentLevel];
    if (!currentLevelInfo) return 0;
    
    if (currentLevelInfo.maxXP === Infinity) return 100;
    
    const range = currentLevelInfo.maxXP - currentLevelInfo.minXP;
    const progress = gamification.totalXP - currentLevelInfo.minXP;
    
    return Math.min((progress / range) * 100, 100);
  }, [gamification.currentLevel, gamification.totalXP]);

  // =========================
  // UNLOCK ACHIEVEMENT
  // =========================
  const unlockAchievement = useCallback((achievementId) => {
    setGamification(prev => {
      if (prev.achievements.includes(achievementId)) return prev;
      
      const achievement = ACHIEVEMENT_DEFINITIONS.find(a => a.id === achievementId);
      const xpReward = achievement?.xpReward || 0;
      
      const updated = {
        ...prev,
        achievements: [...prev.achievements, achievementId],
        totalXP: prev.totalXP + xpReward,
      };
      
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // CHECK ACHIEVEMENTS
  // =========================
  const checkAchievements = useCallback(() => {
    const stats = {
      questionsSolved: gamification.questionsSolved,
      revisionsCompleted: gamification.revisionsCompleted,
      mockTestsCompleted: gamification.mockTestsCompleted,
      pyqsAttempted: gamification.pyqsAttempted,
      maxStreak: gamification.maxStreak,
      bestMockAccuracy: gamification.bestMockAccuracy,
    };
    
    ACHIEVEMENT_DEFINITIONS.forEach(achievement => {
      if (!gamification.achievements.includes(achievement.id) && achievement.condition(stats)) {
        unlockAchievement(achievement.id);
      }
    });
  }, [gamification, unlockAchievement]);

  // =========================
  // UPDATE STUDY STATS
  // =========================
  const updateStudyStats = useCallback((updates) => {
    setGamification(prev => {
      const updated = {
        ...prev,
        ...updates,
      };
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // START DAILY CHALLENGE
  // =========================
  const startDailyChallenge = useCallback((tasks) => {
    setGamification(prev => {
      const today = new Date().toDateString();
      const updated = {
        ...prev,
        dailyChallenge: {
          id: Date.now(),
          tasks,
          progress: tasks.reduce((acc, task) => ({ ...acc, [task.id]: 0 }), {}),
          completed: false,
          startDate: today,
          xpReward: 50,
        }
      };
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE DAILY CHALLENGE PROGRESS
  // =========================
  const updateDailyChallengeProgress = useCallback((taskId, increment = 1) => {
    setGamification(prev => {
      const task = prev.dailyChallenge.tasks.find(t => t.id === taskId);
      if (!task) return prev;
      
      const newProgress = (prev.dailyChallenge.progress[taskId] || 0) + increment;
      const allTasksCompleted = prev.dailyChallenge.tasks.every(t => 
        (prev.dailyChallenge.progress[t.id] || 0) >= t.target
      );
      
      const updated = {
        ...prev,
        dailyChallenge: {
          ...prev.dailyChallenge,
          progress: {
            ...prev.dailyChallenge.progress,
            [taskId]: newProgress,
          },
          completed: allTasksCompleted,
        }
      };
      
      // Award XP if completed
      if (allTasksCompleted && !prev.dailyChallenge.completed) {
        updated.totalXP += prev.dailyChallenge.xpReward;
      }
      
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // START WEEKLY CHALLENGE
  // =========================
  const startWeeklyChallenge = useCallback((tasks) => {
    setGamification(prev => {
      const weekStart = getWeekStart();
      const updated = {
        ...prev,
        weeklyChallenge: {
          id: Date.now(),
          tasks,
          progress: tasks.reduce((acc, task) => ({ ...acc, [task.id]: 0 }), {}),
          completed: false,
          startDate: weekStart,
          xpReward: 200,
        }
      };
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // UPDATE WEEKLY CHALLENGE PROGRESS
  // =========================
  const updateWeeklyChallengeProgress = useCallback((taskId, increment = 1) => {
    setGamification(prev => {
      const task = prev.weeklyChallenge.tasks.find(t => t.id === taskId);
      if (!task) return prev;
      
      const newProgress = (prev.weeklyChallenge.progress[taskId] || 0) + increment;
      const allTasksCompleted = prev.weeklyChallenge.tasks.every(t => 
        (prev.weeklyChallenge.progress[t.id] || 0) >= t.target
      );
      
      const updated = {
        ...prev,
        weeklyChallenge: {
          ...prev.weeklyChallenge,
          progress: {
            ...prev.weeklyChallenge.progress,
            [taskId]: newProgress,
          },
          completed: allTasksCompleted,
        }
      };
      
      // Award XP if completed
      if (allTasksCompleted && !prev.weeklyChallenge.completed) {
        updated.totalXP += prev.weeklyChallenge.xpReward;
      }
      
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // RESET DAILY CHALLENGE
  // =========================
  const resetDailyChallenge = useCallback(() => {
    setGamification(prev => {
      const updated = {
        ...prev,
        dailyChallenge: {
          ...DEFAULT_GAMIFICATION.dailyChallenge,
        }
      };
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // RESET WEEKLY CHALLENGE
  // =========================
  const resetWeeklyChallenge = useCallback(() => {
    setGamification(prev => {
      const updated = {
        ...prev,
        weeklyChallenge: {
          ...DEFAULT_GAMIFICATION.weeklyChallenge,
        }
      };
      localStorage.setItem('gateprep_gamification', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // =========================
  // HELPER: GET WEEK START
  // =========================
  const getWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(now.setDate(diff));
    return weekStart.toDateString();
  };

  // =========================
  // CHECK AND RESET CHALLENGES
  // =========================
  useEffect(() => {
    const checkChallenges = () => {
      const today = new Date().toDateString();
      const weekStart = getWeekStart();
      
      // Reset daily challenge if it's a new day
      if (gamification.dailyChallenge.startDate && gamification.dailyChallenge.startDate !== today) {
        resetDailyChallenge();
      }
      
      // Reset weekly challenge if it's a new week
      if (gamification.weeklyChallenge.startDate && gamification.weeklyChallenge.startDate !== weekStart) {
        resetWeeklyChallenge();
      }
    };
    
    checkChallenges();
  }, [gamification.dailyChallenge.startDate, gamification.weeklyChallenge.startDate, resetDailyChallenge, resetWeeklyChallenge]);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    // State
    gamification,
    isLoading,
    
    // XP and Level
    addXP,
    getCurrentLevelInfo,
    getXPToNextLevel,
    getLevelProgress,
    
    // Achievements
    unlockAchievement,
    checkAchievements,
    ACHIEVEMENT_DEFINITIONS,
    
    // Study Stats
    updateStudyStats,
    
    // Daily Challenge
    startDailyChallenge,
    updateDailyChallengeProgress,
    resetDailyChallenge,
    
    // Weekly Challenge
    startWeeklyChallenge,
    updateWeeklyChallengeProgress,
    resetWeeklyChallenge,
    
    // Constants
    LEVELS,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================
export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
};

export default GamificationContext;
