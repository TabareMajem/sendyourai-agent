import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class AssignmentReminderWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up calendar event trigger
    const dueDateTrigger = await this.triggerManager.setupScheduleTrigger({
      frequency: 'daily',
      time: '09:00',
      timezone: 'UTC'
    });

    // Create Zapier webhooks
    const reminderWebhook = await this.zapier.createWebhook('reminder_sent');
    const studyTipsWebhook = await this.zapier.createWebhook('study_tips_generated');

    return {
      triggers: {
        dueDate: dueDateTrigger
      },
      webhooks: {
        reminder: reminderWebhook,
        studyTips: studyTipsWebhook
      }
    };
  }

  public async processUpcomingAssignment(assignment: {
    id: string;
    title: string;
    dueDate: Date;
    subject: string;
    students: string[];
  }) {
    // Generate personalized study tips for each student
    for (const studentId of assignment.students) {
      // Analyze student's performance in the subject
      const performance = await this.aiAgent.queueAction('analysis', {
        type: 'student_performance',
        data: {
          studentId,
          subject: assignment.subject
        }
      });

      // Generate personalized study tips
      const studyTips = await this.aiAgent.queueAction('analysis', {
        type: 'generate_study_tips',
        data: {
          studentId,
          subject: assignment.subject,
          performance,
          assignmentType: assignment.title
        }
      });

      // Send reminder email with personalized tips
      await this.aiAgent.queueAction('email', {
        type: 'assignment_reminder',
        data: {
          studentId,
          assignment: {
            title: assignment.title,
            dueDate: assignment.dueDate,
            subject: assignment.subject
          },
          studyTips
        }
      });
    }
  }

  public async generateStudyPlan(studentId: string, assignmentId: string) {
    return this.aiAgent.queueAction('task', {
      type: 'generate_study_plan',
      data: {
        studentId,
        assignmentId,
        includeMilestones: true,
        includeResources: true,
        adaptToLearningStyle: true
      }
    });
  }
}