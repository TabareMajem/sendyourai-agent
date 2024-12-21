```typescript
import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Calendar } from 'lucide-react';
import { SymptomCheck } from '../../lib/healthcare/types';

interface AssessmentResultsProps {
  assessment: SymptomCheck;
  onScheduleAppointment: () => void;
}

export function AssessmentResults({
  assessment,
  onScheduleAppointment
}: AssessmentResultsProps) {
  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'emergency':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Assessment Results</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Urgency Level */}
        <div className={`p-4 rounded-lg ${getUrgencyColor(assessment.aiAssessment.urgencyLevel)}`}>
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium">
                {assessment.aiAssessment.urgencyLevel.charAt(0).toUpperCase() + 
                 assessment.aiAssessment.urgencyLevel.slice(1)} Priority
              </h3>
              <p className="mt-1 text-sm">
                {assessment.aiAssessment.urgencyLevel === 'emergency'
                  ? 'Seek immediate medical attention'
                  : assessment.aiAssessment.urgencyLevel === 'high'
                  ? 'Schedule an appointment as soon as possible'
                  : 'Monitor symptoms and schedule follow-up as needed'}
              </p>
            </div>
          </div>
        </div>

        {/* Possible Conditions */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Possible Conditions</h3>
          <div className="space-y-2">
            {assessment.aiAssessment.possibleConditions.map((condition, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">{condition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Recommended Actions</h3>
          <div className="space-y-2">
            {assessment.aiAssessment.recommendedActions.map((action, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <Clock className="w-4 h-4 text-indigo-600 mr-2 mt-0.5" />
                <span className="text-sm text-gray-700">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Appointment */}
        {assessment.aiAssessment.urgencyLevel !== 'low' && (
          <div className="mt-6">
            <button
              onClick={onScheduleAppointment}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Appointment
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 mt-4">
          <p>
            This assessment is for informational purposes only and does not constitute
            medical advice. Always consult with a healthcare professional for medical
            diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
```