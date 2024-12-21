import React, { useState } from 'react';
import { DollarSign, AlertTriangle, CheckCircle, Search } from 'lucide-react';

interface Refund {
  id: string;
  paymentId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

interface RefundManagementProps {
  refunds: Refund[];
  onProcessRefund: (paymentId: string, amount: number, reason: string) => Promise<void>;
}

export function RefundManagement({ refunds, onProcessRefund }: RefundManagementProps) {
  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessRefund = async (paymentId: string, amount: number, reason: string) => {
    try {
      setError(null);
      setIsProcessing(true);
      await onProcessRefund(paymentId, amount, reason);
      setSelectedRefund(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process refund');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Refund Management</h2>
      </div>

      <div className="p-6">
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search refunds..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Refunds List */}
        <div className="space-y-4">
          {refunds.map((refund) => (
            <div
              key={refund.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ${refund.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Payment ID: {refund.paymentId}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  refund.status === 'completed' ? 'bg-green-100 text-green-800' :
                  refund.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {refund.status === 'completed' && <CheckCircle className="w-4 h-4 mr-1" />}
                  {refund.status === 'failed' && <AlertTriangle className="w-4 h-4 mr-1" />}
                  {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                </span>
                <button
                  onClick={() => setSelectedRefund(refund)}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}