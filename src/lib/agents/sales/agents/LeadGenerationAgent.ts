import { AIAgent } from '../../../ai/AIAgent';
import { Lead } from '../types';

export class LeadGenerationAgent {
  constructor(private aiAgent: AIAgent) {}

  public async findLeads(criteria: {
    industry?: string[];
    companySize?: string[];
    location?: string[];
    keywords?: string[];
    minScore?: number;
  }): Promise<Lead[]> {
    return this.aiAgent.queueAction('analysis', {
      type: 'lead_generation',
      data: {
        searchCriteria: criteria,
        sources: ['linkedin', 'clearbit', 'zoominfo'],
        enrichData: true,
        scoreThreshold: criteria.minScore || 60
      }
    });
  }

  public async enrichLeadData(lead: Lead): Promise<Lead> {
    return this.aiAgent.queueAction('analysis', {
      type: 'lead_enrichment',
      data: {
        lead,
        enrichmentSources: ['clearbit', 'zoominfo'],
        includeFinancials: true,
        includeTechnographics: true
      }
    });
  }

  public async scoreLeads(leads: Lead[]): Promise<Lead[]> {
    return this.aiAgent.queueAction('analysis', {
      type: 'lead_scoring',
      data: {
        leads,
        scoringModel: 'default',
        includePredictions: true
      }
    });
  }
}