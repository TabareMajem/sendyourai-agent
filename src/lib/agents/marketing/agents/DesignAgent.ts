import { AIAgent } from '../../../ai/AIAgent';

export class DesignAgent {
  constructor(private aiAgent: AIAgent) {}

  public async createVisuals(input: {
    copy: Array<{
      channel: string;
      text: string;
      targetDate?: Date;
    }>;
    strategy: any;
    channels: string[];
  }): Promise<Array<{
    channel: string;
    url: string;
    type: string;
    targetDate?: Date;
  }>> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'visual_generation',
      data: {
        copy: input.copy,
        strategy: input.strategy,
        channels: input.channels,
        style: 'modern',
        format: 'channel_optimized'
      }
    });

    // Assuming the visuals data is in result.payload and it's an array
    if (result.payload && Array.isArray(result.payload)) {
      return result.payload.map((item: any) => ({
        channel: item.channel || '',  // Assuming item has a channel property
        url: item.url || '',  // Assuming item has a url property
        type: item.type || '',  // Assuming item has a type property
        targetDate: item.targetDate || undefined  // Assuming item may have targetDate property
      }));
    }

    // If result does not contain an array, return an empty array or handle the case
    return [];
  }
}
