```typescript
import React from 'react';
import { Lightbulb, ArrowRight, Clock, Target, Book } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'study' | 'practice' | 'review';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  resources: {
    title: string;
    type: string;
    url: string;
  }[];
}

interface RecommendationsListProps {
  recommendations: Recommendation[];
  onActionClick: (recommendationId: string) => void;
  className?: string;
}

export function RecommendationsList({
  recommendations,
  onActionClick,
  className = ''
}: RecommendationsListProps) {
  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'study':
        return Book;
      case 'practice':
        return Target;
      case 'review':
        return Clock;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Personalized Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => {
          const TypeIcon = getTypeIcon(recommendation.type);
          
          return (
            <div
              key={recommendation.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <TypeIcon className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-medium text-gray-900">
                        {recommendation.title}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getPriorityColor(recommendation.priority)
                      }`}>
                        {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{recommendation.description}</p>
                  </div>
                </div>
                <span className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {recommendation.estimatedTime}
                </span>
              </div>

              {recommendation.resources.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Resources</h5>
                  <div className="space-y-2">
                    {recommendation.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                        {resource.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => onActionClick(recommendation.id)}
                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Take Action
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```