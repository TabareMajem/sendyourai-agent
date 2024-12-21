import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

interface IndustryGoals {
  [key: string]: {
    category: string;
    goals: string[];
  }[];
}

const industrySpecificGoals: IndustryGoals = {
  hr: [
    {
      category: 'Employee Management',
      goals: [
        'Employee Surveys',
        'Onboarding Assistance',
        'Performance Review Reminders'
      ]
    }
  ],
  education: [
    {
      category: 'Learning Management',
      goals: [
        'Student Progress Tracking',
        'Automated Assignment Reminders',
        'Personalized Learning Recommendations'
      ]
    }
  ],
  healthcare: [
    {
      category: 'Patient Care',
      goals: [
        'Patient Follow-Ups',
        'Appointment Reminders',
        'Personalized Health Tips'
      ]
    }
  ],
  finance: [
    {
      category: 'Financial Operations',
      goals: [
        'Invoice Reminders',
        'Fraud Detection Alerts',
        'Financial Health Tips'
      ]
    }
  ],
  'customer-support': [
    {
      category: 'Support Operations',
      goals: [
        'Customer Support Automation',
        'Sales Follow-Ups',
        'Inventory Management Alerts'
      ]
    }
  ],
  productivity: [
    {
      category: 'Personal Efficiency',
      goals: [
        'Task Management',
        'Meeting Scheduling',
        'Information Retrieval'
      ]
    }
  ],
  hospitality: [
    {
      category: 'Guest Services',
      goals: [
        'Booking Confirmations',
        'Pre-Arrival Information',
        'Post-Stay Surveys'
      ]
    }
  ],
  creative: [
    {
      category: 'Content Creation',
      goals: [
        'Interactive Storytelling',
        'Content Generation',
        'Asset Management'
      ]
    }
  ],
  crm: [
    {
      category: 'Customer Relations',
      goals: [
        'Lead Nurturing',
        'Client Onboarding',
        'Renewal Reminders'
      ]
    }
  ],
  monitoring: [
    {
      category: 'Real-Time Monitoring',
      goals: [
        'Weather and Disaster Alerts',
        'Operational Risk Alerts',
        'System Performance Monitoring'
      ]
    }
  ]
};

const commonGoals = [
  'Increase Operational Efficiency',
  'Reduce Manual Errors',
  'Reduce Operational Costs',
  'Improve Customer Satisfaction',
  'Boost Team Productivity',
  'Enable Business Scalability'
];

interface GoalSettingProps {
  selectedGoals: string[];
  onGoalsChange: (goals: string[]) => void;
  industry: string;
}

export function GoalSetting({ selectedGoals, onGoalsChange, industry }: GoalSettingProps) {
  const [customGoal, setCustomGoal] = useState('');
  const [customGoals, setCustomGoals] = useState<string[]>([]);

  const handleGoalToggle = (goal: string) => {
    const newSelectedGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter(g => g !== goal)
      : [...selectedGoals, goal];
    onGoalsChange(newSelectedGoals);
  };

  const handleAddCustomGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (customGoal.trim()) {
      setCustomGoals([...customGoals, customGoal.trim()]);
      handleGoalToggle(customGoal.trim());
      setCustomGoal('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Set Your Goals</h2>
        <p className="mt-2 text-sm text-gray-600">
          Select the goals you want to achieve with automation
        </p>
      </div>

      {/* Industry-Specific Goals */}
      {industrySpecificGoals[industry]?.map((categoryGoals) => (
        <div key={categoryGoals.category} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {categoryGoals.category}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {categoryGoals.goals.map((goal) => (
              <button
                key={goal}
                onClick={() => handleGoalToggle(goal)}
                className={`
                  flex items-center p-4 border rounded-lg text-left transition-all
                  hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  ${selectedGoals.includes(goal)
                    ? 'border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                  }
                `}
              >
                <div className={`
                  flex-shrink-0 w-5 h-5 border rounded-full mr-3
                  flex items-center justify-center
                  ${selectedGoals.includes(goal)
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'border-gray-300'
                  }
                `}>
                  {selectedGoals.includes(goal) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  selectedGoals.includes(goal) ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {goal}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Common Goals */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Common Goals</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {commonGoals.map((goal) => (
            <button
              key={goal}
              onClick={() => handleGoalToggle(goal)}
              className={`
                flex items-center p-4 border rounded-lg text-left transition-all
                hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${selectedGoals.includes(goal)
                  ? 'border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
                }
              `}
            >
              <div className={`
                flex-shrink-0 w-5 h-5 border rounded-full mr-3
                flex items-center justify-center
                ${selectedGoals.includes(goal)
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'border-gray-300'
                }
              `}>
                {selectedGoals.includes(goal) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span className={`text-sm font-medium ${
                selectedGoals.includes(goal) ? 'text-indigo-600' : 'text-gray-900'
              }`}>
                {goal}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Goals */}
      <div className="mt-6">
        <form onSubmit={handleAddCustomGoal} className="flex gap-2">
          <input
            type="text"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder="Add a custom goal..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!customGoal.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Custom Goals List */}
      {customGoals.length > 0 && (
        <div className="mt-4 space-y-2">
          {customGoals.map((goal, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-700">{goal}</span>
              <button
                onClick={() => {
                  setCustomGoals(customGoals.filter((_, i) => i !== index));
                  handleGoalToggle(goal);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}