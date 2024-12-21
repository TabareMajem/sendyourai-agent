import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const mockData = [
  { date: '2024-02-14', requests: 1234 },
  { date: '2024-02-15', requests: 2341 },
  { date: '2024-02-16', requests: 1822 },
  { date: '2024-02-17', requests: 1925 },
  { date: '2024-02-18', requests: 2341 },
  { date: '2024-02-19', requests: 2455 },
  { date: '2024-02-20', requests: 2167 }
];

export function APIKeyUsage() {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Activity className="w-5 h-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">API Usage</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="requests" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}