import { useState, useEffect, useCallback } from 'react';
import { AIAgent } from '../lib/ai/AIAgent';
import { Action, Trigger } from '../lib/ai/types';

export function useAIAgent() {
  const [agent] = useState(() => new AIAgent());
  const [actions, setActions] = useState<Action[]>([]);
  const [triggers, setTriggers] = useState<Trigger[]>([]);

  useEffect(() => {
    // Cleanup function
    return () => {
      // Cleanup any active triggers or pending actions
    };
  }, []);

  const queueAction = useCallback(async (
    type: Action['type'],
    payload: Record<string, unknown>
  ) => {
    const action = await agent.queueAction(type, payload);
    setActions(prev => [...prev, action]);
    return action;
  }, [agent]);

  const addTrigger = useCallback((
    type: Trigger['type'],
    config: Record<string, unknown>
  ) => {
    const trigger = agent.addTrigger(type, config);
    setTriggers(prev => [...prev, trigger]);
    return trigger;
  }, [agent]);

  const removeTrigger = useCallback((triggerId: string) => {
    const success = agent.removeTrigger(triggerId);
    if (success) {
      setTriggers(prev => prev.filter(t => t.id !== triggerId));
    }
    return success;
  }, [agent]);

  const getActionStatus = useCallback((actionId: string) => {
    return agent.getActionStatus(actionId);
  }, [agent]);

  const getTriggerStatus = useCallback((triggerId: string) => {
    return agent.getTriggerStatus(triggerId);
  }, [agent]);

  return {
    actions,
    triggers,
    queueAction,
    addTrigger,
    removeTrigger,
    getActionStatus,
    getTriggerStatus
  };
}