import React from 'react';
import { MessageSquare, Clock, CheckCircle, Users, TrendingUp } from 'lucide-react';

interface SupportMetrics {
  totalQueries: number;
  averageResponseTime: string;
  resolutionRate: number;
  aiHandledQueries: number;
  customerSatisfaction: number;
}

interface SupportMetricsProps {
  metrics: SupportMetrics;
  className?: string;
}

export function SupportMetrics({ metrics, className = '' }: SupportMetricsProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Support Performance</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Queries */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.totalQueries}</p>
          <p className="mt-1 text-sm text-gray-500">Queries Handled</p>
        </div>

        {/* Response Time */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">Average</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.averageResponseTime}</p>
          <p className="mt-1 text-sm text-gray-500">Response Time</p>
        </div>

        {/* Resolution Rate */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">Rate</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.resolutionRate}%</p>
          <p className="mt-1 text-sm text-gray-500">Resolution Rate</p>
        </div>

        {/* AI Handled */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-500">AI Handled</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.aiHandledQueries}</p>
          <p className="mt-1 text-sm text-gray-500">Automated Responses</p>
        </div>

        {/* Customer Satisfaction */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-500">CSAT</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.customerSatisfaction}%</p>
          <p className="mt-1 text-sm text-gray-500">Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
}