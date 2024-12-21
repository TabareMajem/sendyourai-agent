import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { WorkoutPlanWorkflow } from './WorkoutPlanWorkflow';
import { NutritionPlanWorkflow } from './NutritionPlanWorkflow';
import { FitbitClient } from '../../integrations/fitness/FitbitClient';
import { MyFitnessPalClient } from '../../integrations/fitness/MyFitnessPalClient';

export class FitnessWorkflowManager {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private workoutPlanWorkflow: WorkoutPlanWorkflow;
  private nutritionPlanWorkflow: NutritionPlanWorkflow;
  private fitbit: FitbitClient;
  private myFitnessPal: MyFitnessPalClient;

  constructor(config: {
    zapierAuth: { apiKey: string; accountId: string };
    fitbitApiKey: string;
    myFitnessPalApiKey: string;
  }) {
    this.zapier = new ZapierClient(config.zapierAuth);
    this.aiAgent = new AIAgent();
    this.fitbit = new FitbitClient({ apiKey: config.fitbitApiKey });
    this.myFitnessPal = new MyFitnessPalClient({ apiKey: config.myFitnessPalApiKey });

    this.workoutPlanWorkflow = new WorkoutPlanWorkflow(this.zapier, this.aiAgent);
    this.nutritionPlanWorkflow = new NutritionPlanWorkflow(this.zapier, this.aiAgent);
  }

  public async initialize() {
    const [workoutSetup, nutritionSetup] = await Promise.all([
      this.workoutPlanWorkflow.setup(),
      this.nutritionPlanWorkflow.setup()
    ]);

    return {
      workoutWorkflow: workoutSetup,
      nutritionWorkflow: nutritionSetup
    };
  }

  public async handleNewClient(clientData: any) {
    const [workoutPlan, nutritionPlan] = await Promise.all([
      this.workoutPlanWorkflow.generatePlan(clientData),
      this.nutritionPlanWorkflow.generatePlan(clientData)
    ]);

    return {
      workoutPlan,
      nutritionPlan
    };
  }

  public async trackWorkout(data: any) {
    await this.workoutPlanWorkflow.trackProgress(data);
  }

  public async trackMeal(data: any) {
    await this.nutritionPlanWorkflow.trackMeal(data);
  }

  public async getAnalytics(clientId: string) {
    // Implement analytics collection
    const analytics = {
      workouts: {
        completed: 0,
        progress: 0,
        consistency: 0
      },
      nutrition: {
        adherence: 0,
        mealLogging: 0,
        goalProgress: 0
      }
    };

    return analytics;
  }
}