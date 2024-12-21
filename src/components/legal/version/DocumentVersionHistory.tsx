import React, { useState } from 'react';
import { History, Clock, User, ArrowLeft, ArrowRight, GitBranch, Download } from 'lucide-react';

interface DocumentVersion {
  id: string;
  version: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  changes: {
    additions: number;
    deletions: number;
    modifications: number;
  };
  comment: string;
  tags: string[];
}

interface DocumentVersionHistoryProps {
  versions: DocumentVersion[];
  currentVersion: string;
  onSelectVersion: (versionId: string) => void;
  onCompareVersions: (version1: string, version2: string) => void;
  onRevertToVersion: (versionId: string) => void;
  onDownloadVersion: (versionId: string) => void;
}

export function DocumentVersionHistory({
  versions,
  currentVersion,
  onSelectVersion,
  onCompareVersions,
  onRevertToVersion,
  onDownloadVersion
}: DocumentVersionHistoryProps) {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleVersionSelect = (versionId: string) => {
    if (selectedVersions.includes(versionId)) {
      setSelectedVersions(selectedVersions.filter(id => id !== versionId));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, versionId]);
    }
  };

  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      onCompareVersions(selectedVersions[0], selectedVersions[1]);
      setShowComparison(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <History className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Version History</h2>
          </div>
          {selectedVersions.length === 2 && (
            <button
              onClick={handleCompare}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Compare Selected
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {versions.map((version) => (
          <div
            key={version.id}
            className={`p-6 hover:bg-gray-50 ${
              selectedVersions.includes(version.id) ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedVersions.includes(version.id)}
                  onChange={() => handleVersionSelect(version.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      Version {version.version}
                    </span>
                    {version.id === currentVersion && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{version.title}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{version.author.name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">
                    {version.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-600">{version.comment}</p>
            </div>

            <div className="mt-2 flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-green-600">+{version.changes.additions}</span>
                <span className="mx-1">/</span>
                <span className="text-red-600">-{version.changes.deletions}</span>
                <span className="mx-1">/</span>
                <span className="text-yellow-600">~{version.changes.modifications}</span>
              </div>
              <div className="flex space-x-2">
                {version.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => onSelectVersion(version.id)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View
              </button>
              <button
                onClick={() => onRevertToVersion(version.id)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <GitBranch className="w-4 h-4 mr-1" />
                Revert to This Version
              </button>
              <button
                onClick={() => onDownloadVersion(version.id)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}