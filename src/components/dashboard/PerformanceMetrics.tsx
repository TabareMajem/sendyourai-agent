import React from 'react';
import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function PerformanceMetrics() {
  const metrics = [
    {
      label: 'Total Automations',
      value: '1,234',
      change: '+12%',
      icon: TrendingUp
    },
    {
      label: 'Time Saved',
      value: '156h',
      change: '+8%',
      icon: Clock
    },
    {
      label: 'Success Rate',
      value: '98.5%',
      change: '+2%',
      icon: CheckCircle
    },
    {
      label: 'Failed Tasks',
      value: '23',
      change: '-5%',
      icon: AlertCircle
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
        <select className="text-sm border-gray-300 rounded-md">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <metric.icon className={`w-5 h-5 ${
                metric.label === 'Failed Tasks' ? 'text-red-500' : 'text-green-500'
              }`} />
              <span className={`text-xs font-medium ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{metric.value}</p>
            <p className="mt-1 text-sm text-gray-500">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}