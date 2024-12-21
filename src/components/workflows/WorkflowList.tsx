import React from 'react';
import { Play, Pause, AlertTriangle, Clock, CheckCircle, Users } from 'lucide-react';

interface WorkflowListProps {
  workflows: any[];
  viewMode: 'grid' | 'list';
  selectedWorkflows: string[];
  onWorkflowSelect: (id: string) => void;
  onWorkflowsSelect: (ids: string[]) => void;
}

export function WorkflowList({
  workflows,
  viewMode,
  selectedWorkflows,
  onWorkflowSelect,
  onWorkflowsSelect
}: WorkflowListProps) {
  const statusIcons = {
    active: { icon: Play, className: 'text-green-500' },
    paused: { icon: Pause, className: 'text-yellow-500' },
    error: { icon: AlertTriangle, className: 'text-red-500' },
    draft: { icon: Clock, className: 'text-gray-500' }
  };

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => {
          const StatusIcon = statusIcons[workflow.status].icon;
          const isSelected = selectedWorkflows.includes(workflow.id);

          return (
            <div
              key={workflow.id}
              className={`
                relative bg-white rounded-lg border p-6 cursor-pointer
                transition-all duration-200
                ${isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-600'
                  : 'border-gray-200 hover:border-indigo-300'
                }
              `}
              onClick={() => onWorkflowSelect(workflow.id)}
            >
              <div className="absolute top-4 right-4">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    const newSelection = e.target.checked
                      ? [...selectedWorkflows, workflow.id]
                      : selectedWorkflows.filter(id => id !== workflow.id);
                    onWorkflowsSelect(newSelection);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <StatusIcon className={`w-5 h-5 ${statusIcons[workflow.status].className}`} />
                <h3 className="text-lg font-medium text-gray-900">{workflow.name}</h3>
              </div>

              <p className="text-sm text-gray-500 mb-4">{workflow.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  {workflow.successRate}% Success
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {workflow.collaborators.length + 1}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {workflow.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-8 py-3 pl-4">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={selectedWorkflows.length === workflows.length}
                onChange={(e) => {
                  onWorkflowsSelect(
                    e.target.checked ? workflows.map(w => w.id) : []
                  );
                }}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Run
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Success Rate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workflows.map((workflow) => {
            const StatusIcon = statusIcons[workflow.status].icon;
            const isSelected = selectedWorkflows.includes(workflow.id);

            return (
              <tr
                key={workflow.id}
                className={`hover:bg-gray-50 cursor-pointer ${
                  isSelected ? 'bg-indigo-50' : ''
                }`}
                onClick={() => onWorkflowSelect(workflow.id)}
              >
                <td className="py-4 pl-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      const newSelection = e.target.checked
                        ? [...selectedWorkflows, workflow.id]
                        : selectedWorkflows.filter(id => id !== workflow.id);
                      onWorkflowsSelect(newSelection);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {workflow.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {workflow.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <StatusIcon className={`w-5 h-5 mr-2 ${statusIcons[workflow.status].className}`} />
                    <span className="text-sm text-gray-900 capitalize">
                      {workflow.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(workflow.lastRun).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-gray-900">
                      {workflow.successRate}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={workflow.owner.avatar}
                      alt={workflow.owner.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-900">
                      {workflow.owner.name}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}