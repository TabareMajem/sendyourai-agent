import { ZapierClient } from '../zapier/ZapierClient';

export async function setupWorkoutPlanWorkflow(
  zapier: ZapierClient,
  config: {
    fitnessTrackers: string[];
    planGenerationConfig: any;
    notificationConfig: any;
  }
) {
  // Create webhooks for workout plan workflow
  const clientOnboardingWebhook = await zapier.createWebhook('client_onboarded');
  const progressUpdateWebhook = await zapier.createWebhook('progress_updated');
  const planAdjustmentWebhook = await zapier.createWebhook('plan_adjusted');

  return {
    triggers: [clientOnboardingWebhook],
    steps: [
      {
        id: 'assess_fitness',
        type: 'action',
        provider: 'ai_service',
        config: {
          task: 'fitness_assessment',
          parameters: {
            comprehensive: true,
            includeMetrics: true
          }
        }
      },
      {
        id: 'generate_plan',
        type: 'action',
        provider: 'workout_planner',
        config: config.planGenerationConfig
      },
      {
        id: 'setup_tracking',
        type: 'action',
        provider: 'multi_tracker',
        config: {
          trackers: config.fitnessTrackers
        }
      },
      {
        id: 'configure_notifications',
        type: 'action',
        provider: 'notification_service',
        config: config.notificationConfig
      }
    ],
    webhooks: {
      onboarding: clientOnboardingWebhook,
      progress: progressUpdateWebhook,
      adjustment: planAdjustmentWebhook
    }
  };
}

export async function setupNutritionPlanWorkflow(
  zapier: ZapierClient,
  config: {
    nutritionTrackers: string[];
    mealPlanConfig: any;
    shoppingListConfig: any;
  }
) {
  // Create webhooks for nutrition plan workflow
  const nutritionAssessmentWebhook = await zapier.createWebhook('nutrition_assessed');
  const mealLoggedWebhook = await zapier.createWebhook('meal_logged');
  const planUpdateWebhook = await zapier.createWebhook('plan_updated');

  return {
    triggers: [nutritionAssessmentWebhook],
    steps: [
      {
        id: 'analyze_needs',
        type: 'action',
        provider: 'ai_service',
        config: {
          task: 'nutrition_analysis',
          parameters: {
            includeMacros: true,
            considerDietary: true
          }
        }
      },
      {
        id: 'create_meal_plan',
        type: 'action',
        provider: 'meal_planner',
        config: config.mealPlanConfig
      },
      {
        id: 'generate_shopping_list',
        type: 'action',
        provider: 'shopping_list',
        config: config.shoppingListConfig
      },
      {
        id: 'setup_tracking',
        type: 'action',
        provider: 'nutrition_tracker',
        config: {
          trackers: config.nutritionTrackers
        }
      }
    ],
    webhooks: {
      assessment: nutritionAssessmentWebhook,
      mealLog: mealLoggedWebhook,
      update: planUpdateWebhook
    }
  };
}