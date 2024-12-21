import React from 'react';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { Project } from '../../../../../lib/agents/pmo/types';

interface ResourceAllocationProps {
  project: Project;
}

export function ResourceAllocation({ project }: ResourceAllocationProps) {
  const resourceTypes = Array.from(new Set(project.resources.map(r => r.type)));

  return (
    <div className="space-y-6">
      {/* Resource Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Users className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Total Resources</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {project.resources.length}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Avg. Allocation</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {Math.round(project.resources.reduce((acc, r) => acc + r.allocation, 0) / project.resources.length)}%
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Users className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Resource Types</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {resourceTypes.length}
          </p>
        </div>
      </div>

      {/* Resource Allocation by Type */}
      <div className="space-y-4">
        {resourceTypes.map((type) => (
          <div key={type} className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">{type}</h4>
            <div className="space-y-4">
              {project.resources
                .filter(r => r.type === type)
                .map((resource, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-indigo-600">
                          {resource.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{resource.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(resource.startDate).toLocaleDateString()} - {new Date(resource.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-indigo-600 rounded-full"
                              style={{ width: `${resource.allocation}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {resource.allocation}%
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}