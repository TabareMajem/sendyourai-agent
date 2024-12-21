import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ZapierConfig } from '../../components/integrations/zapier/ZapierConfig';
import { ZapierTriggers } from '../../components/integrations/zapier/ZapierTriggers';
import { ZapierActions } from '../../components/integrations/zapier/ZapierActions';
import { ZapierWebhooks } from '../../components/integrations/zapier/ZapierWebhooks';
import { ZapierExecutions } from '../../components/integrations/zapier/ZapierExecutions';

// Mock data
const mockTriggers = [
  {
    id: '1',
    name: 'New Workflow Created',
    description: 'Triggers when a new workflow is created',
    status: 'active' as const,
    lastTriggered: '2024-02-20 10:30 AM'
  },
  {
    id: '2',
    name: 'Workflow Completed',
    description: 'Triggers when a workflow finishes execution',
    status: 'active' as const,
    lastTriggered: '2024-02-20 09:15 AM'
  }
];

const mockActions = [
  {
    id: '1',
    name: 'Create Task',
    description: 'Creates a new task in the system',
    status: 'active' as const,
    successRate: 98,
    lastExecuted: '2024-02-20 10:45 AM'
  },
  {
    id: '2',
    name: 'Send Notification',
    description: 'Sends a notification to specified channels',
    status: 'active' as const,
    successRate: 95,
    lastExecuted: '2024-02-20 10:30 AM'
  }
];

const mockWebhooks = [
  {
    id: '1',
    name: 'Workflow Status Updates',
    url: 'https://hooks.zapier.com/123/456',
    status: 'active' as const,
    lastUsed: '2024-02-20 10:30 AM',
    events: ['workflow.created', 'workflow.completed']
  }
];

const mockExecutions = [
  {
    id: '1',
    zapName: 'Create Task on Workflow Completion',
    status: 'success' as const,
    startTime: '2024-02-20 10:30 AM',
    duration: '2s'
  },
  {
    id: '2',
    zapName: 'Send Notification on Error',
    status: 'failed' as const,
    startTime: '2024-02-20 10:15 AM',
    duration: '1s',
    error: 'Failed to connect to notification service'
  }
];

export function ZapierDashboard() {
  const [isConnected, setIsConnected] = useState(true);
  const [triggers, setTriggers] = useState(mockTriggers);
  const [actions, setActions] = useState(mockActions);
  const [webhooks, setWebhooks] = useState(mockWebhooks);
  const [executions, setExecutions] = useState(mockExecutions);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleTriggerToggle = (triggerId: string) => {
    setTriggers(triggers.map(trigger => 
      trigger.id === triggerId
        ? { ...trigger, status: trigger.status === 'active' ? 'inactive' : 'active' as const }
        : trigger
    ));
  };

  const handleActionToggle = (actionId: string) => {
    setActions(actions.map(action =>
      action.id === actionId
        ? { ...action, status: action.status === 'active' ? 'inactive' : 'active' as const }
        : action
    ));
  };

  const handleWebhookCreate = (webhook: any) => {
    setWebhooks([...webhooks, { ...webhook, id: Date.now().toString() }]);
  };

  const handleWebhookDelete = (webhookId: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== webhookId));
  };

  const handleWebhookToggle = (webhookId: string) => {
    setWebhooks(webhooks.map(webhook =>
      webhook.id === webhookId
        ? { ...webhook, status: webhook.status === 'active' ? 'inactive' : 'active' as const }
        : webhook
    ));
  };

  const handleRetry = (executionId: string) => {
    // Implement retry logic
    console.log('Retrying execution:', executionId);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Zapier Configuration */}
          <ZapierConfig
            isConnected={isConnected}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />

          {isConnected && (
            <>
              {/* Triggers and Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ZapierTriggers
                  triggers={triggers}
                  onTriggerToggle={handleTriggerToggle}
                  onTriggerEdit={(id) => console.log('Edit trigger:', id)}
                />
                <ZapierActions
                  actions={actions}
                  onActionToggle={handleActionToggle}
                  onActionEdit={(id) => console.log('Edit action:', id)}
                />
              </div>

              {/* Webhooks */}
              <ZapierWebhooks
                webhooks={webhooks}
                onWebhookCreate={handleWebhookCreate}
                onWebhookDelete={handleWebhookDelete}
                onWebhookToggle={handleWebhookToggle}
              />

              {/* Recent Executions */}
              <ZapierExecutions
                executions={executions}
                onRetry={handleRetry}
              />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}