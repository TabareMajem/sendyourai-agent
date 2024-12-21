import React from 'react';
import { Lightbulb, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';

export function AIInsights() {
  const insights = [
    {
      title: 'Workflow Optimization',
      description: 'Adding error handling could improve success rate by 15%',
      impact: 'High'
    },
    {
      title: 'Integration Suggestion',
      description: 'Connect with Slack to enhance team notifications',
      impact: 'Medium'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
        <span className="text-sm text-gray-500">Updated 5m ago</span>
      </div>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium text-gray-900">{insight.title}</h3>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                insight.impact === 'High'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {insight.impact} Impact
              </span>
            </div>
            <p className="text-sm text-gray-600 ml-8">{insight.description}</p>
            <div className="flex items-center justify-between ml-8">
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                Take Action
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ThumbsUp className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ThumbsDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}