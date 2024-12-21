```typescript
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProjectAnalytics {
  overview: {
    totalTasks: number;
    completedTasks: number;
    onTrackPercentage: number;
    resourceUtilization: number;
    averageTaskCompletion: string;
    upcomingDeadlines: number;
  };
  taskProgress: Array<{
    date: string;
    completed: number;
    added: number;
  }>;
  resourceAllocation: Array<{
    resource: string;
    allocated: number;
    utilized: number;
  }>;
  riskMetrics: {
    highRiskTasks: number;
    delayedTasks: number;
    blockedTasks: number;
    upcomingDeadlines: Array<{
      task: string;
      dueDate: Date;
      assignee: string;
    }>;
  };
}

interface ProjectAnalyticsDashboardProps {
  analytics: ProjectAnalytics;
}

export function ProjectAnalyticsDashboard({ analytics }: ProjectAnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-500">Task Completion</span>
            </div>
            <span className="text-sm font-medium text-green-600">
              +{((analytics.overview.completedTasks / analytics.overview.totalTasks) * 100).toFixed(1)}%
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {analytics.overview.completedTasks}/{analytics.overview.totalTasks}
          </p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${(analytics.overview.completedTasks / analytics.overview.totalTasks) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm text-gray-500">On Track</span>
            </div>
            <span className="text-sm font-medium text-blue-600">
              {analytics.overview.onTrackPercentage}%
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {analytics.overview.onTrackPercentage}%
          </p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${analytics.overview.onTrackPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-sm text-gray-500">Resource Utilization</span>
            </div>
            <span className="text-sm font-medium text-purple-600">
              {analytics.overview.resourceUtilization}%
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {analytics.overview.resourceUtilization}%
          </p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${analytics.overview.resourceUtilization}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task Progress Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Task Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.taskProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" name="Completed Tasks" fill="#10B981" />
              <Bar dataKey="added" name="New Tasks" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Allocation</h3>
        <div className="space-y-4">
          {analytics.resourceAllocation.map((resource, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{resource.resource}</span>
                <span className="text-sm text-gray-500">
                  {resource.utilized}/{resource.allocated} hours
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${(resource.utilized / resource.allocated) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {analytics.riskMetrics.highRiskTasks}
              </p>
              <p className="text-sm text-gray-500">High Risk</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {analytics.riskMetrics.delayedTasks}
              </p>
              <p className="text-sm text-gray-500">Delayed</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {analytics.riskMetrics.blockedTasks}
              </p>
              <p className="text-sm text-gray-500">Blocked</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {analytics.riskMetrics.upcomingDeadlines.map((deadline, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{deadline.task}</p>
                  <p className="text-xs text-gray-500">Assigned to: {deadline.assignee}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {deadline.dueDate.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.ceil((deadline.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```