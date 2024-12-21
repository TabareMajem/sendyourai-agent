import React from 'react';
import { Activity, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Execution {
  id: string;
  zapName: string;
  status: 'success' | 'failed' | 'running';
  startTime: string;
  duration?: string;
  error?: string;
}

interface ZapierExecutionsProps {
  executions: Execution[];
  onRetry: (id: string) => void;
}

export function ZapierExecutions({ executions, onRetry }: ZapierExecutionsProps) {
  const getStatusIcon = (status: Execution['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg font-medium text-gray-900">Recent Executions</h2>
        </div>
      </div>

      <div className="space-y-4">
        {executions.map((execution) => (
          <div
            key={execution.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(execution.status)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {execution.zapName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Started: {execution.startTime}
                    {execution.duration && ` • Duration: ${execution.duration}`}
                  </p>
                </div>
              </div>

              {execution.status === 'failed' && (
                <button
                  onClick={() => onRetry(execution.id)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Retry
                </button>
              )}
            </div>

            {execution.error && (
              <div className="mt-3 p-3 bg-red-50 rounded-md">
                <p className="text-sm text-red-700">{execution.error}</p>
              </div>
            )}

            {execution.status === 'running' && (
              <div className="mt-3">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full animate-progress" />
                </div>
              </div>
            )}
          </div>
        ))}

        {executions.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              No recent executions found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}