```typescript
import React from 'react';
import { Book, TrendingUp, TrendingDown } from 'lucide-react';

interface SubjectData {
  name: string;
  grade: number;
  change: number;
  assignments: {
    completed: number;
    total: number;
  };
  strengths: string[];
  areasForImprovement: string[];
}

interface SubjectPerformanceProps {
  subjects: SubjectData[];
  className?: string;
}

export function SubjectPerformance({ subjects, className = '' }: SubjectPerformanceProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Subject Performance</h3>
      
      <div className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject.name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Book className="w-5 h-5 text-indigo-600" />
                <h4 className="text-base font-medium text-gray-900">{subject.name}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">{subject.grade}%</span>
                <div className={`flex items-center ${
                  subject.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {subject.change >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium ml-1">
                    {Math.abs(subject.change)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Assignments Completed</span>
                <span>{subject.assignments.completed}/{subject.assignments.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 rounded-full h-2"
                  style={{
                    width: `${(subject.assignments.completed / subject.assignments.total) * 100}%`
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Strengths</h5>
                <ul className="space-y-1">
                  {subject.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Areas for Improvement</h5>
                <ul className="space-y-1">
                  {subject.areasForImprovement.map((area, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```