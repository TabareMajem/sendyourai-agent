import React from 'react';
import { Play, Clock, Users, Target, BarChart2 } from 'lucide-react';
import { Project } from '../../../../lib/agents/pmo/types';

interface ProjectCardProps {
  project: Project;
  onStart: () => void;
  onView: () => void;
}

export function ProjectCard({ project, onStart, onView }: ProjectCardProps) {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'onHold':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    if (!project.metrics) return 0;
    return project.metrics.progress;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-indigo-600 transition-colors shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Timeline</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </p>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Team</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {project.resources.length} Members
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-900">{calculateProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        {project.status === 'planning' && (
          <button
            onClick={onStart}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Project
          </button>
        )}
        <button
          onClick={onView}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <BarChart2 className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
}