import { ZapierClient } from '../../zapier/ZapierClient';
import { AIAgent } from '../../ai/AIAgent';
import { TriggerManager } from '../../ai/TriggerManager';

export class DocumentDraftingWorkflow {
  private zapier: ZapierClient;
  private aiAgent: AIAgent;
  private triggerManager: TriggerManager;

  constructor(zapier: ZapierClient, aiAgent: AIAgent) {
    this.zapier = zapier;
    this.aiAgent = aiAgent;
    this.triggerManager = new TriggerManager(aiAgent);
  }

  public async setup() {
    // Set up document request trigger
    const requestTrigger = await this.triggerManager.setupEventTrigger('document_request', [
      { field: 'type', operator: 'equals', value: 'legal_document' }
    ]);

    // Create Zapier webhooks
    const draftWebhook = await this.zapier.createWebhook('draft_created');
    const reviewWebhook = await this.zapier.createWebhook('review_completed');
    const finalizeWebhook = await this.zapier.createWebhook('document_finalized');

    return {
      triggers: {
        request: requestTrigger
      },
      webhooks: {
        draft: draftWebhook,
        review: reviewWebhook,
        finalize: finalizeWebhook
      }
    };
  }

  public async generateDocument(request: {
    clientId: string;
    documentType: string;
    details: Record<string, any>;
    urgency: 'normal' | 'high' | 'urgent';
  }) {
    // Analyze requirements
    const analysis = await this.aiAgent.queueAction('analysis', {
      type: 'document_requirements',
      data: {
        documentType: request.documentType,
        clientInfo: await this.getClientInfo(request.clientId),
        details: request.details
      }
    });

    // Generate document draft
    const draft = await this.aiAgent.queueAction('analysis', {
      type: 'generate_legal_document',
      data: {
        requirements: analysis,
        template: request.documentType,
        clientId: request.clientId
      }
    });

    // Perform initial review
    const review = await this.aiAgent.queueAction('analysis', {
      type: 'review_document',
      data: {
        document: draft,
        checkpoints: [
          'legal_compliance',
          'completeness',
          'clarity',
          'formatting'
        ]
      }
    });

    if (review.requiresAttention) {
      // Notify legal team for review
      await this.aiAgent.queueAction('notification', {
        type: 'review_required',
        data: {
          documentId: draft.id,
          issues: review.issues,
          urgency: request.urgency
        }
      });
    } else {
      // Send to client for review
      await this.aiAgent.queueAction('email', {
        type: 'document_review',
        data: {
          clientId: request.clientId,
          document: draft,
          template: 'client_review_request'
        }
      });
    }

    return {
      draft,
      review,
      nextSteps: review.requiresAttention ? 'legal_review' : 'client_review'
    };
  }

  private async getClientInfo(clientId: string) {
    // Implement client info retrieval
    return {
      id: clientId,
      // Add other client information
    };
  }

  public async processClientFeedback(feedback: {
    documentId: string;
    clientId: string;
    comments: Array<{
      section: string;
      comment: string;
      type: 'change' | 'question' | 'approval';
    }>;
  }) {
    // Analyze feedback
    const analysis = await this.aiAgent.queueAction('analysis', {
      type: 'analyze_feedback',
      data: {
        feedback: feedback.comments,
        documentId: feedback.documentId
      }
    });

    if (analysis.requiresRevision) {
      // Generate revision
      const revision = await this.aiAgent.queueAction('analysis', {
        type: 'revise_document',
        data: {
          documentId: feedback.documentId,
          changes: analysis.suggestedChanges
        }
      });

      // Send for review
      await this.aiAgent.queueAction('task', {
        type: 'review_revision',
        data: {
          documentId: feedback.documentId,
          revision,
          clientId: feedback.clientId
        }
      });
    }

    return {
      requiresRevision: analysis.requiresRevision,
      nextSteps: analysis.requiresRevision ? 'legal_review' : 'finalization'
    };
  }
}