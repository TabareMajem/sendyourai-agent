import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { PMOManager } from '../../../lib/agents/pmo/PMOManager';
import { Project } from '../../../lib/agents/pmo/types';
import { Plus, Filter, Search } from 'lucide-react';
import { ProjectCreationWizard } from './components/ProjectCreationWizard';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailView } from './components/ProjectDetailView';

export function PMODashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  const pmoManager = new PMOManager();

  const handleCreateProject = async (projectData: any) => {
    setIsLoading(true);
    try {
      const newProject = await pmoManager.createProject(projectData);
      setProjects([...projects, newProject]);
      setShowNewProject(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartProject = async (projectId: string) => {
    try {
      await pmoManager.executeProject(projectId);
      // Update project status in the UI
      setProjects(projects.map(p => 
        p.id === projectId ? { ...p, status: 'active' as const } : p
      ));
    } catch (error) {
      console.error('Failed to start project:', error);
    }
  };

  const handleUpdateProject = async (projectId: string, updates: any) => {
    try {
      await pmoManager.updateProject(projectId, updates);
      // Update project in the UI
      setProjects(projects.map(p => 
        p.id === projectId ? { ...p, ...updates } : p
      ));
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Management Office</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your projects with AI-powered automation
            </p>
          </div>
          <button
            onClick={() => setShowNewProject(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="onHold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Project Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new project.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowNewProject(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter(project => {
                const matchesSearch = project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                                   project.description.toLowerCase().includes(filters.search.toLowerCase());
                const matchesStatus = !filters.status || project.status === filters.status;
                return matchesSearch && matchesStatus;
              })
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onStart={() => handleStartProject(project.id)}
                  onView={() => setSelectedProject(project.id)}
                />
              ))}
          </div>
        )}

        {/* Project Creation Wizard */}
        {showNewProject && (
          <ProjectCreationWizard
            onSubmit={handleCreateProject}
            onCancel={() => setShowNewProject(false)}
          />
        )}

        {/* Project Detail View */}
        {selectedProject && (
          <ProjectDetailView
            projectId={selectedProject}
            onClose={() => setSelectedProject(null)}
            onUpdate={handleUpdateProject}
          />
        )}
      </div>
    </DashboardLayout>
  );
}