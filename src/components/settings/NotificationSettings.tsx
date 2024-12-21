import React from 'react';
import { Bell, Mail, MessageSquare, Globe } from 'lucide-react';

interface NotificationSettingsProps {
  settings: any;
  onUpdate: (section: string, data: any) => void;
}

export function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
  const handleToggle = (channel: string, value: boolean) => {
    onUpdate('notifications', {
      ...settings.notifications,
      [channel]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage how and when you receive notifications
        </p>
      </div>

      <div className="border-t border-gray-200">
        <div className="p-6 space-y-6">
          {/* Email Notifications */}
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.email}
                onChange={(e) => handleToggle('email', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via SMS</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.sms}
                onChange={(e) => handleToggle('sms', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>

          {/* In-App Notifications */}
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">In-App Notifications</p>
                <p className="text-sm text-gray-500">Receive updates within the app</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.inApp}
                onChange={(e) => handleToggle('inApp', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Browser Notifications */}
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Browser Notifications</p>
                <p className="text-sm text-gray-500">Receive desktop notifications</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications?.browser}
                onChange={(e) => handleToggle('browser', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}