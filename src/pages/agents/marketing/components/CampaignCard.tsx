import React from 'react';
import { Play, Pause, Settings, BarChart2, Calendar } from 'lucide-react';
import { Campaign } from '../../../../lib/agents/marketing/types';

interface CampaignCardProps {
  campaign: Campaign;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onConfigure: (id: string) => void;
  onViewAnalytics: (id: string) => void;
}

export function CampaignCard({
  campaign,
  onStart,
  onPause,
  onConfigure,
  onViewAnalytics
}: CampaignCardProps) {
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-indigo-600 transition-colors shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
          <p className="text-sm text-gray-500">
            {campaign.channels.join(', ')}
          </p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Duration</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {campaign.duration} days
          </p>
        </div>

        {campaign.metrics && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <BarChart2 className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">Engagement</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {Object.values(campaign.metrics.engagement).reduce((a, b) => a + b, 0)}
            </p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        {campaign.status !== 'active' ? (
          <button
            onClick={() => onStart(campaign.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </button>
        ) : (
          <button
            onClick={() => onPause(campaign.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </button>
        )}
        <button
          onClick={() => onConfigure(campaign.id)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </button>
        <button
          onClick={() => onViewAnalytics(campaign.id)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <BarChart2 className="w-4 h-4 mr-2" />
          Analytics
        </button>
      </div>
    </div>
  );
}