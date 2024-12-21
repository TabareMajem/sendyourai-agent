import React, { useState } from 'react';
import { RefreshCw, Database, Settings, AlertTriangle } from 'lucide-react';

interface ContactSyncConfigProps {
  onSave: (config: any) => Promise<void>;
  currentConfig?: any;
}

export function ContactSyncConfig({ onSave, currentConfig }: ContactSyncConfigProps) {
  const [config, setConfig] = useState({
    syncFrequency: currentConfig?.syncFrequency || 'hourly',
    fieldMappings: currentConfig?.fieldMappings || {},
    conflictResolution: currentConfig?.conflictResolution || 'latest',
    syncDirection: currentConfig?.syncDirection || 'bidirectional',
    platforms: currentConfig?.platforms || []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSave(config);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Database className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Contact Synchronization</h2>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Sync Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sync Frequency</label>
          <select
            value={config.syncFrequency}
            onChange={(e) => setConfig({ ...config, syncFrequency: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="realtime">Real-time</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Sync Direction */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sync Direction</label>
          <select
            value={config.syncDirection}
            onChange={(e) => setConfig({ ...config, syncDirection: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="bidirectional">Two-way Sync</option>
            <option value="push">Push Only</option>
            <option value="pull">Pull Only</option>
          </select>
        </div>

        {/* Conflict Resolution */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Conflict Resolution</label>
          <select
            value={config.conflictResolution}
            onChange={(e) => setConfig({ ...config, conflictResolution: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="latest">Most Recent Wins</option>
            <option value="source">Source System Wins</option>
            <option value="target">Target System Wins</option>
            <option value="manual">Manual Resolution</option>
          </select>
        </div>

        {/* Connected Platforms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Connected Platforms</label>
          <div className="space-y-2">
            {['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM'].map((platform) => (
              <label key={platform} className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.platforms.includes(platform)}
                  onChange={(e) => {
                    const platforms = e.target.checked
                      ? [...config.platforms, platform]
                      : config.platforms.filter(p => p !== platform);
                    setConfig({ ...config, platforms });
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Field Mappings */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Field Mappings</label>
            <button
              onClick={() => {/* Open field mapping modal */}}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              <Settings className="w-4 h-4 mr-1" />
              Configure Mappings
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Configure how fields are mapped between different platforms.
              Click configure to set up detailed field mappings.
            </div>
          </div>
        </div>

        {/* Warning for Real-time Sync */}
        {config.syncFrequency === 'realtime' && (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Real-time Sync Considerations
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  Real-time synchronization may impact system performance and API rate limits.
                  Ensure your connected platforms support real-time updates.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}