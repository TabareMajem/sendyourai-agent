import React from 'react';
import { Building2, Plus, X } from 'lucide-react';

interface IndustryPreferencesProps {
  value: {
    primary: string;
    secondary: string[];
  };
  onChange: (value: { primary: string; secondary: string[] }) => void;
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Education',
  'Retail',
  'Hospitality',
  'Transportation',
  'Energy',
  'Construction'
];

export function IndustryPreferences({ value, onChange }: IndustryPreferencesProps) {
  const handleSecondaryAdd = (industry: string) => {
    if (!value.secondary.includes(industry)) {
      onChange({
        ...value,
        secondary: [...value.secondary, industry]
      });
    }
  };

  const handleSecondaryRemove = (industry: string) => {
    onChange({
      ...value,
      secondary: value.secondary.filter(i => i !== industry)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Building2 className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Industry Preferences</h2>
      </div>

      <div className="space-y-4">
        {/* Primary Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Industry
          </label>
          <select
            value={value.primary}
            onChange={(e) => onChange({ ...value, primary: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select an industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Secondary Industries */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secondary Industries
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {value.secondary.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {industry}
                <button
                  onClick={() => handleSecondaryRemove(industry)}
                  className="ml-1.5 inline-flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                handleSecondaryAdd(e.target.value);
                e.target.value = '';
              }
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Add secondary industry</option>
            {industries
              .filter((i) => i !== value.primary && !value.secondary.includes(i))
              .map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
          </select>
        </div>

        {/* Industry-Specific Settings */}
        {value.primary && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              {value.primary} Specific Settings
            </h3>
            <p className="text-sm text-gray-500">
              AI suggestions will be tailored to {value.primary} industry best practices
              and regulations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}