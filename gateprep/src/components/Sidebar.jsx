import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";

const Sidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const location = useLocation();

  const mainNavItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: "LayoutDashboard",
    },
    {
      path: "/subjects",
      label: "Subjects",
      icon: "BookOpen",
    },
    {
      path: "/practice",
      label: "Practice",
      icon: "PenTool",
    },
    {
      path: "/mock-tests",
      label: "Mock Tests",
      icon: "FileText",
    },
  ];

  const analysisNavItems = [
    {
      path: "/analytics",
      label: "Analytics",
      icon: "BarChart3",
    },
    {
      path: "/planner",
      label: "Study Planner",
      icon: "Calendar",
    },
    {
      path: "/notes",
      label: "Notes",
      icon: "StickyNote",
    },
  ];

  const bottomNavItems = [
    {
      path: "/settings",
      label: "Settings",
      icon: "Settings",
    },
    {
      path: "/profile",
      label: "Profile",
      icon: "User",
    },
  ];

  // -----------------------------------------
  // Navigation Item
  // -----------------------------------------
  const NavItem = ({
    path,
    label,
    icon,
    isCollapsed,
  }) => {
    const Icon = Icons[icon];

    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname === path ||
          location.pathname.startsWith(`${path}/`);

    return (
      <NavLink
        to={path}
        onClick={() => onClose()}
        title={isCollapsed ? label : ""}
        className={`
          group
          relative
          flex
          items-center
          gap-3
          rounded-xl
          px-3
          py-2.5
          transition-all
          duration-200
          ${
            isActive
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
          }
        `}
      >
        {/* Active indicator */}
        {isActive && (
          <span
            className="
              absolute
              left-0
              top-1/2
              h-6
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-blue-600
            "
          />
        )}

        {/* Icon */}
        {Icon && (
          <Icon
            className={`
              h-5
              w-5
              flex-shrink-0
              transition-colors
              ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-400 group-hover:text-slate-600"
              }
            `}
          />
        )}

        {/* Label */}
        {!isCollapsed && (
          <span className="truncate text-sm font-medium">
            {label}
          </span>
        )}
      </NavLink>
    );
  };

  // -----------------------------------------
  // Navigation Group
  // -----------------------------------------
  const NavGroup = ({
    title,
    items,
    isCollapsed,
  }) => (
    <div className="space-y-1">
      {!isCollapsed && title && (
        <p
          className="
            px-3
            pb-2
            pt-1
            text-[11px]
            font-semibold
            uppercase
            tracking-wider
            text-slate-400
          "
        >
          {title}
        </p>
      )}

      {items.map((item) => (
        <NavItem
          key={item.path}
          {...item}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* =================================
          MOBILE OVERLAY
      ================================= */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-sm
            lg:hidden
          "
          onClick={onClose}
        />
      )}

      {/* =================================
          SIDEBAR
      ================================= */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          flex-col
          border-r
          border-slate-200
          bg-white
          dark:bg-slate-900
          dark:border-slate-700
          shadow-sm
          transition-all
          duration-300
          ease-in-out

          ${
            isCollapsed
              ? "w-16"
              : "w-64"
          }

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* =================================
            LOGO
        ================================= */}
        <div
          className="
            flex
            h-[73px]
            flex-shrink-0
            items-center
            justify-between
            border-b
            border-slate-100
            dark:border-slate-700
            px-4
          "
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-600
                  shadow-sm
                "
              >
                <Icons.BookOpen
                  className="h-5 w-5 text-white"
                />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  GATEPrep
                </h1>

                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  GATE CS / IT
                </p>
              </div>
            </div>
          ) : (
            <div
              className="
                mx-auto
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
              "
            >
              <Icons.BookOpen
                className="h-5 w-5 text-white"
              />
            </div>
          )}

          {/* Collapse */}
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="
                hidden
                rounded-lg
                p-1.5
                transition-colors
                hover:bg-slate-100
                lg:flex
              "
              title="Collapse sidebar"
            >
              <Icons.ChevronLeft
                className="h-4 w-4 text-slate-400"
              />
            </button>
          )}
        </div>

        {/* =================================
            NAVIGATION
        ================================= */}
        <nav
          className="
            flex
            flex-1
            flex-col
            gap-5
            overflow-y-auto
            overflow-x-hidden
            p-3
          "
        >
          <NavGroup
            title="Main"
            items={mainNavItems}
            isCollapsed={isCollapsed}
          />

          <NavGroup
            title="Analysis"
            items={analysisNavItems}
            isCollapsed={isCollapsed}
          />
        </nav>

        {/* =================================
            BOTTOM NAVIGATION
        ================================= */}
        <div
          className="
            flex-shrink-0
            border-t
            border-slate-100
            dark:border-slate-700
            p-3
          "
        >
          <NavGroup
            title="Account"
            items={bottomNavItems}
            isCollapsed={isCollapsed}
          />
        </div>

        {/* =================================
            EXPAND BUTTON
        ================================= */}
        {isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="
              absolute
              -right-3
              top-20
              hidden
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              hover:scale-105
              hover:shadow-md
              lg:flex
            "
            title="Expand sidebar"
          >
            <Icons.ChevronRight
              className="h-3 w-3 text-slate-500"
            />
          </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;