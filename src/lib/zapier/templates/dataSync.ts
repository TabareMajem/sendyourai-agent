import { ZapierClient } from '../ZapierClient';

export async function setupDataSyncWorkflow(
  zapier: ZapierClient,
  config: {
    sources: string[];
    destination: string;
    schedule: string;
    transformations: Record<string, any>;
  }
) {
  // Create webhooks for data sync events
  const syncWebhook = await zapier.createWebhook('sync_triggered');
  const errorWebhook = await zapier.createWebhook('sync_error');

  // Return the workflow configuration
  return {
    triggers: [syncWebhook],
    steps: [
      {
        id: 'extract_data',
        type: 'action',
        provider: 'data_source',
        config: {
          sources: config.sources
        }
      },
      {
        id: 'transform_data',
        type: 'action',
        provider: 'transformer',
        config: config.transformations
      },
      {
        id: 'load_data',
        type: 'action',
        provider: 'data_destination',
        config: {
          destination: config.destination
        }
      }
    ],
    schedule: config.schedule,
    webhooks: {
      sync: syncWebhook,
      error: errorWebhook
    }
  };
}