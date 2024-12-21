import React from 'react';
import { Calendar, DollarSign, CheckCircle, XCircle, Download } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'succeeded' | 'failed' | 'refunded';
  description: string;
  invoice?: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
  onDownloadInvoice: (invoiceId: string) => void;
}

export function PaymentHistory({ payments, onDownloadInvoice }: PaymentHistoryProps) {
  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'refunded':
        return <DollarSign className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Payment History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {payment.description}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(payment.status)}
                    <span className="ml-2 text-sm font-medium capitalize text-gray-900">
                      {payment.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.invoice && (
                    <button
                      onClick={() => onDownloadInvoice(payment.invoice!)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}