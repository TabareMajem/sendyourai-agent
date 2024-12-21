import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Clock } from 'lucide-react';

const mockData = {
  conversionRates: [
    { month: 'Jan', rate: 45 },
    { month: 'Feb', rate: 52 },
    { month: 'Mar', rate: 48 },
    { month: 'Apr', rate: 58 },
    { month: 'May', rate: 62 },
    { month: 'Jun', rate: 65 }
  ],
  metrics: {
    revenue: 125000,
    deals: 45,
    avgDealSize: 2777,
    conversionRate: 28,
    avgSalesTime: 14
  }
};

export function PerformanceMetrics() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Performance Metrics</h2>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-500">Revenue</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              ${mockData.metrics.revenue.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-green-600">+12% from last month</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span className="text-sm text-gray-500">Conversion Rate</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {mockData.metrics.conversionRate}%
            </p>
            <p className="mt-1 text-sm text-indigo-600">+5% from last month</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-500">Deals Closed</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {mockData.metrics.deals}
            </p>
            <p className="mt-1 text-sm text-blue-600">+8% from last month</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-500">Avg. Sales Cycle</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {mockData.metrics.avgSalesTime} days
            </p>
            <p className="mt-1 text-sm text-yellow-600">-2 days from last month</p>
          </div>
        </div>

        {/* Conversion Rate Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Conversion Rate Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.conversionRates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Sales by Channel</h3>
            <div className="space-y-4">
              {[
                { channel: 'Direct Outreach', value: 45 },
                { channel: 'Inbound Leads', value: 30 },
                { channel: 'Referrals', value: 25 }
              ].map((item) => (
                <div key={item.channel}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.channel}</span>
                    <span className="font-medium text-gray-900">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Deal Size Distribution</h3>
            <div className="space-y-4">
              {[
                { range: '$0 - $10k', value: 35 },
                { range: '$10k - $50k', value: 45 },
                { range: '$50k+', value: 20 }
              ].map((item) => (
                <div key={item.range}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.range}</span>
                    <span className="font-medium text-gray-900">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}