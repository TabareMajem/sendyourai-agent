import React from 'react';
import { Plus, FileText, Users, Settings, Building2, Gavel, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickActions() {
  const actions = [
    { icon: Plus, label: 'New Workflow', href: '/workflows/new' },
    { icon: Building2, label: 'Sales Agent', href: '/agents/sales/config' },
    { icon: Gavel, label: 'Legal Agent', href: '/agents/legal' },
    { icon: ClipboardList, label: 'Project Manager', href: '/agents/pmo' },
    { icon: FileText, label: 'View Reports', href: '/reports' },
    { icon: Users, label: 'Team Members', href: '/team' },
    { icon: Settings, label: 'Settings', href: '/settings' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <action.icon className="w-6 h-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}