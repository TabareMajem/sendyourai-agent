import React from 'react';
import { Play, Settings, AlertTriangle } from 'lucide-react';

interface Trigger {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  lastTriggered?: string;
}

interface ZapierTriggersProps {
  triggers: Trigger[];
  onTriggerToggle: (triggerId: string) => void;
  onTriggerEdit: (triggerId: string) => void;
}

export function ZapierTriggers({ triggers, onTriggerToggle, onTriggerEdit }: ZapierTriggersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Available Triggers</h2>
      
      <div className="space-y-4">
        {triggers.map((trigger) => (
          <div
            key={trigger.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Play className={`w-5 h-5 ${
                  trigger.status === 'active' ? 'text-green-500' :
                  trigger.status === 'error' ? 'text-red-500' :
                  'text-gray-400'
                }`} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{trigger.name}</h3>
                  <p className="text-sm text-gray-500">{trigger.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {trigger.lastTriggered && (
                  <span className="text-xs text-gray-500">
                    Last triggered: {trigger.lastTriggered}
                  </span>
                )}
                <button
                  onClick={() => onTriggerEdit(trigger.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trigger.status === 'active'}
                    onChange={() => onTriggerToggle(trigger.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            {trigger.status === 'error' && (
              <div className="mt-3 flex items-center space-x-2 text-red-600 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Error: Failed to execute trigger</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}