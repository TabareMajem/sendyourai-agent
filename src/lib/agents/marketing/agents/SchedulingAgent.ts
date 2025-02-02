import { AIAgent } from '../../../ai/AIAgent';

export class SchedulingAgent {
  constructor(private aiAgent: AIAgent) {}

  public async createSchedule(input: {
    content: {
      copy: Array<{
        channel: string;
        text: string;
        targetDate?: Date;
      }>;
      visuals: Array<{
        channel: string;
        url: string;
        type: string;
        targetDate?: Date;
      }>;
    };
    duration: string;
    channels: string[];
  }): Promise<Array<{
    date: Date;
    channel: string;
    contentId: string;
    status: 'scheduled' | 'published' | 'failed';
  }>> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'schedule_creation',
      data: {
        content: input.content,
        duration: input.duration,
        channels: input.channels,
        optimizeFor: 'engagement'
      }
    });

    // Assuming the schedules are in result.payload and it's an array
    if (result.payload && Array.isArray(result.payload)) {
      return result.payload.map((item: any) => ({
        date: item.date || new Date(),  // Default to current date if date is missing
        channel: item.channel || '',  // Assuming item has a channel property
        contentId: item.contentId || '',  // Assuming item has contentId property
        status: item.status || 'failed'  // Default to 'failed' if status is missing
      }));
    }

    // If result does not contain an array, return an empty array or handle the case
    return [];
  }

  public async executeCampaign(campaignId: string): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'campaign_execution',
      data: {
        campaignId,
        executeType: 'scheduled'
      }
    });
  }

  public async updateSchedule(campaignId: string, newContent: any): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'schedule_update',
      data: {
        campaignId,
        newContent,
        updateType: 'optimization'
      }
    });
  }
}
