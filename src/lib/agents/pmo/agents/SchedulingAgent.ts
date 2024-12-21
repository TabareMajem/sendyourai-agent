import { AIAgent } from '../../../ai/AIAgent';

export class SchedulingAgent {
  constructor(private aiAgent: AIAgent) {}

  public async createSchedule(input: {
    scope: string;
    deliverables: string[];
    startDate: Date;
    endDate: Date;
  }): Promise<Array<{
    phase: string;
    startDate: Date;
    endDate: Date;
    milestones: Array<{
      name: string;
      date: Date;
      completed: boolean;
    }>;
  }>> {
    return this.aiAgent.queueAction('analysis', {
      type: 'schedule_creation',
      data: {
        projectScope: input.scope,
        deliverables: input.deliverables,
        timeframe: {
          start: input.startDate,
          end: input.endDate
        }
      }
    });
  }

  public async updateSchedule(projectId: string, updates: any): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'schedule_update',
      data: {
        projectId,
        updates
      }
    });
  }
}