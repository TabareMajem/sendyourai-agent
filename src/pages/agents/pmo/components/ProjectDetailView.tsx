import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Target, Clock, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { Project } from '../../../../lib/agents/pmo/types';
import { PMOManager } from '../../../../lib/agents/pmo/PMOManager';
import { ProjectTimeline } from './project-details/ProjectTimeline';
import { ResourceAllocation } from './project-details/ResourceAllocation';
import { RiskMatrix } from './project-details/RiskMatrix';
import { TaskBoard } from './project-details/TaskBoard';
import { QualityMetrics } from './project-details/QualityMetrics';

interface ProjectDetailViewProps {
  projectId: string;
  onClose: () => void;
  onUpdate: (projectId: string, updates: any) => void;
}

export function ProjectDetailView({ projectId, onClose, onUpdate }: ProjectDetailViewProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  const pmoManager = new PMOManager();

  useEffect(() => {
    const loadProject = async () => {
      try {
        // In a real app, this would fetch from an API
        const projectData = await pmoManager.monitorProject(projectId);
        setProject(projectData);
      } catch (error) {
        console.error('Failed to load project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  if (isLoading || !project) {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'resources', name: 'Resources' },
    { id: 'risks', name: 'Risks' },
    { id: 'tasks', name: 'Tasks' },
    { id: 'quality', name: 'Quality' }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-4xl">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{project.name}</h2>
                    <p className="text-sm text-gray-500">{project.description}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-md text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="mt-4">
                  <nav className="flex space-x-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          activeTab === tab.id
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Status Cards */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-500">Timeline</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold text-gray-900">
                            {Math.ceil((project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <Target className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-500">Progress</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold text-gray-900">
                            {project.metrics?.progress || 0}%
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <Users className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-500">Team Size</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold text-gray-900">
                            {project.resources.length}
                          </p>
                        </div>
                      </div>

                      {/* Objectives */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Objectives</h3>
                        <ul className="space-y-2">
                          {project.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                              <span className="text-gray-600">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Risks */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Risks</h3>
                        <div className="space-y-2">
                          {project.risks.map((risk, index) => (
                            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                              <AlertTriangle className={`h-5 w-5 mt-0.5 mr-2 ${
                                risk.impact === 'high' ? 'text-red-500' :
                                risk.impact === 'medium' ? 'text-yellow-500' :
                                'text-green-500'
                              }`} />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{risk.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Impact: {risk.impact} | Probability: {risk.probability}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'timeline' && (
                    <ProjectTimeline project={project} />
                  )}

                  {activeTab === 'resources' && (
                    <ResourceAllocation project={project} />
                  )}

                  {activeTab === 'risks' && (
                    <RiskMatrix project={project} />
                  )}

                  {activeTab === 'tasks' && (
                    <TaskBoard
                      project={project}
                      onTaskUpdate={(taskId, updates) => {
                        // Handle task updates
                        onUpdate(project.id, {
                          tasks: project.tasks.map(task =>
                            task.id === taskId ? { ...task, ...updates } : task
                          )
                        });
                      }}
                    />
                  )}

                  {activeTab === 'quality' && (
                    <QualityMetrics project={project} />
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Last updated: {new Date(project.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {/* Handle edit */}}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Edit Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}