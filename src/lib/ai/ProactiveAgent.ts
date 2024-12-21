import { AIAgent } from './AIAgent';
import { TriggerManager } from './TriggerManager';

export class ProactiveAgent {
  private agent: AIAgent;
  private triggerManager: TriggerManager;
  private learningEnabled: boolean;
  private confidenceThreshold: number;

  constructor(confidenceThreshold = 0.8) {
    this.agent = new AIAgent();
    this.triggerManager = new TriggerManager(this.agent);
    this.learningEnabled = true;
    this.confidenceThreshold = confidenceThreshold;
  }

  public async analyzeSituation(context: Record<string, unknown>): Promise<void> {
    if (!this.learningEnabled) return;

    try {
      // Analyze current context and determine if action is needed
      const analysis = await this.performContextAnalysis(context);
      
      if (analysis.confidence >= this.confidenceThreshold) {
        await this.takeSuggestedAction(analysis.suggestion);
      }
    } catch (error) {
      console.error('Failed to analyze situation:', error);
    }
  }

  private async performContextAnalysis(context: Record<string, unknown>): Promise<{
    confidence: number;
    suggestion: {
      type: string;
      action: string;
      params: Record<string, unknown>;
    };
  }> {
    // Implement context analysis logic
    // This would typically involve ML models or rule-based systems
    return {
      confidence: 0.9,
      suggestion: {
        type: 'notification',
        action: 'send',
        params: {
          message: 'Proactive suggestion based on context',
          priority: 'high'
        }
      }
    };
  }

  private async takeSuggestedAction(suggestion: {
    type: string;
    action: string;
    params: Record<string, unknown>;
  }): Promise<void> {
    await this.agent.queueAction(suggestion.type as any, {
      action: suggestion.action,
      ...suggestion.params
    });
  }

  public enableLearning(): void {
    this.learningEnabled = true;
  }

  public disableLearning(): void {
    this.learningEnabled = false;
  }

  public setConfidenceThreshold(threshold: number): void {
    if (threshold < 0 || threshold > 1) {
      throw new Error('Confidence threshold must be between 0 and 1');
    }
    this.confidenceThreshold = threshold;
  }

  public cleanup(): void {
    this.triggerManager.cleanup();
  }
}