import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { IntegrationGrid } from '../../components/integrations/IntegrationGrid';
import { IntegrationFilters } from '../../components/integrations/IntegrationFilters';
import { IntegrationDetails } from '../../components/integrations/IntegrationDetails';
import { useIntegrations } from '../../hooks/useIntegrations';

export function IntegrationSetup() {
  const { integrations, isLoading, error } = useIntegrations();
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    industry: ''
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
          Error loading integrations: {error.message}
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
              <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Add Custom Integration
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border-b border-gray-200 px-4 py-4">
            <IntegrationFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Integration Grid */}
          <div className="flex-1 overflow-auto p-4">
            <IntegrationGrid
              integrations={integrations}
              onIntegrationSelect={setSelectedIntegration}
            />
          </div>
        </div>

        {/* Details Panel */}
        {selectedIntegration && (
          <IntegrationDetails
            integrationId={selectedIntegration}
            onClose={() => setSelectedIntegration(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}