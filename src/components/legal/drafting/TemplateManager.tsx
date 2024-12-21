```typescript
import React, { useState } from 'react';
import { Plus, FileText, Folder, Search, Tag, MoreVertical } from 'lucide-react';

interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  lastModified: Date;
  tags: string[];
  variables: string[];
}

interface TemplateManagerProps {
  templates: DocumentTemplate[];
  onCreateTemplate: () => void;
  onEditTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => void;
  onDuplicateTemplate: (templateId: string) => void;
}

export function TemplateManager({
  templates,
  onCreateTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onDuplicateTemplate
}: TemplateManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(templates.map(t => t.category))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Document Templates</h2>
          </div>
          <button
            onClick={onCreateTemplate}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </button>
        </div>

        <div className="mt-4 flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Folder className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
              </div>
              <div className="relative">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="w-5 h-5" />
                </button>
                {/* Dropdown menu would go here */}
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-3">{template.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {template.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {template.variables.length} variables
              </span>
              <span>
                Last modified: {template.lastModified.toLocaleDateString()}
              </span>
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => onEditTemplate(template.id)}
                className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDuplicateTemplate(template.id)}
                className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                Duplicate
              </button>
              <button
                onClick={() => onDeleteTemplate(template.id)}
                className="inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No templates found. Create a new template to get started.
        </div>
      )}
    </div>
  );
}
```