import React from 'react';
import { CheckCircle, XCircle, User, Building2, MapPin } from 'lucide-react';
import { Lead } from '../../../../lib/agents/sales/types';

interface LeadListProps {
  leads: Lead[];
  selectedLeadId: string | null;
  onSelectLead: (id: string) => void;
  onQualifyLead: (id: string) => void;
}

export function LeadList({
  leads,
  selectedLeadId,
  onSelectLead,
  onQualifyLead
}: LeadListProps) {
  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'qualified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'disqualified':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <User className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Leads</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              selectedLeadId === lead.id ? 'bg-indigo-50' : ''
            }`}
            onClick={() => onSelectLead(lead.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon(lead.status)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {lead.contact.name}
                  </p>
                  <p className="text-xs text-gray-500">{lead.contact.title}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Score: {lead.score}
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <Building2 className="w-4 h-4 mr-1" />
                {lead.company.name}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {lead.company.location}
              </div>
            </div>
            {lead.status === 'new' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQualifyLead(lead.id);
                }}
                className="mt-3 w-full inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                Qualify Lead
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}