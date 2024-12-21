```typescript
import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class SalesFollowUpWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up new lead trigger
    const leadTrigger = await this.triggerManager.setupEventTrigger('new_lead', [
      { field: 'type', operator: 'equals', value: 'lead' }
    ]);

    // Create Zapier webhooks
    const emailWebhook = await this.zapier.createWebhook('email_sent');
    const taskWebhook = await this.zapier.createWebhook('task_created');

    return {
      triggers: {
        lead: leadTrigger
      },
      webhooks: {
        email: emailWebhook,
        task: taskWebhook
      }
    };
  }

  public async processNewLead(lead: {
    id: string;
    name: string;
    email: string;
    company: string;
    source: string;
    interests: string[];
  }) {
    // Generate personalized follow-up email
    const emailContent = await this.aiAgent.queueAction('analysis', {
      type: 'generate_email',
      data: {
        leadInfo: lead,
        emailType: 'sales_follow_up'
      }
    });

    // Send email via Mailchimp
    await this.aiAgent.queueAction('email', {
      type: 'mailchimp_campaign',
      data: {
        to: lead.email,
        subject: emailContent.subject,
        content: emailContent.body,
        templateId: 'sales-follow-up'
      }
    });

    // Create follow-up task in Asana
    await this.aiAgent.queueAction('task', {
      type: 'create_task',
      data: {
        title: `Follow up with ${lead.name} from ${lead.company}`,
        description: `Lead Source: ${lead.source}\nInterests: ${lead.interests.join(', ')}\nEmail sent: ${emailContent.subject}`,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        assignee: 'sales-team',
        project: 'sales-follow-ups'
      }
    });

    // Log lead interaction
    await this.aiAgent.queueAction('task', {
      type: 'log_interaction',
      data: {
        leadId: lead.id,
        type: 'initial_contact',
        channel: 'email',
        content: emailContent,
        timestamp: new Date()
      }
    });
  }
}
```