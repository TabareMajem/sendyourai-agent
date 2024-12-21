import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

// Define schemas for type safety
const ActionSchema = z.object({
  id: z.string(),
  type: z.enum(['email', 'notification', 'task', 'analysis']),
  payload: z.record(z.unknown()),
  timestamp: z.date(),
  status: z.enum(['pending', 'running', 'completed', 'failed'])
});

const TriggerSchema = z.object({
  id: z.string(),
  type: z.enum(['schedule', 'event', 'condition']),
  config: z.record(z.unknown()),
  enabled: z.boolean(),
  lastTriggered: z.date().optional()
});

export type Action = z.infer<typeof ActionSchema>;
export type Trigger = z.infer<typeof TriggerSchema>;

export class AIAgent {
  private actions: Map<string, Action>;
  private triggers: Map<string, Trigger>;
  private executionQueue: string[];

  constructor() {
    this.actions = new Map();
    this.triggers = new Map();
    this.executionQueue = [];
  }

  // Trigger Management
  public addTrigger(type: Trigger['type'], config: Record<string, unknown>): Trigger {
    const trigger: Trigger = {
      id: uuidv4(),
      type,
      config,
      enabled: true,
      lastTriggered: new Date()
    };

    TriggerSchema.parse(trigger); // Validate trigger structure
    this.triggers.set(trigger.id, trigger);
    return trigger;
  }

  public removeTrigger(triggerId: string): boolean {
    return this.triggers.delete(triggerId);
  }

  public enableTrigger(triggerId: string): void {
    const trigger = this.triggers.get(triggerId);
    if (trigger) {
      trigger.enabled = true;
      this.triggers.set(triggerId, trigger);
    }
  }

  public disableTrigger(triggerId: string): void {
    const trigger = this.triggers.get(triggerId);
    if (trigger) {
      trigger.enabled = false;
      this.triggers.set(triggerId, trigger);
    }
  }

  // Action Management
  public async queueAction(type: Action['type'], payload: Record<string, unknown>): Promise<Action> {
    const action: Action = {
      id: uuidv4(),
      type,
      payload,
      timestamp: new Date(),
      status: 'pending'
    };

    ActionSchema.parse(action); // Validate action structure
    this.actions.set(action.id, action);
    this.executionQueue.push(action.id);
    
    // Start processing the queue if it's not already running
    this.processQueue();
    
    return action;
  }

  private async processQueue(): Promise<void> {
    while (this.executionQueue.length > 0) {
      const actionId = this.executionQueue[0];
      const action = this.actions.get(actionId);
      
      if (action) {
        try {
          action.status = 'running';
          this.actions.set(actionId, action);
          
          await this.executeAction(action);
          
          action.status = 'completed';
          this.actions.set(actionId, action);
        } catch (error) {
          action.status = 'failed';
          this.actions.set(actionId, action);
          console.error(`Failed to execute action ${actionId}:`, error);
        }
      }
      
      this.executionQueue.shift(); // Remove the processed action
    }
  }

  private async executeAction(action: Action): Promise<void> {
    switch (action.type) {
      case 'email':
        await this.sendEmail(action.payload);
        break;
      case 'notification':
        await this.sendNotification(action.payload);
        break;
      case 'task':
        await this.createTask(action.payload);
        break;
      case 'analysis':
        await this.performAnalysis(action.payload);
        break;
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  }

  // Action Implementation Methods
  private async sendEmail(payload: Record<string, unknown>): Promise<void> {
    // Implement email sending logic
    console.log('Sending email:', payload);
  }

  private async sendNotification(payload: Record<string, unknown>): Promise<void> {
    // Implement notification sending logic
    console.log('Sending notification:', payload);
  }

  private async createTask(payload: Record<string, unknown>): Promise<void> {
    // Implement task creation logic
    console.log('Creating task:', payload);
  }

  private async performAnalysis(payload: Record<string, unknown>): Promise<void> {
    // Implement analysis logic
    console.log('Performing analysis:', payload);
  }

  // Utility Methods
  public getActionStatus(actionId: string): Action['status'] | undefined {
    return this.actions.get(actionId)?.status;
  }

  public getTriggerStatus(triggerId: string): boolean | undefined {
    return this.triggers.get(triggerId)?.enabled;
  }
}