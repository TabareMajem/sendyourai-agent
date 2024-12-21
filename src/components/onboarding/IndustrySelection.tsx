import React from 'react';
import {
  Users,
  GraduationCap,
  Stethoscope,
  BadgeDollarSign,
  HeadsetIcon,
  Brain,
  Plane,
  Palette,
  Building2,
  BarChart3,
} from 'lucide-react';

interface Industry {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  examples: string[];
}

const industries: Industry[] = [
  {
    id: 'hr',
    name: 'Human Resources',
    icon: Users,
    description: 'Streamline HR processes and employee management',
    examples: ['Employee Onboarding', 'Performance Reviews', 'Time Tracking']
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    description: 'Enhance learning and administrative processes',
    examples: ['Student Progress Tracking', 'Assignment Management', 'Course Planning']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Stethoscope,
    description: 'Improve patient care and medical workflows',
    examples: ['Patient Follow-ups', 'Appointment Scheduling', 'Health Records']
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: BadgeDollarSign,
    description: 'Automate financial operations and compliance',
    examples: ['Invoice Processing', 'Risk Management', 'Financial Reporting']
  },
  {
    id: 'customer-support',
    name: 'SMEs/Customer Support',
    icon: HeadsetIcon,
    description: 'Enhance customer service and support operations',
    examples: ['Ticket Management', 'Customer Feedback', 'Support Analytics']
  },
  {
    id: 'productivity',
    name: 'Personal Productivity',
    icon: Brain,
    description: 'Boost individual and team productivity',
    examples: ['Task Management', 'Time Tracking', 'Project Planning']
  },
  {
    id: 'hospitality',
    name: 'Hospitality and Travel',
    icon: Plane,
    description: 'Streamline travel and hospitality operations',
    examples: ['Booking Management', 'Guest Services', 'Travel Planning']
  },
  {
    id: 'creative',
    name: 'Creative and Entertainment',
    icon: Palette,
    description: 'Enhance creative workflows and content management',
    examples: ['Content Creation', 'Asset Management', 'Project Tracking']
  },
  {
    id: 'crm',
    name: 'CRM Enhancements',
    icon: Building2,
    description: 'Improve customer relationship management',
    examples: ['Lead Management', 'Sales Automation', 'Customer Analytics']
  },
  {
    id: 'monitoring',
    name: 'Real-Time Data Monitoring',
    icon: BarChart3,
    description: 'Monitor and analyze data in real-time',
    examples: ['Performance Monitoring', 'Alert Management', 'Data Analytics']
  }
];

interface IndustrySelectionProps {
  selectedIndustry: string;
  onSelect: (industry: string) => void;
}

export function IndustrySelection({ selectedIndustry, onSelect }: IndustrySelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Select Your Industry</h2>
        <p className="mt-2 text-sm text-gray-600">
          We'll customize your experience based on your industry
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => {
          const Icon = industry.icon;
          const isSelected = selectedIndustry === industry.id;

          return (
            <button
              key={industry.id}
              onClick={() => onSelect(industry.id)}
              className={`
                relative p-6 border rounded-lg text-left transition-all
                hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
                <h3 className={`text-lg font-medium ${isSelected ? 'text-indigo-600' : 'text-gray-900'}`}>
                  {industry.name}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">{industry.description}</p>
              <ul className="mt-3 space-y-1">
                {industry.examples.map((example, index) => (
                  <li key={index} className="text-xs text-gray-500 flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
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