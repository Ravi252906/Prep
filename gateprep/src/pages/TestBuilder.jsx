import React, { useState } from 'react';
import { Plus, Play, Trash2, Copy, Settings } from 'lucide-react';
import { useCustomTests } from '../context/CustomTestContext';
import { subjectsData } from '../data/subjects';

const TestBuilder = () => {
  const { customTests, createCustomTest, deleteCustomTest, duplicateCustomTest } = useCustomTests();
  const [showBuilder, setShowBuilder] = useState(false);
  const [testConfig, setTestConfig] = useState({
    name: '',
    subject: 'DBMS',
    topics: [],
    difficulty: 'medium',
    questionType: 'mcq',
    numberOfQuestions: 10,
    duration: 30,
    useAI: false,
  });

  const subjects = subjectsData.map(s => s.name);
  const difficulties = ['easy', 'medium', 'hard'];
  const questionTypes = ['mcq', 'msq', 'nat'];

  const handleCreateTest = () => {
    if (!testConfig.name) return;

    createCustomTest(testConfig);
    setShowBuilder(false);
    setTestConfig({
      name: '',
      subject: 'DBMS',
      topics: [],
      difficulty: 'medium',
      questionType: 'mcq',
      numberOfQuestions: 10,
      duration: 30,
      useAI: false,
    });
  };

  const handleDuplicate = (testId) => {
    duplicateCustomTest(testId);
  };

  const handleDelete = (testId) => {
    if (confirm('Are you sure you want to delete this test?')) {
      deleteCustomTest(testId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Custom Test Builder
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Create personalized practice tests
            </p>
          </div>
          <button
            onClick={() => setShowBuilder(!showBuilder)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Test
          </button>
        </div>

        {showBuilder && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Create Custom Test
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Test Name
                </label>
                <input
                  type="text"
                  value={testConfig.name}
                  onChange={(e) => setTestConfig({ ...testConfig, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Custom Test"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <select
                  value={testConfig.subject}
                  onChange={(e) => setTestConfig({ ...testConfig, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={testConfig.difficulty}
                  onChange={(e) => setTestConfig({ ...testConfig, difficulty: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Question Type
                </label>
                <select
                  value={testConfig.questionType}
                  onChange={(e) => setTestConfig({ ...testConfig, questionType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {questionTypes.map(type => (
                    <option key={type} value={type}>{type.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Number of Questions
                </label>
                <input
                  type="number"
                  value={testConfig.numberOfQuestions}
                  onChange={(e) => setTestConfig({ ...testConfig, numberOfQuestions: parseInt(e.target.value) })}
                  min="1"
                  max="50"
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={testConfig.duration}
                  onChange={(e) => setTestConfig({ ...testConfig, duration: parseInt(e.target.value) })}
                  min="5"
                  max="180"
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={testConfig.useAI}
                    onChange={(e) => setTestConfig({ ...testConfig, useAI: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Use AI-generated questions (Experimental)
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleCreateTest}
                disabled={!testConfig.name}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Create Test
              </button>
              <button
                onClick={() => setShowBuilder(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customTests.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {test.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{test.subject}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleDuplicate(test.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(test.id)}
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Questions</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{test.numberOfQuestions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Duration</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{test.duration} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Type</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 uppercase">{test.questionType}</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Play className="w-4 h-4" />
                Start Test
              </button>
            </div>
          ))}
        </div>

        {customTests.length === 0 && (
          <div className="text-center py-12">
            <Settings className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No custom tests yet. Create your first test!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestBuilder;
