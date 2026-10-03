import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, ChevronDown, X, Settings, LogIn, BookOpen, FileText, Target, Sparkles } from 'lucide-react';
import Badge from './ui/Badge';
import { useSettings } from '../context/SettingsContext';
import AuthModal from './ui/AuthModal';
import NotificationBell from './notifications/NotificationBell';
import { conceptsData, searchConcepts } from '../data/concepts';
import { formulasData, searchFormulas } from '../data/formulas';
import { subjectsData } from '../data/subjects';

const Navbar = ({ onMenuClick, title, breadcrumbs }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useSettings();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSignOut = () => {
    signOut();
    setProfileOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setProfileOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setProfileOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = [];

    const concepts = searchConcepts(query);
    concepts.forEach(concept => {
      results.push({
        type: 'concept',
        title: concept.topic,
        subject: concept.subject,
        url: `/concepts/${concept.subject}/${concept.topic}`,
        icon: BookOpen,
      });
    });

    const formulas = searchFormulas(query);
    formulas.forEach(formula => {
      results.push({
        type: 'formula',
        title: formula.topic,
        subject: formula.subject,
        url: `/formulas#${formula.id}`,
        icon: Sparkles,
      });
    });

    subjectsData.forEach(subject => {
      if (subject.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'subject',
          title: subject.name,
          subject: subject.name,
          url: `/subjects/${subject.id}`,
          icon: Target,
        });
      }

      subject.topics.forEach(topic => {
        if (topic.name.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            type: 'topic',
            title: topic.name,
            subject: subject.name,
            url: `/subjects/${subject.id}#${topic.id}`,
            icon: FileText,
          });
        }
      });
    });

    setSearchResults(results.slice(0, 10));
  };

  const handleSearchResultClick = (result) => {
    navigate(result.url);
    setSearchQuery('');
    setSearchResults([]);
    setSearchOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumbs / Title */}
          <div className="hidden sm:block">
            {breadcrumbs ? (
              <div className="flex items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 dark:text-slate-100 font-medium' : 'text-gray-500 dark:text-slate-400'}>
                      {crumb}
                    </span>
                    {index < breadcrumbs.length - 1 && (
                      <span className="text-gray-300 dark:text-slate-600">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <h1 className="text-lg font-semibold text-gray-900 dark:text-slate-100">{title}</h1>
            )}
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-xl relative">
          <div className={`relative transition-all duration-300 ${searchOpen ? 'flex-1' : 'w-64'}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search concepts, formulas, topics..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-slate-100 dark:placeholder-slate-500"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            />
            {searchOpen && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setSearchOpen(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 py-2 z-50 max-h-96 overflow-y-auto">
              {searchResults.map((result, index) => {
                const Icon = result.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
                  >
                    <Icon className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">{result.title}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{result.subject} • {result.type}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <NotificationBell />

          {/* Profile / Sign In */}
          <div className="relative">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                </button>

                {/* Profile dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                      <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{user?.email || ''}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleProfileClick}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button
                        onClick={handleSettingsClick}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-gray-100 dark:border-slate-700 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 flex items-center gap-2"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('signin');
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </div>

          {/* Auth Modal */}
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            mode={authMode}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
