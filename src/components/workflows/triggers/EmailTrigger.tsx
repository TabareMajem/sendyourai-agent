import React from 'react';
import { Mail, Settings } from 'lucide-react';
import { TriggerProps } from './types';

export function EmailTrigger({ config, onChange }: TriggerProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Email Trigger</h3>
            <p className="text-xs text-gray-500">Trigger workflow when emails match conditions</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Provider</label>
          <select
            value={config.provider}
            onChange={(e) => onChange({ ...config, provider: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="gmail">Gmail</option>
            <option value="sendgrid">SendGrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Conditions</label>
          <div className="mt-1 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.conditions?.unread}
                onChange={(e) => onChange({
                  ...config,
                  conditions: { ...config.conditions, unread: e.target.checked }
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Only unread emails</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.conditions?.hasAttachments}
                onChange={(e) => onChange({
                  ...config,
                  conditions: { ...config.conditions, hasAttachments: e.target.checked }
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Has attachments</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Filter by Subject</label>
          <input
            type="text"
            value={config.conditions?.subject || ''}
            onChange={(e) => onChange({
              ...config,
              conditions: { ...config.conditions, subject: e.target.value }
            })}
            placeholder="Contains text..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">From Email</label>
          <input
            type="text"
            value={config.conditions?.from || ''}
            onChange={(e) => onChange({
              ...config,
              conditions: { ...config.conditions, from: e.target.value }
            })}
            placeholder="sender@example.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}