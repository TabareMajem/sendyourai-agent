import React from 'react';
import { Brain, ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AIPerformanceProps {
  data: {
    suggestions: {
      total: number;
      accepted: number;
      dismissed: number;
    };
    accuracy: {
      date: string;
      value: number;
    }[];
    impact: {
      timeSaved: string;
      successRate: number;
      improvements: number;
    };
  };
}

export function AIPerformance({ data }: AIPerformanceProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-indigo-600" />
        <h2 className="text-lg font-medium text-gray-900">AI Performance</h2>
      </div>

      {/* Suggestions Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Suggestions</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {data.suggestions.total}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Accepted</span>
            <ThumbsUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {data.suggestions.accepted}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Dismissed</span>
            <ThumbsDown className="w-4 h-4 text-red-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {data.suggestions.dismissed}
          </p>
        </div>
      </div>

      {/* Accuracy Trend */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">AI Accuracy Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.accuracy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact Metrics */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-4">AI Impact</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Time Saved</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {data.impact.timeSaved}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Success Rate</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {data.impact.successRate}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Improvements</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {data.impact.improvements}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}