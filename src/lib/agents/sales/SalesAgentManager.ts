import { AIAgent } from '../../ai/AIAgent';
import { LeadGenerationAgent } from './agents/LeadGenerationAgent';
import { ProspectingAgent } from './agents/ProspectingAgent';
import { OutreachAgent } from './agents/OutreachAgent';
import { ConversationAgent } from './agents/ConversationAgent';
import { NegotiationAgent } from './agents/NegotiationAgent';
import { ContractAgent } from './agents/ContractAgent';
import { MultilingualAgent } from './agents/MultilingualAgent';
import { FollowUpAgent } from './agents/FollowUpAgent';

export class SalesAgentManager {
  private leadGenerationAgent: LeadGenerationAgent;
  private prospectingAgent: ProspectingAgent;
  private outreachAgent: OutreachAgent;
  private conversationAgent: ConversationAgent;
  private negotiationAgent: NegotiationAgent;
  private contractAgent: ContractAgent;
  private multilingualAgent: MultilingualAgent;
  private followUpAgent: FollowUpAgent;

  constructor() {
    const aiAgent = new AIAgent();
    this.leadGenerationAgent = new LeadGenerationAgent(aiAgent);
    this.prospectingAgent = new ProspectingAgent(aiAgent);
    this.outreachAgent = new OutreachAgent(aiAgent);
    this.conversationAgent = new ConversationAgent(aiAgent);
    this.negotiationAgent = new NegotiationAgent(aiAgent);
    this.contractAgent = new ContractAgent(aiAgent);
    this.multilingualAgent = new MultilingualAgent(aiAgent);
    this.followUpAgent = new FollowUpAgent(aiAgent);
  }

  public async generateLeads(criteria: any): Promise<any[]> {
    return this.leadGenerationAgent.findLeads(criteria);
  }

  public async qualifyProspects(leads: any[]): Promise<any[]> {
    return this.prospectingAgent.qualifyLeads(leads);
  }

  public async initiateOutreach(prospects: any[]): Promise<void> {
    await this.outreachAgent.startOutreach(prospects);
  }

  public async handleConversation(sessionId: string, input: string): Promise<string> {
    return this.conversationAgent.processInput(sessionId, input);
  }

  public async negotiateDeal(dealId: string, terms: any): Promise<any> {
    return this.negotiationAgent.negotiate(dealId, terms);
  }

  public async generateContract(dealId: string): Promise<any> {
    return this.contractAgent.generateContract(dealId);
  }

  public async translateCommunication(text: string, targetLanguage: string): Promise<string> {
    return this.multilingualAgent.translate(text, targetLanguage);
  }

  public async scheduleFollowUp(customerId: string, context: any): Promise<void> {
    await this.followUpAgent.scheduleFollowUp(customerId, context);
  }
}