```typescript
import { AppError, ErrorCodes } from '../../../utils/errors';

export class MatterportService {
  private apiKey: string;
  private baseUrl = 'https://api.matterport.com/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
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
        'Matterport API request failed',
        ErrorCodes.EXTERNAL_SERVICE_ERROR,
        response.status
      );
    }

    return response.json();
  }

  public async createVirtualTour(data: {
    propertyId: string;
    images: string[];
    floorPlan?: string;
    options?: {
      quality: 'standard' | 'high';
      features: string[];
    };
  }): Promise<{
    tourId: string;
    embedUrl: string;
    shareUrl: string;
  }> {
    return this.request('/tours', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async getTourAnalytics(tourId: string): Promise<{
    views: number;
    averageViewTime: number;
    hotspots: Array<{
      position: { x: number; y: number; z: number };
      views: number;
    }>;
  }> {
    return this.request(`/tours/${tourId}/analytics`);
  }

  public async updateTour(tourId: string, updates: {
    title?: string;
    description?: string;
    settings?: Record<string, any>;
  }): Promise<void> {
    await this.request(`/tours/${tourId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }
}
```