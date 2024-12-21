```typescript
import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface AppointmentStats {
  totalAppointments: number;
  completedAppointments: number;
  missedAppointments: number;
  upcomingAppointments: number;
  averageDuration: string;
  busyHours: {
    hour: string;
    appointments: number;
  }[];
  commonReasons: {
    reason: string;
    count: number;
    percentage: number;
  }[];
}

interface AppointmentAnalyticsProps {
  stats: AppointmentStats;
  className?: string;
}

export function AppointmentAnalytics({ stats, className = '' }: AppointmentAnalyticsProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Appointment Analytics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stats.completedAppointments}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {((stats.completedAppointments / stats.totalAppointments) * 100).toFixed(1)}%
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-500">Missed</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stats.missedAppointments}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {((stats.missedAppointments / stats.totalAppointments) * 100).toFixed(1)}%
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-500">Upcoming</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stats.upcomingAppointments}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-500">Duration</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stats.averageDuration}
            </p>
          </div>
        </div>

        {/* Busy Hours */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Busy Hours</h4>
          <div className="space-y-2">
            {stats.busyHours.map((hour) => (
              <div key={hour.hour} className="flex items-center">
                <span className="w-16 text-sm text-gray-500">{hour.hour}</span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 rounded-full h-2"
                      style={{
                        width: `${(hour.appointments / Math.max(...stats.busyHours.map(h => h.appointments))) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm text-gray-600">{hour.appointments}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Reasons */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Common Appointment Reasons</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.commonReasons.map((reason) => (
            <div key={reason.reason} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{reason.reason}</span>
                <span className="text-sm text-gray-500">{reason.count} appointments</span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${reason.percentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                  />
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{reason.percentage}% of total</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```