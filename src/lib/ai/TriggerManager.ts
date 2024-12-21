import { z } from 'zod';
import { AIAgent, Trigger } from './AIAgent';

const TriggerConditionSchema = z.object({
  field: z.string(),
  operator: z.enum(['equals', 'notEquals', 'contains', 'greaterThan', 'lessThan']),
  value: z.unknown()
});

const TriggerScheduleSchema = z.object({
  frequency: z.enum(['once', 'daily', 'weekly', 'monthly']),
  time: z.string(), // HH:mm format
  timezone: z.string().optional()
});

export type TriggerCondition = z.infer<typeof TriggerConditionSchema>;
export type TriggerSchedule = z.infer<typeof TriggerScheduleSchema>;

export class TriggerManager {
  private agent: AIAgent;
  private scheduleIntervals: Map<string, NodeJS.Timeout>;

  constructor(agent: AIAgent) {
    this.agent = agent;
    this.scheduleIntervals = new Map();
  }

  public setupScheduleTrigger(config: TriggerSchedule): string {
    TriggerScheduleSchema.parse(config);
    
    const trigger = this.agent.addTrigger('schedule', config);
    this.setupScheduleInterval(trigger);
    
    return trigger.id;
  }

  public setupEventTrigger(eventType: string, conditions: TriggerCondition[]): string {
    conditions.forEach(condition => TriggerConditionSchema.parse(condition));
    
    return this.agent.addTrigger('event', { eventType, conditions }).id;
  }

  public setupConditionTrigger(conditions: TriggerCondition[]): string {
    conditions.forEach(condition => TriggerConditionSchema.parse(condition));
    
    return this.agent.addTrigger('condition', { conditions }).id;
  }

  private setupScheduleInterval(trigger: Trigger): void {
    if (trigger.type !== 'schedule') return;

    const config = trigger.config as TriggerSchedule;
    let interval: number;

    switch (config.frequency) {
      case 'daily':
        interval = 24 * 60 * 60 * 1000; // 24 hours
        break;
      case 'weekly':
        interval = 7 * 24 * 60 * 60 * 1000; // 7 days
        break;
      case 'monthly':
        interval = 30 * 24 * 60 * 60 * 1000; // ~30 days
        break;
      case 'once':
        // Calculate time until scheduled time
        const scheduledTime = new Date();
        const [hours, minutes] = config.time.split(':').map(Number);
        scheduledTime.setHours(hours, minutes, 0, 0);
        
        if (scheduledTime < new Date()) {
          scheduledTime.setDate(scheduledTime.getDate() + 1);
        }
        
        interval = scheduledTime.getTime() - new Date().getTime();
        break;
      default:
        throw new Error(`Unsupported frequency: ${config.frequency}`);
    }

    const timeoutId = setInterval(() => {
      if (this.agent.getTriggerStatus(trigger.id)) {
        this.executeTrigger(trigger);
      }
    }, interval);

    this.scheduleIntervals.set(trigger.id, timeoutId);
  }

  private async executeTrigger(trigger: Trigger): Promise<void> {
    try {
      switch (trigger.type) {
        case 'schedule':
          await this.executeScheduledTrigger(trigger);
          break;
        case 'event':
          await this.executeEventTrigger(trigger);
          break;
        case 'condition':
          await this.executeConditionTrigger(trigger);
          break;
      }
    } catch (error) {
      console.error(`Failed to execute trigger ${trigger.id}:`, error);
    }
  }

  private async executeScheduledTrigger(trigger: Trigger): Promise<void> {
    // Execute scheduled actions
    await this.agent.queueAction('task', {
      type: 'scheduled',
      triggerId: trigger.id,
      timestamp: new Date()
    });
  }

  private async executeEventTrigger(trigger: Trigger): Promise<void> {
    // Execute event-based actions
    await this.agent.queueAction('notification', {
      type: 'event',
      triggerId: trigger.id,
      timestamp: new Date()
    });
  }

  private async executeConditionTrigger(trigger: Trigger): Promise<void> {
    // Execute condition-based actions
    await this.agent.queueAction('analysis', {
      type: 'condition',
      triggerId: trigger.id,
      timestamp: new Date()
    });
  }

  public cleanup(): void {
    // Clear all intervals when cleaning up
    for (const [triggerId, intervalId] of this.scheduleIntervals) {
      clearInterval(intervalId);
      this.scheduleIntervals.delete(triggerId);
    }
  }
}