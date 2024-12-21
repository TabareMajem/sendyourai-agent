import React, { useState } from 'react';
import { Sliders, BrainCircuit, Zap, Shield } from 'lucide-react';

interface AIConfigOption {
  id: string;
  name: string;
  description: string;
  type: 'slider' | 'toggle' | 'select';
  options?: string[];
  min?: number;
  max?: number;
}

const configOptions: AIConfigOption[] = [
  {
    id: 'autonomyLevel',
    name: 'AI Autonomy Level',
    description: 'Set how independently the AI can make decisions',
    type: 'slider',
    min: 1,
    max: 5
  },
  {
    id: 'proactiveAlerts',
    name: 'Proactive Alerts',
    description: 'Enable AI to send notifications about potential issues',
    type: 'toggle'
  },
  {
    id: 'learningMode',
    name: 'Learning Mode',
    description: 'How should the AI adapt to your preferences',
    type: 'select',
    options: ['Conservative', 'Balanced', 'Aggressive']
  },
  {
    id: 'privacyLevel',
    name: 'Privacy Level',
    description: 'Configure data handling and sharing preferences',
    type: 'select',
    options: ['Strict', 'Standard', 'Flexible']
  }
];

interface AIConfigurationProps {
  config: Record<string, any>;
  onConfigChange: (config: Record<string, any>) => void;
  industry: string;
  approach: string;
  goals: string[];
}

export function AIConfiguration({
  config,
  onConfigChange,
  industry,
  approach,
  goals
}: AIConfigurationProps) {
  const handleConfigChange = (id: string, value: any) => {
    const newConfig = { ...config, [id]: value };
    onConfigChange(newConfig);
  };

  const renderConfigInput = (option: AIConfigOption) => {
    switch (option.type) {
      case 'slider':
        return (
          <div className="mt-2">
            <input
              type="range"
              min={option.min}
              max={option.max}
              value={config[option.id] || option.min}
              onChange={(e) => handleConfigChange(option.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Aggressive</span>
            </div>
          </div>
        );
      
      case 'toggle':
        return (
          <div className="mt-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config[option.id] || false}
                onChange={(e) => handleConfigChange(option.id, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        );
      
      case 'select':
        return (
          <div className="mt-2">
            <select
              value={config[option.id] || ''}
              onChange={(e) => handleConfigChange(option.id, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select an option</option>
              {option.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Configure AI Behavior</h2>
        <p className="mt-2 text-sm text-gray-600">
          Customize how your AI companion works and interacts
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {configOptions.map((option) => (
          <div
            key={option.id}
            className="p-4 border border-gray-200 rounded-lg bg-white"
          >
            <div className="flex items-center space-x-3">
              {option.id === 'autonomyLevel' && <Sliders className="w-5 h-5 text-indigo-600" />}
              {option.id === 'proactiveAlerts' && <BrainCircuit className="w-5 h-5 text-indigo-600" />}
              {option.id === 'learningMode' && <Zap className="w-5 h-5 text-indigo-600" />}
              {option.id === 'privacyLevel' && <Shield className="w-5 h-5 text-indigo-600" />}
              <h3 className="text-sm font-medium text-gray-900">{option.name}</h3>
            </div>
            <p className="mt-1 text-xs text-gray-500">{option.description}</p>
            {renderConfigInput(option)}
          </div>
        ))}
      </div>

      {Object.keys(config).length === 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Configure at least one AI behavior setting to continue
          </p>
        </div>
      )}
    </div>
  );
}