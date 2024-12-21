import React from 'react';
import { Shield, AlertTriangle, FileText, Upload } from 'lucide-react';

interface SafetySettingsProps {
  value: {
    contentModeration: boolean;
    biasDetection: boolean;
    complianceChecks: boolean;
  };
  onChange: (value: {
    contentModeration: boolean;
    biasDetection: boolean;
    complianceChecks: boolean;
  }) => void;
}

export function SafetySettings({ value, onChange }: SafetySettingsProps) {
  const handleToggle = (key: keyof typeof value) => {
    onChange({
      ...value,
      [key]: !value[key]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Shield className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Safety & Ethics Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Content Moderation */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={value.contentModeration}
              onChange={() => handleToggle('contentModeration')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label className="text-sm font-medium text-gray-900">
              Content Moderation
            </label>
            <p className="text-sm text-gray-500">
              Filter and moderate AI-generated content for appropriateness and professionalism
            </p>
          </div>
        </div>

        {/* Bias Detection */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={value.biasDetection}
              onChange={() => handleToggle('biasDetection')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label className="text-sm font-medium text-gray-900">
              Bias Detection
            </label>
            <p className="text-sm text-gray-500">
              Monitor and mitigate potential biases in AI decisions and suggestions
            </p>
          </div>
        </div>

        {/* Compliance Checks */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={value.complianceChecks}
              onChange={() => handleToggle('complianceChecks')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label className="text-sm font-medium text-gray-900">
              Compliance Checks
            </label>
            <p className="text-sm text-gray-500">
              Ensure AI actions comply with industry regulations and company policies
            </p>
          </div>
        </div>

        {/* Custom Policy Upload */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <FileText className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Custom Policies</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">
            Upload your company's ethical guidelines and compliance policies for the AI to follow
          </p>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="w-4 h-4 mr-2" />
            Upload Policy Document
          </button>
        </div>

        {/* Warning Section */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Safety Notice
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                These safety settings help ensure responsible AI usage. Regular review and
                updates of these settings are recommended as your needs evolve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}