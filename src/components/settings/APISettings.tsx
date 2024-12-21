import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

interface APISettingsProps {
  settings: any;
  onUpdate: (section: string, data: any) => void;
}

export function APISettings({ settings, onUpdate }: APISettingsProps) {
  const [showKey, setShowKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle key creation
    console.log('Creating new key:', newKeyName);
    setNewKeyName('');
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">API Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your API keys and access tokens
        </p>
      </div>

      <div className="border-t border-gray-200">
        {/* Create New Key */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Create New API Key</h3>
          <form onSubmit={handleCreateKey} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Production API Key"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create API Key
            </button>
          </form>
        </div>

        {/* API Keys List */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Active API Keys</h3>
          <div className="space-y-4">
            {[
              { name: 'Production API Key', created: '2024-02-01', lastUsed: '2024-02-20' },
              { name: 'Development API Key', created: '2024-01-15', lastUsed: '2024-02-19' }
            ].map((key, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Key className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{key.name}</p>
                    <p className="text-xs text-gray-500">
                      Created: {key.created} • Last used: {key.lastUsed}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="p-1 text-gray-400 hover:text-gray-500"
                  >
                    {showKey ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-red-400 hover:text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}