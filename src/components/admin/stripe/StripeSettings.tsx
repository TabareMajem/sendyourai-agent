import React, { useState } from 'react';
import { CreditCard, Key, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface StripeSettingsProps {
  settings: {
    publicKey?: string;
    webhookSecret?: string;
    mode: 'test' | 'live';
  };
  onUpdate: (settings: any) => void;
}

export function StripeSettings({ settings, onUpdate }: StripeSettingsProps) {
  const [showSecrets, setShowSecrets] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CreditCard className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Stripe Configuration</h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* Environment Toggle */}
        <div>
          <label className="text-sm font-medium text-gray-700">Environment</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={settings.mode === 'test'}
                onChange={() => onUpdate({ ...settings, mode: 'test' })}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">Test Mode</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={settings.mode === 'live'}
                onChange={() => onUpdate({ ...settings, mode: 'live' })}
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
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showSecrets ? 'text' : 'password'}
                value={settings.publicKey || ''}
                onChange={(e) => onUpdate({ ...settings, publicKey: e.target.value })}
                className="block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder={`${settings.mode === 'test' ? 'pk_test_' : 'pk_live_'}...`}
              />
              <button
                type="button"
                onClick={() => setShowSecrets(!showSecrets)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showSecrets ? (
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
                type={showSecrets ? 'text' : 'password'}
                value={settings.webhookSecret || ''}
                onChange={(e) => onUpdate({ ...settings, webhookSecret: e.target.value })}
                className="block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="whsec_..."
              />
              <button
                type="button"
                onClick={() => setShowSecrets(!showSecrets)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showSecrets ? (
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

        {/* Webhook Configuration */}
        <div className="rounded-md bg-gray-50 p-4">
          <div className="flex">
            <Key className="h-5 w-5 text-gray-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Webhook URL</h3>
              <p className="mt-2 text-sm text-gray-500">
                Configure your Stripe webhook to point to:
                <code className="ml-2 px-2 py-1 bg-gray-100 rounded">
                  {`${window.location.origin}/api/stripe/webhook`}
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}