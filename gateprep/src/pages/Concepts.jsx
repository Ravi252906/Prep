import React, { useState } from 'react';
import { Search, Filter, BookOpen, CheckCircle, Clock, Star } from 'lucide-react';
import { conceptsData, getConceptsBySubject, searchConcepts } from '../data/concepts';
import { useConcepts } from '../context/ConceptContext';
import { useBookmarks } from '../context/BookmarkContext';
import { useNavigate } from 'react-router-dom';

const Concepts = () => {
  const navigate = useNavigate();
  const { isConceptComplete, markConceptComplete, markConceptIncomplete } = useConcepts();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const subjects = ['All', 'DBMS', 'Operating Systems', 'Algorithms', 'Computer Networks', 'Computer Organization', 'Discrete Mathematics'];
  const difficulties = ['All', 'easy', 'medium', 'hard'];

  const filteredConcepts = conceptsData.filter(concept => {
    const matchesSearch = searchQuery === '' ||
      concept.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.subtopic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = selectedSubject === 'All' || concept.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'All' || concept.difficulty === selectedDifficulty;

    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleToggleComplete = (conceptId) => {
    if (isConceptComplete(conceptId)) {
      markConceptIncomplete(conceptId);
    } else {
      const concept = conceptsData.find(c => c.id === conceptId);
      if (concept) {
        markConceptComplete(conceptId, concept.subject, concept.topic);
      }
    }
  };

  const handleBookmark = (concept) => {
    if (isBookmarked(`/concepts/${concept.subject}/${concept.topic}`)) {
      removeBookmark(`/concepts/${concept.subject}/${concept.topic}`);
    } else {
      addBookmark({
        type: 'concept',
        title: concept.topic,
        subject: concept.subject,
        topic: concept.topic,
        url: `/concepts/${concept.subject}/${concept.topic}`,
        data: { conceptId: concept.id },
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Concept Library
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Comprehensive GATE CS/IT concepts with explanations and examples
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Filters:</span>
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConcepts.map((concept) => (
            <div
              key={concept.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/concepts/${concept.subject}/${concept.topic}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{concept.subject}</span>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {concept.topic}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{concept.subtopic}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmark(concept);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked(`/concepts/${concept.subject}/${concept.topic}`)
                      ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
                      : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  }`}
                >
                  <Star className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                {concept.definition}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(concept.difficulty)}`}>
                    {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {concept.pyqCount} PYQs
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleComplete(concept.id);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isConceptComplete(concept.id)
                      ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredConcepts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No concepts found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Concepts;
