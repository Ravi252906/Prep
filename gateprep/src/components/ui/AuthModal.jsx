import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Button from './Button';
import { useSettings } from '../../context/SettingsContext';

const AuthModal = ({ isOpen, onClose, mode = 'signin' }) => {
  const { signIn } = useSettings();
  const [currentMode, setCurrentMode] = useState(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (currentMode === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (currentMode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create user object
      const userData = {
        id: Date.now(),
        name: currentMode === 'signup' ? formData.name : 'Demo User',
        email: formData.email,
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      // Sign in
      signIn(userData);

      // Close modal
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setCurrentMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentMode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 mt-1">
              {currentMode === 'signin' 
                ? 'Sign in to continue your GATE preparation'
                : 'Start your GATE preparation journey'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (Sign Up only) */}
            {currentMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.name ? 'border-error-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-error-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.email ? 'border-error-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-error-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.password ? 'border-error-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-error-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {currentMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.confirmPassword ? 'border-error-300' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-error-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Remember Me (Sign In only) */}
            {currentMode === 'signin' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <p className="text-sm text-error-600 text-center">{errors.submit}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              isLoading={isLoading}
            >
              {currentMode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Switch Mode */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {currentMode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={switchMode}
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              {currentMode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>

          {/* Demo Notice */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Demo authentication - No backend connected
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
