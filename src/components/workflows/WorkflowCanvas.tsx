import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  NodeTypes,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TriggerNode } from './nodes/TriggerNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode
};

interface WorkflowCanvasProps {
  workflow: {
    nodes: Node[];
    edges: Edge[];
  };
  onWorkflowChange: (workflow: any) => void;
  onElementSelect: (element: any) => void;
}

export function WorkflowCanvas({
  workflow,
  onWorkflowChange,
  onElementSelect
}: WorkflowCanvasProps) {
  const { project } = useReactFlow();

  const onConnect = useCallback((params: Connection) => {
    const newEdge = {
      id: `e${workflow.edges.length + 1}`,
      source: params.source!,
      target: params.target!,
      type: 'smoothstep'
    };
    onWorkflowChange({
      ...workflow,
      edges: [...workflow.edges, newEdge]
    });
  }, [workflow, onWorkflowChange]);

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    const updatedNodes = workflow.nodes.map((n) => {
      if (n.id === node.id) {
        return { ...n, position: node.position };
      }
      return n;
    });
    onWorkflowChange({
      ...workflow,
      nodes: updatedNodes
    });
  }, [workflow, onWorkflowChange]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    onElementSelect(node);
  }, [onElementSelect]);

  const onPaneClick = useCallback(() => {
    onElementSelect(null);
  }, [onElementSelect]);

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={workflow.nodes}
        edges={workflow.edges}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}