import { z } from 'zod';
import { AIAgent } from '../../../ai/AIAgent';

// Define the expected schema for the quality plan
const QualityPlanSchema = z.object({
  checkpoints: z.array(
    z.object({
      phase: z.string(),
      criteria: z.array(z.string()),
      status: z.enum(['pending', 'passed', 'failed']),
    })
  ),
  metrics: z.record(z.number()),
});

export class QualityAssuranceAgent {
  constructor(private aiAgent: AIAgent) {}

  public async createQualityPlan(input: {
    scope: string;
    deliverables: string[];
    schedule: any;
    tasks: any;
  }): Promise<{
    checkpoints: Array<{
      phase: string;
      criteria: string[];
      status: 'pending' | 'passed' | 'failed';
    }>;
    metrics: Record<string, number>;
  }> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'quality_plan_creation',
      data: {
        projectScope: input.scope,
        deliverables: input.deliverables,
        schedule: input.schedule,
        tasks: input.tasks,
      },
    });

    // Validate the payload with the schema
    const validatedPayload = QualityPlanSchema.parse(result.payload);

    return validatedPayload;
  }

  public async checkQuality(projectId: string): Promise<any> {
    return this.aiAgent.queueAction('analysis', {
      type: 'quality_check',
      data: { projectId },
    });
  }
}
