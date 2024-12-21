import { AIAgent } from '../../../ai/AIAgent';

export class ClosureAgent {
  constructor(private aiAgent: AIAgent) {}

  public async closeProject(projectId: string): Promise<void> {
    await this.aiAgent.queueAction('task', {
      type: 'project_closure',
      data: {
        projectId,
        generateReport: true,
        archiveData: true
      }
    });
  }
}