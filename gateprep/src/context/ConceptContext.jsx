import React, { createContext, useContext, useState, useEffect } from 'react';

const ConceptContext = createContext();

export const useConcepts = () => {
  const context = useContext(ConceptContext);
  if (!context) {
    throw new Error('useConcepts must be used within ConceptProvider');
  }
  return context;
};

export const ConceptProvider = ({ children }) => {
  const [completedConcepts, setCompletedConcepts] = useState([]);
  const [recentConcepts, setRecentConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConceptData();
  }, []);

  const loadConceptData = () => {
    try {
      const savedCompleted = localStorage.getItem('gateprep_completed_concepts');
      if (savedCompleted) {
        setCompletedConcepts(JSON.parse(savedCompleted));
      }

      const savedRecent = localStorage.getItem('gateprep_recent_concepts');
      if (savedRecent) {
        setRecentConcepts(JSON.parse(savedRecent));
      }
    } catch (error) {
      console.error('Error loading concept data:', error);
      setCompletedConcepts([]);
      setRecentConcepts([]);
    } finally {
      setLoading(false);
    }
  };

  const saveCompletedConcepts = (concepts) => {
    try {
      localStorage.setItem('gateprep_completed_concepts', JSON.stringify(concepts));
      setCompletedConcepts(concepts);
    } catch (error) {
      console.error('Error saving completed concepts:', error);
    }
  };

  const saveRecentConcepts = (concepts) => {
    try {
      localStorage.setItem('gateprep_recent_concepts', JSON.stringify(concepts));
      setRecentConcepts(concepts);
    } catch (error) {
      console.error('Error saving recent concepts:', error);
    }
  };

  const markConceptComplete = (conceptId, subject, topic) => {
    const completion = {
      conceptId,
      subject,
      topic,
      completedAt: new Date().toISOString(),
    };

    if (!completedConcepts.some(c => c.conceptId === conceptId)) {
      const newCompleted = [...completedConcepts, completion];
      saveCompletedConcepts(newCompleted);
    }
  };

  const markConceptIncomplete = (conceptId) => {
    const newCompleted = completedConcepts.filter(c => c.conceptId !== conceptId);
    saveCompletedConcepts(newCompleted);
  };

  const isConceptComplete = (conceptId) => {
    return completedConcepts.some(c => c.conceptId === conceptId);
  };

  const addRecentConcept = (conceptId, subject, topic, title) => {
    const recent = {
      conceptId,
      subject,
      topic,
      title,
      viewedAt: new Date().toISOString(),
    };

    const newRecent = [
      recent,
      ...recentConcepts.filter(c => c.conceptId !== conceptId),
    ].slice(0, 50);

    saveRecentConcepts(newRecent);
  };

  const getCompletedConceptsBySubject = (subject) => {
    return completedConcepts.filter(c => c.subject === subject);
  };

  const getCompletedConceptsByTopic = (topic) => {
    return completedConcepts.filter(c => c.topic === topic);
  };

  const value = {
    completedConcepts,
    recentConcepts,
    loading,
    markConceptComplete,
    markConceptIncomplete,
    isConceptComplete,
    addRecentConcept,
    getCompletedConceptsBySubject,
    getCompletedConceptsByTopic,
  };

  return (
    <ConceptContext.Provider value={value}>
      {children}
    </ConceptContext.Provider>
  );
};
