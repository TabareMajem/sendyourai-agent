import React from 'react';
import { Image, FileText, Palette } from 'lucide-react';

interface ContentToolsConfigProps {
  config: any;
  onUpdate: (config: any) => void;
}

export function ContentToolsConfig({ config, onUpdate }: ContentToolsConfigProps) {
  const tools = [
    {
      id: 'openai',
      name: 'OpenAI GPT-4',
      icon: FileText,
      fields: ['apiKey', 'model', 'temperature']
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      icon: Image,
      fields: ['apiKey', 'version']
    },
    {
      id: 'canva',
      name: 'Canva',
      icon: Palette,
      fields: ['accessToken', 'brandKit']
    }
  ];

  const handleChange = (tool: string, field: string, value: string) => {
    onUpdate({
      ...config,
      [tool]: {
        ...config[tool],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <div key={tool.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <Icon className="w-5 h-5 text-gray-400 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">{tool.name}</h3>
            </div>

            <div className="space-y-4">
              {tool.fields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === 'model' ? (
                    <select
                      value={config[tool.id]?.[field] || ''}
                      onChange={(e) => handleChange(tool.id, field, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    </select>
                  ) : field === 'temperature' ? (
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={config[tool.id]?.[field] || 0.7}
                      onChange={(e) => handleChange(tool.id, field, e.target.value)}
                      className="mt-1 block w-full"
                    />
                  ) : (
                    <input
                      type={field === 'apiKey' || field === 'accessToken' ? 'password' : 'text'}
                      value={config[tool.id]?.[field] || ''}
                      onChange={(e) => handleChange(tool.id, field, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  )}
                </div>
              ))}

              <button
                onClick={() => {/* Handle test */}}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Test Integration
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}