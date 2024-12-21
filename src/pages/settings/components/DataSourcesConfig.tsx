import React from 'react';
import { Database, Plus, X, CheckCircle, AlertCircle } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'error' | 'pending';
  lastSync?: string;
}

interface DataSourcesConfigProps {
  value: DataSource[];
  onChange: (value: DataSource[]) => void;
}

const availableDataSources = [
  { id: 'salesforce', name: 'Salesforce', type: 'CRM' },
  { id: 'hubspot', name: 'HubSpot', type: 'CRM' },
  { id: 'postgresql', name: 'PostgreSQL', type: 'Database' },
  { id: 'mongodb', name: 'MongoDB', type: 'Database' },
  { id: 'slack', name: 'Slack', type: 'Communication' },
  { id: 'jira', name: 'Jira', type: 'Project Management' }
];

export function DataSourcesConfig({ value, onChange }: DataSourcesConfigProps) {
  const handleConnect = (source: typeof availableDataSources[0]) => {
    // In a real app, this would handle the connection flow
    const newDataSource: DataSource = {
      ...source,
      status: 'connected',
      lastSync: new Date().toISOString()
    };
    onChange([...value, newDataSource]);
  };

  const handleDisconnect = (id: string) => {
    onChange(value.filter(source => source.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Database className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Data Sources</h2>
        </div>
        <select
          className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => {
            const source = availableDataSources.find(s => s.id === e.target.value);
            if (source) {
              handleConnect(source);
              e.target.value = '';
            }
          }}
        >
          <option value="">Add Data Source</option>
          {availableDataSources
            .filter(source => !value.find(s => s.id === source.id))
            .map(source => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
        </select>
      </div>

      <div className="space-y-4">
        {value.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center">
              {source.status === 'connected' ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              ) : source.status === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              ) : (
                <div className="w-5 h-5 mr-3 relative">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent" />
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-900">{source.name}</h3>
                <p className="text-xs text-gray-500">{source.type}</p>
                {source.lastSync && (
                  <p className="text-xs text-gray-500">
                    Last synced: {new Date(source.lastSync).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDisconnect(source.id)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Disconnect
              </button>
            </div>
          </div>
        ))}

        {value.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <Database className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              No data sources connected. Add a data source to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}