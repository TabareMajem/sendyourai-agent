import React, { useState } from 'react';
import { Users, UserPlus, Mail, Shield, X } from 'lucide-react';

interface TeamSettingsProps {
  settings: any;
  onUpdate: (section: string, data: any) => void;
}

export function TeamSettings({ settings, onUpdate }: TeamSettingsProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invite logic
    console.log('Inviting:', inviteEmail, 'with role:', inviteRole);
    setInviteEmail('');
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Team Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your team members and their roles
        </p>
      </div>

      <div className="border-t border-gray-200">
        {/* Invite Form */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Invite Team Members</h3>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="colleague@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Send Invitation
            </button>
          </form>
        </div>

        {/* Team Members List */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Current Team Members</h3>
          <div className="space-y-4">
            {[
              {
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'Admin',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              },
              {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                role: 'Member',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              }
            ].map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {member.role}
                  </span>
                  <button className="text-gray-400 hover:text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}