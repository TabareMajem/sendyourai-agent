import { z } from 'zod';
import { AIAgent } from '../../../ai/AIAgent';

// Define the schema for the tasks
const TaskSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    assignee: z.string(),
    status: z.enum(['todo', 'inProgress', 'completed']),
    startDate: z.instanceof(Date),
    endDate: z.instanceof(Date),
    dependencies: z.array(z.string()),
  })
);

export class TaskManagementAgent {
  constructor(private aiAgent: AIAgent) {}

  public async createInitialTasks(input: {
    scope: string;
    deliverables: string[];
    schedule: any;
    resources: any;
  }): Promise<Array<{
    id: string;
    title: string;
    description: string;
    assignee: string;
    status: 'todo' | 'inProgress' | 'completed';
    startDate: Date;
    endDate: Date;
    dependencies: string[];
  }>> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'task_creation',
      data: {
        projectScope: input.scope,
        deliverables: input.deliverables,
        schedule: input.schedule,
        resources: input.resources,
      },
    });

    // Validate the payload using TaskSchema
    const validatedPayload = TaskSchema.parse(result.payload);

    return validatedPayload;
  }

  public async startExecution(projectId: string): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'execution_start',
      data: { projectId },
    });
  }

  public async getProgress(projectId: string): Promise<any> {
    return this.aiAgent.queueAction('analysis', {
      type: 'progress_tracking',
      data: { projectId },
    });
  }

  public async updateTasks(projectId: string, updates: any): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'task_update',
      data: {
        projectId,
        updates,
      },
    });
  }
}
