import { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { ZapierConfig } from '../../components/integrations/zapier/ZapierConfig';
import { ZapierWebhooks } from '../../components/integrations/zapier/ZapierWebhooks';

// Mock data


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


export function ZapierDashboard() {
  const [isConnected, setIsConnected] = useState(true);
  // const [triggers, setTriggers] = useState(mockTriggers);
  // const [actions, setActions] = useState(mockActions);
  const [webhooks, setWebhooks] = useState(mockWebhooks);
  // const [executions, setExecutions] = useState(mockExecutions);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  // const handleTriggerToggle = (triggerId: string) => {
  //   setTriggers(triggers.map(trigger => 
  //     trigger.id === triggerId
  //       ? { ...trigger, status: trigger.status === 'active' ? 'inactive' : 'active' as const }
  //       : trigger
  //   ));
  // };

  // const handleActionToggle = (actionId: string) => {
  //   setActions(actions.map(action =>
  //     action.id === actionId
  //       ? { ...action, status: action.status === 'active' ? 'inactive' : 'active' as const }
  //       : action
  //   ));
  // };

  const handleWebhookCreate = (webhook: any) => {
    setWebhooks([...webhooks, { ...webhook, id: Date.now().toString() }]);
  };

  const handleWebhookDelete = (webhookId: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== webhookId));
  };

  // const handleWebhookToggle = (webhookId: string) => {
  //   setWebhooks(webhooks.map(webhook =>
  //     webhook.id === webhookId
  //       ? { ...webhook, status: webhook.status === 'active' ? 'inactive' : 'active' as const }
  //       : webhook
  //   ));
  // };



  function handleWebhookToggle(_id: string): void {
    throw new Error('Function not implemented.');
  }

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
                {/* <ZapierTriggers
                  triggers={triggers}
                  // onTriggerToggle={handleTriggerToggle}
                  onTriggerEdit={(id) => console.log('Edit trigger:', id)} onTriggerToggle={function (triggerId: string): void {
                    throw new Error('Function not implemented.');
                  } }                /> */}
                {/* <ZapierActions
                  actions={actions}
                  // onActionToggle={handleActionToggle}
                  onActionEdit={(id) => console.log('Edit action:', id)} onActionToggle={function (actionId: string): void {
                    throw new Error('Function not implemented.');
                  } }                /> */}
              </div>

              {/* Webhooks */}
              <ZapierWebhooks
                webhooks={webhooks}
                onWebhookCreate={handleWebhookCreate}
                onWebhookDelete={handleWebhookDelete}
                onWebhookToggle={handleWebhookToggle}
              />

              {/* Recent Executions */}
              {/* <ZapierExecutions
                executions={executions}
                onRetry={handleRetry}
              /> */}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}