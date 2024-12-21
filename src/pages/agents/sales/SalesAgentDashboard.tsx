import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { SalesAgentManager } from '../../../lib/agents/sales/SalesAgentManager';
import { Lead, Deal } from '../../../lib/agents/sales/types';
import { Plus, Filter, Search } from 'lucide-react';
import { LeadGenerationConfig } from './components/LeadGenerationConfig';
import { LeadList } from './components/LeadList';
import { ConversationPanel } from './components/ConversationPanel';
import { DealBoard } from './components/DealBoard';
import { PerformanceMetrics } from './components/PerformanceMetrics';

export function SalesAgentDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  const salesManager = new SalesAgentManager();

  const handleGenerateLeads = async (criteria: any) => {
    const newLeads = await salesManager.generateLeads(criteria);
    setLeads([...leads, ...newLeads]);
  };

  const handleQualifyLead = async (leadId: string) => {
    const qualifiedLeads = await salesManager.qualifyProspects([
      leads.find(l => l.id === leadId)
    ]);
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, ...qualifiedLeads[0] } : lead
    ));
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Sales Agent</h1>
            <p className="mt-1 text-sm text-gray-500">
              Automated lead generation and sales management
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowConfig(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Configure
            </button>
            <button
              onClick={() => {/* Handle new campaign */}}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Leads */}
          <div className="col-span-3">
            <LeadList
              leads={leads}
              selectedLeadId={selectedLead}
              onSelectLead={setSelectedLead}
              onQualifyLead={handleQualifyLead}
            />
          </div>

          {/* Middle Column - Conversation */}
          <div className="col-span-6">
            {selectedLead ? (
              <ConversationPanel
                leadId={selectedLead}
                onClose={() => setSelectedLead(null)}
              />
            ) : (
              <div className="bg-gray-50 rounded-lg h-full flex items-center justify-center">
                <p className="text-gray-500">Select a lead to start conversation</p>
              </div>
            )}
          </div>

          {/* Right Column - Deals */}
          <div className="col-span-3">
            <DealBoard deals={deals} />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8">
          <PerformanceMetrics />
        </div>

        {/* Configuration Modal */}
        {showConfig && (
          <LeadGenerationConfig
            onClose={() => setShowConfig(false)}
            onSubmit={handleGenerateLeads}
          />
        )}
      </div>
    </DashboardLayout>
  );
}