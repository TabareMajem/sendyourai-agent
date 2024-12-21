import { ZapierClient } from '../ZapierClient';

export async function setupNotificationWorkflow(
  zapier: ZapierClient,
  config: {
    channels: string[];
    templates: Record<string, string>;
    conditions: Record<string, any>;
  }
) {
  // Create webhooks for notification triggers
  const eventWebhook = await zapier.createWebhook('event_triggered');
  const alertWebhook = await zapier.createWebhook('alert_triggered');

  // Return the workflow configuration
  return {
    triggers: [eventWebhook, alertWebhook],
    steps: [
      {
        id: 'process_notification',
        type: 'action',
        provider: 'notification_service',
        config: {
          channels: config.channels,
          templates: config.templates
        }
      },
      {
        id: 'conditional_routing',
        type: 'condition',
        config: config.conditions
      },
      {
        id: 'send_notifications',
        type: 'action',
        provider: 'multi_channel',
        config: {
          email: config.channels.includes('email'),
          slack: config.channels.includes('slack'),
          sms: config.channels.includes('sms')
        }
      }
    ],
    webhooks: {
      event: eventWebhook,
      alert: alertWebhook
    }
  };
}