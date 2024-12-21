import { FitnessProvider } from '../types';
import { AppError, ErrorCodes } from '../../utils/errors';

export class FitbitClient implements FitnessProvider {
  private apiKey: string;
  private baseUrl = 'https://api.fitbit.com/1';

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
        'Fitbit API request failed',
        ErrorCodes.EXTERNAL_SERVICE_ERROR,
        response.status
      );
    }

    return response.json();
  }

  async getUserProfile(userId: string): Promise<any> {
    return this.request(`/user/${userId}/profile`);
  }

  async trackWorkout(userId: string, workoutData: any): Promise<void> {
    await this.request(`/user/${userId}/activities`, {
      method: 'POST',
      body: JSON.stringify(workoutData)
    });
  }

  async trackNutrition(userId: string, nutritionData: any): Promise<void> {
    await this.request(`/user/${userId}/foods/log`, {
      method: 'POST',
      body: JSON.stringify(nutritionData)
    });
  }

  async getProgress(userId: string, timeRange: { start: Date; end: Date }): Promise<any> {
    const params = new URLSearchParams({
      startDate: timeRange.start.toISOString().split('T')[0],
      endDate: timeRange.end.toISOString().split('T')[0]
    });

    return this.request(`/user/${userId}/activities/stats?${params}`);
  }
}