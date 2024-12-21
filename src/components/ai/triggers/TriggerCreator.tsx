import React, { useState } from 'react';
import { Plus, Calendar, Zap, Filter } from 'lucide-react';
import { ScheduleTriggerForm } from './ScheduleTriggerForm';
import { EventTriggerForm } from './EventTriggerForm';
import { ConditionTriggerForm } from './ConditionTriggerForm';

interface TriggerCreatorProps {
  onTriggerCreate: (type: string, config: Record<string, unknown>) => void;
  className?: string;
}

type TriggerType = 'schedule' | 'event' | 'condition';

export function TriggerCreator({ onTriggerCreate, className = '' }: TriggerCreatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<TriggerType | null>(null);

  const triggerTypes = [
    {
      type: 'schedule' as const,
      icon: Calendar,
      label: 'Schedule',
      description: 'Create time-based triggers'
    },
    {
      type: 'event' as const,
      icon: Zap,
      label: 'Event',
      description: 'Respond to specific events'
    },
    {
      type: 'condition' as const,
      icon: Filter,
      label: 'Condition',
      description: 'Trigger based on conditions'
    }
  ];

  const handleCreate = (config: Record<string, unknown>) => {
    if (selectedType) {
      onTriggerCreate(selectedType, config);
      setIsOpen(false);
      setSelectedType(null);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-4 flex items-center justify-center space-x-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Trigger</span>
        </button>
      ) : (
        <div className="p-4">
          {!selectedType ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Select Trigger Type</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {triggerTypes.map(({ type, icon: Icon, label, description }) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-indigo-600 text-left transition-colors"
                  >
                    <Icon className="w-6 h-6 text-indigo-600 mb-2" />
                    <h4 className="text-sm font-medium text-gray-900">{label}</h4>
                    <p className="text-xs text-gray-500 mt-1">{description}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Configure {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Trigger
                </h3>
                <button
                  onClick={() => setSelectedType(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Back
                </button>
              </div>
              {selectedType === 'schedule' && (
                <ScheduleTriggerForm onSubmit={handleCreate} />
              )}
              {selectedType === 'event' && (
                <EventTriggerForm onSubmit={handleCreate} />
              )}
              {selectedType === 'condition' && (
                <ConditionTriggerForm onSubmit={handleCreate} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}