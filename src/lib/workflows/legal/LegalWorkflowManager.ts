import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { ClientOnboardingWorkflow } from './ClientOnboardingWorkflow';
import { DocumentDraftingWorkflow } from './DocumentDraftingWorkflow';

export class LegalWorkflowManager {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private clientOnboarding: ClientOnboardingWorkflow;
  private documentDrafting: DocumentDraftingWorkflow;

  constructor(config: {
    zapierAuth: { apiKey: string; accountId: string };
  }) {
    this.zapier = new ZapierClient(config.zapierAuth);
    this.aiAgent = new AIAgent();

    this.clientOnboarding = new ClientOnboardingWorkflow(this.zapier, this.aiAgent);
    this.documentDrafting = new DocumentDraftingWorkflow(this.zapier, this.aiAgent);
  }

  public async initialize() {
    const [onboardingSetup, draftingSetup] = await Promise.all([
      this.clientOnboarding.setup(),
      this.documentDrafting.setup()
    ]);

    return {
      onboarding: onboardingSetup,
      drafting: draftingSetup
    };
  }

  public async handleNewClient(clientData: any) {
    await this.clientOnboarding.processNewClient(clientData);
  }

  public async handleDocumentRequest(request: any) {
    return this.documentDrafting.generateDocument(request);
  }

  public async handleDocumentFeedback(feedback: any) {
    return this.documentDrafting.processClientFeedback(feedback);
  }

  public async handleDocumentSubmission(data: any) {
    return this.clientOnboarding.processDocuments(data);
  }
}