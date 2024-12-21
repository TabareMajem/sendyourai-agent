```typescript
import React from 'react';
import { TrendingUp, Users, Clock, Book, Brain } from 'lucide-react';

interface PerformanceMetricsProps {
  metrics: {
    averageGrade: number;
    gradeChange: number;
    completionRate: number;
    studyTime: string;
    participationRate: number;
  };
  className?: string;
}

export function PerformanceMetrics({ metrics, className = '' }: PerformanceMetricsProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Performance Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Average Grade */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Book className="w-5 h-5 text-indigo-600" />
            <span className={`text-sm font-medium ${
              metrics.gradeChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {metrics.gradeChange > 0 ? '+' : ''}{metrics.gradeChange}%
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.averageGrade}%</p>
          <p className="mt-1 text-sm text-gray-500">Average Grade</p>
        </div>

        {/* Completion Rate */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-500">Total</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.completionRate}%</p>
          <p className="mt-1 text-sm text-gray-500">Completion Rate</p>
        </div>

        {/* Study Time */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-500">Weekly</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.studyTime}</p>
          <p className="mt-1 text-sm text-gray-500">Study Time</p>
        </div>

        {/* Participation */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-500">Active</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.participationRate}%</p>
          <p className="mt-1 text-sm text-gray-500">Participation Rate</p>
        </div>

        {/* Learning Progress */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Brain className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-500">Progress</span>
          </div>
          <div className="mt-2">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-200">
                <div
                  style={{ width: `${metrics.averageGrade}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                />
              </div>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">Learning Progress</p>
        </div>
      </div>
    </div>
  );
}
```