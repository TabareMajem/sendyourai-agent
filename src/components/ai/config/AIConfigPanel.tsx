import { useState } from 'react';
import { Settings, Brain, Shield, Sliders, MessageSquare } from 'lucide-react';
import { BehaviorSettings } from './BehaviorSettings';
import { SecuritySettings } from './SecuritySettings';
import { CommunicationSettings } from './CommunicationSettings';
import { LearningSettings } from './LearningSettings';

interface AIConfigPanelProps {
  className?: string;
}

type ConfigSection = 'behavior' | 'security' | 'communication' | 'learning';

export function AIConfigPanel({ className = '' }: AIConfigPanelProps) {
  const [activeSection, setActiveSection] = useState<ConfigSection>('behavior');

  const sections = [
    {
      id: 'behavior' as const,
      label: 'Behavior',
      icon: Brain,
      description: 'Configure how the AI makes decisions and takes actions'
    },
    {
      id: 'security' as const,
      label: 'Security',
      icon: Shield,
      description: 'Set security and compliance parameters'
    },
    {
      id: 'communication' as const,
      label: 'Communication',
      icon: MessageSquare,
      description: 'Manage how the AI communicates and notifies'
    },
    {
      id: 'learning' as const,
      label: 'Learning',
      icon: Sliders,
      description: 'Adjust learning and adaptation settings'
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'behavior':
        return <BehaviorSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'communication':
        return <CommunicationSettings />;
      case 'learning':
        return <LearningSettings />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">AI Configuration</h3>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-px bg-gray-200">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-4 text-left bg-white transition-colors ${
                isActive
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{section.label}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{section.description}</p>
            </button>
          );
        })}
      </div>

      <div className="p-4">
        {renderSection()}
      </div>
    </div>
  );
}
