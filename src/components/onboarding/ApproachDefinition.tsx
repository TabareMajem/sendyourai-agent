import React from 'react';
import { Zap, Clock, Sparkles } from 'lucide-react';

interface Approach {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  examples: string[];
}

const approaches: Approach[] = [
  {
    id: 'proactive',
    name: 'Proactive Automation',
    icon: Zap,
    description: 'AI anticipates needs and takes action before issues arise',
    examples: [
      'Predictive maintenance alerts',
      'Inventory reordering before stockouts',
      'Customer churn prevention'
    ]
  },
  {
    id: 'reactive',
    name: 'Reactive Automation',
    icon: Clock,
    description: 'Automated responses to specific triggers and events',
    examples: [
      'Customer support ticket routing',
      'Invoice processing on receipt',
      'Data backup on changes'
    ]
  },
  {
    id: 'both',
    name: 'Combined Approach',
    icon: Sparkles,
    description: 'Leverage both proactive and reactive automation',
    examples: [
      'Complete workflow optimization',
      'Comprehensive customer experience',
      'Full-cycle process automation'
    ]
  }
];

interface ApproachDefinitionProps {
  selectedApproach: string;
  onSelect: (approach: string) => void;
}

export function ApproachDefinition({ selectedApproach, onSelect }: ApproachDefinitionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Automation Approach</h2>
        <p className="mt-2 text-sm text-gray-600">
          Select how you want to implement automation in your workflow
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {approaches.map((approach) => {
          const Icon = approach.icon;
          return (
            <button
              key={approach.id}
              onClick={() => onSelect(approach.id)}
              className={`
                flex flex-col p-6 border rounded-lg text-left transition-all
                hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${selectedApproach === approach.id
                  ? 'border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-6 h-6 ${selectedApproach === approach.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                <h3 className={`text-lg font-medium ${selectedApproach === approach.id ? 'text-indigo-600' : 'text-gray-900'}`}>
                  {approach.name}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">{approach.description}</p>
              <ul className="mt-4 space-y-2">
                {approach.examples.map((example, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2" />
                    {example}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}