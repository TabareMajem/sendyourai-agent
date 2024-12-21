import React from 'react';
import { Zap, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

interface Action {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  successRate?: number;
  lastExecuted?: string;
}

interface ZapierActionsProps {
  actions: Action[];
  onActionToggle: (actionId: string) => void;
  onActionEdit: (actionId: string) => void;
}

export function ZapierActions({ actions, onActionToggle, onActionEdit }: ZapierActionsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Available Actions</h2>
      
      <div className="space-y-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className={`w-5 h-5 ${
                  action.status === 'active' ? 'text-indigo-600' :
                  action.status === 'error' ? 'text-red-500' :
                  'text-gray-400'
                }`} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{action.name}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {action.successRate !== undefined && (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className={`w-4 h-4 ${
                      action.successRate > 90 ? 'text-green-500' :
                      action.successRate > 70 ? 'text-yellow-500' :
                      'text-red-500'
                    }`} />
                    <span className="text-sm text-gray-600">
                      {action.successRate}% success
                    </span>
                  </div>
                )}
                
                {action.lastExecuted && (
                  <span className="text-xs text-gray-500">
                    Last executed: {action.lastExecuted}
                  </span>
                )}

                <button
                  onClick={() => onActionEdit(action.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Settings className="w-5 h-5" />
                </button>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={action.status === 'active'}
                    onChange={() => onActionToggle(action.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            {action.status === 'error' && (
              <div className="mt-3 flex items-center space-x-2 text-red-600 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Error: Failed to execute action</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}