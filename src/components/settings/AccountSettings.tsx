import React, { useState } from 'react';
import { Camera, Save } from 'lucide-react';

interface AccountSettingsProps {
  settings: any;
  onUpdate: (section: string, data: any) => void;
}

export function AccountSettings({ settings, onUpdate }: AccountSettingsProps) {
  const [formData, setFormData] = useState({
    name: settings.account?.name || '',
    email: settings.account?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate('account', formData);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and password
        </p>
      </div>

      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Profile Section */}
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={settings.account?.avatar || 'https://via.placeholder.com/100'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg">
                  <Camera className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="ml-6">
                <h3 className="text-sm font-medium text-gray-900">Profile Picture</h3>
                <p className="text-sm text-gray-500">
                  JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="px-6 py-4 space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-6 py-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}