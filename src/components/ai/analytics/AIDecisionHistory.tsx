import React from 'react';
import { FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Decision {
  id: string;
  timestamp: Date;
  type: string;
  context: string;
  outcome: 'success' | 'failure' | 'pending';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  details: string;
}

interface AIDecisionHistoryProps {
  decisions: Decision[];
  className?: string;
}

export function AIDecisionHistory({ decisions, className = '' }: AIDecisionHistoryProps) {
  const getOutcomeIcon = (outcome: Decision['outcome']) => {
    switch (outcome) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failure':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getImpactBadge = (impact: Decision['impact']) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[impact]}`}>
        {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
      </span>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">Decision History</h3>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {decisions.map((decision) => (
          <div key={decision.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start space-x-3">
              {getOutcomeIcon(decision.outcome)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {decision.type}
                  </p>
                  {getImpactBadge(decision.impact)}
                </div>
                <p className="mt-1 text-sm text-gray-500">{decision.context}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <p className="text-xs text-gray-500">
                    {new Date(decision.timestamp).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Confidence: {decision.confidence}%
                  </p>
                </div>
              </div>
              <button
                className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                View Details
              </button>
            </div>
            {decision.outcome === 'failure' && (
              <div className="mt-2 p-2 bg-red-50 rounded-md">
                <p className="text-sm text-red-700">{decision.details}</p>
              </div>
            )}
          </div>
        ))}
        {decisions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <p>No decisions recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}