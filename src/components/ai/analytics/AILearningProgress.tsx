import React from 'react';
import { Brain, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

interface LearningMetrics {
  accuracy: number;
  accuracyChange: number;
  decisionsCount: number;
  decisionsChange: number;
  adaptationScore: number;
  adaptationChange: number;
  confidenceLevel: number;
  confidenceChange: number;
}

interface AILearningProgressProps {
  metrics: LearningMetrics;
  className?: string;
}

export function AILearningProgress({ metrics, className = '' }: AILearningProgressProps) {
  const renderChange = (value: number, format: 'number' | 'percentage' = 'percentage') => {
    const formattedValue = format === 'percentage' ? `${Math.abs(value)}%` : Math.abs(value);
    const Icon = value >= 0 ? ArrowUp : ArrowDown;
    const colorClass = value >= 0 ? 'text-green-600' : 'text-red-600';
    
    return (
      <span className={`inline-flex items-center ${colorClass}`}>
        <Icon className="w-4 h-4 mr-1" />
        {formattedValue}
      </span>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">Learning Progress</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Accuracy */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Accuracy</p>
              {renderChange(metrics.accuracyChange)}
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.accuracy}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 rounded-full h-2"
                style={{ width: `${metrics.accuracy}%` }}
              />
            </div>
          </div>

          {/* Decisions Made */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Decisions Made</p>
              {renderChange(metrics.decisionsChange, 'number')}
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.decisionsCount}</p>
            <p className="mt-2 text-sm text-gray-500">Total decisions processed</p>
          </div>

          {/* Adaptation Score */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Adaptation Score</p>
              {renderChange(metrics.adaptationChange)}
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.adaptationScore}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 rounded-full h-2"
                style={{ width: `${metrics.adaptationScore}%` }}
              />
            </div>
          </div>

          {/* Confidence Level */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Confidence Level</p>
              {renderChange(metrics.confidenceChange)}
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.confidenceLevel}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${metrics.confidenceLevel}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-medium text-gray-900">Learning Trend</h4>
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            {/* Add a chart component here to show learning trends over time */}
            <p className="text-gray-500">Learning trend visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
}