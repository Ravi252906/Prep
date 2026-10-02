import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger', 'warning', 'info'
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'text-error-600',
      iconBg: 'bg-error-50',
      button: 'danger',
    },
    warning: {
      icon: 'text-warning-600',
      iconBg: 'bg-warning-50',
      button: 'warning',
    },
    info: {
      icon: 'text-primary-600',
      iconBg: 'bg-primary-50',
      button: 'primary',
    },
  };

  const styles = variantStyles[variant] || variantStyles.info;

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
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className={`w-12 h-12 ${styles.iconBg} rounded-full flex items-center justify-center mb-4`}>
            <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              variant={styles.button}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
