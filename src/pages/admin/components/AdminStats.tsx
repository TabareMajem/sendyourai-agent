import React from 'react';
import { Users, CreditCard, Key, Activity } from 'lucide-react';

interface Stat {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
}

export function AdminStats() {
  const stats: Stat[] = [
    {
      name: 'Total Users',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: Users
    },
    {
      name: 'Monthly Revenue',
      value: '$45,678',
      change: '+8%',
      changeType: 'increase',
      icon: CreditCard
    },
    {
      name: 'Active API Keys',
      value: '156',
      change: '+5%',
      changeType: 'increase',
      icon: Key
    },
    {
      name: 'System Uptime',
      value: '99.9%',
      change: '0%',
      changeType: 'neutral',
      icon: Activity
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' :
                stat.changeType === 'decrease' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        );
      })}
    </div>
  );
}