import React, { useState } from 'react';
import { Bot, Lightbulb, X } from 'lucide-react';

interface AIAssistantProps {
  workflow: any;
  onSuggestion: (suggestion: any) => void;
}

export function AIAssistant({ workflow, onSuggestion }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const suggestions = [
    {
      type: 'optimization',
      title: 'Add Error Handling',
      description: 'Consider adding error handling to improve workflow reliability.',
      action: 'Add Error Handler'
    },
    {
      type: 'enhancement',
      title: 'Personalization Opportunity',
      description: 'Use AI to personalize message content based on user data.',
      action: 'Add AI Personalization'
    }
  ];

  return (
    <div
      className={`
        w-80 border-l border-gray-200 bg-white transition-all duration-300
        ${isExpanded ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">AI Assistant</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-600 transition-colors"
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
                  <button
                    onClick={() => onSuggestion(suggestion)}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {suggestion.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Natural Language Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ask AI Assistant
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Describe what you want to do..."
              className="block w-full pr-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Bot className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}