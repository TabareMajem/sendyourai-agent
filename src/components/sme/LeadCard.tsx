```typescript
import React from 'react';
import { User, Building2, Mail, Phone, Tag, Clock, ArrowRight } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  source: string;
  interests: string[];
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  lastContact?: Date;
  score?: number;
}

interface LeadCardProps {
  lead: Lead;
  onSendEmail: (leadId: string) => void;
  onCreateTask: (leadId: string) => void;
  onViewDetails: (leadId: string) => void;
}

export function LeadCard({
  lead,
  onSendEmail,
  onCreateTask,
  onViewDetails
}: LeadCardProps) {
  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      converted: 'bg-purple-100 text-purple-800'
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
            <p className="text-sm text-gray-500">{lead.company}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{lead.email}</span>
        </div>
        {lead.phone && (
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{lead.phone}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{lead.company}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{lead.source}</span>
        </div>
      </div>

      {lead.interests.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {lead.interests.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {lead.score !== undefined && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Lead Score</span>
            <span className="text-sm font-medium text-gray-900">{lead.score}/100</span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${lead.score}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  lead.score >= 70 ? 'bg-green-500' :
                  lead.score >= 40 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {lead.lastContact && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          Last contacted: {lead.lastContact.toLocaleString()}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => onSendEmail(lead.id)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          Send Email
        </button>
        <button
          onClick={() => onCreateTask(lead.id)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Create Task
        </button>
        <button
          onClick={() => onViewDetails(lead.id)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```