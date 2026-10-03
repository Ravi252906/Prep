import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomTestContext = createContext();

export const useCustomTests = () => {
  const context = useContext(CustomTestContext);
  if (!context) {
    throw new Error('useCustomTests must be used within CustomTestProvider');
  }
  return context;
};

export const CustomTestProvider = ({ children }) => {
  const [customTests, setCustomTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomTests();
  }, []);

  const loadCustomTests = () => {
    try {
      const saved = localStorage.getItem('gateprep_custom_tests');
      if (saved) {
        setCustomTests(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading custom tests:', error);
      setCustomTests([]);
    } finally {
      setLoading(false);
    }
  };

  const saveCustomTests = (tests) => {
    try {
      localStorage.setItem('gateprep_custom_tests', JSON.stringify(tests));
      setCustomTests(tests);
    } catch (error) {
      console.error('Error saving custom tests:', error);
    }
  };

  const createCustomTest = (testConfig) => {
    const customTest = {
      id: Date.now().toString(),
      name: testConfig.name,
      subject: testConfig.subject,
      topics: testConfig.topics || [],
      difficulty: testConfig.difficulty || 'medium',
      questionType: testConfig.questionType || 'mcq',
      numberOfQuestions: testConfig.numberOfQuestions,
      duration: testConfig.duration || 60,
      useAI: testConfig.useAI || false,
      questions: testConfig.questions || [],
      createdAt: new Date().toISOString(),
      attempts: [],
    };

    const newTests = [...customTests, customTest];
    saveCustomTests(newTests);
    return customTest;
  };

  const updateCustomTest = (id, updates) => {
    const newTests = customTests.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    saveCustomTests(newTests);
  };

  const deleteCustomTest = (id) => {
    const newTests = customTests.filter(t => t.id !== id);
    saveCustomTests(newTests);
  };

  const duplicateCustomTest = (id) => {
    const test = customTests.find(t => t.id === id);
    if (test) {
      const duplicated = {
        ...test,
        id: Date.now().toString(),
        name: `${test.name} (Copy)`,
        createdAt: new Date().toISOString(),
        attempts: [],
      };
      const newTests = [...customTests, duplicated];
      saveCustomTests(newTests);
      return duplicated;
    }
    return null;
  };

  const addTestAttempt = (testId, attempt) => {
    const newTests = customTests.map(t => {
      if (t.id === testId) {
        return {
          ...t,
          attempts: [...t.attempts, { ...attempt, completedAt: new Date().toISOString() }],
        };
      }
      return t;
    });
    saveCustomTests(newTests);
  };

  const getCustomTest = (id) => {
    return customTests.find(t => t.id === id);
  };

  const getCustomTestsBySubject = (subject) => {
    return customTests.filter(t => t.subject === subject);
  };

  const value = {
    customTests,
    loading,
    createCustomTest,
    updateCustomTest,
    deleteCustomTest,
    duplicateCustomTest,
    addTestAttempt,
    getCustomTest,
    getCustomTestsBySubject,
  };

  return (
    <CustomTestContext.Provider value={value}>
      {children}
    </CustomTestContext.Provider>
  );
};
