import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { WorkflowList } from '../../components/workflows/WorkflowList';
import { WorkflowFilters } from '../../components/workflows/WorkflowFilters';
import { WorkflowDetailsPanel } from '../../components/workflows/WorkflowDetailsPanel';
import { WorkflowBulkActions } from '../../components/workflows/WorkflowBulkActions';
import { useWorkflows } from '../../hooks/useWorkflows';

export function WorkflowManagement() {
  const { workflows, isLoading, error } = useWorkflows();
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    search: '',
    status: [],
    tags: [],
    dateRange: null
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-600">
          Error loading workflows: {error.message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-full flex">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Create Workflow
              </button>
            </div>
          </div>

          {/* Filters and Bulk Actions */}
          <div className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex justify-between items-center">
              <WorkflowFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
              <div className="flex items-center space-x-4">
                <WorkflowBulkActions
                  selectedWorkflows={selectedWorkflows}
                  onAction={(action) => {
                    console.log('Bulk action:', action);
                  }}
                />
                <div className="border-l border-gray-200 h-6" />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${
                      viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${
                      viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow List */}
          <div className="flex-1 overflow-auto p-4">
            <WorkflowList
              workflows={workflows}
              viewMode={viewMode}
              selectedWorkflows={selectedWorkflows}
              onWorkflowSelect={(id) => setSelectedWorkflow(id)}
              onWorkflowsSelect={setSelectedWorkflows}
            />
          </div>
        </div>

        {/* Details Panel */}
        {selectedWorkflow && (
          <WorkflowDetailsPanel
            workflowId={selectedWorkflow}
            onClose={() => setSelectedWorkflow(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}