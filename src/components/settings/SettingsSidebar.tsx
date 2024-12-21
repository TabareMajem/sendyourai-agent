import React from 'react';
import { Calendar, Mail, MessageSquare, Database, BrainCircuit, GitBranch } from 'lucide-react';

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  const sections = [
    { id: 'account', name: 'Account', icon: Calendar },
    { id: 'notifications', name: 'Notifications', icon: Mail },
    { id: 'integrations', name: 'Integrations', icon: GitBranch },
    { id: 'ai', name: 'AI Settings', icon: BrainCircuit },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'messaging', name: 'Messaging', icon: MessageSquare }
  ];

  return (
    <div className="w-64 bg-white rounded-lg shadow">
      <nav className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {section.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
}