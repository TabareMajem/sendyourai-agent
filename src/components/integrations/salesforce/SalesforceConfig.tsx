import React, { useState } from 'react';
import { Building2, Key, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useSalesforce } from '../../../hooks/useSalesforce';

export function SalesforceConfig() {
  const { isConnected, isLoading, error, connect, disconnect } = useSalesforce();
  const [showSecrets, setShowSecrets] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-indigo-600" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Salesforce Integration</h2>
              <p className="text-sm text-gray-500">Connect with your Salesforce CRM</p>
            </div>
          </div>
          <button
            onClick={isConnected ? disconnect : connect}
            disabled={isLoading}
            className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
              isConnected
                ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isConnected ? 'Disconnect' : 'Connect Salesforce'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
              <p className="mt-2 text-sm text-red-700">{error.message}</p>
            </div>
          </div>
        </div>
      )}

      {isConnected && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instance URL
              </label>
              <input
                type="text"
                value={localStorage.getItem('salesforce_instance_url') || ''}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Access Token
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showSecrets ? 'text' : 'password'}
                  value={localStorage.getItem('salesforce_access_token') || ''}
                  readOnly
                  className="block w-full rounded-md border-gray-300 bg-gray-50 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <Key className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Security Notice
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  Your Salesforce credentials are securely stored and encrypted.
                  Never share your access tokens or API keys with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}