import React from 'react';
import { Activity, FileText, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityAnalyticsProps {
  data: {
    documentStats: {
      total: number;
      drafts: number;
      inReview: number;
      completed: number;
    };
    recentActivity: Array<{
      id: string;
      type: string;
      description: string;
      timestamp: string;
    }>;
    timeline: Array<{
      date: string;
      documents: number;
      reviews: number;
    }>;
  };
}

export function ActivityAnalytics({ data }: ActivityAnalyticsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Activity & Analytics</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Document Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-500">Documents</span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {data.documentStats.total}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Activity className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-500">In Progress</span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {data.documentStats.inReview}
            </p>
          </div>
        </div>

        {/* Activity Timeline */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {data.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Activity Overview</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="documents" fill="#4F46E5" name="Documents" />
                <Bar dataKey="reviews" fill="#10B981" name="Reviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}