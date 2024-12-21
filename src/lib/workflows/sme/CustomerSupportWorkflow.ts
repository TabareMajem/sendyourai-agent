```typescript
import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class CustomerSupportWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up new query trigger
    const queryTrigger = await this.triggerManager.setupEventTrigger('new_query', [
      { field: 'type', operator: 'equals', value: 'customer_query' }
    ]);

    // Create Zapier webhooks
    const responseWebhook = await this.zapier.createWebhook('response_generated');
    const emailWebhook = await this.zapier.createWebhook('email_sent');
    const slackWebhook = await this.zapier.createWebhook('slack_notification');

    return {
      triggers: {
        query: queryTrigger
      },
      webhooks: {
        response: responseWebhook,
        email: emailWebhook,
        slack: slackWebhook
      }
    };
  }

  public async processQuery(query: {
    id: string;
    customer: {
      email: string;
      name: string;
      history?: any[];
    };
    subject: string;
    content: string;
    priority: string;
  }) {
    // Analyze query and generate response
    const analysis = await this.aiAgent.queueAction('analysis', {
      type: 'query_analysis',
      data: {
        content: query.content,
        subject: query.subject,
        customerHistory: query.customer.history
      }
    });

    // Check AI confidence level
    if (analysis.confidence >= 0.8) {
      // Generate and send response
      await this.aiAgent.queueAction('email', {
        type: 'customer_response',
        data: {
          to: query.customer.email,
          subject: `Re: ${query.subject}`,
          content: analysis.response,
          queryId: query.id
        }
      });
    } else {
      // Notify support team via Slack
      await this.aiAgent.queueAction('notification', {
        type: 'slack_alert',
        data: {
          channel: 'support-team',
          content: `New query requires attention:\nFrom: ${query.customer.name}\nSubject: ${query.subject}\nPriority: ${query.priority}\nConfidence: ${analysis.confidence}`,
          queryId: query.id
        }
      });
    }

    // Log interaction
    await this.aiAgent.queueAction('task', {
      type: 'log_interaction',
      data: {
        queryId: query.id,
        customerId: query.customer.email,
        type: analysis.confidence >= 0.8 ? 'automated' : 'manual',
        timestamp: new Date()
      }
    });
  }
}
```