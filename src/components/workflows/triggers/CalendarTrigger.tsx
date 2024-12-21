import React from 'react';
import { Calendar, Settings } from 'lucide-react';
import { TriggerProps } from './types';

export function CalendarTrigger({ config, onChange }: TriggerProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Calendar Trigger</h3>
            <p className="text-xs text-gray-500">Trigger workflow based on calendar events</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Calendar Provider</label>
          <select
            value={config.provider}
            onChange={(e) => onChange({ ...config, provider: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="google">Google Calendar</option>
            <option value="calendly">Calendly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            value={config.eventType}
            onChange={(e) => onChange({ ...config, eventType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="created">Event Created</option>
            <option value="updated">Event Updated</option>
            <option value="cancelled">Event Cancelled</option>
            <option value="starting">Event Starting Soon</option>
          </select>
        </div>

        {config.eventType === 'starting' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Minutes Before</label>
            <input
              type="number"
              value={config.minutesBefore || 15}
              onChange={(e) => onChange({
                ...config,
                minutesBefore: parseInt(e.target.value)
              })}
              min="5"
              max="1440"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Calendar Selection</label>
          <div className="mt-1 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.allCalendars}
                onChange={(e) => onChange({ ...config, allCalendars: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">All Calendars</span>
            </label>
            
            {!config.allCalendars && (
              <input
                type="text"
                value={config.calendarId || ''}
                onChange={(e) => onChange({ ...config, calendarId: e.target.value })}
                placeholder="Calendar ID"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}