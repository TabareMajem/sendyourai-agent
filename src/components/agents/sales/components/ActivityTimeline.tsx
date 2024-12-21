import React from 'react';
import { MessageSquare, Mail, Phone, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'email' | 'call' | 'message' | 'task';
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface ActivityTimelineProps {
  activities: Activity[];
  onActivityClick?: (activity: Activity) => void;
}

export function ActivityTimeline({ activities, onActivityClick }: ActivityTimelineProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'email':
        return Mail;
      case 'call':
        return Phone;
      case 'message':
        return MessageSquare;
      default:
        return Clock;
    }
  };

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const isLast = index === activities.length - 1;

          return (
            <li key={activity.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                      <Icon className="h-5 w-5 text-gray-500" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <button
                        onClick={() => onActivityClick?.(activity)}
                        className="text-left hover:text-indigo-600"
                      >
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="mt-0.5 text-sm text-gray-500">{activity.description}</p>
                      </button>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(activity.status)}
                        <time className="text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}