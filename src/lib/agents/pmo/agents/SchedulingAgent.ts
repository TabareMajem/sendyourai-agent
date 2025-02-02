import { z } from 'zod';
import { AIAgent } from '../../../ai/AIAgent';

// Define the schema for the schedule
const ScheduleSchema = z.array(
  z.object({
    phase: z.string(),
    startDate: z.instanceof(Date),
    endDate: z.instanceof(Date),
    milestones: z.array(
      z.object({
        name: z.string(),
        date: z.instanceof(Date),
        completed: z.boolean(),
      })
    ),
  })
);

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
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'schedule_creation',
      data: {
        projectScope: input.scope,
        deliverables: input.deliverables,
        timeframe: {
          start: input.startDate,
          end: input.endDate,
        },
      },
    });

    // Validate the payload using the ScheduleSchema
    const validatedPayload = ScheduleSchema.parse(result.payload);

    return validatedPayload;
  }

  public async updateSchedule(projectId: string, updates: any): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'schedule_update',
      data: {
        projectId,
        updates,
      },
    });
  }
}
