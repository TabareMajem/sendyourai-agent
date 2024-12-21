import React from 'react';
import { FileText, Settings } from 'lucide-react';
import { TriggerProps } from './types';

export function SurveyTrigger({ config, onChange }: TriggerProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Survey Trigger</h3>
            <p className="text-xs text-gray-500">Trigger workflow on survey responses</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Survey Provider</label>
          <select
            value={config.provider}
            onChange={(e) => onChange({ ...config, provider: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="typeform">Typeform</option>
            <option value="surveymonkey">SurveyMonkey</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Survey ID</label>
          <input
            type="text"
            value={config.surveyId || ''}
            onChange={(e) => onChange({ ...config, surveyId: e.target.value })}
            placeholder="Enter survey ID"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Response Conditions</label>
          <div className="mt-1 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.conditions?.completed}
                onChange={(e) => onChange({
                  ...config,
                  conditions: { ...config.conditions, completed: e.target.checked }
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Only completed responses</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.conditions?.specificQuestions}
                onChange={(e) => onChange({
                  ...config,
                  conditions: { ...config.conditions, specificQuestions: e.target.checked }
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Filter by specific questions</span>
            </label>
          </div>
        </div>

        {config.conditions?.specificQuestions && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Question IDs</label>
            <input
              type="text"
              value={config.conditions?.questionIds?.join(', ') || ''}
              onChange={(e) => onChange({
                ...config,
                conditions: {
                  ...config.conditions,
                  questionIds: e.target.value.split(',').map(id => id.trim())
                }
              })}
              placeholder="Enter question IDs (comma-separated)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}