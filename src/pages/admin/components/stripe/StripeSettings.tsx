```typescript
import React, { useState } from 'react';
import { CreditCard, Key, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface StripeSettingsProps {
  settings: {
    publicKey?: string;
    secretKey?: string;
    webhookSecret?: string;
    mode: 'test' | 'live';
  };
  onUpdate: (settings: any) => void;
}

export function StripeSettings({ settings, onUpdate }: StripeSettingsProps) {
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);

  const handleModeChange = (mode: 'test' | 'live') => {
    onUpdate({ ...settings, mode });
  };

  const handleKeyChange = (key: string, value: string) => {
    onUpdate({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <CreditCard className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Stripe Configuration</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Mode Selection */}
        <div>
          <label className="text-sm font-medium text-gray-700">Environment</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={settings.mode === 'test'}
                onChange={() => handleModeChange('test')}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">Test Mode</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={settings.mode === 'live'}
                onChange={() => handleModeChange('live')}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">Live Mode</span>
            </label>
          </div>
        </div>

        {/* API Keys */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Public Key
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={settings.publicKey || ''}
                onChange={(e) => handleKeyChange('publicKey', e.target.value)}
                placeholder={`${settings.mode === 'test' ? 'pk_test_' : 'pk_live_'}...`}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Secret Key
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showSecretKey ? 'text' : 'password'}
                value={settings.secretKey || ''}
                onChange={(e) => handleKeyChange('secretKey', e.target.value)}
                placeholder={`${settings.mode === 'test' ? 'sk_test_' : 'sk_live_'}...`}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showSecretKey ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webhook Secret
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showWebhookSecret ? 'text' : 'password'}
                value={settings.webhookSecret || ''}
                onChange={(e) => handleKeyChange('webhookSecret', e.target.value)}
                placeholder="whsec_..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showWebhookSecret ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Warning for Live Mode */}
        {settings.mode === 'live' && (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Live Mode Active
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  You are using live API keys. Real transactions will be processed
                  and actual charges will be made to customer cards.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onUpdate(settings)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
```