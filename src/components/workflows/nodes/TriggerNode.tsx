import React from 'react';
import { Handle, Position } from 'reactflow';
import { Play } from 'lucide-react';

interface TriggerNodeData {
  label: string;
  description: string;
}

interface TriggerNodeProps {
  data: TriggerNodeData;
}

export function TriggerNode({ data }: TriggerNodeProps) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-blue-500">
      <Handle type="source" position={Position.Right} />
      <div className="flex items-center">
        <Play className="w-4 h-4 text-blue-500 mr-2" />
        <div>
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">{data.description}</div>
        </div>
      </div>
    </div>
  );
}