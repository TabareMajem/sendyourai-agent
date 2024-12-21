```typescript
import React from 'react';
import { MessageSquare, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface CustomerQuery {
  id: string;
  customer: {
    name: string;
    email: string;
    company?: string;
  };
  subject: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'resolved';
  timestamp: Date;
  aiConfidence?: number;
}

interface CustomerQueryCardProps {
  query: CustomerQuery;
  onRespond: (queryId: string) => void;
  onAssign: (queryId: string) => void;
  onViewHistory: (queryId: string) => void;
}

export function CustomerQueryCard({
  query,
  onRespond,
  onAssign,
  onViewHistory
}: CustomerQueryCardProps) {
  const getPriorityColor = (priority: CustomerQuery['priority']) => {
    const colors = {
      high: 'text-red-600 bg-red-100',
      medium: 'text-yellow-600 bg-yellow-100',
      low: 'text-green-600 bg-green-100'
    };
    return colors[priority];
  };

  const getStatusIcon = (status: CustomerQuery['status']) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{query.customer.name}</h3>
            <p className="text-sm text-gray-500">{query.customer.company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(query.priority)}`}>
            {query.priority.charAt(0).toUpperCase() + query.priority.slice(1)} Priority
          </span>
          {getStatusIcon(query.status)}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900">Subject</h4>
        <p className="mt-1 text-sm text-gray-600">{query.subject}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900">Message</h4>
        <p className="mt-1 text-sm text-gray-600">{query.content}</p>
      </div>

      {query.aiConfidence !== undefined && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">AI Confidence</span>
            <span className="text-sm font-medium text-gray-900">{query.aiConfidence}%</span>
          </div>
          <div className="mt-2 relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${query.aiConfidence}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  query.aiConfidence >= 80 ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Received {query.timestamp.toLocaleString()}</span>
        <button
          onClick={() => onViewHistory(query.id)}
          className="text-indigo-600 hover:text-indigo-700"
        >
          View History
        </button>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => onRespond(query.id)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Respond
        </button>
        {query.status === 'pending' && (
          <button
            onClick={() => onAssign(query.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Assign
          </button>
        )}
      </div>
    </div>
  );
}
```