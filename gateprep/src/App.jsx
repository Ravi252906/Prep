import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import Analytics from "./pages/Analytics";
import Planner from "./pages/Planner";
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const location = useLocation();

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
    };

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

  return (
    <div className="min-h-screen bg-slate-50">
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
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;