import { useState, useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { WorkflowEngine } from '../lib/workflows/WorkflowEngine';

export function useWorkflowEngine() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const engine = new WorkflowEngine();

  const executeWorkflow = useCallback(async (workflow: { nodes: Node[]; edges: Edge[] }, context?: any) => {
    setIsExecuting(true);
    setError(null);

    try {
      if (!engine.validateWorkflow(workflow)) {
        throw new Error('Invalid workflow configuration');
      }

      const results = await engine.executeWorkflow(workflow, context);
      return results;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  return {
    executeWorkflow,
    isExecuting,
    error
  };
}