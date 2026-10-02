import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { User, Mail, Calendar, Award, Target, TrendingUp, MapPin, Edit, Settings } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSettings();

  if (!isAuthenticated) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="card p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-500 mb-6">Please sign in to view your profile</p>
          <Button variant="primary" onClick={() => navigate('/settings')}>
            Go to Settings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Profile</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">View and manage your profile information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Settings} size="md" onClick={() => navigate('/settings')}>
            Settings
          </Button>
          <Button variant="secondary" icon={Edit} size="md" onClick={() => navigate('/settings')}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{user?.name || 'User'}</h2>
            <p className="text-gray-500 dark:text-slate-400 mt-1">GATE CS/IT Aspirant</p>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                <Mail className="w-4 h-4" />
                <span>{user?.email || 'No email'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats */}
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
                <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="text-sm text-gray-500 dark:text-slate-400">Study Streak</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-100">15 days</p>
            <p className="text-sm text-success-600 dark:text-success-400 mt-1">Personal best!</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-success-50 dark:bg-success-900/20 p-2 rounded-lg">
                <Target className="w-5 h-5 text-success-600 dark:text-success-400" />
              </div>
              <span className="text-sm text-gray-500 dark:text-slate-400">Target Score</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-100">85/100</p>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">IIT Delhi target</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-warning-50 dark:bg-warning-900/20 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-warning-600 dark:text-warning-400" />
              </div>
              <span className="text-sm text-gray-500 dark:text-slate-400">Improvement</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-100">+12%</p>
            <p className="text-sm text-success-600 dark:text-success-400 mt-1">This month</p>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Full Name</label>
                <p className="text-gray-900 dark:text-slate-100">{user?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Email</label>
                <p className="text-gray-900 dark:text-slate-100">{user?.email || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Phone</label>
                <p className="text-gray-900 dark:text-slate-100">+91 98765 43210</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Location</label>
                <p className="text-gray-900 dark:text-slate-100">New Delhi, India</p>
              </div>
            </div>
          </div>

          {/* GATE Information */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">GATE Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Registration Number</label>
                <p className="text-gray-900 dark:text-slate-100">GATE2027CS12345</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Paper</label>
                <p className="text-gray-900 dark:text-slate-100">Computer Science (CS)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Exam Center</label>
                <p className="text-gray-900 dark:text-slate-100">IIT Delhi</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Target Institute</label>
                <p className="text-gray-900 dark:text-slate-100">IIT Delhi (M.Tech CSE)</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                <div className="text-2xl">🏆</div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-slate-100">Consistent Learner</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">15-day study streak</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-2xl">⭐</div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-slate-100">Problem Solver</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Solved 847 questions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-slate-100">Mock Test Champion</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Completed 12 mock tests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
