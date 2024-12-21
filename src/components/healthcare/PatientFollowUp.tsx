```typescript
import React from 'react';
import { Clock, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

interface FollowUpInfo {
  id: string;
  patientName: string;
  appointmentType: string;
  lastVisit: Date;
  nextFollowUp: Date;
  status: 'pending' | 'completed' | 'overdue';
  notes: string;
  communications: {
    type: 'sms' | 'email' | 'call';
    date: Date;
    content: string;
    status: 'sent' | 'failed' | 'delivered';
  }[];
}

interface PatientFollowUpProps {
  followUp: FollowUpInfo;
  onSendMessage: (patientId: string) => void;
  onMarkComplete: (followUpId: string) => void;
}

export function PatientFollowUp({
  followUp,
  onSendMessage,
  onMarkComplete
}: PatientFollowUpProps) {
  const getStatusBadge = (status: FollowUpInfo['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{followUp.patientName}</h3>
          <p className="text-sm text-gray-500">{followUp.appointmentType}</p>
        </div>
        {getStatusBadge(followUp.status)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Last Visit</p>
            <p className="text-sm font-medium text-gray-900">
              {followUp.lastVisit.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Next Follow-up</p>
            <p className="text-sm font-medium text-gray-900">
              {followUp.nextFollowUp.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {followUp.notes && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
          <p className="text-sm text-gray-600">{followUp.notes}</p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium text-gray-900">Communication History</h4>
        {followUp.communications.map((comm, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {comm.type.toUpperCase()}
                </p>
                <span className="text-xs text-gray-500">
                  {comm.date.toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{comm.content}</p>
              {comm.status === 'failed' && (
                <div className="mt-2 flex items-center text-red-600 text-xs">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Delivery failed
                </div>
              )}
              {comm.status === 'delivered' && (
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
          onClick={() => onSendMessage(followUp.id)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Send Message
        </button>
        {followUp.status === 'pending' && (
          <button
            onClick={() => onMarkComplete(followUp.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}
```