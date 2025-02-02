import { z } from 'zod';
import { AIAgent } from '../../../ai/AIAgent';

// Define the schema for the risk assessment
const RiskAssessmentSchema = z.array(
  z.object({
    description: z.string(),
    impact: z.enum(['high', 'medium', 'low']),
    probability: z.enum(['high', 'medium', 'low']),
    mitigation: z.string(),
    status: z.enum(['identified', 'mitigated', 'occurred']),
  })
);

export class RiskManagementAgent {
  constructor(private aiAgent: AIAgent) {}

  public async assessRisks(input: {
    scope: string;
    deliverables: string[];
    schedule: any;
    resources: any;
  }): Promise<Array<{
    description: string;
    impact: 'high' | 'medium' | 'low';
    probability: 'high' | 'medium' | 'low';
    mitigation: string;
    status: 'identified' | 'mitigated' | 'occurred';
  }>> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'risk_assessment',
      data: {
        projectScope: input.scope,
        deliverables: input.deliverables,
        schedule: input.schedule,
        resources: input.resources
      }
    });

    // Validate the payload using the RiskAssessmentSchema
    const validatedPayload = RiskAssessmentSchema.parse(result.payload);

    return validatedPayload;
  }

  public async monitorRisks(projectId: string): Promise<any> {
    return this.aiAgent.queueAction('analysis', {
      type: 'risk_monitoring',
      data: {
        projectId,
        includeMetrics: true
      }
    });
  }
}
