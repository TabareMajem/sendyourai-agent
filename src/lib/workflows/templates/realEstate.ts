import { ZapierClient } from '../zapier/ZapierClient';

export async function setupPropertyListingWorkflow(
  zapier: ZapierClient,
  config: {
    mlsConfig: any;
    distributionChannels: string[];
    notificationPreferences: Record<string, any>;
  }
) {
  // Create webhooks for property listing workflow
  const mlsWebhook = await zapier.createWebhook('mls_listing_created');
  const distributionWebhook = await zapier.createWebhook('listing_distributed');
  const inquiryWebhook = await zapier.createWebhook('inquiry_received');

  return {
    triggers: [mlsWebhook],
    steps: [
      {
        id: 'fetch_mls_data',
        type: 'action',
        provider: 'mls',
        config: config.mlsConfig
      },
      {
        id: 'optimize_listing',
        type: 'action',
        provider: 'ai_service',
        config: {
          task: 'listing_optimization',
          parameters: {
            seoOptimization: true,
            imageEnhancement: true
          }
        }
      },
      {
        id: 'distribute_listing',
        type: 'action',
        provider: 'multi_channel',
        config: {
          channels: config.distributionChannels
        }
      },
      {
        id: 'setup_notifications',
        type: 'action',
        provider: 'notification_service',
        config: config.notificationPreferences
      }
    ],
    webhooks: {
      mls: mlsWebhook,
      distribution: distributionWebhook,
      inquiry: inquiryWebhook
    }
  };
}

export async function setupVirtualTourWorkflow(
  zapier: ZapierClient,
  config: {
    tourProvider: string;
    schedulingConfig: any;
    feedbackConfig: any;
  }
) {
  // Create webhooks for virtual tour workflow
  const tourRequestWebhook = await zapier.createWebhook('tour_requested');
  const tourCreatedWebhook = await zapier.createWebhook('tour_created');
  const feedbackWebhook = await zapier.createWebhook('feedback_received');

  return {
    triggers: [tourRequestWebhook],
    steps: [
      {
        id: 'generate_tour',
        type: 'action',
        provider: config.tourProvider,
        config: {
          quality: 'high',
          features: ['3d_walkthrough', 'measurements', 'hotspots']
        }
      },
      {
        id: 'schedule_tour',
        type: 'action',
        provider: 'scheduling',
        config: config.schedulingConfig
      },
      {
        id: 'collect_feedback',
        type: 'action',
        provider: 'survey',
        config: config.feedbackConfig
      }
    ],
    webhooks: {
      request: tourRequestWebhook,
      created: tourCreatedWebhook,
      feedback: feedbackWebhook
    }
  };
}