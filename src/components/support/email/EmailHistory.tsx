```typescript
import React from 'react';
import { Mail, Clock, CheckCircle, AlertCircle, Download } from 'lucide-react';

interface EmailRecord {
  id: string;
  subject: string;
  to: string;
  from: string;
  status: 'sent' | 'failed' | 'bounced' | 'opened';
  timestamp: Date;
  template?: string;
  attachments?: Array<{
    name: string;
    url: string;
  }>;
}

interface EmailHistoryProps {
  emails: EmailRecord[];
  onDownloadAttachment: (url: string) => void;
  onResend: (emailId: string) => void;
}

export function EmailHistory({
  emails,
  onDownloadAttachment,
  onResend
}: EmailHistoryProps) {
  const getStatusIcon = (status: EmailRecord['status']) => {
    switch (status) {
      case 'sent':
      case 'opened':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
      case 'bounced':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Email History</h2>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {emails.map((email) => (
          <div key={email.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(email.status)}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {email.subject}
                  </p>
                  <p className="text-xs text-gray-500">
                    To: {email.to}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{email.timestamp.toLocaleString()}</span>
              </div>
            </div>

            {email.template && (
              <p className="mt-2 text-xs text-gray-500">
                Template: {email.template}
              </p>
            )}

            {email.attachments && email.attachments.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Attachments:</p>
                <div className="mt-1 space-y-1">
                  {email.attachments.map((attachment, index) => (
                    <button
                      key={index}
                      onClick={() => onDownloadAttachment(attachment.url)}
                      className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-900"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      {attachment.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(email.status === 'failed' || email.status === 'bounced') && (
              <div className="mt-2">
                <button
                  onClick={() => onResend(email.id)}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  Resend Email
                </button>
              </div>
            )}
          </div>
        ))}

        {emails.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No email history available
          </div>
        )}
      </div>
    </div>
  );
}
```