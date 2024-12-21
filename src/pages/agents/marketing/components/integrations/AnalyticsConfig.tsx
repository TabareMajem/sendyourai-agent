import React from 'react';
import { BarChart2, RefreshCw } from 'lucide-react';

interface AnalyticsConfigProps {
  config: any;
  onUpdate: (config: any) => void;
}

export function AnalyticsConfig({ config, onUpdate }: AnalyticsConfigProps) {
  const services = [
    {
      id: 'googleAnalytics',
      name: 'Google Analytics',
      fields: ['trackingId', 'viewId']
    },
    {
      id: 'facebookPixel',
      name: 'Facebook Pixel',
      fields: ['pixelId']
    },
    {
      id: 'linkedinInsights',
      name: 'LinkedIn Insights',
      fields: ['tagId']
    }
  ];

  const handleChange = (service: string, field: string, value: string) => {
    onUpdate({
      ...config,
      [service]: {
        ...config[service],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {services.map((service) => (
        <div key={service.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <BarChart2 className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">{service.name}</h3>
          </div>

          <div className="space-y-4">
            {service.fields.map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  value={config[service.id]?.[field] || ''}
                  onChange={(e) => handleChange(service.id, field, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            ))}

            <div className="flex space-x-4">
              <button
                onClick={() => {/* Handle verify */}}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Verify Connection
              </button>
              <button
                onClick={() => {/* Handle sync */}}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Data
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}