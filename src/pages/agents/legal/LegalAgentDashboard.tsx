import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { ClientList } from './components/ClientList';
import { DocumentManager } from './components/DocumentManager';
import { ActivityAnalytics } from './components/ActivityAnalytics';
import { ClientCreationModal } from './components/ClientCreationModal';
import { LegalWorkflowManager } from '../../../lib/workflows/legal/LegalWorkflowManager';
import { Plus, Filter, Search } from 'lucide-react';

export function LegalAgentDashboard() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showNewClient, setShowNewClient] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  const legalManager = new LegalWorkflowManager({
    zapierAuth: {
      apiKey: import.meta.env.VITE_ZAPIER_API_KEY || '',
      accountId: import.meta.env.VITE_ZAPIER_ACCOUNT_ID || ''
    }
  });

  const handleNewClient = async (clientData: any) => {
    try {
      await legalManager.handleNewClient(clientData);
      setShowNewClient(false);
      // Refresh client list
    } catch (error) {
      console.error('Failed to create client:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Legal AI Agent</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage legal documents and client services
            </p>
          </div>
          <button
            onClick={() => setShowNewClient(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Client
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Client List */}
          <div className="col-span-3">
            <ClientList
              clients={clients}
              selectedClientId={selectedClient}
              onSelectClient={setSelectedClient}
            />
          </div>

          {/* Middle Column - Document Management */}
          <div className="col-span-6">
            <DocumentManager
              documents={[]}
              onViewDocument={(id) => console.log('View document:', id)}
              onDownloadDocument={(id) => console.log('Download document:', id)}
            />
          </div>

          {/* Right Column - Activity & Analytics */}
          <div className="col-span-3">
            <ActivityAnalytics
              data={{
                documentStats: {
                  total: 45,
                  drafts: 12,
                  inReview: 8,
                  completed: 25
                },
                recentActivity: [
                  {
                    id: '1',
                    type: 'document_created',
                    description: 'New contract draft created',
                    timestamp: '2 hours ago'
                  },
                  {
                    id: '2',
                    type: 'document_reviewed',
                    description: 'NDA template approved',
                    timestamp: '4 hours ago'
                  }
                ],
                timeline: [
                  { date: '2024-02-14', documents: 5, reviews: 3 },
                  { date: '2024-02-15', documents: 7, reviews: 4 },
                  { date: '2024-02-16', documents: 3, reviews: 2 },
                  { date: '2024-02-17', documents: 6, reviews: 5 }
                ]
              }}
            />
          </div>
        </div>

        {/* Client Creation Modal */}
        {showNewClient && (
          <ClientCreationModal
            onClose={() => setShowNewClient(false)}
            onSubmit={handleNewClient}
          />
        )}
      </div>
    </DashboardLayout>
  );
}