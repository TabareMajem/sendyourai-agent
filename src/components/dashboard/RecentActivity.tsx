import React from 'react';
import { Activity, User, Bot, Workflow } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      type: 'workflow',
      title: 'Customer Onboarding Workflow',
      description: 'Successfully processed new customer',
      time: '2 minutes ago',
      icon: Workflow
    },
    {
      type: 'ai',
      title: 'AI Optimization',
      description: 'Suggested workflow improvements',
      time: '15 minutes ago',
      icon: Bot
    },
    {
      type: 'user',
      title: 'Team Member Action',
      description: 'Sarah modified invoice workflow',
      time: '1 hour ago',
      icon: User
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className={`p-2 rounded-lg ${
              activity.type === 'workflow' ? 'bg-blue-100' :
              activity.type === 'ai' ? 'bg-green-100' : 'bg-purple-100'
            }`}>
              <activity.icon className={`w-5 h-5 ${
                activity.type === 'workflow' ? 'text-blue-600' :
                activity.type === 'ai' ? 'text-green-600' : 'text-purple-600'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{activity.title}</h3>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}