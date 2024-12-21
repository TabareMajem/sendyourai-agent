import React from 'react';
import { User, Clock, FileText, ArrowRight } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  caseType: string;
  status: 'active' | 'pending' | 'completed';
  lastActivity: string;
  documentsCount: number;
}

interface ClientListProps {
  clients: Client[];
  selectedClientId: string | null;
  onSelectClient: (id: string) => void;
}

export function ClientList({ clients, selectedClientId, onSelectClient }: ClientListProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Clients</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {clients.map((client) => (
          <div
            key={client.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              selectedClientId === client.id ? 'bg-indigo-50' : ''
            }`}
            onClick={() => onSelectClient(client.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.email}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                client.status === 'active' ? 'bg-green-100 text-green-800' :
                client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {client.status}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="w-4 h-4 mr-1" />
                {client.caseType}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                Last activity: {client.lastActivity}
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {client.documentsCount} documents
              </span>
              <button className="text-indigo-600 hover:text-indigo-900">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}