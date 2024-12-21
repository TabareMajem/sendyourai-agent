import React from 'react';
import { X, Calendar, Target, Users, BarChart2, Clock, ArrowRight } from 'lucide-react';
import { Campaign } from '../../../../lib/agents/marketing/types';
import { CampaignPerformanceMetrics } from './CampaignPerformanceMetrics';
import { CampaignContentTimeline } from './CampaignContentTimeline';
import { CampaignInsights } from './CampaignInsights';

interface CampaignDetailViewProps {
  campaign: Campaign;
  onClose: () => void;
  onUpdateCampaign: (campaign: Campaign) => void;
}

export function CampaignDetailView({
  campaign,
  onClose,
  onUpdateCampaign
}: CampaignDetailViewProps) {
  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-3xl">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">{campaign.name}</h2>
                  <button
                    onClick={onClose}
                    className="rounded-md text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4">
                  {/* Overview Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Duration</span>
                      </div>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {campaign.duration} days
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <Target className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Goals</span>
                      </div>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {campaign.goals.length}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <Users className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Channels</span>
                      </div>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {campaign.channels.length}
                      </p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
                    <CampaignPerformanceMetrics campaign={campaign} />
                  </div>

                  {/* Content Timeline */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Content Timeline</h3>
                    <CampaignContentTimeline campaign={campaign} />
                  </div>

                  {/* AI Insights */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights</h3>
                    <CampaignInsights campaign={campaign} />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Last updated: {new Date(campaign.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {/* Handle edit */}}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Edit Campaign
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}