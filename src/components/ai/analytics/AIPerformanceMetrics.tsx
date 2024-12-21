import React from 'react';
import { Brain, Zap, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface PerformanceMetrics {
  successRate: number;
  averageResponseTime: number;
  actionsCompleted: number;
  activeAutomations: number;
  errorRate: number;
}

interface AIPerformanceMetricsProps {
  metrics: PerformanceMetrics;
  className?: string;
}

export function AIPerformanceMetrics({ metrics, className = '' }: AIPerformanceMetricsProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">AI Performance Metrics</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        {/* Success Rate */}
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`text-sm font-medium ${
              metrics.successRate >= 90 ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {metrics.successRate}%
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-900">Success Rate</p>
          <p className="text-xs text-gray-500">Overall success of AI actions</p>
        </div>

        {/* Response Time */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">
              {metrics.averageResponseTime}ms
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-900">Avg Response</p>
          <p className="text-xs text-gray-500">Average response time</p>
        </div>

        {/* Actions Completed */}
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Zap className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-medium text-indigo-600">
              {metrics.actionsCompleted}
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-900">Actions</p>
          <p className="text-xs text-gray-500">Total actions completed</p>
        </div>

        {/* Active Automations */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Brain className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-600">
              {metrics.activeAutomations}
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-900">Active</p>
          <p className="text-xs text-gray-500">Current active automations</p>
        </div>

        {/* Error Rate */}
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className={`text-sm font-medium ${
              metrics.errorRate <= 5 ? 'text-green-600' : 'text-red-600'
            }`}>
              {metrics.errorRate}%
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-900">Error Rate</p>
          <p className="text-xs text-gray-500">Percentage of failed actions</p>
        </div>
      </div>
    </div>
  );
}