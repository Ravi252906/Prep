import React, { createContext, useContext, useState, useEffect } from 'react';

const AIContext = createContext();

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within AIProvider');
  }
  return context;
};

export const AIProvider = ({ children }) => {
  const [browserAIAvailable, setBrowserAIAvailable] = useState(false);
  const [browserAILoading, setBrowserAILoading] = useState(false);
  const [aiMode, setAIMode] = useState('auto');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAIPreferences();
    loadChatHistory();
  }, []);

  const loadAIPreferences = () => {
    try {
      const saved = localStorage.getItem('gateprep_ai_preferences');
      if (saved) {
        const prefs = JSON.parse(saved);
        setAIMode(prefs.aiMode || 'auto');
      }
    } catch (error) {
      console.error('Error loading AI preferences:', error);
    }
  };

  const saveAIPreferences = (prefs) => {
    try {
      localStorage.setItem('gateprep_ai_preferences', JSON.stringify(prefs));
    } catch (error) {
      console.error('Error saving AI preferences:', error);
    }
  };

  const loadChatHistory = () => {
    try {
      const saved = localStorage.getItem('gateprep_ai_history');
      if (saved) {
        setChatHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setChatHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const saveChatHistory = (history) => {
    try {
      localStorage.setItem('gateprep_ai_history', JSON.stringify(history));
      setChatHistory(history);
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const updateAIPreference = (key, value) => {
    const prefs = {
      aiMode,
      language: 'english',
      explanationStyle: 'simple',
      responseStyle: 'normal',
    };

    const newPrefs = { ...prefs, [key]: value };
    if (key === 'aiMode') {
      setAIMode(value);
    }
    saveAIPreferences(newPrefs);
  };

  const createConversation = (title, subject = null, topic = null) => {
    const conversation = {
      id: Date.now().toString(),
      title,
      subject,
      topic,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newHistory = [conversation, ...chatHistory];
    saveChatHistory(newHistory);
    setCurrentConversation(conversation);
    return conversation;
  };

  const addMessage = (conversationId, message) => {
    const newHistory = chatHistory.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          updatedAt: new Date().toISOString(),
        };
      }
      return conv;
    });

    saveChatHistory(newHistory);

    if (currentConversation && currentConversation.id === conversationId) {
      setCurrentConversation(
        newHistory.find(c => c.id === conversationId)
      );
    }
  };

  const deleteConversation = (id) => {
    const newHistory = chatHistory.filter(c => c.id !== id);
    saveChatHistory(newHistory);

    if (currentConversation && currentConversation.id === id) {
      setCurrentConversation(null);
    }
  };

  const renameConversation = (id, newTitle) => {
    const newHistory = chatHistory.map(c =>
      c.id === id
        ? { ...c, title: newTitle, updatedAt: new Date().toISOString() }
        : c
    );
    saveChatHistory(newHistory);

    if (currentConversation && currentConversation.id === id) {
      setCurrentConversation(
        newHistory.find(c => c.id === id)
      );
    }
  };

  const searchConversations = (query) => {
    const lowerQuery = query.toLowerCase();
    return chatHistory.filter(c =>
      c.title.toLowerCase().includes(lowerQuery) ||
      (c.subject && c.subject.toLowerCase().includes(lowerQuery)) ||
      (c.topic && c.topic.toLowerCase().includes(lowerQuery))
    );
  };

  const value = {
    browserAIAvailable,
    setBrowserAIAvailable,
    browserAILoading,
    setBrowserAILoading,
    aiMode,
    setAIMode,
    updateAIPreference,
    chatHistory,
    currentConversation,
    setCurrentConversation,
    createConversation,
    addMessage,
    deleteConversation,
    renameConversation,
    searchConversations,
    loading,
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};
