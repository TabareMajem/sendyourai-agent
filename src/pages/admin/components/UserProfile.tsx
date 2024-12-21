import React from 'react';
import { User, Mail, Building2, MapPin } from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    company: string;
    location: string;
    avatar: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-2xl font-medium text-indigo-600">{user.avatar}</span>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <span className="text-gray-900">{user.email}</span>
        </div>

        <div className="flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-gray-400" />
          <span className="text-gray-900">{user.company}</span>
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-gray-400" />
          <span className="text-gray-900">{user.location}</span>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Edit Profile
        </button>
      </div>
    </div>
  );
}