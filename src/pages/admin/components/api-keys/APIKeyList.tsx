import React from 'react';
import { Copy, Trash2 } from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
}

interface APIKeyListProps {
  keys: APIKey[];
  onCopyKey: (key: string) => void;
  onDeleteKey: (id: string) => void;
}

export function APIKeyList({ keys, onCopyKey, onDeleteKey }: APIKeyListProps) {
  return (
    <div className="space-y-4">
      {keys.map((key) => (
        <div
          key={key.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h3 className="text-sm font-medium text-gray-900">{key.name}</h3>
            <p className="text-sm text-gray-500">
              Created: {key.created} • Last used: {key.lastUsed}
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {key.permissions.map((permission) => (
                <span
                  key={permission}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onCopyKey(key.key)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteKey(key.id)}
              className="p-2 text-red-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}