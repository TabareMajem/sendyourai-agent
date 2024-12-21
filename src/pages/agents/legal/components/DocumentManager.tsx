import React from 'react';
import { FileText, Download, Eye, Clock, Tag } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'review' | 'final';
  lastModified: string;
  tags: string[];
}

interface DocumentManagerProps {
  documents: Document[];
  onViewDocument: (id: string) => void;
  onDownloadDocument: (id: string) => void;
}

export function DocumentManager({ documents, onViewDocument, onDownloadDocument }: DocumentManagerProps) {
  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'final':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Documents</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                  <p className="text-xs text-gray-500">{doc.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onViewDocument(doc.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDownloadDocument(doc.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Last modified: {doc.lastModified}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
            </div>
            {doc.tags.length > 0 && (
              <div className="mt-2 flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}