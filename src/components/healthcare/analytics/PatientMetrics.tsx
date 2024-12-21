```typescript
import React from 'react';
import { Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface PatientMetrics {
  totalPatients: number;
  activeFollowUps: number;
  averageResponseTime: string;
  completionRate: number;
  missedAppointments: number;
  patientSatisfaction: number;
}

interface PatientMetricsProps {
  metrics: PatientMetrics;
  className?: string;
}

export function PatientMetrics({ metrics, className = '' }: PatientMetricsProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Patient Metrics</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Patients */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.totalPatients}</p>
          <p className="mt-1 text-sm text-gray-500">Active Patients</p>
        </div>

        {/* Active Follow-ups */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">Active</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.activeFollowUps}</p>
          <p className="mt-1 text-sm text-gray-500">Follow-ups</p>
        </div>

        {/* Response Time */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">Average</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.averageResponseTime}</p>
          <p className="mt-1 text-sm text-gray-500">Response Time</p>
        </div>

        {/* Completion Rate */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">Rate</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.completionRate}%</p>
          <p className="mt-1 text-sm text-gray-500">Completion Rate</p>
        </div>

        {/* Missed Appointments */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-500">Missed</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.missedAppointments}</p>
          <p className="mt-1 text-sm text-gray-500">Appointments</p>
        </div>

        {/* Patient Satisfaction */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-500">Rating</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.patientSatisfaction}%</p>
          <p className="mt-1 text-sm text-gray-500">Satisfaction</p>
        </div>
      </div>
    </div>
  );
}
```