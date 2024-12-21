import React from 'react';
import { Play, Pause, Settings, MoreVertical } from 'lucide-react';

export function ActiveWorkflows() {
  const workflows = [
    {
      name: 'Customer Onboarding',
      status: 'active',
      lastRun: '2 minutes ago',
      successRate: '98%'
    },
    {
      name: 'Invoice Processing',
      status: 'paused',
      lastRun: '1 hour ago',
      successRate: '95%'
    },
    {
      name: 'Lead Nurturing',
      status: 'active',
      lastRun: '5 minutes ago',
      successRate: '92%'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Active Workflows</h2>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {workflows.map((workflow, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              {workflow.status === 'active' ? (
                <Play className="w-5 h-5 text-green-500" />
              ) : (
                <Pause className="w-5 h-5 text-yellow-500" />
              )}
              <div>
                <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                <p className="text-sm text-gray-500">Last run: {workflow.lastRun}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                {workflow.successRate}
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}