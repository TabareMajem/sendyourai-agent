```typescript
import React, { useState } from 'react';
import { AlertTriangle, Plus, Search } from 'lucide-react';
import { SymptomCheck } from '../../lib/healthcare/types';

interface SymptomAssessmentProps {
  onSubmit: (symptoms: SymptomCheck['symptoms']) => Promise<void>;
}

export function SymptomAssessment({ onSubmit }: SymptomAssessmentProps) {
  const [symptoms, setSymptoms] = useState<SymptomCheck['symptoms']>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commonSymptoms = [
    'Fever',
    'Cough',
    'Headache',
    'Fatigue',
    'Nausea',
    'Shortness of breath',
    'Body aches',
    'Sore throat'
  ];

  const handleAddSymptom = (name: string) => {
    setSymptoms([
      ...symptoms,
      {
        name,
        severity: 'mild',
        duration: '1 day',
        description: ''
      }
    ]);
    setSearchQuery('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(symptoms);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Symptom Assessment</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Symptom Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symptoms..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {searchQuery && (
            <div className="mt-2 p-2 bg-white border border-gray-200 rounded-md shadow-sm">
              {commonSymptoms
                .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleAddSymptom(symptom)}
                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    {symptom}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Selected Symptoms */}
        <div className="space-y-4">
          {symptoms.map((symptom, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">{symptom.name}</h3>
                <button
                  onClick={() => setSymptoms(symptoms.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Severity
                  </label>
                  <select
                    value={symptom.severity}
                    onChange={(e) => {
                      const newSymptoms = [...symptoms];
                      newSymptoms[index].severity = e.target.value as any;
                      setSymptoms(newSymptoms);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={symptom.duration}
                    onChange={(e) => {
                      const newSymptoms = [...symptoms];
                      newSymptoms[index].duration = e.target.value;
                      setSymptoms(newSymptoms);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., 2 days"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Details
                  </label>
                  <textarea
                    value={symptom.description || ''}
                    onChange={(e) => {
                      const newSymptoms = [...symptoms];
                      newSymptoms[index].description = e.target.value;
                      setSymptoms(newSymptoms);
                    }}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          {symptoms.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Add symptoms to begin assessment
            </div>
          )}
        </div>

        {/* Warning for severe symptoms */}
        {symptoms.some(s => s.severity === 'severe') && (
          <div className="p-4 bg-red-50 rounded-md">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Severe Symptoms Detected
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  If you are experiencing severe symptoms, please seek immediate medical attention
                  or call emergency services.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || symptoms.length === 0}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Analyzing Symptoms...
            </>
          ) : (
            'Submit Assessment'
          )}
        </button>
      </div>
    </div>
  );
}
```