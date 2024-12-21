import React, { useState } from 'react';
import { Mail, Plus, Edit, Trash2, Copy } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  category: string;
}

interface EmailTemplateManagerProps {
  templates: EmailTemplate[];
  onCreateTemplate: (template: Omit<EmailTemplate, 'id'>) => void;
  onEditTemplate: (id: string, updates: Partial<EmailTemplate>) => void;
  onDeleteTemplate: (id: string) => void;
  onDuplicateTemplate: (id: string) => void;
}

export function EmailTemplateManager({
  templates,
  onCreateTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onDuplicateTemplate
}: EmailTemplateManagerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Email Templates</h2>
          </div>
          <button
            onClick={() => {
              setSelectedTemplate(null);
              setIsEditing(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template List */}
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-4 rounded-lg cursor-pointer border ${
                  selectedTemplate?.id === template.id
                    ? 'bg-indigo-50 border-indigo-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
                onClick={() => {
                  setSelectedTemplate(template);
                  setIsEditing(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateTemplate(template.id);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                        setIsEditing(true);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTemplate(template.id);
                      }}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{template.subject}</p>
              </div>
            ))}

            {templates.length === 0 && (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900">No templates</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new email template.
                </p>
              </div>
            )}
          </div>

          {/* Template Editor */}
          <div className="bg-gray-50 rounded-lg p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={selectedTemplate?.name || ''}
                    onChange={(e) => {
                      if (selectedTemplate) {
                        onEditTemplate(selectedTemplate.id, { name: e.target.value });
                      }
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={selectedTemplate?.subject || ''}
                    onChange={(e) => {
                      if (selectedTemplate) {
                        onEditTemplate(selectedTemplate.id, { subject: e.target.value });
                      }
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Body
                  </label>
                  <textarea
                    rows={10}
                    value={selectedTemplate?.body || ''}
                    onChange={(e) => {
                      if (selectedTemplate) {
                        onEditTemplate(selectedTemplate.id, { body: e.target.value });
                      }
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (selectedTemplate) {
                        // Save changes
                        setIsEditing(false);
                      } else {
                        // Create new template
                        onCreateTemplate({
                          name: 'New Template',
                          subject: '',
                          body: '',
                          variables: [],
                          category: 'general'
                        });
                      }
                    }}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {selectedTemplate ? 'Save Changes' : 'Create Template'}
                  </button>
                </div>
              </div>
            ) : selectedTemplate ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedTemplate.name}</h3>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Subject</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedTemplate.subject}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Body</h4>
                  <div className="mt-1 prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-900">
                      {selectedTemplate.body}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900">No template selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a template to view or edit its contents
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}