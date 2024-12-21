import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectCreationWizardProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function ProjectCreationWizard({ onSubmit, onCancel }: ProjectCreationWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    objectives: [] as string[],
    stakeholders: [] as string[],
    startDate: '',
    endDate: '',
    budget: '',
    deliverables: [] as string[],
    constraints: [] as string[],
    assumptions: [] as string[]
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    await onSubmit({
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      budget: formData.budget ? parseFloat(formData.budget) : undefined
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="New Product Launch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Describe the project's purpose and goals..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Objectives
              </label>
              <div className="mt-2 space-y-2">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...formData.objectives];
                        newObjectives[index] = e.target.value;
                        setFormData({ ...formData, objectives: newObjectives });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          objectives: formData.objectives.filter((_, i) => i !== index)
                        });
                      }}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      objectives: [...formData.objectives, '']
                    });
                  }}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Add Objective
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stakeholders
              </label>
              <div className="mt-2 space-y-2">
                {formData.stakeholders.map((stakeholder, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={stakeholder}
                      onChange={(e) => {
                        const newStakeholders = [...formData.stakeholders];
                        newStakeholders[index] = e.target.value;
                        setFormData({ ...formData, stakeholders: newStakeholders });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          stakeholders: formData.stakeholders.filter((_, i) => i !== index)
                        });
                      }}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      stakeholders: [...formData.stakeholders, '']
                    });
                  }}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Add Stakeholder
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Key Deliverables
              </label>
              <div className="mt-2 space-y-2">
                {formData.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={deliverable}
                      onChange={(e) => {
                        const newDeliverables = [...formData.deliverables];
                        newDeliverables[index] = e.target.value;
                        setFormData({ ...formData, deliverables: newDeliverables });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          deliverables: formData.deliverables.filter((_, i) => i !== index)
                        });
                      }}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      deliverables: [...formData.deliverables, '']
                    });
                  }}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Add Deliverable
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Constraints
              </label>
              <div className="mt-2 space-y-2">
                {formData.constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={constraint}
                      onChange={(e) => {
                        const newConstraints = [...formData.constraints];
                        newConstraints[index] = e.target.value;
                        setFormData({ ...formData, constraints: newConstraints });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          constraints: formData.constraints.filter((_, i) => i !== index)
                        });
                      }}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      constraints: [...formData.constraints, '']
                    });
                  }}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Add Constraint
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Create New Project</h2>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {['Project Details', 'Timeline & Budget', 'Stakeholders', 'Deliverables'].map((label, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? 'bg-green-500' :
                    step === index + 1 ? 'bg-indigo-600' :
                    'bg-gray-200'
                  } text-white font-medium`}>
                    {step > index + 1 ? '✓' : index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-24 h-1 ${
                      step > index + 1 ? 'bg-green-500' :
                      'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['Project Details', 'Timeline & Budget', 'Stakeholders', 'Deliverables'].map((label, index) => (
                <span key={index} className="text-xs text-gray-500">{label}</span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={step === 1 ? onCancel : handleBack}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {step === 4 ? 'Create Project' : 'Next'}
              {step < 4 && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}