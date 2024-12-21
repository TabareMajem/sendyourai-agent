```typescript
import { ZillowService } from '../services/ZillowService';
import { Property } from '../utils/propertyUtils';
import { AppError, ErrorCodes } from '../../../utils/errors';

export class ListingDistributor {
  private zillowService: ZillowService;
  private platforms: Map<string, (property: Property) => Promise<string>>;

  constructor(zillowService: ZillowService) {
    this.zillowService = zillowService;
    this.platforms = new Map();
    this.initializePlatforms();
  }

  private initializePlatforms() {
    this.platforms.set('zillow', async (property) => {
      return this.zillowService.postListing(property);
    });

    // Add more platforms as needed
    this.platforms.set('realtor', async (property) => {
      // Implementation for realtor.com
      return 'realtor-listing-id';
    });
  }

  public async distributeListing(property: Property, platforms: string[]) {
    const results = new Map<string, string>();
    const errors = new Map<string, Error>();

    await Promise.all(
      platforms.map(async (platform) => {
        const distributor = this.platforms.get(platform);
        if (!distributor) {
          errors.set(platform, new AppError(
            `Unsupported platform: ${platform}`,
            ErrorCodes.VALIDATION_ERROR
          ));
          return;
        }

        try {
          const listingId = await distributor(property);
          results.set(platform, listingId);
        } catch (error) {
          errors.set(platform, error as Error);
        }
      })
    );

    return {
      results,
      errors: errors.size > 0 ? errors : null
    };
  }
}
```