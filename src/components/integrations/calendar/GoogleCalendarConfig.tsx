import React, { useState } from 'react';
import { Calendar, Settings, AlertTriangle } from 'lucide-react';
import { useGoogleCalendar } from '../../../hooks/useGoogleCalendar';

export function GoogleCalendarConfig() {
  const { isConnected, isLoading, error, connect, disconnect } = useGoogleCalendar();
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Google Calendar</h2>
              <p className="text-sm text-gray-500">Manage calendar events and scheduling</p>
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
            ) : isConnected ? 'Disconnect' : 'Connect Calendar'}
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
                    Default Calendar
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>Primary Calendar</option>
                    <option>Work Calendar</option>
                    <option>Personal Calendar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Default Notification Time
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>10 minutes before</option>
                    <option>30 minutes before</option>
                    <option>1 hour before</option>
                    <option>1 day before</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}