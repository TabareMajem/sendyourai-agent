```typescript
import { Property } from '../utils/propertyUtils';
import { AppError, ErrorCodes } from '../../../utils/errors';

export class ZillowService {
  private apiKey: string;
  private baseUrl = 'https://api.zillow.com/v2';

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
        'Zillow API request failed',
        ErrorCodes.EXTERNAL_SERVICE_ERROR,
        response.status
      );
    }

    return response.json();
  }

  public async postListing(property: Property): Promise<string> {
    const response = await this.request('/listings', {
      method: 'POST',
      body: JSON.stringify({
        address: property.address,
        price: property.price,
        details: property.details,
        features: property.features,
        images: property.images
      })
    });

    return response.listingId;
  }

  public async updateListing(listingId: string, updates: Partial<Property>): Promise<void> {
    await this.request(`/listings/${listingId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  public async getListingAnalytics(listingId: string): Promise<{
    views: number;
    saves: number;
    inquiries: number;
    viewerDemographics: any;
  }> {
    return this.request(`/listings/${listingId}/analytics`);
  }
}
```