import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout';
import { MarketingCampaignManager } from '../../../lib/agents/marketing/MarketingCampaignManager';
import { Campaign } from '../../../lib/agents/marketing/types';
import { Plus, Filter, Search } from 'lucide-react';

export function MarketingCampaignDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  const campaignManager = new MarketingCampaignManager();

  useEffect(() => {
    // Load campaigns
    setIsLoading(false);
  }, []);

  const handleCreateCampaign = async (campaignData: any) => {
    setIsLoading(true);
    try {
      const newCampaign = await campaignManager.createCampaign(campaignData);
      setCampaigns([...campaigns, newCampaign]);
      setShowNewCampaign(false);
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your AI-powered marketing campaigns
            </p>
          </div>
          <button
            onClick={() => setShowNewCampaign(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Campaign List */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new marketing campaign.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowNewCampaign(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Campaign cards will go here */}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}