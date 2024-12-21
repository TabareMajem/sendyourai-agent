import React, { useState } from 'react';
import { Key, Plus, Copy, Trash2, AlertTriangle } from 'lucide-react';
import { APIKeyList } from './api-keys/APIKeyList';
import { CreateKeyModal } from './api-keys/CreateKeyModal';
import { APIKeyUsage } from './api-keys/APIKeyUsage';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
}

export function APIKeyManagement() {
  const [keys, setKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: '•••••••••••••••••',
      created: '2024-02-01',
      lastUsed: '2024-02-20',
      permissions: ['read', 'write']
    },
    {
      id: '2',
      name: 'Development API Key',
      key: '•••••••••••••••••',
      created: '2024-01-15',
      lastUsed: '2024-02-19',
      permissions: ['read']
    }
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateKey = (newKey: Omit<APIKey, 'id' | 'created' | 'lastUsed'>) => {
    const key: APIKey = {
      ...newKey,
      id: Date.now().toString(),
      created: new Date().toISOString().split('T')[0],
      lastUsed: '-'
    };
    setKeys([...keys, key]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // You would typically show a toast notification here
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Key className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">API Keys</h2>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create API Key
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Security Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Security Notice
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                Keep your API keys secure and never share them in public repositories
                or client-side code. Rotate keys regularly and limit their permissions
                to only what's necessary.
              </p>
            </div>
          </div>
        </div>

        {/* API Key List */}
        <APIKeyList
          keys={keys}
          onCopyKey={handleCopyKey}
          onDeleteKey={handleDeleteKey}
        />

        {/* API Key Usage */}
        <APIKeyUsage />

        {/* Create Key Modal */}
        <CreateKeyModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateKey}
        />
      </div>
    </div>
  );
}