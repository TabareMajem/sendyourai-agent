```typescript
import React, { useState } from 'react';
import { Calendar, Clock, User, Video } from 'lucide-react';
import { Appointment } from '../../lib/healthcare/types';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onSchedule: (date: Date) => void;
  onCancel: (appointmentId: string) => void;
  onJoinVirtual: (appointmentId: string) => void;
}

export function AppointmentCalendar({
  appointments,
  onSchedule,
  onCancel,
  onJoinVirtual
}: AppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.dateTime);
      return (
        aptDate.getDate() === date.getDate() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Appointments</h2>
          <button
            onClick={() => onSchedule(selectedDate)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Schedule Appointment
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Calendar implementation */}
        </div>

        {/* Appointments List */}
        <div className="mt-6 space-y-4">
          {getAppointmentsForDate(selectedDate).map((apt) => (
            <div
              key={apt.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {apt.type === 'virtual' ? (
                    <Video className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <User className="w-6 h-6 text-indigo-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {apt.type.charAt(0).toUpperCase() + apt.type.slice(1)} Appointment
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(apt.dateTime).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {apt.type === 'virtual' && apt.virtualMeetingLink && (
                  <button
                    onClick={() => onJoinVirtual(apt.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Join Meeting
                  </button>
                )}
                <button
                  onClick={() => onCancel(apt.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}

          {getAppointmentsForDate(selectedDate).length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No appointments scheduled for this date
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```