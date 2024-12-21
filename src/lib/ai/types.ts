import { z } from 'zod';

// Action Types
export const ActionSchema = z.object({
  id: z.string(),
  type: z.enum(['email', 'notification', 'task', 'analysis']),
  payload: z.record(z.unknown()),
  timestamp: z.date(),
  status: z.enum(['pending', 'running', 'completed', 'failed'])
});

export type Action = z.infer<typeof ActionSchema>;

// Trigger Types
export const TriggerSchema = z.object({
  id: z.string(),
  type: z.enum(['schedule', 'event', 'condition']),
  config: z.record(z.unknown()),
  enabled: z.boolean(),
  lastTriggered: z.date().optional()
});

export type Trigger = z.infer<typeof TriggerSchema>;

// Analysis Types
export interface AnalysisResult {
  confidence: number;
  suggestion: {
    type: string;
    action: string;
    params: Record<string, unknown>;
  };
}

// Context Types
export interface AIContext {
  userId: string;
  workflowId?: string;
  environment: 'development' | 'production';
  timestamp: Date;
  metadata: Record<string, unknown>;
}