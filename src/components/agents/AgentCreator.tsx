import React, { useState } from 'react';
import { Plus, Bot, Wand2, X } from 'lucide-react';

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'marketing' | 'sales' | 'support' | 'custom';
  capabilities: string[];
  requiredIntegrations: string[];
}

interface AgentCreatorProps {
  onClose: () => void;
  onCreate: (agent: any) => void;
}

const templates: AgentTemplate[] = [
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign Manager',
    description: 'Autonomously manages marketing campaigns across multiple channels',
    type: 'marketing',
    capabilities: [
      'Campaign planning and execution',
      'Content creation and scheduling',
      'Performance analytics',
      'Audience targeting'
    ],
    requiredIntegrations: [
      'Social Media Platforms',
      'Email Marketing Tools',
      'Analytics Services'
    ]
  },
  {
    id: 'sales-assistant',
    name: 'Sales Assistant',
    description: 'Helps qualify leads and automate follow-ups',
    type: 'sales',
    capabilities: [
      'Lead qualification',
      'Follow-up automation',
      'Meeting scheduling',
      'Deal tracking'
    ],
    requiredIntegrations: [
      'CRM',
      'Email',
      'Calendar'
    ]
  }
];

export function AgentCreator({ onClose, onCreate }: AgentCreatorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customConfig, setCustomConfig] = useState({
    name: '',
    description: '',
    goals: [] as string[],
    autonomyLevel: 'balanced'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;

    onCreate({
      ...template,
      ...customConfig,
      status: 'stopped',
      metrics: {
        tasksCompleted: 0,
        successRate: 0,
        activeWorkflows: 0
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-900">Create New Agent</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!selectedTemplate ? (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Select a Template</h3>
            <div className="grid grid-cols-2 gap-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-600 transition-colors"
                >
                  <h4 className="text-base font-medium text-gray-900">{template.name}</h4>
                  <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                  <div className="mt-4">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">Capabilities</h5>
                    <ul className="space-y-1">
                      {template.capabilities.map((capability, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1 h-1 bg-indigo-600 rounded-full mr-2" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Configure {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Agent
              </h3>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                Back
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={customConfig.name}
                  onChange={(e) => setCustomConfig({ ...customConfig, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="My Marketing Agent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={customConfig.description}
                  onChange={(e) => setCustomConfig({ ...customConfig, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Describe what this agent will do..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Autonomy Level
                </label>
                <select
                  value={customConfig.autonomyLevel}
                  onChange={(e) => setCustomConfig({ ...customConfig, autonomyLevel: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="conservative">Conservative (More Human Oversight)</option>
                  <option value="balanced">Balanced</option>
                  <option value="autonomous">Fully Autonomous</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Create Agent
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}