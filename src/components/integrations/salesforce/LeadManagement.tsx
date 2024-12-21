```typescript
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, RefreshCw } from 'lucide-react';
import { useSalesforce } from '../../../hooks/useSalesforce';
import { LeadList } from './leads/LeadList';
import { LeadForm } from './leads/LeadForm';
import { LeadFilters } from './leads/LeadFilters';

export function LeadManagement() {
  const { service, isConnected } = useSalesforce();
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    source: ''
  });

  const loadLeads = async () => {
    if (!service || !isConnected) return;

    setIsLoading(true);
    try {
      const searchResults = await service.searchLeads(
        filters.search || 'FIND {*} IN ALL FIELDS'
      );
      setLeads(searchResults);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [service, isConnected, filters]);

  const handleCreateLead = async (leadData: any) => {
    if (!service) return;

    try {
      await service.createLead(leadData);
      setShowCreateForm(false);
      loadLeads();
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Please connect to Salesforce to manage leads.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Lead Management</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => loadLeads()}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Lead
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <LeadFilters
            filters={filters}
            onChange={setFilters}
          />
        </div>
      </div>

      <LeadList
        leads={leads}
        isLoading={isLoading}
        onRefresh={loadLeads}
      />

      {showCreateForm && (
        <LeadForm
          onSubmit={handleCreateLead}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
}
```