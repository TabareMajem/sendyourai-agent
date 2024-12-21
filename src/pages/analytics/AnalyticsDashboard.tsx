import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { OverviewMetrics } from '../../components/analytics/OverviewMetrics';
import { TimeRangeSelector } from '../../components/analytics/TimeRangeSelector';
import { PerformanceCharts } from '../../components/analytics/PerformanceCharts';
import { WorkflowAnalytics } from '../../components/analytics/WorkflowAnalytics';
import { AIPerformance } from '../../components/analytics/AIPerformance';
import { UserEngagement } from '../../components/analytics/UserEngagement';
import { useAnalytics } from '../../hooks/useAnalytics';

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });

  const { data, isLoading, error } = useAnalytics(timeRange);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-600">
          Error loading analytics: {error.message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <TimeRangeSelector
            value={timeRange}
            onChange={setTimeRange}
          />
        </div>

        {/* Overview Metrics */}
        <OverviewMetrics data={data.overview} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceCharts data={data.performance} />
          <WorkflowAnalytics data={data.workflows} />
        </div>

        {/* AI and User Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIPerformance data={data.ai} />
          <UserEngagement data={data.engagement} />
        </div>
      </div>
    </DashboardLayout>
  );
}