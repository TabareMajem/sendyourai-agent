import React, { useState } from 'react';
import { X, Search, Check, AlertTriangle } from 'lucide-react';
import { IntegrationCard } from './IntegrationCard';
import { IntegrationSetupForm } from './IntegrationSetupForm';
import { useIntegrations } from '../../hooks/useIntegrations';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIntegrationComplete: (integration: any) => void;
}

export function IntegrationModal({ isOpen, onClose, onIntegrationComplete }: IntegrationModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<any | null>(null);
  const { integrations, isLoading } = useIntegrations();

  const categories = [
    { id: 'email', name: 'Email', description: 'Send and manage emails' },
    { id: 'messaging', name: 'Messaging', description: 'Communication platforms' },
    { id: 'crm', name: 'CRM', description: 'Customer relationship management' },
    { id: 'project', name: 'Project Management', description: 'Task and project tracking' },
    { id: 'ecommerce', name: 'E-commerce', description: 'Online store management' },
    { id: 'scheduling', name: 'Scheduling', description: 'Calendar and appointments' },
    { id: 'survey', name: 'Surveys', description: 'Forms and feedback' }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = !selectedCategory || integration.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Add Integration</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {selectedIntegration ? (
            <IntegrationSetupForm
              integration={selectedIntegration}
              onBack={() => setSelectedIntegration(null)}
              onComplete={(config) => {
                onIntegrationComplete(config);
                onClose();
              }}
            />
          ) : (
            <>
              {/* Search and Categories */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search integrations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Integration Grid */}
              <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent" />
                  </div>
                ) : filteredIntegrations.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredIntegrations.map((integration) => (
                      <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        onClick={() => setSelectedIntegration(integration)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No integrations found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}