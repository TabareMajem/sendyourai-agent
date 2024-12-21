import React, { useState } from 'react';
import { Mail, Bell, MessageSquare, Smartphone, AlertTriangle } from 'lucide-react';

export function CommunicationSettings() {
  const [config, setConfig] = useState({
    channels: {
      inApp: true,
      email: true,
      push: false,
      sms: false
    },
    frequency: 'realtime',
    urgencyLevels: {
      low: ['inApp'],
      medium: ['inApp', 'email'],
      high: ['inApp', 'email', 'push', 'sms']
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '07:00'
    }
  });

  const handleChannelToggle = (channel: keyof typeof config.channels) => {
    setConfig({
      ...config,
      channels: {
        ...config.channels,
        [channel]: !config.channels[channel]
      }
    });
  };

  const handleFrequencyChange = (frequency: string) => {
    setConfig({ ...config, frequency });
  };

  const handleQuietHoursToggle = () => {
    setConfig({
      ...config,
      quietHours: {
        ...config.quietHours,
        enabled: !config.quietHours.enabled
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Communication Channels */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Communication Channels</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700">In-App Messages</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.channels.inApp}
                onChange={() => handleChannelToggle('inApp')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700">Email</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.channels.email}
                onChange={() => handleChannelToggle('email')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700">Push Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.channels.push}
                onChange={() => handleChannelToggle('push')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700">SMS</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.channels.sms}
                onChange={() => handleChannelToggle('sms')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Frequency */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Notification Frequency
        </label>
        <select
          value={config.frequency}
          onChange={(e) => handleFrequencyChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="realtime">Real-time</option>
          <option value="batched">Batched (Every hour)</option>
          <option value="daily">Daily Digest</option>
          <option value="weekly">Weekly Summary</option>
        </select>
      </div>

      {/* Quiet Hours */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Quiet Hours</h4>
            <p className="text-xs text-gray-500">Pause non-critical notifications during specific hours</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.quietHours.enabled}
              onChange={handleQuietHoursToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {config.quietHours.enabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                value={config.quietHours.start}
                onChange={(e) => setConfig({
                  ...config,
                  quietHours: { ...config.quietHours, start: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="time"
                value={config.quietHours.end}
                onChange={(e) => setConfig({
                  ...config,
                  quietHours: { ...config.quietHours, end: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Warning for disabled channels */}
      {(!config.channels.inApp && !config.channels.email) && (
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Limited Communication Channels
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                You have disabled primary communication channels. This may limit the AI's ability
                to provide timely updates and important notifications.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}