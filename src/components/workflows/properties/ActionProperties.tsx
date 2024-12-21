import React from 'react';
import { Mail, MessageSquare, Database, BrainCircuit } from 'lucide-react';

interface ActionPropertiesProps {
  data: any;
  onChange: (updates: any) => void;
}

export function ActionProperties({ data, onChange }: ActionPropertiesProps) {
  const actionTypes = [
    { id: 'email', name: 'Send Email', icon: Mail },
    { id: 'slack', name: 'Slack Message', icon: MessageSquare },
    { id: 'database', name: 'Update Database', icon: Database },
    { id: 'ai', name: 'AI Processing', icon: BrainCircuit }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Action Settings</h4>
        
        {/* Action Type */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Action Type
          </label>
          <div className="grid grid-cols-1 gap-4">
            {actionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <label
                  key={type.id}
                  className={`
                    relative flex items-center p-4 border rounded-lg cursor-pointer
                    ${data.actionType === type.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="actionType"
                    value={type.id}
                    checked={data.actionType === type.id}
                    onChange={(e) => onChange({ actionType: e.target.value })}
                    className="sr-only"
                  />
                  <Icon className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">
                    {type.name}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Type-specific Settings */}
        {data.actionType === 'email' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Email
              </label>
              <input
                type="email"
                value={data.toEmail || ''}
                onChange={(e) => onChange({ toEmail: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={data.subject || ''}
                onChange={(e) => onChange({ subject: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                value={data.message || ''}
                onChange={(e) => onChange({ message: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        {data.actionType === 'slack' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Channel
              </label>
              <input
                type="text"
                value={data.channel || ''}
                onChange={(e) => onChange({ channel: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="#general"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                value={data.message || ''}
                onChange={(e) => onChange({ message: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        {data.actionType === 'database' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Operation
              </label>
              <select
                value={data.operation || 'update'}
                onChange={(e) => onChange({ operation: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Table/Collection
              </label>
              <input
                type="text"
                value={data.table || ''}
                onChange={(e) => onChange({ table: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        {data.actionType === 'ai' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                AI Model
              </label>
              <select
                value={data.model || 'gpt-3.5-turbo'}
                onChange={(e) => onChange({ model: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prompt Template
              </label>
              <textarea
                value={data.prompt || ''}
                onChange={(e) => onChange({ prompt: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your prompt template with {{variables}}"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}