```typescript
import { ZillowService } from '../services/ZillowService';
import { MLSService } from '../services/MLSService';
import { Property } from '../utils/propertyUtils';

export class ListingAnalytics {
  private zillowService: ZillowService;
  private mlsService: MLSService;

  constructor(zillowService: ZillowService, mlsService: MLSService) {
    this.zillowService = zillowService;
    this.mlsService = mlsService;
  }

  public async getListingPerformance(propertyId: string): Promise<{
    views: number;
    inquiries: number;
    marketComparison: {
      pricePerSqFt: number;
      daysOnMarket: number;
      similarListings: Property[];
    };
    engagement: {
      savedCount: number;
      shareCount: number;
      viewDuration: number;
    };
  }> {
    const [zillowStats, marketData] = await Promise.all([
      this.zillowService.getListingAnalytics(propertyId),
      this.mlsService.getMarketAnalytics(propertyId)
    ]);

    return {
      views: zillowStats.views,
      inquiries: zillowStats.inquiries,
      marketComparison: {
        pricePerSqFt: marketData.marketTrends.pricePerSquareFoot,
        daysOnMarket: marketData.marketTrends.averageDaysOnMarket,
        similarListings: marketData.comparables
      },
      engagement: {
        savedCount: zillowStats.saves,
        shareCount: zillowStats.shares || 0,
        viewDuration: zillowStats.averageViewTime || 0
      }
    };
  }
}
```