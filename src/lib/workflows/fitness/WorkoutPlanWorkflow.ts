import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class WorkoutPlanWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up client onboarding trigger
    const onboardingTrigger = await this.triggerManager.setupEventTrigger('client_onboarding', [
      { field: 'type', operator: 'equals', value: 'new_client' }
    ]);

    // Set up progress check trigger
    const progressTrigger = await this.triggerManager.setupScheduleTrigger({
      frequency: 'weekly',
      time: '09:00',
      timezone: 'UTC'
    });

    // Create Zapier webhooks
    const planWebhook = await this.zapier.createWebhook('plan_generated');
    const updateWebhook = await this.zapier.createWebhook('plan_updated');
    const progressWebhook = await this.zapier.createWebhook('progress_tracked');

    return {
      triggers: {
        onboarding: onboardingTrigger,
        progress: progressTrigger
      },
      webhooks: {
        plan: planWebhook,
        update: updateWebhook,
        progress: progressWebhook
      }
    };
  }

  public async generatePlan(clientData: {
    id: string;
    profile: {
      age: number;
      gender: string;
      height: number;
      weight: number;
      fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
    };
    goals: string[];
    preferences: {
      workoutTypes: string[];
      equipment: string[];
      timeAvailable: number;
      daysPerWeek: number;
    };
    medicalHistory?: string[];
    restrictions?: string[];
  }) {
    // Analyze client data and generate personalized plan
    const analysis = await this.aiAgent.queueAction('analysis', {
      type: 'fitness_assessment',
      data: {
        clientProfile: clientData.profile,
        goals: clientData.goals,
        constraints: {
          medical: clientData.medicalHistory,
          restrictions: clientData.restrictions
        }
      }
    });

    // Generate workout plan
    const workoutPlan = await this.aiAgent.queueAction('analysis', {
      type: 'generate_workout_plan',
      data: {
        assessment: analysis,
        preferences: clientData.preferences,
        periodization: 'progressive',
        includeAlternatives: true
      }
    });

    // Create progress tracking metrics
    const metrics = await this.aiAgent.queueAction('analysis', {
      type: 'define_metrics',
      data: {
        goals: clientData.goals,
        workoutPlan,
        trackingFrequency: 'weekly'
      }
    });

    // Send plan to client
    await this.aiAgent.queueAction('email', {
      type: 'workout_plan',
      data: {
        clientId: clientData.id,
        plan: workoutPlan,
        metrics,
        format: 'mobile_friendly'
      }
    });

    // Schedule follow-ups
    await this.aiAgent.queueAction('task', {
      type: 'schedule_checkins',
      data: {
        clientId: clientData.id,
        frequency: 'weekly',
        type: 'progress_review'
      }
    });

    return {
      plan: workoutPlan,
      metrics,
      nextCheckIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
  }

  public async trackProgress(data: {
    clientId: string;
    metrics: Record<string, number>;
    date: Date;
  }) {
    // Analyze progress
    const analysis = await this.aiAgent.queueAction('analysis', {
      type: 'analyze_progress',
      data: {
        clientId: data.clientId,
        metrics: data.metrics,
        compareWithBaseline: true
      }
    });

    // Generate progress report
    const report = await this.aiAgent.queueAction('analysis', {
      type: 'generate_progress_report',
      data: {
        analysis,
        includeRecommendations: true
      }
    });

    // Send report to client
    await this.aiAgent.queueAction('email', {
      type: 'progress_report',
      data: {
        clientId: data.clientId,
        report,
        includeMotivationalContent: true
      }
    });

    // Update plan if needed
    if (analysis.requiresPlanAdjustment) {
      await this.adjustPlan(data.clientId, analysis);
    }

    return {
      analysis,
      report,
      planAdjusted: analysis.requiresPlanAdjustment
    };
  }

  private async adjustPlan(clientId: string, analysis: any) {
    const adjustments = await this.aiAgent.queueAction('analysis', {
      type: 'plan_adjustment',
      data: {
        clientId,
        analysis,
        adjustmentType: analysis.suggestedAdjustments
      }
    });

    await this.aiAgent.queueAction('notification', {
      type: 'plan_update',
      data: {
        clientId,
        adjustments,
        channels: ['email', 'app']
      }
    });

    return adjustments;
  }
}