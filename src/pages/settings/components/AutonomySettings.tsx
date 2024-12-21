import React from 'react';
import { Settings, Shield, AlertTriangle } from 'lucide-react';

interface AutonomySettingsProps {
  value: string;
  onChange: (value: string) => void;
}

const autonomyLevels = [
  {
    id: 'observation',
    name: 'Observation Only',
    description: 'AI will only provide suggestions without taking any actions',
    icon: Shield
  },
  {
    id: 'partial',
    name: 'Partial Autonomy',
    description: 'AI can execute low-impact actions automatically',
    icon: Settings
  },
  {
    id: 'full',
    name: 'Full Autonomy',
    description: 'AI can execute all actions automatically',
    icon: AlertTriangle
  }
];

export function AutonomySettings({ value, onChange }: AutonomySettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Settings className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Autonomy Level</h2>
      </div>

      <div className="space-y-4">
        {autonomyLevels.map((level) => {
          const Icon = level.icon;
          return (
            <div
              key={level.id}
              className={`
                relative flex items-start p-4 border rounded-lg cursor-pointer
                ${value === level.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
                }
              `}
              onClick={() => onChange(level.id)}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="autonomy-level"
                  checked={value === level.id}
                  onChange={() => onChange(level.id)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <Icon className={`w-4 h-4 mr-2 ${
                    level.id === 'observation' ? 'text-green-500' :
                    level.id === 'partial' ? 'text-yellow-500' :
                    'text-red-500'
                  }`} />
                  <label className="text-sm font-medium text-gray-900">
                    {level.name}
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {level.description}
                </p>
              </div>
            </div>
          );
        })}

        {value === 'full' && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Full Autonomy Warning
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  Enabling full autonomy allows the AI to make decisions and take actions
                  without human approval. Make sure you have proper monitoring and
                  safeguards in place.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}