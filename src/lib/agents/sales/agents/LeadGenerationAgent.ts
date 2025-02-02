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
    try {
      const result = await this.aiAgent.queueAction('analysis', {
        type: 'lead_generation',
        data: {
          searchCriteria: criteria,
          sources: ['linkedin', 'clearbit', 'zoominfo'],
          enrichData: true,
          scoreThreshold: criteria.minScore || 60
        }
      });

      // Safely cast and transform the payload
      const rawLeads = Array.isArray(result.payload) ? result.payload : [];
      
      return rawLeads.map(rawLead => this.transformToLead(rawLead));
    } catch (error) {
      console.error('Error finding leads:', error);
      return [];
    }
  }

  public async enrichLeadData(lead: Lead): Promise<Lead> {
    try {
      const result = await this.aiAgent.queueAction('analysis', {
        type: 'lead_enrichment',
        data: {
          lead,
          enrichmentSources: ['clearbit', 'zoominfo'],
          includeFinancials: true,
          includeTechnographics: true
        }
      });

      // Merge enriched data with existing lead data
      const enrichedData = result.payload || {};
      return this.mergeLead(lead, enrichedData);
    } catch (error) {
      console.error('Error enriching lead:', error);
      return lead;
    }
  }

  public async scoreLeads(leads: Lead[]): Promise<Lead[]> {
    try {
      const result = await this.aiAgent.queueAction('analysis', {
        type: 'lead_scoring',
        data: {
          leads,
          scoringModel: 'default',
          includePredictions: true
        }
      });

      // Process scored leads
      const scoredData = Array.isArray(result.payload) ? result.payload : [];
      return leads.map((lead, index) => 
        this.mergeLead(lead, scoredData[index] || {})
      );
    } catch (error) {
      console.error('Error scoring leads:', error);
      return leads;
    }
  }

  private transformToLead(rawData: any): Lead {
    return {
      id: rawData.id || crypto.randomUUID(),
      source: rawData.source || '',
      company: {
        name: rawData.company?.name || '',
        industry: rawData.company?.industry || '',
        size: rawData.company?.size || '',
        location: rawData.company?.location || ''
      },
      contact: {
        name: rawData.contact?.name || '',
        title: rawData.contact?.title || '',
        email: rawData.contact?.email || '',
        phone: rawData.contact?.phone || undefined
      },
      score: typeof rawData.score === 'number' ? rawData.score : 0,
      status: rawData.status || 'new',
      notes: rawData.notes || '',
      createdAt: rawData.createdAt ? new Date(rawData.createdAt) : new Date()
    } as Lead;
  }

  private mergeLead(original: Lead, newData: any): Lead {
    return {
      ...original,
      company: {
        ...original.company,
        ...(newData.company || {})
      },
      contact: {
        ...original.contact,
        ...(newData.contact || {})
      },
      score: newData.score ?? original.score,
      status: newData.status || original.status,
      notes: newData.notes || original.notes
    } as Lead;
  }
}