import React from 'react';
import { Mail, AlertTriangle } from 'lucide-react';

interface EmailMarketingConfigProps {
  config: any;
  onUpdate: (config: any) => void;
}

export function EmailMarketingConfig({ config, onUpdate }: EmailMarketingConfigProps) {
  const providers = [
    {
      id: 'sendgrid',
      name: 'SendGrid',
      fields: ['apiKey', 'fromEmail', 'templateId']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      fields: ['apiKey', 'listId', 'fromEmail']
    }
  ];

  const handleChange = (provider: string, field: string, value: string) => {
    onUpdate({
      ...config,
      [provider]: {
        ...config[provider],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {providers.map((provider) => (
        <div key={provider.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">{provider.name}</h3>
          </div>

          <div className="space-y-4">
            {provider.fields.map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'apiKey' ? 'password' : 'text'}
                  value={config[provider.id]?.[field] || ''}
                  onChange={(e) => handleChange(provider.id, field, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            ))}

            {/* Rate Limit Warning */}
            <div className="mt-4 p-4 bg-yellow-50 rounded-md">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Rate Limits
                  </h3>
                  <p className="mt-2 text-sm text-yellow-700">
                    Be mindful of email sending limits. Current plan allows up to 100,000 emails per month.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {/* Handle test email */}}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Send Test Email
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}