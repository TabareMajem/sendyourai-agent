import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class PerformanceReviewWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up review schedule trigger
    const reviewTrigger = await this.triggerManager.setupScheduleTrigger({
      frequency: 'weekly',
      time: '09:00',
      timezone: 'UTC'
    });

    // Create Zapier webhooks
    const reminderWebhook = await this.zapier.createWebhook('review_reminder_sent');
    const scheduledWebhook = await this.zapier.createWebhook('review_scheduled');

    return {
      triggers: {
        review: reviewTrigger
      },
      webhooks: {
        reminder: reminderWebhook,
        scheduled: scheduledWebhook
      }
    };
  }

  public async processReviewCycle(employees: any[]) {
    for (const employee of employees) {
      // Generate performance summary
      await this.aiAgent.queueAction('analysis', {
        type: 'performance_summary',
        data: {
          employeeId: employee.id,
          period: 'last_quarter'
        }
      });

      // Schedule review meeting
      await this.aiAgent.queueAction('task', {
        type: 'schedule_meeting',
        data: {
          type: 'performance_review',
          attendees: [employee.id, employee.managerId],
          duration: '60m'
        }
      });

      // Send reminder emails
      await this.aiAgent.queueAction('email', {
        type: 'review_reminder',
        recipients: [employee.email, employee.managerEmail],
        data: {
          reviewDate: 'two_weeks_from_now',
          employeeName: employee.name,
          managerName: employee.managerName
        }
      });
    }
  }

  public async generateReviewMaterials(employeeId: string) {
    // Generate AI-powered performance insights
    await this.aiAgent.queueAction('analysis', {
      type: 'performance_insights',
      data: {
        employeeId,
        metrics: ['productivity', 'quality', 'collaboration']
      }
    });

    // Create review documentation
    await this.aiAgent.queueAction('task', {
      type: 'generate_document',
      data: {
        type: 'performance_review',
        employeeId,
        template: 'review_form'
      }
    });
  }
}