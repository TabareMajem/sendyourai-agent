import React from 'react';
import { Shield, FileCheck, AlertTriangle, Info } from 'lucide-react';

interface ComplianceSettingsProps {
  settings: any;
  onUpdate: (section: string, data: any) => void;
}

export function ComplianceSettings({ settings, onUpdate }: ComplianceSettingsProps) {
  const handleToggle = (regulation: string, value: boolean) => {
    onUpdate('compliance', {
      ...settings.compliance,
      [regulation]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Compliance Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage compliance requirements and data protection standards
        </p>
      </div>

      <div className="border-t border-gray-200">
        {/* GDPR Compliance */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">GDPR Compliance</p>
                <p className="text-sm text-gray-500">European Union data protection requirements</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.compliance?.gdpr}
                onChange={(e) => handleToggle('gdpr', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* HIPAA Compliance */}
        <div className="px-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <FileCheck className="w-5 h-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">HIPAA Compliance</p>
                <p className="text-sm text-gray-500">Healthcare data protection standards</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.compliance?.hipaa}
                onChange={(e) => handleToggle('hipaa', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* CCPA Compliance */}
        <div className="px-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">CCPA Compliance</p>
                <p className="text-sm text-gray-500">California Consumer Privacy Act requirements</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.compliance?.ccpa}
                onChange={(e) => handleToggle('ccpa', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="px-6 pb-6">
          <div className="flex items-center mb-4">
            <Info className="w-5 h-5 text-gray-400" />
            <h3 className="ml-2 text-sm font-medium text-gray-900">Data Retention Policy</h3>
          </div>
          <select
            value={settings.compliance?.dataRetention || '90'}
            onChange={(e) => onUpdate('compliance', {
              ...settings.compliance,
              dataRetention: e.target.value
            })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
            <option value="365">1 year</option>
          </select>
        </div>

        {/* Compliance Warnings */}
        <div className="px-6 pb-6">
          <div className="bg-yellow-50 p-4 rounded-md">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Compliance Requirements
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Enabling these settings will enforce strict data handling policies and may affect:
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Data storage locations</li>
                    <li>Processing procedures</li>
                    <li>User access controls</li>
                    <li>Audit logging requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}