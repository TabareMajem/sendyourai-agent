import React from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';

interface ConditionNodeData {
  label: string;
  description: string;
}

interface ConditionNodeProps {
  data: ConditionNodeData;
}

export function ConditionNode({ data }: ConditionNodeProps) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-yellow-500">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="true" />
      <Handle type="source" position={Position.Bottom} id="false" />
      <div className="flex items-center">
        <GitBranch className="w-4 h-4 text-yellow-500 mr-2" />
        <div>
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">{data.description}</div>
        </div>
      </div>
    </div>
  );
}