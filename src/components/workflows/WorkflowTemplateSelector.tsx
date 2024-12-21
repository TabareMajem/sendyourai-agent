import React from 'react';
import { Building2, Dumbbell, ShoppingBag, Briefcase } from 'lucide-react';

interface WorkflowTemplateSelectorProps {
  onSelect: (template: string) => void;
}

export function WorkflowTemplateSelector({ onSelect }: WorkflowTemplateSelectorProps) {
  const templates = [
    {
      id: 'property_listing',
      name: 'Property Listing Automation',
      description: 'Automate property listing creation and distribution',
      icon: Building2,
      industry: 'Real Estate'
    },
    {
      id: 'virtual_tour',
      name: 'Virtual Tour Management',
      description: 'Handle virtual tour creation and scheduling',
      icon: Building2,
      industry: 'Real Estate'
    },
    {
      id: 'workout_plan',
      name: 'Workout Plan Generation',
      description: 'Create and manage personalized workout plans',
      icon: Dumbbell,
      industry: 'Fitness'
    },
    {
      id: 'nutrition_plan',
      name: 'Nutrition Plan Management',
      description: 'Generate and track nutrition plans',
      icon: Dumbbell,
      industry: 'Fitness'
    },
    {
      id: 'ecommerce_personalization',
      name: 'Shopping Personalization',
      description: 'Personalize shopping experiences',
      icon: ShoppingBag,
      industry: 'E-commerce'
    },
    {
      id: 'support_automation',
      name: 'Support Automation',
      description: 'Automate customer support workflows',
      icon: Briefcase,
      industry: 'E-commerce'
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-600 transition-colors text-left"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-gray-900">{template.name}</span>
              </div>
              <p className="text-sm text-gray-500">{template.description}</p>
              <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {template.industry}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}