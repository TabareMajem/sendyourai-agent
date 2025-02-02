import { AIAgent } from '../../../ai/AIAgent';

export class CreativeAgent {
  constructor(private aiAgent: AIAgent) {}

  public async generateIdeas(input: {
    goals: string[];
    targetAudience: string;
    channels: string[];
  }): Promise<Array<{
    title: string;
    description: string;
    expectedImpact: string;
  }>> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'campaign_ideation',
      data: {
        goals: input.goals,
        targetAudience: input.targetAudience,
        channels: input.channels,
        creativity: 0.8,
        format: 'structured'
      }
    });

    // If result is a single object, directly return the transformed result
    return [{
      title: result.type || '',  // Assuming result has a title property
      description: result.type || '',  // Assuming result has a description property
      expectedImpact: result.type || ''  // Assuming result has expectedImpact property
    }];
  }
}
