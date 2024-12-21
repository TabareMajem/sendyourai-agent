import React from 'react';
import { BrainCircuit, Zap, Shield, Settings } from 'lucide-react';

interface AISettingsProps {
  settings: any;
  onUpdate: (section: string, data: any) => void;
}

export function AISettings({ settings, onUpdate }: AISettingsProps) {
  const handleSliderChange = (setting: string, value: number) => {
    onUpdate('ai', {
      ...settings.ai,
      [setting]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">AI Configuration</h2>
        <p className="mt-1 text-sm text-gray-500">
          Customize how the AI companion works and interacts
        </p>
      </div>

      <div className="border-t border-gray-200">
        {/* Proactivity Level */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Zap className="w-5 h-5 text-gray-400" />
            <h3 className="ml-2 text-sm font-medium text-gray-900">Proactivity Level</h3>
          </div>
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              value={settings.ai?.proactivity || 50}
              onChange={(e) => handleSliderChange('proactivity', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Aggressive</span>
            </div>
          </div>
        </div>

        {/* Autonomy Level */}
        <div className="px-6 pb-6">
          <div className="flex items-center mb-4">
            <BrainCircuit className="w-5 h-5 text-gray-400" />
            <h3 className="ml-2 text-sm font-medium text-gray-900">Autonomy Level</h3>
          </div>
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              value={settings.ai?.autonomy || 50}
              onChange={(e) => handleSliderChange('autonomy', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Manual Approval</span>
              <span>Semi-Autonomous</span>
              <span>Fully Autonomous</span>
            </div>
          </div>
        </div>

        {/* Industry Focus */}
        <div className="px-6 pb-6">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-gray-400" />
            <h3 className="ml-2 text-sm font-medium text-gray-900">Industry Focus</h3>
          </div>
          <select
            value={settings.ai?.industry || ''}
            onChange={(e) => onUpdate('ai', { ...settings.ai, industry: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
          </select>
        </div>

        {/* Data Privacy */}
        <div className="px-6 pb-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-gray-400" />
            <h3 className="ml-2 text-sm font-medium text-gray-900">Data Privacy</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Data Collection</p>
                <p className="text-sm text-gray-500">Allow AI to collect usage data for improvement</p>
              </div>
              <input
                type="checkbox"
                checked={settings.ai?.dataCollection}
                onChange={(e) => onUpdate('ai', { ...settings.ai, dataCollection: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Personalization</p>
                <p className="text-sm text-gray-500">Allow AI to personalize suggestions</p>
              </div>
              <input
                type="checkbox"
                checked={settings.ai?.personalization}
                onChange={(e) => onUpdate('ai', { ...settings.ai, personalization: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}