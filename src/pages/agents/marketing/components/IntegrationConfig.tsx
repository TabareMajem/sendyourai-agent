import React, { useState } from 'react';
import { Settings, Check, AlertTriangle } from 'lucide-react';
import { SocialMediaConfig } from './integrations/SocialMediaConfig';
import { EmailMarketingConfig } from './integrations/EmailMarketingConfig';
import { AnalyticsConfig } from './integrations/AnalyticsConfig';
import { ContentToolsConfig } from './integrations/ContentToolsConfig';

interface IntegrationConfigProps {
  onUpdate: (config: any) => void;
  currentConfig: any;
}

export function IntegrationConfig({ onUpdate, currentConfig }: IntegrationConfigProps) {
  const [activeTab, setActiveTab] = useState('social');

  const tabs = [
    { id: 'social', name: 'Social Media', component: SocialMediaConfig },
    { id: 'email', name: 'Email Marketing', component: EmailMarketingConfig },
    { id: 'analytics', name: 'Analytics', component: AnalyticsConfig },
    { id: 'content', name: 'Content Tools', component: ContentToolsConfig }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Integration Settings</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">Changes saved automatically</span>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-8 text-sm font-medium border-b-2 whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {tabs.map((tab) => (
          activeTab === tab.id && (
            <tab.component
              key={tab.id}
              config={currentConfig[tab.id]}
              onUpdate={(newConfig) => onUpdate({ ...currentConfig, [tab.id]: newConfig })}
            />
          )
        ))}
      </div>
    </div>
  );
}