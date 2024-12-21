import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface PerformanceChartsProps {
  data: {
    workflowExecutions: {
      date: string;
      successful: number;
      failed: number;
    }[];
    responseTime: {
      date: string;
      value: number;
    }[];
  };
}

export function PerformanceCharts({ data }: PerformanceChartsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Performance Overview</h2>
      
      {/* Workflow Executions */}
      <div className="h-64 mb-8">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Workflow Executions</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.workflowExecutions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="successful" stackId="a" fill="#4F46E5" />
            <Bar dataKey="failed" stackId="a" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Response Time */}
      <div className="h-64">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Average Response Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.responseTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4F46E5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}