import { AIAgent } from '../../ai/AIAgent';
import { LeadGenerationAgent } from './agents/LeadGenerationAgent';

export class SalesAgentManager {
  private leadGenerationAgent: LeadGenerationAgent;

  constructor() {
    const aiAgent = new AIAgent();
    this.leadGenerationAgent = new LeadGenerationAgent(aiAgent);
  }

  public async generateLeads(criteria: any): Promise<any[]> {
    return this.leadGenerationAgent.findLeads(criteria);
  }

}