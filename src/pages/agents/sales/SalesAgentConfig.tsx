import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { IntegrationSettings } from '../../../components/agents/sales/components/IntegrationSettings';
import { EmailTemplateManager } from '../../../components/agents/sales/components/EmailTemplateManager';
import { CallScriptGenerator } from '../../../components/agents/sales/components/CallScriptGenerator';
import { DocumentManager } from '../../../components/agents/sales/components/DocumentManager';
import { ContactSyncConfig } from '../../../components/agents/sales/components/ContactSyncConfig';
import { ComplianceChecks } from '../../../components/agents/sales/components/compliance/ComplianceChecks';
import { DataEnrichment } from '../../../components/agents/sales/components/DataEnrichment';
import { VoiceCallInterface } from '../../../components/agents/sales/components/VoiceCallInterface';
import { ActivityLog } from '../../../components/agents/sales/components/ActivityLog';
import { AdvancedSearch } from '../../../components/agents/sales/components/AdvancedSearch';

const mockIntegrations = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    type: 'crm',
    status: 'connected',
    lastSync: new Date(),
    config: {
      syncFrequency: 'hourly',
      dataDirection: 'bidirectional'
    }
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    type: 'crm',
    status: 'disconnected'
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    type: 'email',
    status: 'connected',
    lastSync: new Date(),
    config: {
      fromEmail: 'sales@company.com'
    }
  }
];

export function SalesAgentConfig() {
  const [activeTab, setActiveTab] = useState('integrations');

  const tabs = [
    { id: 'integrations', label: 'Integrations' },
    { id: 'templates', label: 'Email Templates' },
    { id: 'scripts', label: 'Call Scripts' },
    { id: 'documents', label: 'Documents' },
    { id: 'contacts', label: 'Contact Sync' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'enrichment', label: 'Data Enrichment' },
    { id: 'voice', label: 'Voice Calls' },
    { id: 'activity', label: 'Activity Log' },
    { id: 'search', label: 'Advanced Search' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'integrations':
        return (
          <IntegrationSettings
            integrations={mockIntegrations}
            onConnect={async () => {}}
            onDisconnect={async () => {}}
            onUpdateConfig={async () => {}}
          />
        );
      case 'templates':
        return (
          <EmailTemplateManager
            templates={[]}
            onCreateTemplate={() => {}}
            onEditTemplate={() => {}}
            onDeleteTemplate={() => {}}
            onDuplicateTemplate={() => {}}
          />
        );
      case 'scripts':
        return (
          <CallScriptGenerator
            onGenerate={async () => ({ id: '1', name: '', purpose: '', script: '', talkingPoints: [], objectionHandling: [] })}
            onSave={() => {}}
          />
        );
      case 'documents':
        return (
          <DocumentManager
            documents={[]}
            onUpload={async () => {}}
            onDownload={async () => {}}
            onDelete={async () => {}}
            onPreview={() => {}}
          />
        );
      case 'contacts':
        return (
          <ContactSyncConfig
            onSave={async () => {}}
          />
        );
      case 'compliance':
        return (
          <ComplianceChecks
            checks={[]}
            onRunCheck={async () => {}}
            onRunAllChecks={async () => {}}
          />
        );
      case 'enrichment':
        return (
          <DataEnrichment
            onEnrich={async () => ({})}
            onBulkEnrich={async () => []}
          />
        );
      case 'voice':
        return (
          <VoiceCallInterface
            onStartCall={async () => {}}
            onEndCall={async () => {}}
            onMuteToggle={() => {}}
            onVolumeChange={() => {}}
          />
        );
      case 'activity':
        return (
          <ActivityLog
            activities={[]}
            onFilter={() => {}}
            onExport={() => {}}
            onSearch={() => {}}
          />
        );
      case 'search':
        return (
          <AdvancedSearch
            onSearch={() => {}}
            availableFields={[
              'name',
              'email',
              'company',
              'title',
              'industry',
              'location'
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sales Agent Configuration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure your AI sales agent's behavior, integrations, and automation settings.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
}