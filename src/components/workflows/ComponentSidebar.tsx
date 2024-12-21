import React from 'react';
import { Calendar, Mail, MessageSquare, Database, BrainCircuit, GitBranch } from 'lucide-react';

interface ComponentCategory {
  name: string;
  components: {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    type: 'trigger' | 'action' | 'condition';
  }[];
}

const components: ComponentCategory[] = [
  {
    name: 'Triggers',
    components: [
      {
        id: 'schedule',
        name: 'Schedule',
        description: 'Trigger workflow at specified times',
        icon: Calendar,
        type: 'trigger'
      },
      {
        id: 'email-received',
        name: 'Email Received',
        description: 'Trigger when new email arrives',
        icon: Mail,
        type: 'trigger'
      }
    ]
  },
  {
    name: 'Actions',
    components: [
      {
        id: 'send-email',
        name: 'Send Email',
        description: 'Send an email message',
        icon: Mail,
        type: 'action'
      },
      {
        id: 'slack-message',
        name: 'Slack Message',
        description: 'Send a Slack message',
        icon: MessageSquare,
        type: 'action'
      },
      {
        id: 'update-record',
        name: 'Update Record',
        description: 'Update database record',
        icon: Database,
        type: 'action'
      },
      {
        id: 'ai-process',
        name: 'AI Process',
        description: 'Process data with AI',
        icon: BrainCircuit,
        type: 'action'
      }
    ]
  },
  {
    name: 'Conditions',
    components: [
      {
        id: 'if-else',
        name: 'If/Else',
        description: 'Branch based on conditions',
        icon: GitBranch,
        type: 'condition'
      }
    ]
  }
];

interface ComponentSidebarProps {
  onComponentDrag: (component: any) => void;
}

export function ComponentSidebar({ onComponentDrag }: ComponentSidebarProps) {
  return (
    <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search components..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="px-4 pb-4 space-y-6">
        {components.map((category) => (
          <div key={category.name}>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              {category.name}
            </h3>
            <div className="space-y-2">
              {category.components.map((component) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/reactflow', JSON.stringify(component));
                    onComponentDrag(component);
                  }}
                  className="flex items-start p-3 rounded-lg border border-gray-200 hover:border-indigo-600 cursor-move"
                >
                  <component.icon className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      {component.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {component.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}