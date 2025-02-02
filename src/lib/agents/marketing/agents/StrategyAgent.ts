import { z } from 'zod';
import { AIAgent } from '../../../ai/AIAgent';

const StrategySchema = z.object({
  overview: z.string(),
  channelStrategy: z.record(z.any()),
  timeline: z.any().optional(), // Mark as optional in the schema
  kpis: z.array(z.string()),
});

export class StrategyAgent {
  constructor(private aiAgent: AIAgent) {}

  public async developStrategy(input: {
    goals: string[];
    targetAudience: string;
    channels: string[];
    ideas: Array<{
      title: string;
      description: string;
      expectedImpact: string;
    }>;
  }): Promise<{
    overview: string;
    channelStrategy: Record<string, any>;
    timeline: any;
    kpis: string[];
  }> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'strategy_development',
      data: {
        goals: input.goals,
        targetAudience: input.targetAudience,
        channels: input.channels,
        ideas: input.ideas,
        includeTimeline: true,
        includeKPIs: true,
      },
    });

    // Validate the payload and add a default for `timeline` if missing
    const validatedPayload = StrategySchema.parse(result.payload);

    return {
      ...validatedPayload,
      timeline: validatedPayload.timeline ?? {}, // Ensure `timeline` is always defined
    };
  }

  public async updateStrategy(campaignId: string, recommendations: any): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'strategy_update',
      data: {
        campaignId,
        recommendations,
        updateType: 'optimization',
      },
    });
  }
}
