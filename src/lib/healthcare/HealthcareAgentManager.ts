import { config } from '../config/env';
import { AppointmentScheduler } from './services/AppointmentScheduler';
import { SymptomChecker } from './services/SymptomChecker';
import { PatientRecords } from './services/PatientRecords';
import { HealthEducation } from './services/HealthEducation';
import { HealthcareAIService } from './ai/HealthcareAIService';
import { FHIRClient } from './integrations/FHIRClient';
import { EpicClient } from './integrations/EpicClient';

export class HealthcareAgentManager {
  private fhirClient: FHIRClient;
  private epicClient: EpicClient;
  private aiService: HealthcareAIService;
  private appointmentScheduler: AppointmentScheduler;
  private symptomChecker: SymptomChecker;
  private patientRecords: PatientRecords;
  private healthEducation: HealthEducation;

  constructor() {
    // Initialize integrations
    this.fhirClient = new FHIRClient({
      baseUrl: config.integrations.fhir.baseUrl,
      apiKey: config.integrations.fhir.apiKey
    });

    this.epicClient = new EpicClient({
      baseUrl: config.integrations.epic.baseUrl,
      clientId: config.integrations.epic.clientId,
      clientSecret: config.integrations.epic.clientSecret
    });

    // Initialize AI service
    this.aiService = new HealthcareAIService({
      openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
      claudeApiKey: import.meta.env.VITE_CLAUDE_API_KEY
    });

    // Initialize services
    this.appointmentScheduler = new AppointmentScheduler(this.epicClient, this.fhirClient);
    this.symptomChecker = new SymptomChecker();
    this.patientRecords = new PatientRecords(this.fhirClient, this.epicClient);
    this.healthEducation = new HealthEducation(this.aiService);
  }

  // Service accessors
  getAppointmentScheduler(): AppointmentScheduler {
    return this.appointmentScheduler;
  }

  getSymptomChecker(): SymptomChecker {
    return this.symptomChecker;
  }

  getPatientRecords(): PatientRecords {
    return this.patientRecords;
  }

  getHealthEducation(): HealthEducation {
    return this.healthEducation;
  }
}