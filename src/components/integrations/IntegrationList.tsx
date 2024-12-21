import React from 'react';
import { useIntegrations } from '../../hooks/useIntegrations';
import { IntegrationCard } from './IntegrationCard';

export function IntegrationList() {
  const { integrations, isLoading } = useIntegrations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          onConnect={() => {
            // Handle connection
            console.log('Connecting to', integration.name);
          }}
        />
      ))}
    </div>
  );
}