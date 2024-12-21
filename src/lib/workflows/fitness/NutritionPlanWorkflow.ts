import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class NutritionPlanWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up nutrition tracking trigger
    const trackingTrigger = await this.triggerManager.setupEventTrigger('nutrition_log', [
      { field: 'type', operator: 'equals', value: 'meal_logged' }
    ]);

    // Create Zapier webhooks
    const planWebhook = await this.zapier.createWebhook('nutrition_plan_created');
    const updateWebhook = await this.zapier.createWebhook('nutrition_plan_updated');
    const logWebhook = await this.zapier.createWebhook('meal_logged');

    return {
      triggers: {
        tracking: trackingTrigger
      },
      webhooks: {
        plan: planWebhook,
        update: updateWebhook,
        log: logWebhook
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
      activityLevel: string;
    };
    goals: string[];
    preferences: {
      dietaryRestrictions: string[];
      allergies: string[];
      dislikedFoods: string[];
      mealPreferences: {
        mealsPerDay: number;
        snacks: boolean;
        prepTime: number;
      };
    };
    medicalConditions?: string[];
  }) {
    // Calculate nutritional needs
    const nutritionNeeds = await this.aiAgent.queueAction('analysis', {
      type: 'calculate_nutrition',
      data: {
        profile: clientData.profile,
        goals: clientData.goals,
        activityLevel: clientData.profile.activityLevel
      }
    });

    // Generate meal plan
    const mealPlan = await this.aiAgent.queueAction('analysis', {
      type: 'generate_meal_plan',
      data: {
        nutritionNeeds,
        preferences: clientData.preferences,
        restrictions: {
          dietary: clientData.preferences.dietaryRestrictions,
          allergies: clientData.preferences.allergies,
          medical: clientData.medicalConditions
        }
      }
    });

    // Generate shopping list
    const shoppingList = await this.aiAgent.queueAction('analysis', {
      type: 'generate_shopping_list',
      data: {
        mealPlan,
        groupByCategory: true,
        includeAlternatives: true
      }
    });

    // Send plan to client
    await this.aiAgent.queueAction('email', {
      type: 'nutrition_plan',
      data: {
        clientId: clientData.id,
        plan: mealPlan,
        shoppingList,
        format: 'mobile_friendly'
      }
    });

    return {
      nutritionNeeds,
      mealPlan,
      shoppingList
    };
  }

  public async trackMeal(data: {
    clientId: string;
    meal: {
      foods: Array<{
        name: string;
        portion: string;
        nutrients?: Record<string, number>;
      }>;
      time: Date;
      type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    };
  }) {
    // Analyze meal composition
    const analysis = await this.aiAgent.queueAction('analysis', {
      type: 'analyze_meal',
      data: {
        meal: data.meal,
        compareWithPlan: true
      }
    });

    // Generate feedback
    const feedback = await this.aiAgent.queueAction('analysis', {
      type: 'generate_meal_feedback',
      data: {
        analysis,
        includeRecommendations: true
      }
    });

    // Send feedback to client
    await this.aiAgent.queueAction('notification', {
      type: 'meal_feedback',
      data: {
        clientId: data.clientId,
        feedback,
        channels: ['app']
      }
    });

    // Update progress tracking
    await this.aiAgent.queueAction('task', {
      type: 'update_nutrition_tracking',
      data: {
        clientId: data.clientId,
        meal: data.meal,
        analysis
      }
    });

    return {
      analysis,
      feedback
    };
  }
}