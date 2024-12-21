```typescript
import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class VirtualTourWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up tour request trigger
    const tourRequestTrigger = await this.triggerManager.setupEventTrigger('tour_request', [
      { field: 'type', operator: 'equals', value: 'virtual_tour' }
    ]);

    // Create Zapier webhooks
    const tourWebhook = await this.zapier.createWebhook('tour_created');
    const scheduleWebhook = await this.zapier.createWebhook('tour_scheduled');
    const feedbackWebhook = await this.zapier.createWebhook('feedback_received');

    return {
      triggers: {
        tourRequest: tourRequestTrigger
      },
      webhooks: {
        tour: tourWebhook,
        schedule: scheduleWebhook,
        feedback: feedbackWebhook
      }
    };
  }

  public async processTourRequest(request: {
    propertyId: string;
    userId: string;
    requestType: 'virtual' | 'in_person';
    preferredDates?: string[];
  }) {
    // Generate virtual tour if needed
    if (request.requestType === 'virtual') {
      await this.aiAgent.queueAction('task', {
        type: 'generate_virtual_tour',
        data: {
          propertyId: request.propertyId,
          quality: 'high',
          features: ['3d_walkthrough', 'measurements', 'highlights']
        }
      });
    }

    // Send personalized tour invitation
    const invitation = await this.aiAgent.queueAction('analysis', {
      type: 'generate_tour_invitation',
      data: {
        userId: request.userId,
        propertyId: request.propertyId,
        tourType: request.requestType
      }
    });

    // Send email with tour details
    await this.aiAgent.queueAction('email', {
      type: 'tour_invitation',
      data: {
        userId: request.userId,
        content: invitation,
        tourDetails: {
          propertyId: request.propertyId,
          type: request.requestType,
          dates: request.preferredDates
        }
      }
    });

    // Schedule follow-up
    await this.aiAgent.queueAction('task', {
      type: 'schedule_followup',
      data: {
        userId: request.userId,
        propertyId: request.propertyId,
        timing: '1_day_after_tour'
      }
    });
  }

  public async collectFeedback(tourId: string) {
    // Send feedback survey
    await this.aiAgent.queueAction('task', {
      type: 'send_feedback_survey',
      data: {
        tourId,
        template: 'property_tour_feedback',
        reminders: {
          enabled: true,
          schedule: '24h'
        }
      }
    });

    // Analyze feedback when received
    await this.aiAgent.queueAction('analysis', {
      type: 'analyze_tour_feedback',
      data: {
        tourId,
        metrics: ['satisfaction', 'property_match', 'agent_performance']
      }
    });
  }
}
```