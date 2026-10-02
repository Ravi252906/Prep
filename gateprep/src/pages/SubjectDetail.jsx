import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { getTopicsBySubject } from '../data/topics';
import SubjectHeader from '../components/subjects/SubjectHeader';
import TopicList from '../components/subjects/TopicList';
import FilterBar from '../components/subjects/FilterBar';
import SearchBar from '../components/subjects/SearchBar';
import EmptyState from '../components/subjects/EmptyState';
import { CheckCircle, Clock, Play } from 'lucide-react';

const SubjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [topics, setTopics] = useState([]);

  // Get subject data
  const subject = useMemo(() => {
    return subjects.find((s) => s.slug === slug);
  }, [slug]);

  // Initialize topics from data
  React.useEffect(() => {
    if (subject) {
      setTopics(getTopicsBySubject(slug));
    }
  }, [subject, slug]);

  // Handle topic completion toggle
  const handleToggleComplete = (topicId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              completed: !topic.completed,
              progress: topic.completed ? 0 : 100,
            }
          : topic
      )
    );
  };

  // Filter topics based on search and progress
  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      // Filter by search query
      const matchesSearch =
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by progress status
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'not-started' && topic.progress === 0) ||
        (activeFilter === 'in-progress' && topic.progress > 0 && !topic.completed) ||
        (activeFilter === 'completed' && topic.completed);

      return matchesSearch && matchesFilter;
    });
  }, [topics, searchQuery, activeFilter]);

  // Calculate progress from current topics state
  const progress = useMemo(() => {
    if (topics.length === 0) return 0;
    const completedCount = topics.filter((t) => t.completed).length;
    return Math.round((completedCount / topics.length) * 100);
  }, [topics]);

  const completedTopics = topics.filter((t) => t.completed).length;
  const totalTopics = topics.length;

  // Handle back navigation
  const handleBack = () => {
    navigate('/subjects');
  };

  if (!subject) {
    return (
      <div className="p-6">
        <EmptyState type="default" message="Subject not found" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={handleBack} className="hover:text-gray-900 transition-colors">
          Subjects
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">{subject.shortName}</span>
      </nav>

      {/* Subject Header */}
      <SubjectHeader
        subject={subject}
        progress={progress}
        completedTopics={completedTopics}
        totalTopics={totalTopics}
      />

      {/* Topic Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <Play className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalTopics}</p>
              <p className="text-sm text-gray-500">Total Topics</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedTopics}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-warning-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {topics.reduce((sum, t) => sum + parseInt(t.estimatedTime), 0)}h
              </p>
              <p className="text-sm text-gray-500">Total Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search topics..."
        />
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filterOptions={[
            { id: 'all', label: 'All' },
            { id: 'not-started', label: 'Not Started' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
          ]}
        />
      </div>

      {/* Topic List */}
      {filteredTopics.length > 0 ? (
        <TopicList topics={filteredTopics} onToggleComplete={handleToggleComplete} />
      ) : (
        <EmptyState type={searchQuery ? 'search' : 'filter'} />
      )}
    </div>
  );
};

export default SubjectDetail;
