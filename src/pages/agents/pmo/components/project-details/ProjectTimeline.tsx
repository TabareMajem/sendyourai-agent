import React from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { Project } from '../../../../../lib/agents/pmo/types';

interface ProjectTimelineProps {
  project: Project;
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  return (
    <div className="space-y-6">
      {/* Timeline Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Start Date</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {new Date(project.startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">End Date</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {new Date(project.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Duration</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {Math.ceil((project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
          </p>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="relative">
        <div className="absolute top-0 left-8 h-full w-px bg-gray-200" />
        <ul className="space-y-8">
          {project.schedule.map((phase, phaseIndex) => (
            <li key={phaseIndex} className="relative">
              <div className="flex items-center">
                <div className="absolute left-0 w-16 text-xs text-gray-500">
                  {new Date(phase.startDate).toLocaleDateString()}
                </div>
                <div className="ml-20 flex-1">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900">{phase.phase}</h4>
                    <div className="mt-2 space-y-2">
                      {phase.milestones.map((milestone, milestoneIndex) => (
                        <div
                          key={milestoneIndex}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center">
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                            )}
                            <span className={milestone.completed ? 'text-gray-500' : 'text-gray-900'}>
                              {milestone.name}
                            </span>
                          </div>
                          <span className="text-gray-500">
                            {new Date(milestone.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline Legend */}
      <div className="mt-6 flex items-center justify-end space-x-4 text-sm">
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-gray-500">Completed</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-gray-500">Pending</span>
        </div>
      </div>
    </div>
  );
}