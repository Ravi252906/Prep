import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { practiceQuestions, getQuestionsBySubject, getQuestionsByTopic, getRandomQuestions } from '../data/practiceQuestions';
import { practiceModes, questionTypes, difficultyLevels, gateYears, marksOptions, questionCountOptions, timerOptions } from '../data/practiceModes';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Play, Zap, Target, Calendar, Shuffle, TrendingDown, Settings, Filter } from 'lucide-react';
import * as Icons from 'lucide-react';

const PracticeSetup = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('quick-practice');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMarks, setSelectedMarks] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [timerDuration, setTimerDuration] = useState(600);

  const topics = selectedSubject !== 'all'
    ? [...new Set(practiceQuestions.filter(q => q.subject === subjects.find(s => s.slug === selectedSubject)?.name).map(q => q.topic))]
    : [];

  const handleStartPractice = () => {
    let filteredQuestions = [...practiceQuestions];

    // Filter by subject
    if (selectedSubject !== 'all') {
      const subjectName = subjects.find(s => s.slug === selectedSubject)?.name;
      filteredQuestions = filteredQuestions.filter(q => q.subject === subjectName);
    }

    // Filter by topic
    if (selectedTopic !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.topic === selectedTopic);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === selectedDifficulty);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.type === selectedType);
    }

    // Filter by year
    if (selectedYear !== 'all') {
      if (selectedYear === '2017-2024') {
        filteredQuestions = filteredQuestions.filter(q => q.year >= 2017 && q.year <= 2024);
      } else {
        filteredQuestions = filteredQuestions.filter(q => q.year === selectedYear);
      }
    }

    // Filter by marks
    if (selectedMarks !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.marks === selectedMarks);
    }

    // Get random questions if needed
    if (selectedMode === 'quick-practice' || selectedMode === 'mixed-practice') {
      filteredQuestions = getRandomQuestions(Math.min(questionCount, filteredQuestions.length));
    } else {
      // Shuffle and take requested count
      filteredQuestions = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, questionCount);
    }

    if (filteredQuestions.length === 0) {
      alert('No questions match your criteria. Please adjust your filters.');
      return;
    }

    // Store practice session data
    const practiceSession = {
      questions: filteredQuestions,
      timerDuration: timerDuration,
      mode: selectedMode,
      filters: {
        subject: selectedSubject,
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        type: selectedType,
        year: selectedYear,
        marks: selectedMarks,
      },
    };

    // Store in localStorage for persistence
    localStorage.setItem('currentPracticeSession', JSON.stringify(practiceSession));

    navigate('/practice/session');
  };

  const getModeIcon = (iconName) => {
    return Icons[iconName] || Play;
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Practice Setup</h1>
        <p className="text-gray-500 mt-1">Configure your practice session</p>
      </div>

      {/* Practice Modes */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Practice Mode</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceModes.map((mode) => {
            const Icon = getModeIcon(mode.icon);
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`card p-5 text-left transition-all duration-200 ${
                  selectedMode === mode.id
                    ? 'border-primary-500 ring-2 ring-primary-500 ring-offset-2'
                    : 'hover:border-primary-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedMode === mode.id
                      ? 'bg-primary-100'
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      selectedMode === mode.id
                        ? 'text-primary-600'
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{mode.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{mode.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Configure Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Subject */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTopic('all');
              }}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject.slug} value={subject.slug}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              disabled={selectedSubject === 'all' || topics.length === 0}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="all">All Topics</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Difficulties</option>
              {difficultyLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Question Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {questionTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">GATE Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Years</option>
              {gateYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
          </div>

          {/* Marks */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Marks</label>
            <select
              value={selectedMarks}
              onChange={(e) => setSelectedMarks(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {marksOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question Count */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Number of Questions</label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {questionCountOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Timer */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Timer</label>
            <select
              value={timerDuration}
              onChange={(e) => setTimerDuration(parseInt(e.target.value))}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {timerOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex justify-center">
        <Button variant="primary" size="lg" icon={Play} onClick={handleStartPractice}>
          Start Practice Session
        </Button>
      </div>
    </div>
  );
};

export default PracticeSetup;
