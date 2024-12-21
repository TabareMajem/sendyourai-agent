import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRight } from 'lucide-react';

interface WorkflowAnalyticsProps {
  data: {
    topWorkflows: {
      name: string;
      executions: number;
      successRate: number;
    }[];
    workflowTypes: {
      name: string;
      value: number;
    }[];
  };
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#6366F1', '#EC4899'];

export function WorkflowAnalytics({ data }: WorkflowAnalyticsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Workflow Analytics</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Top Workflows */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Top Workflows</h3>
          <div className="space-y-4">
            {data.topWorkflows.map((workflow, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{workflow.name}</p>
                  <p className="text-xs text-gray-500">{workflow.executions} executions</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {workflow.successRate}%
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Types Distribution */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Workflow Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.workflowTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.workflowTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {data.workflowTypes.map((type, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-gray-600">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}