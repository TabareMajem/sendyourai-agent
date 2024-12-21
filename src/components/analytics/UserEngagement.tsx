import React from 'react';
import { Users, Activity, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserEngagementProps {
  data: {
    activeUsers: {
      total: number;
      change: number;
    };
    featureAdoption: {
      feature: string;
      adoption: number;
    }[];
    sessionMetrics: {
      averageDuration: string;
      totalSessions: number;
    };
    topUsers: {
      name: string;
      activity: number;
      avatar: string;
    }[];
  };
}

export function UserEngagement({ data }: UserEngagementProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-indigo-600" />
        <h2 className="text-lg font-medium text-gray-900">User Engagement</h2>
      </div>

      {/* Active Users */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Active Users</span>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {data.activeUsers.total}
          </p>
          <p className={`text-sm ${
            data.activeUsers.change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {data.activeUsers.change >= 0 ? '+' : ''}{data.activeUsers.change}%
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Avg. Session Duration</span>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {data.sessionMetrics.averageDuration}
          </p>
          <p className="text-sm text-gray-500">
            {data.sessionMetrics.totalSessions} total sessions
          </p>
        </div>
      </div>

      {/* Feature Adoption */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Feature Adoption</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.featureAdoption}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="feature" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="adoption" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Users */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-4">Most Active Users</h3>
        <div className="space-y-4">
          {data.topUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {user.name}
                </span>
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">
                  {user.activity} actions
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}