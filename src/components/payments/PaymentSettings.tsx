import React, { useState } from 'react';
import { CreditCard, Bell, Settings, AlertTriangle } from 'lucide-react';

interface PaymentSettingsProps {
  settings: {
    automaticPayments: boolean;
    paymentReminders: boolean;
    reminderDays: number;
    defaultCurrency: string;
  };
  onUpdate: (settings: any) => Promise<void>;
}

export function PaymentSettings({ settings, onUpdate }: PaymentSettingsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (updates: Partial<typeof settings>) => {
    try {
      setError(null);
      setIsUpdating(true);
      await onUpdate({ ...settings, ...updates });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Settings className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Payment Settings</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Automatic Payments */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">
                Automatic Payments
              </label>
              <p className="text-sm text-gray-500">
                Automatically process recurring payments
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.automaticPayments}
                onChange={(e) => handleUpdate({ automaticPayments: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        {/* Payment Reminders */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">
                Payment Reminders
              </label>
              <p className="text-sm text-gray-500">
                Send reminders before payment due dates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.paymentReminders}
                onChange={(e) => handleUpdate({ paymentReminders: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {settings.paymentReminders && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">
                Reminder Days Before Due Date
              </label>
              <select
                value={settings.reminderDays}
                onChange={(e) => handleUpdate({ reminderDays: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={1}>1 day</option>
                <option value={3}>3 days</option>
                <option value={5}>5 days</option>
                <option value={7}>7 days</option>
              </select>
            </div>
          )}
        </div>

        {/* Default Currency */}
        <div>
          <label className="text-sm font-medium text-gray-900">
            Default Currency
          </label>
          <select
            value={settings.defaultCurrency}
            onChange={(e) => handleUpdate({ defaultCurrency: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
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