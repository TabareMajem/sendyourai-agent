import React from 'react';
import { Calendar, Zap, Filter, CheckCircle, XCircle } from 'lucide-react';
import { Trigger } from '../../lib/ai/types';
import { formatTriggerType, getTriggerNextRun } from '../../lib/ai/utils/triggerUtils';

interface TriggerListProps {
  triggers: Trigger[];
  onToggle: (triggerId: string) => void;
  onDelete: (triggerId: string) => void;
  className?: string;
}

export function TriggerList({
  triggers,
  onToggle,
  onDelete,
  className = ''
}: TriggerListProps) {
  const getTriggerIcon = (type: Trigger['type']) => {
    switch (type) {
      case 'schedule':
        return <Calendar className="w-5 h-5 text-indigo-600" />;
      case 'event':
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'condition':
        return <Filter className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Active Triggers</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {triggers.map((trigger) => {
          const nextRun = getTriggerNextRun(trigger);
          
          return (
            <div key={trigger.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTriggerIcon(trigger.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatTriggerType(trigger)}
                    </p>
                    {nextRun && (
                      <p className="text-xs text-gray-500">
                        Next run: {nextRun.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onToggle(trigger.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    {trigger.enabled ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(trigger.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {triggers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-8 h-8 mx-auto mb-2" />
            <p>No triggers configured</p>
          </div>
        )}
      </div>
    </div>
  );
}