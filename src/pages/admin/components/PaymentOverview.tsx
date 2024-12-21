import React from 'react';
import { CreditCard, DollarSign, TrendingUp } from 'lucide-react';

interface Transaction {
  id: string;
  user: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  plan: string;
}

export function PaymentOverview() {
  const transactions: Transaction[] = [
    {
      id: '1',
      user: 'John Doe',
      amount: 49.99,
      status: 'completed',
      date: '2024-02-20 10:30 AM',
      plan: 'Pro'
    },
    {
      id: '2',
      user: 'Jane Smith',
      amount: 199.99,
      status: 'completed',
      date: '2024-02-20 09:15 AM',
      plan: 'Enterprise'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Payment Overview</h2>
          </div>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-medium text-gray-500">Revenue</span>
              </div>
              <span className="text-sm text-green-600">+12%</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">$45,678</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-500">Subscriptions</span>
              </div>
              <span className="text-sm text-blue-600">+8%</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">1,234</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.plan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}