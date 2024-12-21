import React, { useState } from 'react';
import { Shield, Info, Check } from 'lucide-react';

interface DataProtectionNoticeProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function DataProtectionNotice({ onAccept, onDecline }: DataProtectionNoticeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-base font-medium text-gray-900">
                Data Protection Notice
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                We value your privacy and protect your data according to industry standards.
                {!isExpanded && '...'}
              </p>
              {isExpanded && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Data Collection</h4>
                    <ul className="mt-2 text-sm text-gray-500 list-disc pl-5 space-y-1">
                      <li>User preferences and settings</li>
                      <li>Workflow configurations</li>
                      <li>Usage analytics for service improvement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Data Protection</h4>
                    <ul className="mt-2 text-sm text-gray-500 list-disc pl-5 space-y-1">
                      <li>End-to-end encryption for sensitive data</li>
                      <li>Regular security audits</li>
                      <li>Compliance with GDPR and industry regulations</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Info className="w-4 h-4 mr-1" />
              {isExpanded ? 'Show Less' : 'Learn More'}
            </button>
            <button
              type="button"
              onClick={onDecline}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Check className="w-4 h-4 mr-1" />
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}