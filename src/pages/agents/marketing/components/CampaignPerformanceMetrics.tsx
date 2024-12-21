import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Campaign } from '../../../../lib/agents/marketing/types';

interface CampaignPerformanceMetricsProps {
  campaign: Campaign;
}

export function CampaignPerformanceMetrics({ campaign }: CampaignPerformanceMetricsProps) {
  // Transform metrics data for the chart
  const engagementData = campaign.metrics?.engagement
    ? Object.entries(campaign.metrics.engagement).map(([channel, value]) => ({
        channel,
        engagement: value
      }))
    : [];

  const conversionData = campaign.metrics?.conversions
    ? Object.entries(campaign.metrics.conversions).map(([channel, value]) => ({
        channel,
        conversions: value
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* Engagement Chart */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Engagement by Channel</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagement" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversions Chart */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Conversions by Channel</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="conversions" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI and Other Metrics */}
      {campaign.metrics?.roi && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Campaign ROI</h4>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">
                {campaign.metrics.roi.toFixed(2)}%
              </p>
              <p className="text-sm text-gray-500">Return on Investment</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}