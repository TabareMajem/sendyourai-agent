import React, { useState } from 'react';
import { Bot, Settings, AlertTriangle } from 'lucide-react';

interface ZapierConfigProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function ZapierConfig({ isConnected, onConnect, onDisconnect }: ZapierConfigProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-indigo-600" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Zapier Integration</h2>
              <p className="text-sm text-gray-500">Connect with thousands of apps</p>
            </div>
          </div>
          <button
            onClick={isConnected ? onDisconnect : onConnect}
            className="inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium"
          >
            {isConnected ? 'Disconnect' : 'Connect Zapier'}
          </button>
        </div>
      </div>

      {isConnected && (
        <div className="p-6 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <Bot className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Connected to Zapier</h3>
                <p className="mt-2 text-sm text-green-700">
                  Your AI Companion is now able to trigger and respond to Zaps
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Webhook URL
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      value="https://api.sendaicompanion.com/zapier/webhook"
                      readOnly
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Important Notice
                      </h3>
                      <p className="mt-2 text-sm text-yellow-700">
                        Keep your webhook URL secure. Never share it or commit it to version control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}