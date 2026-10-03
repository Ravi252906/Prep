import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Target,
  TrendingUp,
  Flame,
  Filter,
  ChevronDown,
} from "lucide-react";

import { useAnalytics } from "../context/AnalyticsContext";
import AnalyticsCard from "../components/analytics/AnalyticsCard";
import PerformanceChart from "../components/analytics/PerformanceChart";
import SubjectAnalyticsCard from "../components/analytics/SubjectAnalyticsCard";
import TopicPerformanceTable from "../components/analytics/TopicPerformanceTable";
import StudyStreak from "../components/analytics/StudyStreak";
import WeeklyGoals from "../components/analytics/WeeklyGoals";
import RecommendationCard from "../components/analytics/RecommendationCard";
import PreparationOverview from "../components/analytics/PreparationOverview";

const Analytics = () => {
  const navigate = useNavigate();

  const { analytics, planner, generateRecommendations } = useAnalytics();

  const [selectedTimeFilter, setSelectedTimeFilter] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const {
    overallProgress = {},
    subjectPerformance = {},
    mockTestResults = [],
  } = analytics || {};

  const {
    studyStreak = {},
    weeklyGoals = [],
    weeklyProgress = {},
  } = planner || {};

  // --------------------------------------------------
  // RECOMMENDATIONS
  // --------------------------------------------------

  const recommendations = generateRecommendations
    ? generateRecommendations()
    : [];

  // --------------------------------------------------
  // WEEKLY STUDY HOURS
  // --------------------------------------------------

  const weeklyStudyHoursData = [
    { day: "Mon", hours: 3.5 },
    { day: "Tue", hours: 4.2 },
    { day: "Wed", hours: 5.0 },
    { day: "Thu", hours: 3.8 },
    { day: "Fri", hours: 4.5 },
    { day: "Sat", hours: 6.0 },
    { day: "Sun", hours: 4.0 },
  ];

  // --------------------------------------------------
  // MOCK TEST SCORES
  // --------------------------------------------------

  const mockTestScoresData =
    mockTestResults.length > 0
      ? mockTestResults.map((result, index) => ({
          test: `Test ${index + 1}`,
          score: Number(result.score) || 0,
        }))
      : [
          { test: "Test 1", score: 65 },
          { test: "Test 2", score: 68 },
          { test: "Test 3", score: 72 },
          { test: "Test 4", score: 76 },
          { test: "Test 5", score: 78 },
        ];

  // --------------------------------------------------
  // SUBJECT DATA
  // --------------------------------------------------

  const subjects = [
    {
      name: "Data Structures",
      progress: 75,
      questionsAttempted: 120,
      correctAnswers: 95,
      accuracy: 79,
      pyqsCompleted: 45,
      studyTime: 12,
    },
    {
      name: "Algorithms",
      progress: 60,
      questionsAttempted: 98,
      correctAnswers: 72,
      accuracy: 73,
      pyqsCompleted: 38,
      studyTime: 10,
    },
    {
      name: "DBMS",
      progress: 45,
      questionsAttempted: 85,
      correctAnswers: 55,
      accuracy: 65,
      pyqsCompleted: 25,
      studyTime: 8,
    },
    {
      name: "Operating Systems",
      progress: 55,
      questionsAttempted: 90,
      correctAnswers: 63,
      accuracy: 70,
      pyqsCompleted: 30,
      studyTime: 9,
    },
    {
      name: "Computer Networks",
      progress: 40,
      questionsAttempted: 75,
      correctAnswers: 48,
      accuracy: 64,
      pyqsCompleted: 22,
      studyTime: 7,
    },
    {
      name: "COA",
      progress: 35,
      questionsAttempted: 65,
      correctAnswers: 40,
      accuracy: 62,
      pyqsCompleted: 18,
      studyTime: 6,
    },
  ];

  // --------------------------------------------------
  // FIXED SUBJECT-WISE PROGRESS DATA
  // --------------------------------------------------
  // IMPORTANT:
  // The chart now uses the same subject data displayed above.
  // This prevents the chart from becoming empty when
  // subjectPerformance from AnalyticsContext is empty.

  const subjectProgressData = subjects.map((subject) => ({
    subject: subject.name,
    progress: Number(subject.progress) || 0,
  }));

  // --------------------------------------------------
  // TOPIC DATA
  // --------------------------------------------------

  const topics = [
    {
      name: "Arrays",
      subject: "Data Structures",
      status: "completed",
      progress: 100,
      accuracy: 85,
      questionsAttempted: 30,
      totalQuestions: 30,
    },
    {
      name: "Linked Lists",
      subject: "Data Structures",
      status: "completed",
      progress: 100,
      accuracy: 82,
      questionsAttempted: 25,
      totalQuestions: 25,
    },
    {
      name: "Trees",
      subject: "Data Structures",
      status: "partial",
      progress: 75,
      accuracy: 78,
      questionsAttempted: 35,
      totalQuestions: 45,
    },
    {
      name: "Sorting",
      subject: "Algorithms",
      status: "partial",
      progress: 60,
      accuracy: 72,
      questionsAttempted: 28,
      totalQuestions: 40,
    },
    {
      name: "Normalization",
      subject: "DBMS",
      status: "weak",
      progress: 50,
      accuracy: 58,
      questionsAttempted: 20,
      totalQuestions: 35,
    },
    {
      name: "Transactions",
      subject: "DBMS",
      status: "partial",
      progress: 40,
      accuracy: 62,
      questionsAttempted: 15,
      totalQuestions: 30,
    },
    {
      name: "Process Scheduling",
      subject: "Operating Systems",
      status: "partial",
      progress: 55,
      accuracy: 68,
      questionsAttempted: 22,
      totalQuestions: 35,
    },
    {
      name: "Deadlock",
      subject: "Operating Systems",
      status: "weak",
      progress: 45,
      accuracy: 55,
      questionsAttempted: 18,
      totalQuestions: 30,
    },
  ];

  // --------------------------------------------------
  // SUBJECT CLICK
  // --------------------------------------------------

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  // --------------------------------------------------
  // RECOMMENDATION ACTION
  // --------------------------------------------------

  const handleRecommendationAction = (recommendation) => {
    switch (recommendation.action) {
      case "practice":
        navigate("/practice");
        break;

      case "revise":
        navigate("/planner");
        break;

      case "mock_test":
        navigate("/mock-tests");
        break;

      case "learn":
        navigate("/subjects");
        break;

      default:
        break;
    }
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="p-6 space-y-6 animate-fade-in">

      {/* ============================================
          PAGE HEADER
      ============================================ */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Analytics
          </h1>

          <p className="mt-1 text-gray-500 dark:text-slate-400">
            Track your performance and identify areas for improvement
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() =>
              setSelectedTimeFilter(
                selectedTimeFilter === "all" ? "7 days" : "all"
              )
            }
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Filter className="h-4 w-4" />

            <span>
              {selectedTimeFilter === "all"
                ? "All Time"
                : selectedTimeFilter}
            </span>

            <ChevronDown className="h-4 w-4" />
          </button>

        </div>
      </div>

      {/* ============================================
          OVERALL PROGRESS CARDS
      ============================================ */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <AnalyticsCard
          title="Questions Solved"
          value={overallProgress.totalQuestionsSolved || 847}
          subtitle="Total questions"
          icon={BookOpen}
          trend={12}
          trendLabel="this week"
        />

        <AnalyticsCard
          title="PYQs Attempted"
          value={overallProgress.pyqsAttempted || 234}
          subtitle="Previous year questions"
          icon={Target}
          trend={8}
          trendLabel="this week"
        />

        <AnalyticsCard
          title="Mock Tests"
          value={overallProgress.mockTestsCompleted || 12}
          subtitle="Tests completed"
          icon={Flame}
          trend={2}
          trendLabel="this month"
        />

        <AnalyticsCard
          title="Average Score"
          value={`${overallProgress.averageMockScore || 78}%`}
          subtitle="Mock test average"
          icon={TrendingUp}
          trend={5}
          trendLabel="improvement"
        />

      </div>

      {/* ============================================
          STUDY STREAK + WEEKLY GOALS
      ============================================ */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <StudyStreak
          currentStreak={studyStreak.currentStreak || 15}
          longestStreak={studyStreak.longestStreak || 15}
          lastStudyDate={studyStreak.lastStudyDate}
        />

        <WeeklyGoals
          goals={weeklyGoals}
          progress={weeklyProgress}
        />

      </div>

      {/* ============================================
          CHARTS
      ============================================ */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <PerformanceChart
          type="area"
          data={weeklyStudyHoursData}
          dataKey="hours"
          xAxisKey="day"
          color="#6366f1"
          title="Weekly Study Hours"
          height={280}
        />

        <PerformanceChart
          type="line"
          data={mockTestScoresData}
          dataKey="score"
          xAxisKey="test"
          color="#10b981"
          title="Mock Test Scores"
          height={280}
        />

      </div>

      {/* ============================================
          SUBJECT PERFORMANCE CARDS
      ============================================ */}

      <div>

        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">
          Subject Performance
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

          {subjects.map((subject) => (
            <SubjectAnalyticsCard
              key={subject.name}
              {...subject}
              onClick={() => handleSubjectClick(subject.name)}
            />
          ))}

        </div>

      </div>

      {/* ============================================
          SUBJECT-WISE PROGRESS
      ============================================ */}

      <PerformanceChart
        type="bar"
        data={subjectProgressData}
        dataKey="progress"
        xAxisKey="subject"
        color="#6366f1"
        title="Subject-wise Progress"
        height={320}
      />

      {/* ============================================
          SELECTED SUBJECT
      ============================================ */}

      {selectedSubject && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Selected Subject
              </p>

              <p className="mt-1 text-lg font-semibold text-blue-900 dark:text-blue-100">
                {selectedSubject}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSubject(null)}
              className="rounded-lg px-3 py-2 text-sm text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-900/40"
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* ============================================
          TOPIC PERFORMANCE
      ============================================ */}

      <TopicPerformanceTable topics={topics} />

      {/* ============================================
          RECOMMENDATIONS
      ============================================ */}

      {recommendations.length > 0 && (
        <div>

          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">
            Personalized Recommendations
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {recommendations.slice(0, 4).map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.id || index}
                recommendation={recommendation}
                onAction={handleRecommendationAction}
              />
            ))}

          </div>

        </div>
      )}

      {/* ============================================
          PREPARATION OVERVIEW
      ============================================ */}

      <PreparationOverview analytics={analytics} />

    </div>
  );
};

export default Analytics;