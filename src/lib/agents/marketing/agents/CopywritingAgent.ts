import { AIAgent } from '../../../ai/AIAgent';

export class CopywritingAgent {
  constructor(private aiAgent: AIAgent) {}

  public async generateContent(input: {
    strategy: any;
    channels: string[];
  }): Promise<Array<{
    channel: string;
    text: string;
    targetDate?: Date;
  }>> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'content_generation',
      data: {
        strategy: input.strategy,
        channels: input.channels,
        contentType: 'copy',
        tone: 'professional',
        format: 'channel_specific',
      },
    });

    // Map payload to expected structure
    if (Array.isArray(result.payload)) {
      return result.payload.map((item) => ({
        channel: String(item.channel),
        text: String(item.text),
        targetDate: item.targetDate ? new Date(item.targetDate) : undefined,
      }));
    }

    throw new Error('Invalid payload format');
  }
}