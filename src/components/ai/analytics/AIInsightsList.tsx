import React from 'react';
import { Lightbulb, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react';

interface Insight {
  id: string;
  type: 'optimization' | 'warning' | 'suggestion';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timestamp: Date;
}

interface AIInsightsListProps {
  insights: Insight[];
  onInsightAction: (insightId: string, action: 'accept' | 'dismiss') => void;
  className?: string;
}

export function AIInsightsList({
  insights,
  onInsightAction,
  className = ''
}: AIInsightsListProps) {
  const getImpactColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">AI Insights</h3>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {insights.map((insight) => (
          <div key={insight.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                    {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{insight.description}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Generated {new Date(insight.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="ml-4 flex items-center space-x-2">
                <button
                  onClick={() => onInsightAction(insight.id, 'accept')}
                  className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onInsightAction(insight.id, 'dismiss')}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:text-indigo-700">
                  Details
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {insights.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Lightbulb className="w-8 h-8 mx-auto mb-2" />
            <p>No insights available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}