import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    try {
      const saved = localStorage.getItem('gateprep_bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmarks = (newBookmarks) => {
    try {
      localStorage.setItem('gateprep_bookmarks', JSON.stringify(newBookmarks));
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const addBookmark = (bookmark) => {
    const newBookmark = {
      id: Date.now().toString(),
      type: bookmark.type,
      title: bookmark.title,
      subject: bookmark.subject || null,
      topic: bookmark.topic || null,
      url: bookmark.url,
      data: bookmark.data || null,
      createdAt: new Date().toISOString(),
    };

    const newBookmarks = [...bookmarks, newBookmark];
    saveBookmarks(newBookmarks);
    return newBookmark;
  };

  const removeBookmark = (id) => {
    const newBookmarks = bookmarks.filter(b => b.id !== id);
    saveBookmarks(newBookmarks);
  };

  const getBookmarksByType = (type) => {
    return bookmarks.filter(b => b.type === type);
  };

  const getBookmarksBySubject = (subject) => {
    return bookmarks.filter(b => b.subject === subject);
  };

  const isBookmarked = (url) => {
    return bookmarks.some(b => b.url === url);
  };

  const searchBookmarks = (query) => {
    const lowerQuery = query.toLowerCase();
    return bookmarks.filter(b =>
      b.title.toLowerCase().includes(lowerQuery) ||
      (b.subject && b.subject.toLowerCase().includes(lowerQuery)) ||
      (b.topic && b.topic.toLowerCase().includes(lowerQuery))
    );
  };

  const value = {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    getBookmarksByType,
    getBookmarksBySubject,
    isBookmarked,
    searchBookmarks,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
