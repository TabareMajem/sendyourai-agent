```typescript
import React, { useState } from 'react';
import { Save, Eye, Code, RefreshCw } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  variables: string[];
}

interface EmailTemplateEditorProps {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onPreview: (template: EmailTemplate) => void;
}

export function EmailTemplateEditor({
  template,
  onSave,
  onPreview
}: EmailTemplateEditorProps) {
  const [editedTemplate, setEditedTemplate] = useState(template);
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedTemplate);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Email Template Editor</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'visual' ? 'code' : 'visual')}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              {viewMode === 'visual' ? (
                <Code className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => onPreview(editedTemplate)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-1" />
              )}
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Template Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Template Name
          </label>
          <input
            type="text"
            value={editedTemplate.name}
            onChange={(e) => setEditedTemplate({
              ...editedTemplate,
              name: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Subject Line */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject Line
          </label>
          <input
            type="text"
            value={editedTemplate.subject}
            onChange={(e) => setEditedTemplate({
              ...editedTemplate,
              subject: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Template Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          {viewMode === 'visual' ? (
            <div
              contentEditable
              dangerouslySetInnerHTML={{ __html: editedTemplate.html }}
              onBlur={(e) => setEditedTemplate({
                ...editedTemplate,
                html: e.currentTarget.innerHTML
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[300px] p-4"
            />
          ) : (
            <textarea
              value={editedTemplate.html}
              onChange={(e) => setEditedTemplate({
                ...editedTemplate,
                html: e.target.value
              })}
              rows={12}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
            />
          )}
        </div>

        {/* Variables */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Template Variables
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {editedTemplate.variables.map((variable, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {variable}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```