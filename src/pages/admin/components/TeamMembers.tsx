import React from 'react';
import { Users, Plus, Settings } from 'lucide-react';

const mockTeamMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    avatar: 'JD',
    lastActive: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    avatar: 'JS',
    lastActive: '5 minutes ago'
  }
];

export function TeamMembers() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Team Members</h2>
          </div>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-1" />
            Add Member
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {mockTeamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">{member.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">
                  Active {member.lastActive}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                  {member.role}
                </span>
                <button className="text-gray-400 hover:text-gray-500">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}