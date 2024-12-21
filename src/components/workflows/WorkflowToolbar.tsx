import React from 'react';
import {
  Save,
  Play,
  Rocket,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Share2
} from 'lucide-react';
import { useWorkflowEngine } from '../../hooks/useWorkflowEngine';

interface WorkflowToolbarProps {
  workflow: {
    nodes: any[];
    edges: any[];
  };
  onSave: () => void;
  onTest: () => void;
  onDeploy: () => void;
}

export function WorkflowToolbar({
  workflow,
  onSave,
  onTest,
  onDeploy
}: WorkflowToolbarProps) {
  const { executeWorkflow, isExecuting } = useWorkflowEngine();

  const handleTest = async () => {
    try {
      await executeWorkflow(workflow);
      onTest();
    } catch (error) {
      console.error('Workflow test failed:', error);
    }
  };

  return (
    <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onSave}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>

        <button
          onClick={handleTest}
          disabled={isExecuting}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          <Play className="w-4 h-4 mr-2" />
          Test
        </button>

        <button
          onClick={onDeploy}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Deploy
        </button>

        <div className="border-l border-gray-200 h-8 mx-2" />

        <button className="p-2 text-gray-400 hover:text-gray-500">
          <Undo className="w-5 h-5" />
        </button>

        <button className="p-2 text-gray-400 hover:text-gray-500">
          <Redo className="w-5 h-5" />
        </button>

        <div className="border-l border-gray-200 h-8 mx-2" />

        <button className="p-2 text-gray-400 hover:text-gray-500">
          <ZoomIn className="w-5 h-5" />
        </button>

        <button className="p-2 text-gray-400 hover:text-gray-500">
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>

      <div>
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>
    </div>
  );
}