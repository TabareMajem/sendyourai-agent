import React from 'react';
import { CreditCard, Package, Calendar, Download } from 'lucide-react';

interface BillingSettingsProps {
  settings: any;
  onUpdate: (section: string, data: any) => void;
}

export function BillingSettings({ settings, onUpdate }: BillingSettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Billing Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and payment methods
        </p>
      </div>

      <div className="border-t border-gray-200">
        {/* Current Plan */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Current Plan</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-indigo-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{settings.billing?.plan}</p>
                  <p className="text-sm text-gray-500">Next billing date: {settings.billing?.nextBilling}</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Change Plan
              </button>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Payment Method</h3>
          {settings.billing?.paymentMethod ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Update
                </button>
              </div>
            </div>
          ) : (
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <CreditCard className="w-4 h-4 mr-2" />
              Add Payment Method
            </button>
          )}
        </div>

        {/* Billing History */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Billing History</h3>
          <div className="space-y-4">
            {[
              { date: '2024-02-01', amount: '$49.00', status: 'Paid' },
              { date: '2024-01-01', amount: '$49.00', status: 'Paid' },
              { date: '2023-12-01', amount: '$49.00', status: 'Paid' }
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                    <p className="text-sm text-gray-500">{invoice.amount}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {invoice.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}