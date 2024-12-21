import React from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface PerformanceMetrics {
  responseTime: number;
  errorRate: number;
  uptime: number;
}

interface PerformanceIndicatorProps {
  metrics: PerformanceMetrics;
}

export function PerformanceIndicator({ metrics }: PerformanceIndicatorProps) {
  const getStatusColor = (value: number, threshold: number) => {
    return value > threshold ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">System Performance</h3>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Response Time</span>
            <span className={`text-sm font-medium ${getStatusColor(metrics.responseTime, 300)}`}>
              {metrics.responseTime}ms
            </span>
          </div>
          {metrics.responseTime > 300 && (
            <div className="mt-2 flex items-center text-xs text-red-600">
              <AlertTriangle className="w-4 h-4 mr-1" />
              High latency detected
            </div>
          )}
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Error Rate</span>
            <span className={`text-sm font-medium ${getStatusColor(metrics.errorRate, 1)}`}>
              {metrics.errorRate}%
            </span>
          </div>
          {metrics.errorRate < 1 && (
            <div className="mt-2 flex items-center text-xs text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Within normal range
            </div>
          )}
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Uptime</span>
            <span className={`text-sm font-medium ${getStatusColor(100 - metrics.uptime, 1)}`}>
              {metrics.uptime}%
            </span>
          </div>
          {metrics.uptime > 99.9 && (
            <div className="mt-2 flex items-center text-xs text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              High availability
            </div>
          )}
        </div>
      </div>
    </div>
  );
}