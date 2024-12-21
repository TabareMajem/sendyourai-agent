import React from 'react';
import { X, Play, Pause, Clock, CheckCircle, AlertTriangle, Users, Tag } from 'lucide-react';

interface WorkflowDetailsPanelProps {
  workflowId: string;
  onClose: () => void;
}

export function WorkflowDetailsPanel({ workflowId, onClose }: WorkflowDetailsPanelProps) {
  // In a real app, you would fetch workflow details using the workflowId
  const workflow = {
    name: 'Customer Onboarding',
    description: 'Automate the customer onboarding process with AI-driven personalization',
    status: 'active',
    lastRun: '2024-02-20T10:30:00Z',
    successRate: 98,
    owner: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    collaborators: [
      {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ],
    tags: ['onboarding', 'customer', 'automation'],
    runs: 1250,
    averageExecutionTime: 45,
    recentExecutions: [
      { id: 1, status: 'success', timestamp: '2024-02-20T10:30:00Z', duration: '45s' },
      { id: 2, status: 'error', timestamp: '2024-02-20T09:15:00Z', duration: '30s' },
      { id: 3, status: 'success', timestamp: '2024-02-20T08:00:00Z', duration: '42s' }
    ]
  };

  const statusIcons = {
    success: { icon: CheckCircle, className: 'text-green-500' },
    error: { icon: AlertTriangle, className: 'text-red-500' },
    running: { icon: Clock, className: 'text-yellow-500' }
  };

  return (
    <div className="w-96 border-l border-gray-200 bg-white overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Workflow Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Overview</h4>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-medium text-gray-900">{workflow.name}</p>
              <p className="text-sm text-gray-500">{workflow.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {workflow.status === 'active' ? (
                <Play className="w-4 h-4 text-green-500" />
              ) : (
                <Pause className="w-4 h-4 text-yellow-500" />
              )}
              <span className="text-sm font-medium capitalize">{workflow.status}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <h4 className="text-sm font-medium text-gray-900">Tags</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {workflow.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-gray-400" />
            <h4 className="text-sm font-medium text-gray-900">Team</h4>
          </div>
          <div className="flex -space-x-2">
            <img
              src={workflow.owner.avatar}
              alt={workflow.owner.name}
              className="w-8 h-8 rounded-full ring-2 ring-white"
            />
            {workflow.collaborators.map((collaborator, index) => (
              <img
                key={index}
                src={collaborator.avatar}
                alt={collaborator.name}
                className="w-8 h-8 rounded-full ring-2 ring-white"
              />
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-lg font-semibold text-gray-900">{workflow.successRate}%</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Total Runs</p>
              <p className="text-lg font-semibold text-gray-900">{workflow.runs}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Avg. Time</p>
              <p className="text-lg font-semibold text-gray-900">{workflow.averageExecutionTime}s</p>
            </div>
          </div>
        </div>

        {/* Recent Executions */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Executions</h4>
          <div className="space-y-2">
            {workflow.recentExecutions.map((execution) => {
              const StatusIcon = statusIcons[execution.status as keyof typeof statusIcons].icon;
              return (
                <div
                  key={execution.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <StatusIcon className={`w-4 h-4 mr-2 ${statusIcons[execution.status as keyof typeof statusIcons].className}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(execution.timestamp).toLocaleTimeString()}
                      </p>
                      <p className="text-xs text-gray-500">Duration: {execution.duration}</p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700">
                    View
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Edit Workflow
            </button>
            <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}