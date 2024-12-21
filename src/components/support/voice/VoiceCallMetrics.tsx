```typescript
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Phone, PhoneOff, TrendingUp } from 'lucide-react';

interface CallMetrics {
  totalCalls: number;
  averageDuration: string;
  successRate: number;
  callsByDay: Array<{
    date: string;
    incoming: number;
    outgoing: number;
  }>;
}

interface VoiceCallMetricsProps {
  metrics: CallMetrics;
}

export function VoiceCallMetrics({ metrics }: VoiceCallMetricsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Call Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <Phone className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-500">Total Calls</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.totalCalls}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">Avg Duration</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.averageDuration}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">Success Rate</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.successRate}%
          </p>
        </div>
      </div>

      <div className="h-64">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Calls by Day</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={metrics.callsByDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="incoming" name="Incoming" fill="#4F46E5" />
            <Bar dataKey="outgoing" name="Outgoing" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```