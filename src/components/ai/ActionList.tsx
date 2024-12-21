import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Action } from '../../lib/ai/types';
import { formatActionStatus, getActionDuration } from '../../lib/ai/utils/actionUtils';

interface ActionListProps {
  actions: Action[];
  className?: string;
}

export function ActionList({ actions, className = '' }: ActionListProps) {
  const getStatusIcon = (status: Action['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Actions</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {actions.map((action) => (
          <div key={action.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(action.status)}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(action.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {formatActionStatus(action)}
                </p>
                {action.status === 'completed' && (
                  <p className="text-xs text-gray-500">
                    Duration: {(getActionDuration(action)! / 1000).toFixed(2)}s
                  </p>
                )}
              </div>
            </div>
            {action.status === 'failed' && (
              <div className="mt-2 p-2 bg-red-50 rounded-md">
                <p className="text-sm text-red-700">
                  Failed to execute action. Please check the logs for details.
                </p>
              </div>
            )}
          </div>
        ))}
        {actions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>No actions recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}