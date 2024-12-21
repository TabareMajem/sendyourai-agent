import React, { useState } from 'react';
import { Settings, RefreshCw } from 'lucide-react';

interface IntegrationSettingsProps {
  integrations: any[];
  onConnect: (integration: string) => Promise<void>;
  onDisconnect: (integration: string) => Promise<void>;
  onUpdateConfig: (integration: string, config: any) => Promise<void>;
}

export function IntegrationSettings({
  integrations,
  onConnect,
  onDisconnect,
  onUpdateConfig
}: IntegrationSettingsProps) {
  const [activeTab, setActiveTab] = useState('crm');

  const tabs = [
    { id: 'crm', label: 'CRM Systems' },
    { id: 'email', label: 'Email Services' },
    { id: 'voice', label: 'Voice Calls' },
    { id: 'docs', label: 'Documents' }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Integration Settings</h2>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                `whitespace-nowrap py-4 px-8 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Integration content will go here */}
      </div>
    </div>
  );
}