import React from 'react';
import { X, ExternalLink, RefreshCw, Trash2 } from 'lucide-react';
import { useIntegrations } from '../../hooks/useIntegrations';

interface IntegrationDetailsProps {
  integrationId: string;
  onClose: () => void;
}

export function IntegrationDetails({
  integrationId,
  onClose
}: IntegrationDetailsProps) {
  const { integrations, icons } = useIntegrations();
  const integration = integrations.find(i => i.id === integrationId);

  if (!integration) {
    return null;
  }

  const Icon = icons[integration.id] || icons.default;

  return (
    <div className="w-96 border-l border-gray-200 bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6 text-indigo-600" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
            <p className="text-sm text-gray-500">{integration.category}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Status */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Status</h4>
          <div className="flex items-center space-x-2">
            <span className={`inline-block w-2 h-2 rounded-full ${
              integration.status === 'connected' ? 'bg-green-500' :
              integration.status === 'maintenance' ? 'bg-yellow-500' :
              'bg-gray-500'
            }`} />
            <span className="text-sm text-gray-600 capitalize">{integration.status}</span>
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
          <ul className="space-y-2">
            {integration.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          {integration.status === 'connected' ? (
            <>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Now
              </button>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Disconnect
              </button>
            </>
          ) : (
            <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}