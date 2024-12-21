import React from 'react';
import { BrainCircuit, MessageSquare } from 'lucide-react';

interface LearningPreferencesProps {
  value: {
    suggestionTypes: string[];
    feedbackEnabled: boolean;
    feedbackFrequency: string;
  };
  onChange: (value: {
    suggestionTypes: string[];
    feedbackEnabled: boolean;
    feedbackFrequency: string;
  }) => void;
}

const suggestionTypes = [
  'Cost Optimization',
  'Process Improvement',
  'Risk Detection',
  'Innovation Opportunities',
  'Customer Experience'
];

const feedbackFrequencies = [
  { value: 'always', label: 'After Every Action' },
  { value: 'daily', label: 'Daily Summary' },
  { value: 'weekly', label: 'Weekly Summary' }
];

export function LearningPreferences({ value, onChange }: LearningPreferencesProps) {
  const handleSuggestionTypeToggle = (type: string) => {
    const newTypes = value.suggestionTypes.includes(type)
      ? value.suggestionTypes.filter(t => t !== type)
      : [...value.suggestionTypes, type];
    onChange({ ...value, suggestionTypes: newTypes });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <BrainCircuit className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Learning Preferences</h2>
      </div>

      <div className="space-y-6">
        {/* Suggestion Types */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Suggestion Types
          </label>
          <div className="space-y-2">
            {suggestionTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value.suggestionTypes.includes(type)}
                  onChange={() => handleSuggestionTypeToggle(type)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Feedback Settings */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Feedback Collection
          </label>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={value.feedbackEnabled}
                onChange={(e) => onChange({ ...value, feedbackEnabled: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Enable feedback collection
              </span>
            </label>

            {value.feedbackEnabled && (
              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Feedback Frequency
                </label>
                <select
                  value={value.feedbackFrequency}
                  onChange={(e) => onChange({ ...value, feedbackFrequency: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {feedbackFrequencies.map((frequency) => (
                    <option key={frequency.value} value={frequency.value}>
                      {frequency.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Learning Impact */}
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="flex items-center mb-2">
            <MessageSquare className="w-4 h-4 text-indigo-600 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Learning Impact</h3>
          </div>
          <p className="text-sm text-gray-500">
            Your feedback helps the AI improve its suggestions and better understand
            your preferences over time.
          </p>
        </div>
      </div>
    </div>
  );
}