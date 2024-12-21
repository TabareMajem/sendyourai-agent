```typescript
import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { PropertyListingWorkflow } from './PropertyListingWorkflow';
import { VirtualTourWorkflow } from './VirtualTourWorkflow';
import { MLSService } from './services/MLSService';
import { ZillowService } from './services/ZillowService';
import { MatterportService } from './services/MatterportService';

export class RealEstateWorkflowManager {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private propertyListingWorkflow: PropertyListingWorkflow;
  private virtualTourWorkflow: VirtualTourWorkflow;
  private mlsService: MLSService;
  private zillowService: ZillowService;
  private matterportService: MatterportService;

  constructor(config: {
    zapierAuth: { apiKey: string; accountId: string };
    mlsConfig: { apiKey: string; baseUrl: string };
    zillowApiKey: string;
    matterportApiKey: string;
  }) {
    this.zapier = new ZapierClient(config.zapierAuth);
    this.aiAgent = new AIAgent();
    
    this.mlsService = new MLSService(config.mlsConfig);
    this.zillowService = new ZillowService(config.zillowApiKey);
    this.matterportService = new MatterportService(config.matterportApiKey);

    this.propertyListingWorkflow = new PropertyListingWorkflow(this.zapier, this.aiAgent);
    this.virtualTourWorkflow = new VirtualTourWorkflow(this.zapier, this.aiAgent);
  }

  public async initialize() {
    const [listingSetup, tourSetup] = await Promise.all([
      this.propertyListingWorkflow.setup(),
      this.virtualTourWorkflow.setup()
    ]);

    return {
      listingWorkflow: listingSetup,
      tourWorkflow: tourSetup
    };
  }

  public async handleNewListing(propertyData: any) {
    const validatedProperty = await this.mlsService.getProperty(propertyData.id);
    await this.propertyListingWorkflow.processNewListing(validatedProperty);
  }

  public async handleTourRequest(request: any) {
    await this.virtualTourWorkflow.processTourRequest(request);
  }

  public async handleFeedback(tourId: string) {
    await this.virtualTourWorkflow.collectFeedback(tourId);
  }

  public async getAnalytics(propertyId: string) {
    const [mlsAnalytics, zillowAnalytics] = await Promise.all([
      this.mlsService.getMarketAnalytics(propertyId),
      this.zillowService.getListingAnalytics(propertyId)
    ]);

    return {
      mls: mlsAnalytics,
      zillow: zillowAnalytics
    };
  }
}
```