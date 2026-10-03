import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Context Providers
import { SettingsProvider } from "./context/SettingsContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { RevisionProvider } from "./context/RevisionContext";
import { GamificationProvider } from "./context/GamificationContext";
import { NotificationProvider } from "./context/NotificationContext";
import { StudySessionProvider } from "./context/StudySessionContext";
import { MistakesProvider } from "./context/MistakesContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import { DoubtProvider } from "./context/DoubtContext";
import { AIProvider } from "./context/AIContext";
import { ConceptProvider } from "./context/ConceptContext";
import { CustomTestProvider } from "./context/CustomTestContext";
import { ToastProvider } from "./components/ui/Toast";

// Layout Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import Practice from "./pages/Practice";
import PracticeSession from "./pages/PracticeSession";
import MockTests from "./pages/MockTests";
import MockTestInstructions from "./pages/MockTestInstructions";
import MockTestExam from "./pages/MockTestExam";
import MockTestResult from "./pages/MockTestResult";
import Analytics from "./pages/Analytics";
import Planner from "./pages/Planner";
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Revision from "./pages/Revision";
import RevisionSession from "./pages/RevisionSession";
import Mistakes from "./pages/Mistakes";
import Achievements from "./pages/Achievements";
import Notifications from "./pages/Notifications";
import StudyTimer from "./pages/StudyTimer";
import Assistant from "./pages/Assistant";
import AIReport from "./pages/AIReport";
import Concepts from "./pages/Concepts";
import ConceptDetail from "./pages/ConceptDetail";
import Formulas from "./pages/Formulas";
import Roadmap from "./pages/Roadmap";
import PYQIntelligence from "./pages/PYQIntelligence";
import Weightage from "./pages/Weightage";
import TestBuilder from "./pages/TestBuilder";
import Doubts from "./pages/Doubts";
import Bookmarks from "./pages/Bookmarks";
import Focus from "./pages/Focus";
import PreparationPace from "./pages/PreparationPace";
import TopicIntelligence from "./pages/TopicIntelligence";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const location = useLocation();

  // Check if we're on the exam page (full screen mode)
  const isExamPage = location.pathname.match(/^\/mock-tests\/[^/]+$/) && 
                     !location.pathname.includes('/instructions') && 
                     !location.pathname.includes('/result');

  // =========================
  // PAGE TITLE
  // =========================
  const getPageTitle = (pathname) => {
    // Subject detail page
    if (pathname.startsWith("/subjects/") && pathname !== "/subjects") {
      const slug = pathname.split("/")[2];

      return slug
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
    }

    const titles = {
      "/": "Dashboard",
      "/subjects": "Subjects",
      "/practice": "Practice",
      "/practice/session": "Practice Session",
      "/mock-tests": "Mock Tests",
      "/analytics": "Analytics",
      "/planner": "Study Planner",
      "/notes": "Notes",
      "/settings": "Settings",
      "/profile": "Profile",
      "/revision": "Revision Center",
      "/mistakes": "Mistake Book",
      "/achievements": "Achievements",
      "/notifications": "Notifications",
      "/study-timer": "Study Timer",
      "/assistant": "AI Study Copilot",
      "/ai-report": "AI Performance Report",
      "/concepts": "Concept Library",
      "/formulas": "Formula Book",
      "/roadmap": "GATE Roadmap",
      "/pyq-intelligence": "PYQ Intelligence",
      "/weightage": "Weightage Analysis",
      "/test-builder": "Custom Test Builder",
      "/doubts": "Doubt Notebook",
      "/bookmarks": "Bookmarks",
      "/focus": "Focus Mode",
      "/preparation-pace": "Preparation Pace",
    };

    // Mock test routes
    if (pathname.startsWith("/mock-tests/") && pathname !== "/mock-tests") {
      if (pathname.includes("/instructions")) {
        return "Test Instructions";
      }
      if (pathname.includes("/result")) {
        return "Test Result";
      }
      return "Mock Test Exam";
    }

    return titles[pathname] || "Dashboard";
  };

  // =========================
  // BREADCRUMBS
  // =========================
  const getBreadcrumbs = (pathname) => {
    const paths = pathname.split("/").filter(Boolean);

    // Dashboard
    if (paths.length === 0) {
      return null;
    }

    // Subject detail
    if (paths[0] === "subjects" && paths.length > 1) {
      const slug = paths[1];

      const subjectName = slug
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");

      return [
        "Dashboard",
        "Subjects",
        subjectName,
      ];
    }

    // Practice Session
    if (paths[0] === "practice" && paths.length > 1) {
      return [
        "Dashboard",
        "Practice",
        "Practice Session",
      ];
    }

    // Mock Test Session
    if (paths[0] === "mock-tests" && paths.length > 1) {
      const breadcrumbs = ["Dashboard", "Mock Tests"];
      if (paths[1] === "instructions") {
        breadcrumbs.push("Test Instructions");
      } else if (paths[1] === "result") {
        breadcrumbs.push("Test Result");
      } else {
        breadcrumbs.push("Mock Test Exam");
      }
      return breadcrumbs;
    }

    // Other pages
    return [
      "Dashboard",
      ...paths.map((path) =>
        path
          .split("-")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(" ")
      ),
    ];
  };

  if (isExamPage) {
    return (
      <Routes>
        <Route
          path="/mock-tests/:testId"
          element={<MockTestExam />}
        />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* =========================
          SIDEBAR
      ========================= */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() =>
          setSidebarCollapsed(!sidebarCollapsed)
        }
      />

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div
        className={`min-w-0 min-h-screen transition-all duration-300 ease-in-out ${
          sidebarCollapsed
            ? "lg:ml-16"
            : "lg:ml-64"
        }`}
      >
        {/* =========================
            NAVBAR
        ========================= */}
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          title={getPageTitle(location.pathname)}
          breadcrumbs={getBreadcrumbs(location.pathname)}
        />

        {/* =========================
            PAGE CONTENT
        ========================= */}
        <main className="min-h-[calc(100vh-73px)] min-w-0 overflow-x-hidden">
          <Routes>
            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Subjects */}
            <Route
              path="/subjects"
              element={<Subjects />}
            />

            {/* Individual Subject */}
            <Route
              path="/subjects/:slug"
              element={<SubjectDetail />}
            />

            {/* Practice */}
            <Route
              path="/practice"
              element={<Practice />}
            />

            {/* Practice Session */}
            <Route
              path="/practice/session"
              element={<PracticeSession />}
            />

            {/* Mock Tests */}
            <Route
              path="/mock-tests"
              element={<MockTests />}
            />

            {/* Mock Test Instructions */}
            <Route
              path="/mock-tests/:testId/instructions"
              element={<MockTestInstructions />}
            />

            {/* Mock Test Result */}
            <Route
              path="/mock-tests/:testId/result"
              element={<MockTestResult />}
            />

            {/* Analytics */}
            <Route
              path="/analytics"
              element={<Analytics />}
            />

            {/* Study Planner */}
            <Route
              path="/planner"
              element={<Planner />}
            />

            {/* Notes */}
            <Route
              path="/notes"
              element={<Notes />}
            />

            {/* Settings */}
            <Route
              path="/settings"
              element={<Settings />}
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* Revision Center */}
            <Route
              path="/revision"
              element={<Revision />}
            />

            {/* Revision Session */}
            <Route
              path="/revision/:topicId"
              element={<RevisionSession />}
            />

            {/* Mistake Book */}
            <Route
              path="/mistakes"
              element={<Mistakes />}
            />

            {/* Achievements */}
            <Route
              path="/achievements"
              element={<Achievements />}
            />

            {/* Notifications */}
            <Route
              path="/notifications"
              element={<Notifications />}
            />

            {/* Study Timer */}
            <Route
              path="/study-timer"
              element={<StudyTimer />}
            />

            {/* AI Study Copilot */}
            <Route
              path="/assistant"
              element={<Assistant />}
            />

            {/* AI Report */}
            <Route
              path="/ai-report"
              element={<AIReport />}
            />

            {/* Concept Library */}
            <Route
              path="/concepts"
              element={<Concepts />}
            />

            {/* Concept Detail */}
            <Route
              path="/concepts/:subject/:topic"
              element={<ConceptDetail />}
            />

            {/* Formula Book */}
            <Route
              path="/formulas"
              element={<Formulas />}
            />

            {/* Roadmap */}
            <Route
              path="/roadmap"
              element={<Roadmap />}
            />

            {/* PYQ Intelligence */}
            <Route
              path="/pyq-intelligence"
              element={<PYQIntelligence />}
            />

            {/* Weightage */}
            <Route
              path="/weightage"
              element={<Weightage />}
            />

            {/* Custom Test Builder */}
            <Route
              path="/test-builder"
              element={<TestBuilder />}
            />

            {/* Doubt Notebook */}
            <Route
              path="/doubts"
              element={<Doubts />}
            />

            {/* Bookmarks */}
            <Route
              path="/bookmarks"
              element={<Bookmarks />}
            />

            {/* Focus Mode */}
            <Route
              path="/focus"
              element={<Focus />}
            />

            {/* Preparation Pace */}
            <Route
              path="/preparation-pace"
              element={<PreparationPace />}
            />

            {/* Topic Intelligence */}
            <Route
              path="/topic-intelligence/:topicId"
              element={<TopicIntelligence />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// =========================
// APP
// =========================
function App() {
  return (
    <SettingsProvider>
      <AnalyticsProvider>
        <RevisionProvider>
          <GamificationProvider>
            <NotificationProvider>
              <StudySessionProvider>
                <MistakesProvider>
                  <BookmarkProvider>
                    <DoubtProvider>
                      <AIProvider>
                        <ConceptProvider>
                          <CustomTestProvider>
                            <ToastProvider>
                              <Router>
                                <AppContent />
                              </Router>
                            </ToastProvider>
                          </CustomTestProvider>
                        </ConceptProvider>
                      </AIProvider>
                    </DoubtProvider>
                  </BookmarkProvider>
                </MistakesProvider>
              </StudySessionProvider>
            </NotificationProvider>
          </GamificationProvider>
        </RevisionProvider>
      </AnalyticsProvider>
    </SettingsProvider>
  );
}

export default App;