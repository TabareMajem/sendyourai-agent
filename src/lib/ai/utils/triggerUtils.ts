import { Trigger, TriggerSchema } from '../types';

export const validateTrigger = (trigger: unknown): boolean => {
  try {
    TriggerSchema.parse(trigger);
    return true;
  } catch {
    return false;
  }
};

export const formatTriggerType = (trigger: Trigger): string => {
  const typeMap = {
    schedule: 'Scheduled',
    event: 'Event-Based',
    condition: 'Conditional'
  };
  return typeMap[trigger.type];
};

export const getTriggerNextRun = (trigger: Trigger): Date | null => {
  if (trigger.type !== 'schedule') return null;
  
  const config = trigger.config as { frequency: string; time: string };
  const now = new Date();
  const [hours, minutes] = config.time.split(':').map(Number);
  
  const nextRun = new Date(now);
  nextRun.setHours(hours, minutes, 0, 0);
  
  if (nextRun < now) {
    nextRun.setDate(nextRun.getDate() + 1);
  }
  
  return nextRun;
};