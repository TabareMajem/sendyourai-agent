import React from 'react';
import { TrendingUp, Clock, CheckCircle, DollarSign, Zap } from 'lucide-react';

interface OverviewMetricsProps {
  data: {
    totalWorkflows: number;
    successRate: number;
    tasksAutomated: number;
    timeSaved: string;
    costSavings: number;
  };
}

export function OverviewMetrics({ data }: OverviewMetricsProps) {
  const metrics = [
    {
      name: 'Total Workflows',
      value: data.totalWorkflows,
      icon: TrendingUp,
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Success Rate',
      value: `${data.successRate}%`,
      icon: CheckCircle,
      change: '+5%',
      changeType: 'increase'
    },
    {
      name: 'Tasks Automated',
      value: data.tasksAutomated,
      icon: Zap,
      change: '+25%',
      changeType: 'increase'
    },
    {
      name: 'Time Saved',
      value: data.timeSaved,
      icon: Clock,
      change: '+18%',
      changeType: 'increase'
    },
    {
      name: 'Cost Savings',
      value: `$${data.costSavings.toLocaleString()}`,
      icon: DollarSign,
      change: '+15%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <metric.icon className="w-6 h-6 text-indigo-600" />
            <span className={`text-sm font-medium ${
              metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change}
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-gray-900">{metric.value}</p>
          <p className="mt-1 text-sm text-gray-500">{metric.name}</p>
        </div>
      ))}
    </div>
  );
}