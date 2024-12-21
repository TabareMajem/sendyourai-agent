import React from 'react';
import { Play, Pause, Trash2, Share2, Tag } from 'lucide-react';

interface WorkflowBulkActionsProps {
  selectedWorkflows: string[];
  onAction: (action: string) => void;
}

export function WorkflowBulkActions({ selectedWorkflows, onAction }: WorkflowBulkActionsProps) {
  if (selectedWorkflows.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">
        {selectedWorkflows.length} selected
      </span>
      <div className="border-l border-gray-200 h-6 mx-2" />
      <button
        onClick={() => onAction('start')}
        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Play className="w-4 h-4 mr-2" />
        Start
      </button>
      <button
        onClick={() => onAction('pause')}
        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Pause className="w-4 h-4 mr-2" />
        Pause
      </button>
      <button
        onClick={() => onAction('share')}
        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </button>
      <button
        onClick={() => onAction('tag')}
        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Tag className="w-4 h-4 mr-2" />
        Add Tag
      </button>
      <button
        onClick={() => onAction('delete')}
        className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </button>
    </div>
  );
}