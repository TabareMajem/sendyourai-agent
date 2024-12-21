import React from 'react';
import { DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Deal } from '../../../../lib/agents/sales/types';

interface DealBoardProps {
  deals: Deal[];
}

export function DealBoard({ deals }: DealBoardProps) {
  const stages = [
    { id: 'negotiating', title: 'Negotiating' },
    { id: 'won', title: 'Won' },
    { id: 'lost', title: 'Lost' }
  ];

  const getTotalValue = (status: Deal['status']) => {
    return deals
      .filter(deal => deal.status === status)
      .reduce((sum, deal) => sum + deal.value, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Deals</h2>
      </div>

      {/* Deal Summary */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-500">Won</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatCurrency(getTotalValue('won'))}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <span className="text-sm text-gray-500">Pipeline</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatCurrency(getTotalValue('negotiating'))}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-500">Avg. Time</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">14 days</p>
        </div>
      </div>

      {/* Deal Stages */}
      <div className="p-4 space-y-4">
        {stages.map((stage) => (
          <div key={stage.id}>
            <h3 className="text-sm font-medium text-gray-900 mb-2">{stage.title}</h3>
            <div className="space-y-2">
              {deals
                .filter(deal => deal.status === stage.id)
                .map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {deal.value > 50000 && (
                            <AlertCircle className="w-4 h-4 text-yellow-500 inline mr-1" />
                          )}
                          {formatCurrency(deal.value)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {deal.timeline[deal.timeline.length - 1]?.event}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {deal.documents.length} docs
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(deal.timeline[0].timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}