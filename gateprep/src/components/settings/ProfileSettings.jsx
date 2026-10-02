import React, { useState } from 'react';
import { User, Mail, Phone, Building, GraduationCap, Calendar, Lock, Edit3, Save, X } from 'lucide-react';
import Button from '../ui/Button';
import ToggleSwitch from '../ui/ToggleSwitch';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const ProfileSettings = () => {
  const { user, updateUser, signOut } = useSettings();
  const { success, error } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    college: '',
    targetExam: 'GATE CS/IT',
    targetYear: '2025',
    preparationStatus: 'In Progress',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = () => {
    try {
      updateUser(formData);
      setIsEditing(false);
      success('Profile updated successfully');
    } catch (err) {
      error('Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      college: '',
      targetExam: 'GATE CS/IT',
      targetYear: '2025',
      preparationStatus: 'In Progress',
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Demo - password change not implemented without backend
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      error('Password must be at least 6 characters');
      return;
    }
    success('Password updated (demo only)');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordSection(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{user?.name || 'Guest User'}</h2>
              <p className="text-gray-500 dark:text-slate-400">{user?.email || 'Not signed in'}</p>
              <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
          {!isEditing && (
            <Button variant="secondary" icon={Edit3} onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Information */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-slate-800 disabled:text-gray-500 dark:disabled:text-slate-500 dark:text-slate-100 dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-slate-800 disabled:text-gray-500 dark:disabled:text-slate-500 dark:text-slate-100 dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-slate-800 disabled:text-gray-500 dark:disabled:text-slate-500 dark:text-slate-100 dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">College/Institute</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                disabled={!isEditing}
                placeholder="Your college name"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-slate-800 disabled:text-gray-500 dark:disabled:text-slate-500 dark:text-slate-100 dark:bg-slate-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Target Exam</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
              <select
                value={formData.targetExam}
                onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-slate-800 disabled:text-gray-500 dark:disabled:text-slate-500 dark:text-slate-100 dark:bg-slate-800"
              >
                <option value="GATE CS/IT">GATE CS/IT</option>
                <option value="GATE EC">GATE EC</option>
                <option value="GATE EE">GATE EE</option>
                <option value="GATE ME">GATE ME</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Target Year</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
              <select
                value={formData.targetYear}
                onChange={(e) => setFormData({ ...formData, targetYear: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 dark:disabled:bg-slate-800 disabled:text-gray-500 dark:disabled:text-slate-500 dark:text-slate-100 dark:bg-slate-800"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="flex gap-3 mt-6">
            <Button variant="primary" icon={Save} onClick={handleSaveProfile}>
              Save Changes
            </Button>
            <Button variant="secondary" icon={X} onClick={handleCancelEdit}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Change Password</h3>
          <button
            onClick={() => setShowPasswordSection(!showPasswordSection)}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            {showPasswordSection ? 'Cancel' : 'Change Password'}
          </button>
        </div>
        {showPasswordSection && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-slate-100 dark:bg-slate-800"
                />
              </div>
            </div>
            <Button variant="primary" onClick={handleChangePassword}>
              Update Password
            </Button>
          </div>
        )}
        {!showPasswordSection && (
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Click "Change Password" to update your password. This is a demo feature - no backend connected.
          </p>
        )}
      </div>

      {/* Sign Out */}
      <div className="card p-6 border border-error-200 dark:border-error-800">
        <h3 className="text-lg font-semibold text-error-600 dark:text-error-400 mb-2">Sign Out</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Sign out from your account on this device</p>
        <Button variant="danger" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
