import React, { useState, useMemo } from 'react';
import { subjects } from '../data/subjects';
import SubjectGrid from '../components/subjects/SubjectGrid';
import FilterBar from '../components/subjects/FilterBar';
import SearchBar from '../components/subjects/SearchBar';
import EmptyState from '../components/subjects/EmptyState';
import { BookOpen, TrendingUp, CheckCircle } from 'lucide-react';

const Subjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter subjects based on search and category
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      // Filter by search query
      const matchesSearch =
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by category
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'core-cs' && subject.category === 'Core CS') ||
        (activeFilter === 'mathematics' && subject.category === 'Mathematics') ||
        (activeFilter === 'aptitude' && subject.category === 'Aptitude');

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  // Calculate overview statistics
  const totalSubjects = subjects.length;
  const completedSubjects = subjects.filter((s) => s.progress === 100).length;
  const totalTopics = subjects.reduce((sum, s) => sum + s.totalTopics, 0);
  const completedTopics = subjects.reduce((sum, s) => sum + s.topicsCompleted, 0);
  const overallProgress = Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
        <p className="text-gray-500 mt-1">Track your progress across all GATE subjects</p>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalSubjects}</p>
              <p className="text-sm text-gray-500">Total Subjects</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedSubjects}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-warning-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedTopics}</p>
              <p className="text-sm text-gray-500">Topics Done</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
              <p className="text-sm text-gray-500">Overall Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search subjects by name or description..."
        />
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Subject Grid */}
      {filteredSubjects.length > 0 ? (
        <SubjectGrid subjects={filteredSubjects} />
      ) : (
        <EmptyState type={searchQuery ? 'search' : 'filter'} />
      )}

      {/* Overall Progress */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Overall Preparation Progress</h2>
          <span className="text-2xl font-bold text-primary-600">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-3">
          You've completed {completedTopics} of {totalTopics} topics across {totalSubjects} subjects
        </p>
      </div>
    </div>
  );
};

export default Subjects;
