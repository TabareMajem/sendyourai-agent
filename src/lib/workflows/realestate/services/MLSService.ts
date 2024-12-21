  typescript
import { Property } from '../utils/propertyUtils';
import { AppError, ErrorCodes } from '../../../utils/errors';

export class MLSService {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: { apiKey: string; baseUrl: string }) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
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
        'MLS API request failed',
        ErrorCodes.EXTERNAL_SERVICE_ERROR,
        response.status
      );
    }

    return response.json();
  }

  public async getProperty(propertyId: string): Promise<Property> {
    return this.request(`/properties/${propertyId}`);
  }

  public async searchProperties(criteria: {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
    location?: {
      city?: string;
      state?: string;
      zip?: string;
    };
  }): Promise<Property[]> {
    const params = new URLSearchParams();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue !== undefined) {
              params.append(`${key}.${subKey}`, subValue.toString());
            }
          });
        } else {
          params.append(key, value.toString());
        }
      }
    });

    return this.request(`/properties/search?${params.toString()}`);
  }

  public async updateProperty(propertyId: string, updates: Partial<Property>): Promise<Property> {
    return this.request(`/properties/${propertyId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  public async getMarketAnalytics(propertyId: string): Promise<{
    comparables: Property[];
    marketTrends: {
      medianPrice: number;
      averageDaysOnMarket: number;
      pricePerSquareFoot: number;
    };
  }> {
    return this.request(`/properties/${propertyId}/analytics`);
  }
}
```