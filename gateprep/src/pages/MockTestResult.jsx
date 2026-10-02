import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import ResultSummary from '../components/mock/ResultSummary';
import PerformanceCharts from '../components/mock/PerformanceCharts';
import QuestionReview from '../components/mock/QuestionReview';
import TestHistory from '../components/mock/TestHistory';
import { mockTests } from '../data/mockTests';
import { mockQuestions } from '../data/mockQuestions';
import { ArrowLeft, Lightbulb, BarChart2, History, RotateCcw } from 'lucide-react';

const MockTestResult = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const test = mockTests.find(t => t.id === testId);
  const [activeTab, setActiveTab] = useState('summary');
  const [result, setResult] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [testHistory, setTestHistory] = useState([]);

  useEffect(() => {
    if (!test) return;

    // Load result from localStorage or generate mock result
    const storedResult = localStorage.getItem(`mockTestResult_${testId}`);
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      // Generate mock result
      const mockResult = {
        score: 72,
        totalMarks: test.totalMarks,
        correct: 43,
        incorrect: 12,
        unanswered: 10,
        accuracy: 78,
        percentile: 75,
        timeTaken: test.duration - 15
      };
      setResult(mockResult);
    }

    // Generate mock performance data
    const mockPerformanceData = {
      subjectWise: [
        { subject: 'Aptitude', score: 12, total: 15 },
        { subject: 'Math', score: 10, total: 13 },
        { subject: 'DSA', score: 28, total: 37 },
        { subject: 'DBMS', score: 18, total: 25 },
        { subject: 'OS', score: 14, total: 20 },
        { subject: 'CN', score: 16, total: 22 },
        { subject: 'COA', score: 12, total: 18 },
        { subject: 'DL', score: 10, total: 15 }
      ],
      difficultyWise: [
        { difficulty: 'Easy', correct: 15, total: 15 },
        { difficulty: 'Medium', correct: 20, total: 25 },
        { difficulty: 'Hard', correct: 8, total: 15 }
      ],
      accuracy: [
        { name: 'Correct', value: 43, color: '#22c55e' },
        { name: 'Incorrect', value: 12, color: '#ef4444' },
        { name: 'Unanswered', value: 10, color: '#f59e0b' }
      ],
      timePerSubject: [
        { subject: 'Aptitude', time: 25 },
        { subject: 'Math', time: 35 },
        { subject: 'DSA', time: 40 },
        { subject: 'DBMS', time: 30 },
        { subject: 'OS', time: 28 },
        { subject: 'CN', time: 22 }
      ]
    };
    setPerformanceData(mockPerformanceData);

    // Generate mock test history
    const mockHistory = [
      {
        id: 'full-length-2',
        name: 'Full Length Mock Test #2',
        date: '2024-09-28',
        timeTaken: '2h 45m',
        questions: 65,
        score: 72,
        totalMarks: 100,
        accuracy: 78,
        correct: 43,
        percentile: 75
      },
      {
        id: 'mini-test-1',
        name: 'Mini Test - Quick Revision',
        date: '2024-09-25',
        timeTaken: '42m',
        questions: 25,
        score: 35,
        totalMarks: 40,
        accuracy: 85,
        correct: 20,
        percentile: 80
      },
      {
        id: 'subject-dsa',
        name: 'Subject-wise Test: DSA',
        date: '2024-09-20',
        timeTaken: '55m',
        questions: 20,
        score: 26,
        totalMarks: 30,
        accuracy: 82,
        correct: 16,
        percentile: 78
      },
      {
        id: 'subject-cn',
        name: 'Subject-wise Test: Computer Networks',
        date: '2024-09-15',
        timeTaken: '40m',
        questions: 15,
        score: 20,
        totalMarks: 25,
        accuracy: 80,
        correct: 12,
        percentile: 72
      }
    ];
    setTestHistory(mockHistory);
  }, [test, testId]);

  if (!test || !result) {
    return (
      <div className="p-6">
        <div className="card p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Result Not Found</h2>
          <p className="text-gray-500 mb-4">The test result could not be found.</p>
          <button
            onClick={() => navigate('/mock-tests')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  const generateInsights = () => {
    const insights = [];
    
    // Strong subjects
    const strongSubjects = performanceData?.subjectWise
      .filter(s => (s.score / s.total) >= 0.8)
      .map(s => s.subject);
    
    if (strongSubjects.length > 0) {
      insights.push({
        type: 'success',
        title: 'Strong Areas',
        message: `Excellent performance in ${strongSubjects.join(', ')}. These are your core strengths.`
      });
    }

    // Weak subjects
    const weakSubjects = performanceData?.subjectWise
      .filter(s => (s.score / s.total) < 0.6)
      .map(s => s.subject);
    
    if (weakSubjects.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Areas for Improvement',
        message: `Focus on ${weakSubjects.join(', ')}. Consider revisiting fundamentals and practicing more questions.`
      });
    }

    // Time management
    if (result.timeTaken > test.duration * 0.9) {
      insights.push({
        type: 'info',
        title: 'Time Management',
        message: 'You used most of the available time. Practice speed and accuracy to improve time management.'
      });
    }

    // Accuracy
    if (result.accuracy >= 80) {
      insights.push({
        type: 'success',
        title: 'High Accuracy',
        message: 'Great accuracy! Maintain this consistency while working on speed.'
      });
    } else if (result.accuracy < 60) {
      insights.push({
        type: 'warning',
        title: 'Accuracy Needs Work',
        message: 'Focus on understanding concepts thoroughly before attempting more questions.'
      });
    }

    // Difficulty analysis
    const hardPerformance = performanceData?.difficultyWise.find(d => d.difficulty === 'Hard');
    if (hardPerformance && (hardPerformance.correct / hardPerformance.total) < 0.5) {
      insights.push({
        type: 'info',
        title: 'Challenging Questions',
        message: 'Practice more difficult problems to build confidence and improve problem-solving skills.'
      });
    }

    return insights;
  };

  const insights = generateInsights();

  const questions = mockQuestions.slice(0, test.questions);
  const userAnswers = result?.userAnswers || questions.map(() => ({ answered: false, marked: false, isCorrect: false }));

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/mock-tests')}
        >
          Back to Tests
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{test.name} - Result</h1>
          <p className="text-gray-500 mt-1">Completed on {new Date().toLocaleDateString()}</p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={RotateCcw}
          onClick={() => navigate(`/mock-tests/${testId}/instructions`)}
        >
          Retake Test
        </Button>
      </div>

      {/* Result Summary */}
      <ResultSummary result={result} />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'summary'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-primary-500'
          }`}
        >
          <BarChart2 className="w-4 h-4 inline mr-2" />
          Performance Analysis
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'review'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-primary-500'
          }`}
        >
          Question Review
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'history'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-primary-500'
          }`}
        >
          <History className="w-4 h-4 inline mr-2" />
          Test History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-warning-500" />
              AI-Powered Insights
            </h2>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    insight.type === 'success'
                      ? 'bg-success-50 border border-success-200'
                      : insight.type === 'warning'
                      ? 'bg-warning-50 border border-warning-200'
                      : 'bg-primary-50 border border-primary-200'
                  }`}
                >
                  <h3 className={`font-semibold mb-1 ${
                    insight.type === 'success'
                      ? 'text-success-800'
                      : insight.type === 'warning'
                      ? 'text-warning-800'
                      : 'text-primary-800'
                  }`}>
                    {insight.title}
                  </h3>
                  <p className={`text-sm ${
                    insight.type === 'success'
                      ? 'text-success-700'
                      : insight.type === 'warning'
                      ? 'text-warning-700'
                      : 'text-primary-700'
                  }`}>
                    {insight.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Charts */}
          {performanceData && <PerformanceCharts performanceData={performanceData} />}
        </div>
      )}

      {activeTab === 'review' && (
        <QuestionReview questions={questions} userAnswers={userAnswers} />
      )}

      {activeTab === 'history' && (
        <TestHistory history={testHistory} onViewResult={(id) => navigate(`/mock-tests/${id}/result`)} />
      )}
    </div>
  );
};

export default MockTestResult;
