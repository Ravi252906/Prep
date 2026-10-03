import React, { createContext, useContext, useState, useEffect } from 'react';

const DoubtContext = createContext();

export const useDoubts = () => {
  const context = useContext(DoubtContext);
  if (!context) {
    throw new Error('useDoubts must be used within DoubtProvider');
  }
  return context;
};

export const DoubtProvider = ({ children }) => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoubts();
  }, []);

  const loadDoubts = () => {
    try {
      const saved = localStorage.getItem('gateprep_doubts');
      if (saved) {
        setDoubts(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading doubts:', error);
      setDoubts([]);
    } finally {
      setLoading(false);
    }
  };

  const saveDoubts = (newDoubts) => {
    try {
      localStorage.setItem('gateprep_doubts', JSON.stringify(newDoubts));
      setDoubts(newDoubts);
    } catch (error) {
      console.error('Error saving doubts:', error);
    }
  };

  const addDoubt = (doubt) => {
    const newDoubt = {
      id: Date.now().toString(),
      title: doubt.title,
      subject: doubt.subject || null,
      topic: doubt.topic || null,
      question: doubt.question || '',
      notes: doubt.notes || '',
      priority: doubt.priority || 'medium',
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newDoubts = [...doubts, newDoubt];
    saveDoubts(newDoubts);
    return newDoubt;
  };

  const updateDoubt = (id, updates) => {
    const newDoubts = doubts.map(d =>
      d.id === id
        ? { ...d, ...updates, updatedAt: new Date().toISOString() }
        : d
    );
    saveDoubts(newDoubts);
  };

  const deleteDoubt = (id) => {
    const newDoubts = doubts.filter(d => d.id !== id);
    saveDoubts(newDoubts);
  };

  const resolveDoubt = (id) => {
    updateDoubt(id, { status: 'resolved' });
  };

  const reopenDoubt = (id) => {
    updateDoubt(id, { status: 'open' });
  };

  const getDoubtsByStatus = (status) => {
    return doubts.filter(d => d.status === status);
  };

  const getDoubtsBySubject = (subject) => {
    return doubts.filter(d => d.subject === subject);
  };

  const getDoubtsByPriority = (priority) => {
    return doubts.filter(d => d.priority === priority);
  };

  const searchDoubts = (query) => {
    const lowerQuery = query.toLowerCase();
    return doubts.filter(d =>
      d.title.toLowerCase().includes(lowerQuery) ||
      d.question.toLowerCase().includes(lowerQuery) ||
      (d.subject && d.subject.toLowerCase().includes(lowerQuery)) ||
      (d.topic && d.topic.toLowerCase().includes(lowerQuery))
    );
  };

  const value = {
    doubts,
    loading,
    addDoubt,
    updateDoubt,
    deleteDoubt,
    resolveDoubt,
    reopenDoubt,
    getDoubtsByStatus,
    getDoubtsBySubject,
    getDoubtsByPriority,
    searchDoubts,
  };

  return (
    <DoubtContext.Provider value={value}>
      {children}
    </DoubtContext.Provider>
  );
};
