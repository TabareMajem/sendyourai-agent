import React from 'react';
import { Target } from 'lucide-react';

interface GoalAlignmentProps {
  value: {
    efficiency: number;
    innovation: number;
    riskManagement: number;
    customerSatisfaction: number;
    revenueGeneration: number;
  };
  onChange: (value: {
    efficiency: number;
    innovation: number;
    riskManagement: number;
    customerSatisfaction: number;
    revenueGeneration: number;
  }) => void;
}

const goals = [
  {
    key: 'efficiency',
    label: 'Efficiency Optimization',
    description: 'Focus on streamlining processes and reducing waste'
  },
  {
    key: 'innovation',
    label: 'Innovation Promotion',
    description: 'Encourage new ideas and creative solutions'
  },
  {
    key: 'riskManagement',
    label: 'Risk Management',
    description: 'Prioritize safety and risk mitigation'
  },
  {
    key: 'customerSatisfaction',
    label: 'Customer Satisfaction',
    description: 'Enhance customer experience and engagement'
  },
  {
    key: 'revenueGeneration',
    label: 'Revenue Generation',
    description: 'Focus on growth and profit opportunities'
  }
] as const;

export function GoalAlignment({ value, onChange }: GoalAlignmentProps) {
  const handleChange = (key: keyof typeof value, newValue: number) => {
    onChange({
      ...value,
      [key]: newValue
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Target className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Goal Alignment</h2>
      </div>

      <div className="space-y-6">
        {goals.map(({ key, label, description }) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <span className="text-sm text-gray-500">
                {value[key]}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={value[key]}
              onChange={(e) => handleChange(key, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          </div>
        ))}

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Goal Impact
          </h3>
          <p className="text-sm text-gray-500">
            The AI will prioritize suggestions based on your goal weights,
            ensuring alignment with your business objectives.
          </p>
        </div>
      </div>
    </div>
  );
}