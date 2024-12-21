import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { AdminStats } from './components/AdminStats';
import { UserManagement } from './components/UserManagement';
import { PaymentOverview } from './components/PaymentOverview';
import { APIKeyManagement } from './components/APIKeyManagement';
import { SystemHealth } from './components/SystemHealth';
import { AnalyticsOverview } from './components/AnalyticsOverview';
import { TeamMembers } from './components/TeamMembers';
import { UserProfile } from './components/UserProfile';

export function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Overview Stats */}
        <AdminStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Analytics Overview */}
          <AnalyticsOverview />

          {/* Team Members */}
          <TeamMembers />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* User Management */}
          <UserManagement />

          {/* Payment Overview */}
          <PaymentOverview />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* API Key Management */}
          <APIKeyManagement />

          {/* System Health */}
          <SystemHealth />
        </div>
      </div>
    </DashboardLayout>
  );
}