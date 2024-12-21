import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class PropertyListingWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up MLS trigger
    const mlsTrigger = await this.triggerManager.setupEventTrigger('new_property', [
      { field: 'type', operator: 'equals', value: 'mls_listing' }
    ]);

    // Create Zapier webhooks
    const listingWebhook = await this.zapier.createWebhook('listing_created');
    const distributionWebhook = await this.zapier.createWebhook('listing_distributed');
    const notificationWebhook = await this.zapier.createWebhook('notification_sent');

    return {
      triggers: {
        mls: mlsTrigger
      },
      webhooks: {
        listing: listingWebhook,
        distribution: distributionWebhook,
        notification: notificationWebhook
      }
    };
  }

  public async processNewListing(propertyData: {
    id: string;
    address: string;
    price: number;
    features: string[];
    images: string[];
    agent: {
      id: string;
      name: string;
      email: string;
    };
  }) {
    // Generate AI-optimized listing content
    const listingContent = await this.aiAgent.queueAction('analysis', {
      type: 'generate_listing',
      data: {
        property: propertyData,
        optimizeFor: ['seo', 'engagement', 'conversion']
      }
    });

    // Distribute listing to platforms
    await this.aiAgent.queueAction('task', {
      type: 'distribute_listing',
      data: {
        platforms: ['zillow', 'realtor', 'social_media'],
        content: listingContent,
        propertyId: propertyData.id
      }
    });

    // Notify potential buyers
    await this.aiAgent.queueAction('notification', {
      type: 'new_listing_alert',
      data: {
        propertyDetails: propertyData,
        targetCriteria: {
          priceRange: [propertyData.price * 0.9, propertyData.price * 1.1],
          features: propertyData.features
        }
      }
    });

    // Create follow-up tasks
    await this.aiAgent.queueAction('task', {
      type: 'create_followup_tasks',
      data: {
        agentId: propertyData.agent.id,
        propertyId: propertyData.id,
        tasks: [
          'Schedule open house',
          'Review listing performance',
          'Contact interested buyers'
        ]
      }
    });
  }
}