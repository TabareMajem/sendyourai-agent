import React, { useState } from 'react';
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react';
import { IntegrationFactory } from '../../lib/integrations/IntegrationFactory';

interface IntegrationSetupFormProps {
  integration: any;
  onBack: () => void;
  onComplete: (config: any) => void;
}

export function IntegrationSetupForm({ integration, onBack, onComplete }: IntegrationSetupFormProps) {
  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create provider instance to validate credentials
      const provider = await IntegrationFactory.createProvider(
        integration.id,
        integration.category,
        credentials
      );

      // Test connection
      await provider.isConnected();

      // Save integration configuration
      onComplete({
        provider: integration.id,
        credentials,
        settings,
        metadata: {
          connectedAt: new Date().toISOString()
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect integration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to integrations
      </button>

      <div className="flex items-center space-x-3 mb-6">
        <integration.icon className="w-8 h-8 text-indigo-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
          <p className="text-sm text-gray-500">{integration.description}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-md">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Credentials Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Authentication</h4>
          <div className="grid grid-cols-2 gap-4">
            {integration.requiredCredentials.map((field: any) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.secret ? 'password' : 'text'}
                  value={credentials[field.key] || ''}
                  onChange={(e) => setCredentials({
                    ...credentials,
                    [field.key]: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        {integration.settings && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Settings</h4>
            <div className="space-y-4">
              {integration.settings.map((setting: any) => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {setting.label}
                  </label>
                  {setting.type === 'select' ? (
                    <select
                      value={settings[setting.key] || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        [setting.key]: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {setting.options.map((option: any) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : setting.type === 'boolean' ? (
                    <label className="mt-1 relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[setting.key] || false}
                        onChange={(e) => setSettings({
                          ...settings,
                          [setting.key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      <span className="ml-3 text-sm text-gray-500">{setting.description}</span>
                    </label>
                  ) : (
                    <input
                      type={setting.type}
                      value={settings[setting.key] || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        [setting.key]: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  )}
                  {setting.description && (
                    <p className="mt-1 text-xs text-gray-500">{setting.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Connecting...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Connect Integration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}