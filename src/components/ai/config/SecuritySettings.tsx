import React, { useState } from 'react';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';

export function SecuritySettings() {
  const [config, setConfig] = useState({
    dataEncryption: true,
    auditLogging: true,
    accessControl: true,
    complianceMode: 'standard',
    sensitiveDataHandling: ['mask', 'encrypt']
  });

  const handleToggle = (key: keyof typeof config) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  const handleComplianceModeChange = (mode: string) => {
    setConfig({ ...config, complianceMode: mode });
  };

  const handleSensitiveDataChange = (option: string) => {
    const current = config.sensitiveDataHandling;
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    setConfig({ ...config, sensitiveDataHandling: updated });
  };

  return (
    <div className="space-y-6">
      {/* Security Toggles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="w-5 h-5 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Data Encryption</p>
              <p className="text-xs text-gray-500">Encrypt all sensitive data at rest and in transit</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.dataEncryption}
              onChange={() => handleToggle('dataEncryption')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Audit Logging</p>
              <p className="text-xs text-gray-500">Keep detailed logs of all AI actions and decisions</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.auditLogging}
              onChange={() => handleToggle('auditLogging')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      {/* Compliance Mode */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Compliance Mode
        </label>
        <select
          value={config.complianceMode}
          onChange={(e) => handleComplianceModeChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="standard">Standard</option>
          <option value="hipaa">HIPAA</option>
          <option value="gdpr">GDPR</option>
          <option value="sox">SOX</option>
        </select>
      </div>

      {/* Sensitive Data Handling */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Sensitive Data Handling
        </label>
        <div className="space-y-2">
          {['mask', 'encrypt', 'restrict', 'audit'].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                checked={config.sensitiveDataHandling.includes(option)}
                onChange={() => handleSensitiveDataChange(option)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Security Warning */}
      {(!config.dataEncryption || !config.auditLogging) && (
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Security Warning
              </h3>
              <p className="mt-2 text-sm text-red-700">
                Disabling core security features may expose your system to risks.
                Please ensure you understand the implications before proceeding.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}