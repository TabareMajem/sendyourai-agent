```typescript
import React, { useState } from 'react';
import { FileText, ArrowRight, Upload, Download, RefreshCw } from 'lucide-react';

interface DocumentVersion {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  author: string;
}

interface DocumentComparisonToolProps {
  onCompare: (doc1: string, doc2: string) => Promise<{
    additions: string[];
    deletions: string[];
    modifications: Array<{
      original: string;
      modified: string;
    }>;
  }>;
  onExport: (format: 'pdf' | 'word' | 'html') => Promise<void>;
  documents: DocumentVersion[];
}

export function DocumentComparisonTool({
  onCompare,
  onExport,
  documents
}: DocumentComparisonToolProps) {
  const [selectedDoc1, setSelectedDoc1] = useState<string>('');
  const [selectedDoc2, setSelectedDoc2] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<{
    additions: string[];
    deletions: string[];
    modifications: Array<{
      original: string;
      modified: string;
    }>;
  } | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = async () => {
    if (!selectedDoc1 || !selectedDoc2) return;

    setIsComparing(true);
    try {
      const doc1 = documents.find(d => d.id === selectedDoc1)?.content || '';
      const doc2 = documents.find(d => d.id === selectedDoc2)?.content || '';
      const result = await onCompare(doc1, doc2);
      setComparisonResult(result);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Document Comparison</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onExport('pdf')}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-1" />
              Export PDF
            </button>
            <button
              onClick={() => onExport('word')}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-1" />
              Export Word
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Document 1 Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Original Document
            </label>
            <select
              value={selectedDoc1}
              onChange={(e) => setSelectedDoc1(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select document...</option>
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.title} - {doc.timestamp.toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {/* Document 2 Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Modified Document
            </label>
            <select
              value={selectedDoc2}
              onChange={(e) => setSelectedDoc2(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select document...</option>
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.title} - {doc.timestamp.toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCompare}
          disabled={!selectedDoc1 || !selectedDoc2 || isComparing}
          className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isComparing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Comparing Documents...
            </>
          ) : (
            <>
              <ArrowRight className="w-4 h-4 mr-2" />
              Compare Documents
            </>
          )}
        </button>
      </div>

      {/* Comparison Results */}
      {comparisonResult && (
        <div className="p-6 space-y-6">
          {/* Additions */}
          <div>
            <h3 className="text-sm font-medium text-green-700 mb-2">
              Additions ({comparisonResult.additions.length})
            </h3>
            <div className="space-y-2">
              {comparisonResult.additions.map((addition, index) => (
                <div
                  key={index}
                  className="p-3 bg-green-50 border border-green-200 rounded-md"
                >
                  <p className="text-sm text-green-800">{addition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deletions */}
          <div>
            <h3 className="text-sm font-medium text-red-700 mb-2">
              Deletions ({comparisonResult.deletions.length})
            </h3>
            <div className="space-y-2">
              {comparisonResult.deletions.map((deletion, index) => (
                <div
                  key={index}
                  className="p-3 bg-red-50 border border-red-200 rounded-md"
                >
                  <p className="text-sm text-red-800">{deletion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modifications */}
          <div>
            <h3 className="text-sm font-medium text-yellow-700 mb-2">
              Modifications ({comparisonResult.modifications.length})
            </h3>
            <div className="space-y-2">
              {comparisonResult.modifications.map((mod, index) => (
                <div
                  key={index}
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <p className="text-sm text-yellow-800 line-through">
                        {mod.original}
                      </p>
                      <p className="text-sm text-yellow-800 mt-1">
                        {mod.modified}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```