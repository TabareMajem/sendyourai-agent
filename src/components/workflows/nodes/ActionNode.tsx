import React from 'react';
import { Handle, Position } from 'reactflow';
import { Zap } from 'lucide-react';

interface ActionNodeData {
  label: string;
  description: string;
}

interface ActionNodeProps {
  data: ActionNodeData;
}

export function ActionNode({ data }: ActionNodeProps) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-green-500">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center">
        <Zap className="w-4 h-4 text-green-500 mr-2" />
        <div>
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">{data.description}</div>
        </div>
      </div>
    </div>
  );
}