import React from 'react';
import { X } from 'lucide-react';
import { TriggerProperties } from './properties/TriggerProperties';
import { ActionProperties } from './properties/ActionProperties';
import { ConditionProperties } from './properties/ConditionProperties';

interface PropertiesPanelProps {
  selectedElement: any;
  onElementUpdate: (element: any) => void;
}

export function PropertiesPanel({
  selectedElement,
  onElementUpdate
}: PropertiesPanelProps) {
  if (!selectedElement) {
    return null;
  }

  const handleUpdate = (updates: any) => {
    onElementUpdate({
      ...selectedElement,
      data: {
        ...selectedElement.data,
        ...updates
      }
    });
  };

  const renderProperties = () => {
    switch (selectedElement.type) {
      case 'trigger':
        return (
          <TriggerProperties
            data={selectedElement.data}
            onChange={handleUpdate}
          />
        );
      case 'action':
        return (
          <ActionProperties
            data={selectedElement.data}
            onChange={handleUpdate}
          />
        );
      case 'condition':
        return (
          <ConditionProperties
            data={selectedElement.data}
            onChange={handleUpdate}
          />
        );
      default:
        return (
          <div className="p-4 text-gray-500">
            No properties available for this element
          </div>
        );
    }
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Properties</h3>
        <button className="text-gray-400 hover:text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* General Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">General</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={selectedElement.data?.label || ''}
                onChange={(e) => handleUpdate({ label: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={selectedElement.data?.description || ''}
                onChange={(e) => handleUpdate({ description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Type-specific Properties */}
        {renderProperties()}
      </div>
    </div>
  );
}