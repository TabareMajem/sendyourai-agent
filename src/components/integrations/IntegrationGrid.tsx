import React from 'react';
import { IntegrationCard } from './IntegrationCard';
import { useIntegrations } from '../../hooks/useIntegrations';

interface IntegrationGridProps {
  integrations: any[];
  onIntegrationSelect: (id: string) => void;
}

export function IntegrationGrid({
  integrations,
  onIntegrationSelect
}: IntegrationGridProps) {
  const { icons } = useIntegrations();

  if (!integrations?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No integrations available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={{
            ...integration,
            icon: icons[integration.id] || icons.default
          }}
          onClick={() => onIntegrationSelect(integration.id)}
        />
      ))}
    </div>
  );
}