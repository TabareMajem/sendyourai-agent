```typescript
import React from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock } from 'lucide-react';

interface CallRecord {
  id: string;
  type: 'incoming' | 'outgoing' | 'missed';
  customerName: string;
  customerNumber: string;
  timestamp: Date;
  duration?: string;
  recordingUrl?: string;
  notes?: string;
}

interface VoiceCallHistoryProps {
  calls: CallRecord[];
  onPlayRecording: (url: string) => void;
  onAddNote: (callId: string, note: string) => void;
}

export function VoiceCallHistory({
  calls,
  onPlayRecording,
  onAddNote
}: VoiceCallHistoryProps) {
  const getCallIcon = (type: CallRecord['type']) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="w-5 h-5 text-green-500" />;
      case 'outgoing':
        return <PhoneOutgoing className="w-5 h-5 text-blue-500" />;
      case 'missed':
        return <PhoneMissed className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Call History</h2>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {calls.map((call) => (
          <div key={call.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getCallIcon(call.type)}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {call.customerName}
                  </p>
                  <p className="text-xs text-gray-500">{call.customerNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{call.timestamp.toLocaleString()}</span>
                {call.duration && (
                  <span className="text-gray-400">({call.duration})</span>
                )}
              </div>
            </div>

            {(call.recordingUrl || call.notes) && (
              <div className="mt-2 pl-8">
                {call.recordingUrl && (
                  <button
                    onClick={() => onPlayRecording(call.recordingUrl!)}
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Play Recording
                  </button>
                )}
                {call.notes && (
                  <p className="mt-1 text-sm text-gray-600">{call.notes}</p>
                )}
              </div>
            )}

            <div className="mt-2 pl-8">
              <button
                onClick={() => {
                  const note = prompt('Add a note to this call:');
                  if (note) {
                    onAddNote(call.id, note);
                  }
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Add Note
              </button>
            </div>
          </div>
        ))}

        {calls.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No call history available
          </div>
        )}
      </div>
    </div>
  );
}
```