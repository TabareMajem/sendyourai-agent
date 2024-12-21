import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialMediaConfigProps {
  config: any;
  onUpdate: (config: any) => void;
}

export function SocialMediaConfig({ config, onUpdate }: SocialMediaConfigProps) {
  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      fields: ['pageId', 'accessToken']
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      fields: ['apiKey', 'apiSecret', 'accessToken']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      fields: ['businessId', 'accessToken']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      fields: ['companyId', 'accessToken']
    }
  ];

  const handleChange = (platform: string, field: string, value: string) => {
    onUpdate({
      ...config,
      [platform]: {
        ...config[platform],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {platforms.map((platform) => (
        <div key={platform.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <platform.icon className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">{platform.name}</h3>
          </div>

          <div className="space-y-4">
            {platform.fields.map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="password"
                  value={config[platform.id]?.[field] || ''}
                  onChange={(e) => handleChange(platform.id, field, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            ))}

            <button
              onClick={() => {/* Handle connection test */}}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Test Connection
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}