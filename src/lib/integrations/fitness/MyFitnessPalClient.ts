import { FitnessProvider } from '../types';
import { AppError, ErrorCodes } from '../../utils/errors';

export class MyFitnessPalClient implements FitnessProvider {
  private apiKey: string;
  private baseUrl = 'https://api.myfitnesspal.com/v2';

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new AppError(
        'MyFitnessPal API request failed',
        ErrorCodes.EXTERNAL_SERVICE_ERROR,
        response.status
      );
    }

    return response.json();
  }

  async getUserProfile(userId: string): Promise<any> {
    return this.request(`/users/${userId}`);
  }

  async trackWorkout(userId: string, workoutData: any): Promise<void> {
    await this.request(`/users/${userId}/exercises`, {
      method: 'POST',
      body: JSON.stringify(workoutData)
    });
  }

  async trackNutrition(userId: string, nutritionData: any): Promise<void> {
    await this.request(`/users/${userId}/diary`, {
      method: 'POST',
      body: JSON.stringify(nutritionData)
    });
  }

  async getProgress(userId: string, timeRange: { start: Date; end: Date }): Promise<any> {
    const params = new URLSearchParams({
      from: timeRange.start.toISOString(),
      to: timeRange.end.toISOString()
    });

    return this.request(`/users/${userId}/progress?${params}`);
  }
}