import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { ActiveWorkflows } from '../../components/dashboard/ActiveWorkflows';
import { AIInsights } from '../../components/dashboard/AIInsights';
import { PerformanceMetrics } from '../../components/dashboard/PerformanceMetrics';
import { RecentActivity } from '../../components/dashboard/RecentActivity';

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6">
        <QuickActions />
        <ActiveWorkflows />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIInsights />
          <PerformanceMetrics />
        </div>
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}