import React from 'react';
import { GitBranch, Plus, X } from 'lucide-react';

interface ConditionPropertiesProps {
  data: any;
  onChange: (updates: any) => void;
}

export function ConditionProperties({ data, onChange }: ConditionPropertiesProps) {
  const addCondition = () => {
    const conditions = data.conditions || [];
    onChange({
      conditions: [
        ...conditions,
        { field: '', operator: 'equals', value: '' }
      ]
    });
  };

  const removeCondition = (index: number) => {
    const conditions = [...(data.conditions || [])];
    conditions.splice(index, 1);
    onChange({ conditions });
  };

  const updateCondition = (index: number, updates: any) => {
    const conditions = [...(data.conditions || [])];
    conditions[index] = { ...conditions[index], ...updates };
    onChange({ conditions });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Condition Settings</h4>
        
        {/* Conditions List */}
        <div className="space-y-4">
          {(data.conditions || []).map((condition: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <GitBranch className="w-5 h-5 text-indigo-600" />
                <button
                  onClick={() => removeCondition(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Field
                  </label>
                  <input
                    type="text"
                    value={condition.field}
                    onChange={(e) => updateCondition(index, { field: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Operator
                  </label>
                  <select
                    value={condition.operator}
                    onChange={(e) => updateCondition(index, { operator: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="equals">Equals</option>
                    <option value="notEquals">Not Equals</option>
                    <option value="contains">Contains</option>
                    <option value="greaterThan">Greater Than</option>
                    <option value="lessThan">Less Than</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Value
                  </label>
                  <input
                    type="text"
                    value={condition.value}
                    onChange={(e) => updateCondition(index, { value: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addCondition}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Condition
          </button>
        </div>
      </div>
    </div>
  );
}