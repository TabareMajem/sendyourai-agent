```typescript
import { ZapierClient } from '../../zapier/ZapierClient';

export async function setupClientOnboardingWorkflow(
  zapier: ZapierClient,
  config: {
    documentStorage: string;
    formProvider: string;
    notificationPreferences: Record<string, any>;
  }
) {
  // Create webhooks for client onboarding workflow
  const clientWebhook = await zapier.createWebhook('client_created');
  const documentWebhook = await zapier.createWebhook('documents_received');
  const completionWebhook = await zapier.createWebhook('onboarding_completed');

  return {
    triggers: [clientWebhook],
    steps: [
      {
        id: 'create_intake_forms',
        type: 'action',
        provider: config.formProvider,
        config: {
          formTypes: ['client_information', 'case_details', 'document_checklist']
        }
      },
      {
        id: 'setup_document_storage',
        type: 'action',
        provider: config.documentStorage,
        config: {
          structure: ['Client Info', 'Legal Docs', 'Correspondence']
        }
      },
      {
        id: 'configure_notifications',
        type: 'action',
        provider: 'notification_service',
        config: config.notificationPreferences
      }
    ],
    webhooks: {
      client: clientWebhook,
      documents: documentWebhook,
      completion: completionWebhook
    }
  };
}

export async function setupDocumentDraftingWorkflow(
  zapier: ZapierClient,
  config: {
    documentTemplates: Record<string, any>;
    reviewProcess: Record<string, any>;
    aiConfig: Record<string, any>;
  }
) {
  // Create webhooks for document drafting workflow
  const requestWebhook = await zapier.createWebhook('document_requested');
  const draftWebhook = await zapier.createWebhook('draft_created');
  const reviewWebhook = await zapier.createWebhook('review_completed');

  return {
    triggers: [requestWebhook],
    steps: [
      {
        id: 'analyze_requirements',
        type: 'action',
        provider: 'ai_service',
        config: config.aiConfig
      },
      {
        id: 'generate_draft',
        type: 'action',
        provider: 'document_service',
        config: {
          templates: config.documentTemplates
        }
      },
      {
        id: 'review_process',
        type: 'action',
        provider: 'review_service',
        config: config.reviewProcess
      }
    ],
    webhooks: {
      request: requestWebhook,
      draft: draftWebhook,
      review: reviewWebhook
    }
  };
}
```