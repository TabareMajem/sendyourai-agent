import React from 'react';
import { BarChart2, TrendingUp, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '2024-02-14', users: 120, workflows: 45 },
  { date: '2024-02-15', users: 132, workflows: 52 },
  { date: '2024-02-16', users: 145, workflows: 58 },
  { date: '2024-02-17', users: 155, workflows: 63 },
  { date: '2024-02-18', users: 165, workflows: 70 },
  { date: '2024-02-19', users: 182, workflows: 75 },
  { date: '2024-02-20', users: 195, workflows: 82 }
];

export function AnalyticsOverview() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart2 className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Analytics Overview</h2>
          </div>
          <select className="text-sm border-gray-300 rounded-md">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Users className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-green-600">+12%</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">195</p>
            <p className="text-sm text-gray-500">Active Users</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-600">+8%</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">82</p>
            <p className="text-sm text-gray-500">Active Workflows</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-green-600">+15%</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">98.5%</p>
            <p className="text-sm text-gray-500">Uptime</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#4F46E5" name="Users" />
              <Bar dataKey="workflows" fill="#10B981" name="Workflows" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}