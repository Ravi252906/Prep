import React, { useState, useRef } from 'react';
import { Database, Download, Upload, Trash2, HardDrive, FileJson, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import SettingRow from './SettingRow';
import ConfirmModal from '../ui/ConfirmModal';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../ui/Toast';

const DataSettings = () => {
  const { exportData, importData, clearAllData } = useSettings();
  const { success, error } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
    title: '',
    message: '',
  });
  const fileInputRef = useRef(null);

  // Calculate storage usage (demo values)
  const storageUsage = {
    preferences: '2.4 KB',
    practiceProgress: '156 KB',
    mockTestProgress: '89 KB',
    plannerData: '45 KB',
    notes: '23 KB',
    total: '315.4 KB',
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await exportData();
      if (result) {
        success('Data exported successfully');
      } else {
        error('Failed to export data');
      }
    } catch (err) {
      error('Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsImporting(true);
    try {
      await importData(file);
      success('Data imported successfully');
    } catch (err) {
      error('Failed to import data. Please check the file format.');
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearAllData = () => {
    setConfirmModal({
      isOpen: true,
      action: 'clearAll',
      title: 'Clear All Local Data',
      message: 'This will permanently delete ALL your GATEPrep data including settings, profile, practice progress, mock test results, planner data, and notes. This action cannot be undone. Are you absolutely sure?',
    });
  };

  const handleConfirm = () => {
    if (confirmModal.action === 'clearAll') {
      clearAllData();
      success('All data cleared successfully');
    }
    setConfirmModal({ isOpen: false, action: null, title: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Storage Summary</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">Preferences</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{storageUsage.preferences}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileJson className="w-4 h-4 text-success-500" />
              <span className="text-sm font-medium text-gray-700">Practice Progress</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{storageUsage.practiceProgress}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileJson className="w-4 h-4 text-warning-500" />
              <span className="text-sm font-medium text-gray-700">Mock Test Progress</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{storageUsage.mockTestProgress}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileJson className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">Planner Data</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{storageUsage.plannerData}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileJson className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">Notes</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{storageUsage.notes}</p>
          </div>

          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Total</span>
            </div>
            <p className="text-2xl font-bold text-primary-900">{storageUsage.total}</p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Data Management</h2>

        {/* Export Data */}
        <SettingRow
          label="Export Data"
          description="Download all your GATEPrep data as a JSON file"
          icon={<Download className="w-5 h-5 text-primary-500" />}
          divider
        >
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={handleExport}
            isLoading={isExporting}
          >
            Export
          </Button>
        </SettingRow>

        {/* Import Data */}
        <SettingRow
          label="Import Data"
          description="Restore your GATEPrep data from a JSON file"
          icon={<Upload className="w-5 h-5 text-primary-500" />}
        >
          <div>
            <Button
              variant="secondary"
              size="sm"
              icon={Upload}
              onClick={handleImportClick}
              isLoading={isImporting}
            >
              Import
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </SettingRow>
      </div>

      <div className="card p-6 border border-error-200">
        <h2 className="text-lg font-semibold text-error-600 mb-4">Danger Zone</h2>

        {/* Clear All Data */}
        <SettingRow
          label="Clear All Local Data"
          description="Permanently delete all GATEPrep data from this device"
          icon={<Trash2 className="w-5 h-5 text-error-500" />}
        >
          <Button variant="danger" size="sm" icon={Trash2} onClick={handleClearAllData}>
            Clear All Data
          </Button>
        </SettingRow>
      </div>

      <div className="card p-6 bg-warning-50 border-warning-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-warning-900">Important Notes</h3>
            <ul className="text-sm text-warning-700 mt-1 space-y-1">
              <li>• Export your data regularly to prevent data loss</li>
              <li>• Import only JSON files exported from GATEPrep</li>
              <li>• Clearing browser data will delete all local storage</li>
              <li>• Data is stored locally and not synced to any server</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, action: null, title: '', message: '' })}
        onConfirm={handleConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        variant="danger"
      />
    </div>
  );
};

export default DataSettings;
