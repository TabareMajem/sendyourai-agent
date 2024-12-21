```typescript
import React from 'react';
import { Clock, Calendar, Brain, Target } from 'lucide-react';

interface LearningPattern {
  timeOfDay: {
    morning: number;
    afternoon: number;
    evening: number;
  };
  daysOfWeek: Record<string, number>;
  learningStyle: {
    visual: number;
    auditory: number;
    reading: number;
    kinesthetic: number;
  };
  focusAreas: {
    name: string;
    score: number;
  }[];
}

interface LearningPatternsProps {
  patterns: LearningPattern;
  className?: string;
}

export function LearningPatterns({ patterns, className = '' }: LearningPatternsProps) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Learning Patterns</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time of Day */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-medium text-gray-900">Productive Hours</h4>
          </div>
          <div className="space-y-2">
            {Object.entries(patterns.timeOfDay).map(([time, value]) => (
              <div key={time} className="flex items-center">
                <span className="w-24 text-sm text-gray-500 capitalize">{time}</span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 rounded-full h-2"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm text-gray-600">{value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Days of Week */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-medium text-gray-900">Weekly Activity</h4>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center">
                <div
                  className="w-full aspect-square rounded-lg bg-indigo-100"
                  style={{
                    backgroundColor: `rgba(79, 70, 229, ${patterns.daysOfWeek[day] / 100})`
                  }}
                />
                <span className="text-xs text-gray-500 mt-1">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Style */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-medium text-gray-900">Learning Style</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(patterns.learningStyle).map(([style, value]) => (
              <div key={style} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 capitalize">{style}</span>
                  <span className="text-sm font-medium text-gray-900">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 rounded-full h-2"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-medium text-gray-900">Focus Areas</h4>
          </div>
          <div className="space-y-3">
            {patterns.focusAreas.map((area) => (
              <div key={area.name} className="flex items-center">
                <span className="w-32 text-sm text-gray-500">{area.name}</span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 rounded-full h-2"
                      style={{ width: `${area.score}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm text-gray-600">{area.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```