import React, { useState } from 'react';
import { ArrowRight, Plus, Settings, Trash2, X } from 'lucide-react';

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'action';
  name: string;
  description: string;
  config?: Record<string, any>;
}

const availableSteps: Record<string, WorkflowStep[]> = {
  trigger: [
    {
      id: 'email-received',
      type: 'trigger',
      name: 'Email Received',
      description: 'Trigger when a new email arrives'
    },
    {
      id: 'form-submitted',
      type: 'trigger',
      name: 'Form Submission',
      description: 'Trigger when a form is submitted'
    },
    {
      id: 'schedule',
      type: 'trigger',
      name: 'Schedule',
      description: 'Trigger at scheduled times'
    }
  ],
  action: [
    {
      id: 'send-email',
      type: 'action',
      name: 'Send Email',
      description: 'Send an automated email response'
    },
    {
      id: 'create-task',
      type: 'action',
      name: 'Create Task',
      description: 'Create a new task in your system'
    },
    {
      id: 'update-record',
      type: 'action',
      name: 'Update Record',
      description: 'Update a record in your database'
    }
  ]
};

interface WorkflowBuilderProps {
  selectedIndustry: string;
  onWorkflowCreate: (workflow: WorkflowStep[]) => void;
}

export function WorkflowBuilder({ selectedIndustry, onWorkflowCreate }: WorkflowBuilderProps) {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [showStepPicker, setShowStepPicker] = useState(false);
  const [stepType, setStepType] = useState<'trigger' | 'action'>('trigger');

  const handleAddStep = (step: WorkflowStep) => {
    setWorkflowSteps([...workflowSteps, { ...step, id: `${step.id}-${Date.now()}` }]);
    setShowStepPicker(false);
  };

  const handleRemoveStep = (index: number) => {
    setWorkflowSteps(workflowSteps.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create Your First Workflow</h2>
        <p className="mt-2 text-sm text-gray-600">
          Let's set up a simple automation workflow
        </p>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {workflowSteps.map((step, index) => (
          <div key={step.id} className="relative">
            {index > 0 && (
              <div className="absolute -top-4 left-8 w-0.5 h-8 bg-gray-200" />
            )}
            <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-white">
              <div className={`
                flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center
                ${step.type === 'trigger' ? 'bg-blue-100' : 'bg-green-100'}
              `}>
                {step.type === 'trigger' ? (
                  <Settings className={`w-8 h-8 text-blue-600`} />
                ) : (
                  <ArrowRight className={`w-8 h-8 text-green-600`} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{step.name}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
              <button
                onClick={() => handleRemoveStep(index)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {/* Add Step Button */}
        {!showStepPicker && (
          <button
            onClick={() => {
              setStepType(workflowSteps.length === 0 ? 'trigger' : 'action');
              setShowStepPicker(true);
            }}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-6 h-6 mx-auto text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              {workflowSteps.length === 0 ? 'Add Trigger' : 'Add Action'}
            </span>
          </button>
        )}

        {/* Step Picker */}
        {showStepPicker && (
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-900">
                Select {stepType === 'trigger' ? 'a Trigger' : 'an Action'}
              </h4>
              <button
                onClick={() => setShowStepPicker(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {availableSteps[stepType].map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleAddStep(step)}
                  className="p-4 border border-gray-200 rounded-lg text-left hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <h5 className="font-medium text-gray-900">{step.name}</h5>
                  <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tooltips */}
      {workflowSteps.length === 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Start by adding a trigger - this will be the event that starts your workflow.
          </p>
        </div>
      )}
    </div>
  );
}