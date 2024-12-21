import { Action } from '../types';

export const isActionComplete = (action: Action): boolean => {
  return action.status === 'completed';
};

export const isActionFailed = (action: Action): boolean => {
  return action.status === 'failed';
};

export const isActionPending = (action: Action): boolean => {
  return action.status === 'pending';
};

export const formatActionStatus = (action: Action): string => {
  const statusMap = {
    pending: 'Pending',
    running: 'In Progress',
    completed: 'Completed',
    failed: 'Failed'
  };
  return statusMap[action.status];
};

export const getActionDuration = (action: Action): number | null => {
  if (action.status !== 'completed') return null;
  return new Date().getTime() - action.timestamp.getTime();
};