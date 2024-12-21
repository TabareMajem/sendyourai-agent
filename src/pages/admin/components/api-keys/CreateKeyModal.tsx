import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (key: {
    name: string;
    key: string;
    permissions: string[];
  }) => void;
}

export function CreateKeyModal({ isOpen, onClose, onCreate }: CreateKeyModalProps) {
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      name,
      key: generateApiKey(),
      permissions
    });
    setName('');
    setPermissions([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Create API Key</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Key Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Production API Key"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Permissions
            </label>
            <div className="mt-2 space-y-2">
              {['read', 'write', 'admin'].map((perm) => (
                <label key={perm} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPermissions([...permissions, perm]);
                      } else {
                        setPermissions(permissions.filter(p => p !== perm));
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {perm}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Create API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function generateApiKey(): string {
  return 'sk_' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}