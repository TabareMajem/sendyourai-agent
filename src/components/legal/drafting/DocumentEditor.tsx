```typescript
import React, { useState } from 'react';
import { Save, Eye, Code, FileText, Download, RefreshCw } from 'lucide-react';

interface DocumentTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: string;
}

interface DocumentEditorProps {
  template: DocumentTemplate;
  onSave: (content: string) => Promise<void>;
  onPreview: () => void;
  onExport: () => void;
}

export function DocumentEditor({
  template,
  onSave,
  onPreview,
  onExport
}: DocumentEditorProps) {
  const [content, setContent] = useState(template.content);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(content);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">{template.name}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              {viewMode === 'edit' ? (
                <Eye className="w-5 h-5" />
              ) : (
                <Code className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onPreview}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Preview
            </button>
            <button
              onClick={onExport}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
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

      <div className="p-4">
        {/* Variables Panel */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Available Variables
          </h3>
          <div className="flex flex-wrap gap-2">
            {template.variables.map((variable) => (
              <button
                key={variable}
                onClick={() => {
                  const insertion = `{{${variable}}}`;
                  setContent((prev) => prev + insertion);
                }}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
              >
                {variable}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="border rounded-lg">
          {viewMode === 'edit' ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[600px] p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            />
          ) : (
            <div
              className="w-full h-[600px] p-4 prose max-w-none overflow-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>

        {/* Word Count */}
        <div className="mt-2 text-sm text-gray-500">
          {content.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>
    </div>
  );
}
```