```typescript
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react';

interface SalesMetrics {
  conversionRate: number;
  averageDealSize: number;
  salesCycle: number;
  revenueGrowth: number;
  leadsGenerated: number;
  meetings: number;
  performance: Array<{
    date: string;
    deals: number;
    revenue: number;
  }>;
}

interface SalesPerformanceMetricsProps {
  metrics: SalesMetrics;
}

export function SalesPerformanceMetrics({ metrics }: SalesPerformanceMetricsProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <TrendingUp className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Sales Performance</h2>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-500">Avg Deal Size</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              ${metrics.averageDealSize.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-green-600">+12% from last month</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span className="text-sm text-gray-500">Conversion Rate</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {metrics.conversionRate}%
            </p>
            <p className="mt-1 text-sm text-indigo-600">+5% from last month</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-500">Leads Generated</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {metrics.leadsGenerated}
            </p>
            <p className="mt-1 text-sm text-blue-600">+8% from last month</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-500">Avg Sales Cycle</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {metrics.salesCycle} days
            </p>
            <p className="mt-1 text-sm text-yellow-600">-2 days from last month</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Performance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
                <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                <Tooltip />
                <Bar dataKey="deals" yAxisId="left" fill="#4F46E5" name="Deals" />
                <Bar dataKey="revenue" yAxisId="right" fill="#10B981" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
```