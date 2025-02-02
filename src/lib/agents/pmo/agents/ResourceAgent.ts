import { z } from 'zod';
import { AIAgent } from '../../../ai/AIAgent';

// Define the expected schema for the resource allocation
const ResourceAllocationSchema = z.array(
  z.object({
    type: z.string(),
    name: z.string(),
    allocation: z.number(),
    startDate: z.instanceof(Date),
    endDate: z.instanceof(Date),
  })
);

export class ResourceAgent {
  constructor(private aiAgent: AIAgent) {}

  public async allocateResources(input: {
    scope: string;
    deliverables: string[];
    schedule: any;
  }): Promise<Array<{
    type: string;
    name: string;
    allocation: number;
    startDate: Date;
    endDate: Date;
  }>> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'resource_allocation',
      data: {
        projectScope: input.scope,
        deliverables: input.deliverables,
        schedule: input.schedule,
        optimizeFor: 'efficiency'
      }
    });

    // Validate the payload using the ResourceAllocationSchema
    const validatedPayload = ResourceAllocationSchema.parse(result.payload);

    return validatedPayload;
  }

  public async updateResources(projectId: string, updates: any): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'resource_update',
      data: {
        projectId,
        updates
      }
    });
  }
}
