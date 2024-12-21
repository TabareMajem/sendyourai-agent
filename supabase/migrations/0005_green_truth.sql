/*
  # Healthcare Schema
  
  1. New Tables
    - healthcare_patients
    - healthcare_appointments
    - healthcare_records
    - healthcare_analytics
    
  2. Security
    - Enable RLS
    - Add policies for healthcare provider access
*/

-- Healthcare Patients
CREATE TABLE IF NOT EXISTS healthcare_patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  medical_record_number text UNIQUE,
  status text NOT NULL DEFAULT 'active',
  primary_provider uuid REFERENCES agents(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Healthcare Appointments
CREATE TABLE IF NOT EXISTS healthcare_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  patient_id uuid NOT NULL REFERENCES healthcare_patients(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  appointment_type text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  scheduled_start timestamptz NOT NULL,
  scheduled_end timestamptz NOT NULL,
  actual_start timestamptz,
  actual_end timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Healthcare Records
CREATE TABLE IF NOT EXISTS healthcare_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  patient_id uuid NOT NULL REFERENCES healthcare_patients(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES healthcare_appointments(id) ON DELETE SET NULL,
  record_type text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Healthcare Analytics
CREATE TABLE IF NOT EXISTS healthcare_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  metric_type text NOT NULL,
  value jsonb NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Enable RLS
ALTER TABLE healthcare_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Healthcare providers can view their organization's patients" 
  ON healthcare_patients FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = healthcare_patients.organization_id
    )
  );

CREATE POLICY "Healthcare providers can manage patient records" 
  ON healthcare_patients FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM organization_members 
      WHERE organization_id = healthcare_patients.organization_id 
      AND role IN ('admin', 'owner')
    )
  );

-- Indexes
CREATE INDEX idx_healthcare_patients_org ON healthcare_patients(organization_id);
CREATE INDEX idx_healthcare_patients_user ON healthcare_patients(user_id);
CREATE INDEX idx_healthcare_appointments_patient ON healthcare_appointments(patient_id);
CREATE INDEX idx_healthcare_appointments_provider ON healthcare_appointments(provider_id);
CREATE INDEX idx_healthcare_records_patient ON healthcare_records(patient_id);
CREATE INDEX idx_healthcare_analytics_org ON healthcare_analytics(organization_id, metric_type);