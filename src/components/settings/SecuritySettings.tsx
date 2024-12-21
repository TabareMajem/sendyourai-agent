import React from 'react';
import { Shield, Smartphone, Key, Globe } from 'lucide-react';

interface SecuritySettingsProps {
  settings: any;
  onUpdate: (section: string, data: any) => void;
}

export function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account security and authentication methods
        </p>
      </div>

      <div className="border-t border-gray-200">
        {/* Two-Factor Authentication */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              {settings.security?.twoFactor ? 'Manage' : 'Enable'}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Password Requirements</h3>
          <div className="space-y-2">
            {[
              'At least 8 characters long',
              'Contains uppercase and lowercase letters',
              'Contains numbers and special characters',
              'Changed every 90 days'
            ].map((requirement, index) => (
              <div key={index} className="flex items-center">
                <Shield className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">{requirement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Active Sessions</h3>
          <div className="space-y-4">
            {[
              { device: 'MacBook Pro', location: 'San Francisco, US', lastActive: '2 minutes ago' },
              { device: 'iPhone 12', location: 'San Francisco, US', lastActive: '1 hour ago' }
            ].map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{session.device}</p>
                    <p className="text-xs text-gray-500">
                      {session.location} • Last active: {session.lastActive}
                    </p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  End Session
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Login History */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Login History</h3>
          <div className="space-y-4">
            {[
              { date: '2024-02-20 10:30 AM', location: 'San Francisco, US', status: 'Success' },
              { date: '2024-02-19 3:45 PM', location: 'San Francisco, US', status: 'Success' }
            ].map((login, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <Key className="w-5 h-5 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{login.date}</p>
                    <p className="text-xs text-gray-500">{login.location}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  login.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {login.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}