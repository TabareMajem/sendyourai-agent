import { AppError, ErrorCodes } from '../../utils/errors';

export class EpicClient {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;

  constructor(config: {
    baseUrl: string;
    clientId: string;
    clientSecret: string;
  }) {
    this.baseUrl = config.baseUrl;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }

  private async getAccessToken(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret
      })
    });

    if (!response.ok) {
      throw new AppError(
        'Failed to obtain Epic access token',
        ErrorCodes.AUTHENTICATION_ERROR,
        response.status
      );
    }

    const data = await response.json();
    return data.access_token;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new AppError(
        'Epic API request failed',
        ErrorCodes.INTEGRATION_ERROR,
        response.status
      );
    }

    return response.json();
  }

  async getPatientAppointments(patientId: string): Promise<any[]> {
    return this.request(`/api/FHIR/R4/Appointment?patient=${patientId}`);
  }

  async scheduleAppointment(appointment: {
    patientId: string;
    providerId: string;
    startTime: string;
    endTime: string;
    visitType: string;
    reason: string;
  }): Promise<any> {
    return this.request('/api/FHIR/R4/Appointment', {
      method: 'POST',
      body: JSON.stringify({
        resourceType: 'Appointment',
        status: 'booked',
        start: appointment.startTime,
        end: appointment.endTime,
        participant: [
          {
            actor: {
              reference: `Patient/${appointment.patientId}`
            },
            status: 'accepted'
          },
          {
            actor: {
              reference: `Practitioner/${appointment.providerId}`
            },
            status: 'accepted'
          }
        ],
        appointmentType: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0276',
              code: appointment.visitType
            }
          ]
        },
        reasonCode: [
          {
            text: appointment.reason
          }
        ]
      })
    });
  }

  async getProviderSchedule(providerId: string, startDate: string, endDate: string): Promise<any> {
    return this.request(
      `/api/FHIR/R4/Slot?schedule.actor=${providerId}&start=${startDate}&end=${endDate}`
    );
  }

  async getPatientMedications(patientId: string): Promise<any[]> {
    return this.request(`/api/FHIR/R4/MedicationRequest?patient=${patientId}`);
  }

  async getPatientAllergies(patientId: string): Promise<any[]> {
    return this.request(`/api/FHIR/R4/AllergyIntolerance?patient=${patientId}`);
  }

  async getPatientImmunizations(patientId: string): Promise<any[]> {
    return this.request(`/api/FHIR/R4/Immunization?patient=${patientId}`);
  }

  async createPatientNote(note: {
    patientId: string;
    authorId: string;
    text: string;
    type: string;
  }): Promise<any> {
    return this.request('/api/FHIR/R4/DocumentReference', {
      method: 'POST',
      body: JSON.stringify({
        resourceType: 'DocumentReference',
        status: 'current',
        type: {
          coding: [
            {
              system: 'http://loinc.org',
              code: note.type
            }
          ]
        },
        subject: {
          reference: `Patient/${note.patientId}`
        },
        author: [
          {
            reference: `Practitioner/${note.authorId}`
          }
        ],
        content: [
          {
            attachment: {
              contentType: 'text/plain',
              data: Buffer.from(note.text).toString('base64')
            }
          }
        ]
      })
    });
  }
}