import { AppError, ErrorCodes } from '../../utils/errors';

export class FHIRClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: { baseUrl: string; apiKey: string }) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/fhir+json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new AppError(
        'FHIR API request failed',
        ErrorCodes.INTEGRATION_ERROR,
        response.status
      );
    }

    return response.json();
  }

  async getPatient(patientId: string): Promise<any> {
    return this.request(`/Patient/${patientId}`);
  }

  async searchPatients(params: {
    name?: string;
    identifier?: string;
    birthDate?: string;
  }): Promise<any[]> {
    const searchParams = new URLSearchParams();
    if (params.name) searchParams.append('name', params.name);
    if (params.identifier) searchParams.append('identifier', params.identifier);
    if (params.birthDate) searchParams.append('birthdate', params.birthDate);

    return this.request(`/Patient?${searchParams.toString()}`);
  }

  async createAppointment(appointment: {
    patientId: string;
    practitionerId: string;
    start: string;
    end: string;
    type: string;
  }): Promise<any> {
    return this.request('/Appointment', {
      method: 'POST',
      body: JSON.stringify({
        resourceType: 'Appointment',
        status: 'booked',
        participant: [
          {
            actor: {
              reference: `Patient/${appointment.patientId}`
            },
            status: 'accepted'
          },
          {
            actor: {
              reference: `Practitioner/${appointment.practitionerId}`
            },
            status: 'accepted'
          }
        ],
        start: appointment.start,
        end: appointment.end,
        appointmentType: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0276',
              code: appointment.type
            }
          ]
        }
      })
    });
  }

  async getMedicalHistory(patientId: string): Promise<any> {
    return this.request(`/Patient/${patientId}/$everything`);
  }

  async createObservation(observation: {
    patientId: string;
    code: string;
    value: string;
    effectiveDateTime: string;
  }): Promise<any> {
    return this.request('/Observation', {
      method: 'POST',
      body: JSON.stringify({
        resourceType: 'Observation',
        status: 'final',
        subject: {
          reference: `Patient/${observation.patientId}`
        },
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: observation.code
            }
          ]
        },
        valueString: observation.value,
        effectiveDateTime: observation.effectiveDateTime
      })
    });
  }
}