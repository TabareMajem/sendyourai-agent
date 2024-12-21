import React, { useState } from 'react';
import { Filter, Plus, X } from 'lucide-react';

interface ConditionTriggerFormProps {
  onSubmit: (config: Record<string, unknown>) => void;
}

export function ConditionTriggerForm({ onSubmit }: ConditionTriggerFormProps) {
  const [conditions, setConditions] = useState<Array<{
    field: string;
    operator: string;
    value: string;
  }>>([{ field: '', operator: 'equals', value: '' }]);

  const handleAddCondition = () => {
    setConditions([...conditions, { field: '', operator: 'equals', value: '' }]);
  };

  const handleRemoveCondition = (index: number) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((_, i) => i !== index));
    }
  };

  const handleConditionChange = (index: number, field: string, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ conditions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Conditions</label>
          <button
            type="button"
            onClick={handleAddCondition}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Condition
          </button>
        </div>

        {conditions.map((condition, index) => (
          <div key={index} className="flex items-center space-x-2">
            <select
              value={condition.field}
              onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
              className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select field</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="assignee">Assignee</option>
              <option value="dueDate">Due Date</option>
              <option value="progress">Progress</option>
            </select>
            <select
              value={condition.operator}
              onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
              className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="equals">Equals</option>
              <option value="notEquals">Not Equals</option>
              <option value="contains">Contains</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
            </select>
            <input
              type="text"
              placeholder="Value"
              value={condition.value}
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
              className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {conditions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveCondition(index)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Filter className="w-4 h-4 mr-2" />
          Create Condition Trigger
        </button>
      </div>
    </form>
  );
}