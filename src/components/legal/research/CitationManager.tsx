```typescript
import React, { useState } from 'react';
import { Link, FileText, Plus, Tag, AlertCircle } from 'lucide-react';

interface Citation {
  id: string;
  citation: string;
  title: string;
  source: string;
  pinpoint?: string;
  notes?: string;
  tags: string[];
  lastAccessed: Date;
  shepardSignal?: 'positive' | 'warning' | 'negative';
}

interface CitationManagerProps {
  citations: Citation[];
  onAddCitation: (citation: Omit<Citation, 'id'>) => void;
  onUpdateCitation: (id: string, updates: Partial<Citation>) => void;
  onDeleteCitation: (id: string) => void;
  onCheckShepardSignal: (citation: string) => Promise<void>;
}

export function CitationManager({
  citations,
  onAddCitation,
  onUpdateCitation,
  onDeleteCitation,
  onCheckShepardSignal
}: CitationManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCitation, setNewCitation] = useState({
    citation: '',
    title: '',
    source: '',
    pinpoint: '',
    notes: '',
    tags: [] as string[],
    lastAccessed: new Date()
  });

  const getSignalIcon = (signal?: Citation['shepardSignal']) => {
    switch (signal) {
      case 'positive':
        return <div className="w-3 h-3 rounded-full bg-green-500" />;
      case 'warning':
        return <div className="w-3 h-3 rounded-full bg-yellow-500" />;
      case 'negative':
        return <div className="w-3 h-3 rounded-full bg-red-500" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-300" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCitation(newCitation);
    setNewCitation({
      citation: '',
      title: '',
      source: '',
      pinpoint: '',
      notes: '',
      tags: [],
      lastAccessed: new Date()
    });
    setShowAddForm(false);
  };

  const filteredCitations = citations.filter(citation =>
    citation.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    citation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    citation.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Citation Manager</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Citation
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citations..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {showAddForm && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Citation
              </label>
              <input
                type="text"
                value={newCitation.citation}
                onChange={(e) => setNewCitation({ ...newCitation, citation: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={newCitation.title}
                onChange={(e) => setNewCitation({ ...newCitation, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Source
                </label>
                <input
                  type="text"
                  value={newCitation.source}
                  onChange={(e) => setNewCitation({ ...newCitation, source: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pinpoint
                </label>
                <input
                  type="text"
                  value={newCitation.pinpoint}
                  onChange={(e) => setNewCitation({ ...newCitation, pinpoint: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={newCitation.notes}
                onChange={(e) => setNewCitation({ ...newCitation, notes: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                placeholder="Add tags (comma separated)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const tags = e.currentTarget.value.split(',').map(t => t.trim());
                    setNewCitation({
                      ...newCitation,
                      tags: [...new Set([...newCitation.tags, ...tags])]
                    });
                    e.currentTarget.value = '';
                  }
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {newCitation.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setNewCitation({
                        ...newCitation,
                        tags: newCitation.tags.filter((_, i) => i !== index)
                      })}
                      className="ml-1.5 text-indigo-600 hover:text-indigo-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
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
                Add Citation
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {filteredCitations.map((citation) => (
          <div key={citation.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getSignalIcon(citation.shepardSignal)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {citation.citation}
                  </h3>
                  <p className="text-sm text-gray-500">{citation.title}</p>
                </div>
              </div>
              <button
                onClick={() => onCheckShepardSignal(citation.citation)}
                className="text-sm text-indigo-600 hover:text-indigo-900"
              >
                Check Signal
              </button>
            </div>

            {citation.pinpoint && (
              <p className="mt-2 text-sm text-gray-600">
                Pinpoint: {citation.pinpoint}
              </p>
            )}

            {citation.notes && (
              <p className="mt-2 text-sm text-gray-600">{citation.notes}</p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
              {citation.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>Source: {citation.source}</span>
              <span>Last accessed: {citation.lastAccessed.toLocaleDateString()}</span>
            </div>
          </div>
        ))}

        {filteredCitations.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No citations found
          </div>
        )}
      </div>
    </div>
  );
}
```