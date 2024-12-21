export interface Patient {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  medicalHistory: {
    conditions: string[];
    medications: string[];
    allergies: string[];
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: Date;
  type: 'checkup' | 'followUp' | 'specialist' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  virtualMeetingLink?: string;
}

export interface SymptomCheck {
  id: string;
  patientId: string;
  timestamp: Date;
  symptoms: Array<{
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration: string;
    description?: string;
  }>;
  aiAssessment: {
    possibleConditions: string[];
    recommendedActions: string[];
    urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  };
}

export interface MedicationReminder {
  id: string;
  patientId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  reminderTimes: string[];
  status: 'active' | 'completed' | 'cancelled';
}

export interface HealthEducationResource {
  id: string;
  title: string;
  category: string;
  content: string;
  format: 'text' | 'video' | 'pdf';
  tags: string[];
  lastUpdated: Date;
  verifiedBy?: string;
}