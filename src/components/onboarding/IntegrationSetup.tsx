import React from 'react';
import {
  Calendar,
  Mail,
  MessageSquare,
  Database,
  BrainCircuit,
  FileText,
  Bell,
  Users,
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  category: string;
}

const integrations: Integration[] = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    icon: Calendar,
    description: 'Sync and manage calendar events',
    category: 'Calendar'
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    icon: Mail,
    description: 'Send automated emails and notifications',
    category: 'Communication'
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: MessageSquare,
    description: 'Team communication and notifications',
    category: 'Communication'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: Database,
    description: 'CRM integration for customer data',
    category: 'CRM'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: BrainCircuit,
    description: 'AI-powered content generation',
    category: 'AI'
  },
  {
    id: 'google-docs',
    name: 'Google Docs',
    icon: FileText,
    description: 'Document creation and management',
    category: 'Productivity'
  },
  {
    id: 'twilio',
    name: 'Twilio',
    icon: Bell,
    description: 'SMS and voice notifications',
    category: 'Communication'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    icon: Users,
    description: 'Team collaboration and meetings',
    category: 'Communication'
  }
];

interface IntegrationSetupProps {
  selectedIntegrations: string[];
  onIntegrationsChange: (integrations: string[]) => void;
  industry: string;
  goals: string[];
}

export function IntegrationSetup({
  selectedIntegrations,
  onIntegrationsChange,
  industry,
  goals
}: IntegrationSetupProps) {
  const handleToggleIntegration = (integrationId: string) => {
    const newIntegrations = selectedIntegrations.includes(integrationId)
      ? selectedIntegrations.filter(id => id !== integrationId)
      : [...selectedIntegrations, integrationId];
    onIntegrationsChange(newIntegrations);
  };

  const categories = Array.from(new Set(integrations.map(i => i.category)));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Configure Integrations</h2>
        <p className="mt-2 text-sm text-gray-600">
          Select the tools and services you want to integrate with your workflows
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">{category}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations
              .filter(integration => integration.category === category)
              .map(integration => {
                const Icon = integration.icon;
                const isSelected = selectedIntegrations.includes(integration.id);

                return (
                  <button
                    key={integration.id}
                    onClick={() => handleToggleIntegration(integration.id)}
                    className={`
                      flex items-start space-x-4 p-4 border rounded-lg text-left transition-all
                      hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                      ${isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                      }
                    `}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <div>
                      <h4 className={`text-sm font-medium ${isSelected ? 'text-indigo-600' : 'text-gray-900'}`}>
                        {integration.name}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">{integration.description}</p>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      ))}

      {selectedIntegrations.length === 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Select at least one integration to enable your AI workflows
          </p>
        </div>
      )}
    </div>
  );
}