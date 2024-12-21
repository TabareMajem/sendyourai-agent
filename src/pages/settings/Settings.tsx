import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { SettingsSidebar } from '../../components/settings/SettingsSidebar';
import { AccountSettings } from '../../components/settings/AccountSettings';
import { NotificationSettings } from '../../components/settings/NotificationSettings';
import { BillingSettings } from '../../components/settings/BillingSettings';
import { APISettings } from '../../components/settings/APISettings';
import { SecuritySettings } from '../../components/settings/SecuritySettings';
import { AISettings } from '../../components/settings/AISettings';
import { ComplianceSettings } from '../../components/settings/ComplianceSettings';
import { useSettings } from '../../hooks/useSettings';

export function Settings() {
  const [activeSection, setActiveSection] = useState('account');
  const { settings, isLoading, error, updateSettings } = useSettings();

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
          Error loading settings: {error.message}
        </div>
      </DashboardLayout>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSettings settings={settings} onUpdate={updateSettings} />;
      case 'notifications':
        return <NotificationSettings settings={settings} onUpdate={updateSettings} />;
      case 'billing':
        return <BillingSettings settings={settings} onUpdate={updateSettings} />;
      case 'api':
        return <APISettings settings={settings} onUpdate={updateSettings} />;
      case 'security':
        return <SecuritySettings settings={settings} onUpdate={updateSettings} />;
      case 'ai':
        return <AISettings settings={settings} onUpdate={updateSettings} />;
      case 'compliance':
        return <ComplianceSettings settings={settings} onUpdate={updateSettings} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <SettingsSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            <div className="flex-1">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}