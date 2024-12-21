```typescript
import React, { useState } from 'react';
import { Users, Calendar, AlertTriangle, Plus, X } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: number; // Percentage
  currentLoad: number; // Percentage
  assignments: Array<{
    projectId: string;
    taskId: string;
    hours: number;
    startDate: Date;
    endDate: Date;
  }>;
}

interface ResourceAllocationProps {
  resources: Resource[];
  onAddResource: (resource: Omit<Resource, 'id'>) => void;
  onUpdateResource: (id: string, updates: Partial<Resource>) => void;
  onRemoveResource: (id: string) => void;
  onAssignResource: (resourceId: string, assignment: Resource['assignments'][0]) => void;
}

export function ResourceAllocationInterface({
  resources,
  onAddResource,
  onUpdateResource,
  onRemoveResource,
  onAssignResource
}: ResourceAllocationProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResource, setNewResource] = useState<Omit<Resource, 'id'>>({
    name: '',
    role: '',
    skills: [],
    availability: 100,
    currentLoad: 0,
    assignments: []
  });
  const [newSkill, setNewSkill] = useState('');

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    onAddResource(newResource);
    setNewResource({
      name: '',
      role: '',
      skills: [],
      availability: 100,
      currentLoad: 0,
      assignments: []
    });
    setShowAddForm(false);
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      setNewResource({
        ...newResource,
        skills: [...newResource.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Resource Allocation</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </button>
        </div>
      </div>

      {/* Resource List */}
      <div className="p-6 space-y-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{resource.name}</h3>
                <p className="text-sm text-gray-500">{resource.role}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {resource.currentLoad}% / {resource.availability}%
                  </p>
                  <p className="text-xs text-gray-500">Current Load / Availability</p>
                </div>
                <button
                  onClick={() => onRemoveResource(resource.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-2 flex flex-wrap gap-2">
              {resource.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Assignments */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Current Assignments</h4>
              <div className="space-y-2">
                {resource.assignments.map((assignment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {assignment.startDate.toLocaleDateString()} - {assignment.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{assignment.hours}h</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overallocation Warning */}
            {resource.currentLoad > resource.availability && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Resource Overallocation
                    </h3>
                    <p className="mt-1 text-sm text-yellow-700">
                      This resource is currently overallocated. Consider redistributing workload.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Resource Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Resource</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddResource} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newResource.name}
                  onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={newResource.role}
                  onChange={(e) => setNewResource({ ...newResource, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skills
                </label>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleAddSkill}
                  placeholder="Press Enter to add skill"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {newResource.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => setNewResource({
                          ...newResource,
                          skills: newResource.skills.filter((_, i) => i !== index)
                        })}
                        className="ml-1.5 text-indigo-600 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Availability (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newResource.availability}
                  onChange={(e) => setNewResource({
                    ...newResource,
                    availability: parseInt(e.target.value)
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```