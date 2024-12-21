import { z } from 'zod';

export const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  triggers: z.array(z.object({
    type: z.enum(['schedule', 'event', 'webhook', 'user-input']),
    config: z.record(z.unknown()),
    conditions: z.array(z.object({
      field: z.string(),
      operator: z.string(),
      value: z.unknown()
    })).optional()
  })),
  actions: z.array(z.object({
    type: z.string(),
    service: z.enum(['zapier', 'openai', 'internal']),
    config: z.record(z.unknown()),
    fallback: z.object({
      type: z.string(),
      service: z.enum(['zapier', 'openai', 'internal']),
      config: z.record(z.unknown())
    }).optional()
  })),
  deploymentType: z.enum(['pwa', 'url', 'embedded']),
  status: z.enum(['active', 'draft', 'archived'])
});

export type Workflow = z.infer<typeof WorkflowSchema>;

export interface ExecutionContext {
  workflowId: string;
  triggerId?: string;
  input?: Record<string, unknown>;
  userId?: string;
  timestamp: Date;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}