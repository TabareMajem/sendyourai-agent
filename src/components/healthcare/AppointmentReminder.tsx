```typescript
import React from 'react';
import { Calendar, Clock, MapPin, User, AlertCircle, CheckCircle } from 'lucide-react';

interface AppointmentInfo {
  id: string;
  patientName: string;
  provider: string;
  appointmentType: string;
  date: Date;
  location: string;
  preparationInstructions: string[];
  status: 'upcoming' | 'confirmed' | 'cancelled';
  remindersSent: {
    type: 'sms' | 'email';
    date: Date;
    status: 'sent' | 'delivered' | 'failed';
  }[];
}

interface AppointmentReminderProps {
  appointment: AppointmentInfo;
  onSendReminder: (appointmentId: string) => void;
  onUpdateStatus: (appointmentId: string, status: AppointmentInfo['status']) => void;
}

export function AppointmentReminder({
  appointment,
  onSendReminder,
  onUpdateStatus
}: AppointmentReminderProps) {
  const getStatusBadge = (status: AppointmentInfo['status']) => {
    const colors = {
      upcoming: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const timeUntilAppointment = () => {
    const now = new Date();
    const diff = appointment.date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} away`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} away`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
          <p className="text-sm text-gray-500">{appointment.appointmentType}</p>
        </div>
        {getStatusBadge(appointment.status)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="text-sm font-medium text-gray-900">
              {appointment.date.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="text-sm font-medium text-gray-900">
              {appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Provider</p>
            <p className="text-sm font-medium text-gray-900">{appointment.provider}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-sm font-medium text-gray-900">{appointment.location}</p>
          </div>
        </div>
      </div>

      {appointment.preparationInstructions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Preparation Instructions</h4>
          <ul className="space-y-2">
            {appointment.preparationInstructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2" />
                <span className="text-sm text-gray-600">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium text-gray-900">Reminder History</h4>
        {appointment.remindersSent.map((reminder, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            {reminder.type === 'sms' ? (
              <MessageSquare className="w-5 h-5 text-gray-400" />
            ) : (
              <Mail className="w-5 h-5 text-gray-400" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {reminder.type.toUpperCase()} Reminder
                </p>
                <span className="text-xs text-gray-500">
                  {reminder.date.toLocaleString()}
                </span>
              </div>
              {reminder.status === 'failed' && (
                <div className="mt-2 flex items-center text-red-600 text-xs">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Delivery failed
                </div>
              )}
              {reminder.status === 'delivered' && (
                <div className="mt-2 flex items-center text-green-600 text-xs">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Delivered
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => onSendReminder(appointment.id)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Send Reminder
        </button>
        <select
          value={appointment.status}
          onChange={(e) => onUpdateStatus(appointment.id, e.target.value as AppointmentInfo['status'])}
          className="flex-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="upcoming">Upcoming</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}
```