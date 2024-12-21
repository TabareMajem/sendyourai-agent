import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export function SuggestionsPanel() {
  const suggestions = [
    {
      title: 'Workflow Optimization',
      description: 'I can help you optimize your current workflow for better efficiency.',
      action: 'Optimize Now'
    },
    {
      title: 'Data Analysis',
      description: 'Let me analyze your recent data for actionable insights.',
      action: 'Analyze Data'
    },
    {
      title: 'Task Automation',
      description: 'I can suggest tasks that could be automated to save time.',
      action: 'View Tasks'
    }
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Suggestions</h3>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-600 transition-colors cursor-pointer"
          >
            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">
                  {suggestion.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {suggestion.description}
                </p>
                <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center">
                  {suggestion.action}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}