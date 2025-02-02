import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { PropertyListingWorkflow } from './PropertyListingWorkflow';
import { VirtualTourWorkflow } from './VirtualTourWorkflow';
import { MLSService } from './services/MLSService';
import { ZillowService } from './services/ZillowService';

export class RealEstateWorkflowManager {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private propertyListingWorkflow: PropertyListingWorkflow;
  private virtualTourWorkflow: VirtualTourWorkflow;
  private mlsService: MLSService;
  private zillowService: ZillowService;

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
    const formattedAddress = `${validatedProperty.address.street}, ${validatedProperty.address.city}, ${validatedProperty.address.state} ${validatedProperty.address.zip}, ${validatedProperty.address.country}`;
    const processedProperty = {
      ...validatedProperty,
      address: formattedAddress,
    };

    await this.propertyListingWorkflow.processNewListing(processedProperty);
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
