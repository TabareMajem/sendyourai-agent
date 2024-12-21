import React from 'react';
import { X, FileText, Calendar, Users } from 'lucide-react';

interface ContextPanelProps {
  onClose: () => void;
}

export function ContextPanel({ onClose }: ContextPanelProps) {
  const contextData = {
    currentWorkflow: {
      name: 'Customer Onboarding',
      status: 'Active',
      lastModified: '2 hours ago'
    },
    recentDocuments: [
      { name: 'Onboarding Guide', type: 'PDF' },
      { name: 'Process Documentation', type: 'DOC' }
    ],
    upcomingTasks: [
      { name: 'Review Process', due: 'Tomorrow' },
      { name: 'Team Meeting', due: 'In 3 hours' }
    ]
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Context</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Current Workflow */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Workflow</h4>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {contextData.currentWorkflow.name}
              </span>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {contextData.currentWorkflow.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Last modified {contextData.currentWorkflow.lastModified}
            </p>
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Documents</h4>
          <div className="space-y-2">
            {contextData.recentDocuments.map((doc, index) => (
              <div
                key={index}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg"
              >
                <FileText className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{doc.name}</span>
                <span className="text-xs text-gray-400 ml-auto">{doc.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Upcoming Tasks</h4>
          <div className="space-y-2">
            {contextData.upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg"
              >
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{task.name}</span>
                <span className="text-xs text-gray-400 ml-auto">{task.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}