import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class ClientOnboardingWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up new client trigger
    const clientTrigger = await this.triggerManager.setupEventTrigger('new_client', [
      { field: 'type', operator: 'equals', value: 'client_engagement' }
    ]);

    // Create Zapier webhooks
    const onboardingWebhook = await this.zapier.createWebhook('onboarding_started');
    const documentWebhook = await this.zapier.createWebhook('documents_received');
    const completionWebhook = await this.zapier.createWebhook('onboarding_completed');

    return {
      triggers: {
        client: clientTrigger
      },
      webhooks: {
        onboarding: onboardingWebhook,
        documents: documentWebhook,
        completion: completionWebhook
      }
    };
  }

  public async processNewClient(clientData: {
    id: string;
    name: string;
    email: string;
    caseType: string;
    details: Record<string, any>;
  }) {
    // Generate personalized intake forms
    const forms = await this.aiAgent.queueAction('analysis', {
      type: 'generate_intake_forms',
      data: {
        caseType: clientData.caseType,
        clientInfo: {
          name: clientData.name,
          email: clientData.email
        }
      }
    });

    // Send welcome email with forms
    await this.aiAgent.queueAction('email', {
      type: 'welcome_email',
      data: {
        clientId: clientData.id,
        forms,
        template: 'legal_onboarding'
      }
    });

    // Create case folder structure
    await this.aiAgent.queueAction('task', {
      type: 'create_case_folder',
      data: {
        clientId: clientData.id,
        caseType: clientData.caseType,
        structure: [
          'Client Information',
          'Legal Documents',
          'Correspondence',
          'Case Notes'
        ]
      }
    });

    // Set up document tracking
    await this.aiAgent.queueAction('task', {
      type: 'setup_document_tracking',
      data: {
        clientId: clientData.id,
        requiredDocuments: forms.requiredDocuments,
        reminderSchedule: '3_days'
      }
    });
  }

  public async processDocuments(data: {
    clientId: string;
    documents: Array<{
      type: string;
      content: string;
      metadata: Record<string, any>;
    }>;
  }) {
    // Analyze documents
    const analysis = await this.aiAgent.queueAction('analysis', {
      type: 'document_analysis',
      data: {
        documents: data.documents,
        validateCompleteness: true,
        extractKeyInfo: true
      }
    });

    if (analysis.missingDocuments.length > 0) {
      // Request missing documents
      await this.aiAgent.queueAction('email', {
        type: 'document_request',
        data: {
          clientId: data.clientId,
          missingDocuments: analysis.missingDocuments,
          template: 'missing_documents'
        }
      });
    }

    // Store processed documents
    await this.aiAgent.queueAction('task', {
      type: 'store_documents',
      data: {
        clientId: data.clientId,
        documents: data.documents,
        analysis: analysis.keyInfo
      }
    });

    return {
      complete: analysis.missingDocuments.length === 0,
      missingDocuments: analysis.missingDocuments,
      keyInfo: analysis.keyInfo
    };
  }
}