```typescript
import React from 'react';
import { TrendingUp, MessageSquare, Users, CheckCircle } from 'lucide-react';

interface FollowUpStats {
  responseRate: number;
  responseRateChange: number;
  averageResponseTime: string;
  completionRate: number;
  patientEngagement: number;
  communicationChannels: {
    name: string;
    usage: number;
    effectiveness: number;
  }[];
}

interface FollowUpEffectivenessProps {
  stats: FollowUpStats;
  className?: string;
}

export function FollowUpEffectiveness({ stats, className = '' }: FollowUpEffectivenessProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Follow-up Effectiveness</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Metrics */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Response Rate</span>
              <span className={`text-sm font-medium ${
                stats.responseRateChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.responseRateChange > 0 ? '+' : ''}{stats.responseRateChange}%
              </span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${stats.responseRate}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {stats.responseRate}% of patients respond to follow-ups
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Average Response Time</span>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.averageResponseTime}</p>
            <p className="mt-2 text-sm text-gray-500">
              Average time for patient response
            </p>
          </div>
        </div>

        {/* Communication Channels */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Channel Effectiveness</h4>
          <div className="space-y-4">
            {stats.communicationChannels.map((channel) => (
              <div key={channel.name} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{channel.name}</span>
                  <span className="text-sm text-gray-500">{channel.usage}% usage</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${channel.effectiveness}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {channel.effectiveness}% effectiveness rate
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```