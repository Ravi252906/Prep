import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import Practice from "./pages/Practice";
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

  // -----------------------------------------
  // Page Title
  // -----------------------------------------
  const getPageTitle = (pathname) => {
    if (
      pathname.startsWith("/subjects/") &&
      pathname !== "/subjects"
    ) {
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
      "/mock-tests": "Mock Tests",
      "/analytics": "Analytics",
      "/planner": "Study Planner",
      "/notes": "Notes",
      "/settings": "Settings",
      "/profile": "Profile",
    };

    return titles[pathname] || "Dashboard";
  };

  // -----------------------------------------
  // Breadcrumbs
  // -----------------------------------------
  const getBreadcrumbs = (pathname) => {
    const paths = pathname.split("/").filter(Boolean);

    if (paths.length === 0) {
      return null;
    }

    // Subject detail page
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

    return [
      "Dashboard",
      ...paths.map(
        (path) =>
          path.charAt(0).toUpperCase() +
          path.slice(1).replace("-", " ")
      ),
    ];
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          SIDEBAR
      ========================== */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() =>
          setSidebarCollapsed(!sidebarCollapsed)
        }
      />

      {/* =========================
          MAIN APPLICATION AREA
      ========================== */}
      <div
        className={`
          min-w-0
          min-h-screen
          transition-all
          duration-300
          ease-in-out
          ${
            sidebarCollapsed
              ? "lg:ml-16"
              : "lg:ml-64"
          }
        `}
      >

        {/* =========================
            NAVBAR
        ========================== */}
        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
          title={getPageTitle(location.pathname)}
          breadcrumbs={getBreadcrumbs(
            location.pathname
          )}
        />

        {/* =========================
            PAGE CONTENT
        ========================== */}
        <main
          className="
            min-h-[calc(100vh-73px)]
            min-w-0
            overflow-x-hidden
          "
        >
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

            {/* Subject Details */}
            <Route
              path="/subjects/:slug"
              element={<SubjectDetail />}
            />

            {/* Practice */}
            <Route
              path="/practice"
              element={<Practice />}
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

// ==========================================
// APP
// ==========================================

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;