import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class OnboardingWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up new employee trigger
    const newEmployeeTrigger = await this.triggerManager.setupEventTrigger('new_employee', [
      { field: 'status', operator: 'equals', value: 'new' }
    ]);

    // Create AI-generated onboarding materials
    await this.aiAgent.queueAction('task', {
      type: 'generate_materials',
      context: {
        type: 'onboarding',
        format: 'document'
      }
    });

    // Set up Zapier webhooks
    const onboardingWebhook = await this.zapier.createWebhook('onboarding_started');
    const documentWebhook = await this.zapier.createWebhook('documents_created');
    const taskWebhook = await this.zapier.createWebhook('tasks_assigned');

    return {
      triggers: {
        newEmployee: newEmployeeTrigger
      },
      webhooks: {
        onboarding: onboardingWebhook,
        documents: documentWebhook,
        tasks: taskWebhook
      }
    };
  }

  public async processNewEmployee(employeeData: any) {
    // Generate personalized onboarding materials
    await this.aiAgent.queueAction('task', {
      type: 'personalize_materials',
      data: employeeData
    });

    // Create onboarding tasks
    await this.aiAgent.queueAction('task', {
      type: 'create_tasks',
      data: {
        assignee: employeeData.id,
        tasks: [
          'Complete paperwork',
          'Set up workstation',
          'Schedule team introductions'
        ]
      }
    });

    // Send welcome email
    await this.aiAgent.queueAction('email', {
      type: 'welcome_email',
      recipient: employeeData.email,
      data: {
        name: employeeData.name,
        role: employeeData.role,
        startDate: employeeData.startDate
      }
    });
  }
}