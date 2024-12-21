```typescript
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Users, FileText, AlertTriangle } from 'lucide-react';

interface DocumentAnalytics {
  overview: {
    totalDocuments: number;
    activeReviews: number;
    averageCompletionTime: string;
    documentsByStatus: {
      draft: number;
      review: number;
      approved: number;
      published: number;
    };
  };
  timeline: Array<{
    date: string;
    created: number;
    completed: number;
  }>;
  userActivity: Array<{
    user: {
      name: string;
      avatar: string;
    };
    documentsCreated: number;
    documentsReviewed: number;
    averageReviewTime: string;
  }>;
  documentTypes: Array<{
    type: string;
    count: number;
    percentageChange: number;
  }>;
  recentAlerts: Array<{
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: Date;
  }>;
}

interface DocumentAnalyticsDashboardProps {
  analytics: DocumentAnalytics;
}

export function DocumentAnalyticsDashboard({ analytics }: DocumentAnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-500">Total Documents</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {analytics.overview.totalDocuments}
          </p>
          <div className="mt-2 flex items-center text-sm">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{
                  width: `${(analytics.overview.documentsByStatus.published / analytics.overview.totalDocuments) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">Active Reviews</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {analytics.overview.activeReviews}
          </p>
          <p className="mt-2 text-sm text-green-600">
            +12% from last month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">Avg. Completion Time</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {analytics.overview.averageCompletionTime}
          </p>
          <p className="mt-2 text-sm text-blue-600">
            -8% from last month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-500">Document Status</span>
          </div>
          <div className="mt-2 space-y-2">
            {Object.entries(analytics.overview.documentsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm capitalize text-gray-600">{status}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Document Activity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.timeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="created" name="Created" fill="#4F46E5" />
              <Bar dataKey="completed" name="Completed" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
        <div className="space-y-4">
          {analytics.userActivity.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={user.user.avatar}
                  alt={user.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.user.name}</p>
                  <p className="text-xs text-gray-500">
                    Avg. Review Time: {user.averageReviewTime}
                  </p>
                </div>
              </div>
              <div className="flex space-x-8">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{user.documentsCreated}</p>
                  <p className="text-xs text-gray-500">Created</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{user.documentsReviewed}</p>
                  <p className="text-xs text-gray-500">Reviewed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Types */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Document Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.documentTypes.map((type, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{type.type}</span>
                <span className={`text-sm font-medium ${
                  type.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {type.percentageChange >= 0 ? '+' : ''}{type.percentageChange}%
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{type.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h3>
        <div className="space-y-4">
          {analytics.recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg flex items-start space-x-3 ${
                alert.type === 'error'
                  ? 'bg-red-50'
                  : alert.type === 'warning'
                  ? 'bg-yellow-50'
                  : 'bg-blue-50'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 ${
                alert.type === 'error'
                  ? 'text-red-400'
                  : alert.type === 'warning'
                  ? 'text-yellow-400'
                  : 'text-blue-400'
              }`} />
              <div>
                <p className={`text-sm font-medium ${
                  alert.type === 'error'
                    ? 'text-red-800'
                    : alert.type === 'warning'
                    ? 'text-yellow-800'
                    : 'text-blue-800'
                }`}>
                  {alert.message}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {alert.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```