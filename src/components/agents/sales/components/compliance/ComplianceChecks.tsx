import React from 'react';
import { Shield, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'failed' | 'pending';
  severity: 'high' | 'medium' | 'low';
  lastRun?: Date;
  details?: string;
}

interface ComplianceChecksProps {
  checks: ComplianceCheck[];
  onRunCheck: (checkId: string) => Promise<void>;
  onRunAllChecks: () => Promise<void>;
}

export function ComplianceChecks({ checks, onRunCheck, onRunAllChecks }: ComplianceChecksProps) {
  const getSeverityColor = (severity: ComplianceCheck['severity']) => {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'px-2.5',
      'py-0.5',
      'rounded-full',
      'text-xs',
      'font-medium'
    ].join(' ');

    switch (severity) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Compliance Checks</h2>
          </div>
          <button
            onClick={onRunAllChecks}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Run All Checks
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {checks.map((check) => (
            <div
              key={check.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{check.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{check.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={getSeverityColor(check.severity)}>
                    {check.severity.charAt(0).toUpperCase() + check.severity.slice(1)} Severity
                  </span>
                  <button
                    onClick={() => onRunCheck(check.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Run Check
                  </button>
                </div>
              </div>

              {check.details && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">{check.details}</p>
                </div>
              )}

              {check.lastRun && (
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Last run: {new Date(check.lastRun).toLocaleString()}</span>
                  {check.status === 'passed' && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Passed
                    </div>
                  )}
                  {check.status === 'failed' && (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Failed
                    </div>
                  )}
                  {check.status === 'pending' && (
                    <div className="flex items-center text-yellow-600">
                      <Clock className="w-4 h-4 mr-1" />
                      Pending
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {checks.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-sm font-medium text-gray-900">No compliance checks</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure compliance checks to ensure regulatory compliance
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}