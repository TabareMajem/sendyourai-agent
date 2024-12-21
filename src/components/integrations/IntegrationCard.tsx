import React, { useState } from 'react';
import { Check, ExternalLink, Loader } from 'lucide-react';
import { IntegrationManager } from '../../lib/integrations/IntegrationManager';

interface IntegrationCardProps {
  integration: {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    category: string;
    status: 'available' | 'connected' | 'maintenance';
    features: string[];
  };
  onClick: () => void;
}

export function IntegrationCard({ integration, onClick }: IntegrationCardProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const Icon = integration.icon;

  const handleConnect = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening details panel
    setIsConnecting(true);
    setError(null);

    try {
      const manager = IntegrationManager.getInstance();
      await manager.connectIntegration(
        integration.id,
        integration.category,
        {} // Config will be requested through OAuth or form
      );
      
      // Update integration status locally
      integration.status = 'connected';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect integration');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col p-6 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-600 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Icon className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
          <p className="text-sm text-gray-500">{integration.category}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-600">{integration.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {integration.features.slice(0, 3).map((feature, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
          >
            {feature}
          </span>
        ))}
        {integration.features.length > 3 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            +{integration.features.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        {integration.status === 'connected' ? (
          <div className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" />
            <span className="text-sm">Connected</span>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            disabled={isConnecting || integration.status === 'maintenance'}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
              ${integration.status === 'maintenance' 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
              } disabled:opacity-50`}
          >
            {isConnecting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect'
            )}
          </button>
        )}
        
        <button className="text-gray-400 hover:text-gray-600">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}