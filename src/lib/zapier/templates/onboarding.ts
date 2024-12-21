import { ZapierClient } from '../ZapierClient';

export async function setupOnboardingWorkflow(
  zapier: ZapierClient,
  config: {
    emailTemplate: string;
    welcomeMessage: string;
    taskList: string[];
  }
) {
  // Create webhooks for each step of the onboarding process
  const newUserWebhook = await zapier.createWebhook('new_user_created');
  const documentationWebhook = await zapier.createWebhook('documentation_sent');
  const taskCompletionWebhook = await zapier.createWebhook('task_completed');

  // Return the workflow configuration
  return {
    triggers: [newUserWebhook],
    steps: [
      {
        id: 'send_welcome_email',
        type: 'action',
        provider: 'email',
        config: {
          template: config.emailTemplate,
          message: config.welcomeMessage
        }
      },
      {
        id: 'create_onboarding_tasks',
        type: 'action',
        provider: 'task_manager',
        config: {
          tasks: config.taskList
        }
      },
      {
        id: 'schedule_followup',
        type: 'action',
        provider: 'calendar',
        config: {
          delay: '3d',
          action: 'schedule_check_in'
        }
      }
    ],
    webhooks: {
      newUser: newUserWebhook,
      documentation: documentationWebhook,
      taskCompletion: taskCompletionWebhook
    }
  };
}