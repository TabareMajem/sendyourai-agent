import { AIAgent } from '../../../ai/AIAgent';

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
    return this.aiAgent.queueAction('analysis', {
      type: 'project_definition',
      data: {
        projectInfo: input,
        includeDeliverables: true,
        includeConstraints: true,
        includeAssumptions: true
      }
    });
  }
}