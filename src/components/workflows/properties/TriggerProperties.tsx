import React from 'react';
import { Calendar, Mail, MessageSquare } from 'lucide-react';

interface TriggerPropertiesProps {
  data: any;
  onChange: (updates: any) => void;
}

export function TriggerProperties({ data, onChange }: TriggerPropertiesProps) {
  const triggerTypes = [
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'webhook', name: 'Webhook', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Trigger Settings</h4>
        
        {/* Trigger Type */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Trigger Type
          </label>
          <div className="grid grid-cols-1 gap-4">
            {triggerTypes.map((type) => {
              const Icon = type.icon;
              return (
                <label
                  key={type.id}
                  className={`
                    relative flex items-center p-4 border rounded-lg cursor-pointer
                    ${data.triggerType === type.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="triggerType"
                    value={type.id}
                    checked={data.triggerType === type.id}
                    onChange={(e) => onChange({ triggerType: e.target.value })}
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
        {data.triggerType === 'schedule' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Schedule Type
              </label>
              <select
                value={data.scheduleType || 'interval'}
                onChange={(e) => onChange({ scheduleType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="interval">Interval</option>
                <option value="cron">Cron Expression</option>
                <option value="fixed">Fixed Time</option>
              </select>
            </div>

            {data.scheduleType === 'interval' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Interval
                  </label>
                  <input
                    type="number"
                    value={data.interval || ''}
                    onChange={(e) => onChange({ interval: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Unit
                  </label>
                  <select
                    value={data.intervalUnit || 'minutes'}
                    onChange={(e) => onChange({ intervalUnit: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {data.triggerType === 'email' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={data.emailAddress || ''}
                onChange={(e) => onChange({ emailAddress: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject Filter
              </label>
              <input
                type="text"
                value={data.subjectFilter || ''}
                onChange={(e) => onChange({ subjectFilter: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., [Support]"
              />
            </div>
          </div>
        )}

        {data.triggerType === 'webhook' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Webhook URL
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={data.webhookUrl || ''}
                  readOnly
                  className="flex-1 block w-full rounded-l-md border-gray-300 bg-gray-50 sm:text-sm"
                />
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
                  onClick={() => {/* Copy URL */}}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}