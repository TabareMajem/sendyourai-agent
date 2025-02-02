import { z } from 'zod';
import { AIAgent } from '../../../ai/AIAgent';

// Define the expected schema for the payload
const ProjectDefinitionSchema = z.object({
  scope: z.string(),
  deliverables: z.array(z.string()),
  constraints: z.array(z.string()),
  assumptions: z.array(z.string()),
});

export class InitiationAgent {
  constructor(private aiAgent: AIAgent) {}

  public async defineProject(input: {
    name: string;
    description: string;
    objectives: string[];
    stakeholders: string[];
  }): Promise<{
    scope: string;
    deliverables: string[];
    constraints: string[];
    assumptions: string[];
  }> {
    const result = await this.aiAgent.queueAction('analysis', {
      type: 'project_definition',
      data: {
        projectInfo: input,
        includeDeliverables: true,
        includeConstraints: true,
        includeAssumptions: true,
      },
    });

    // Validate the payload with the schema
    const validatedPayload = ProjectDefinitionSchema.parse(result.payload);

    return validatedPayload;
  }
}
