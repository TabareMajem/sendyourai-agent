import { EpicClient } from '../integrations/EpicClient';
import { FHIRClient } from '../integrations/FHIRClient';
import { Appointment } from '../types';
import { AppError, ErrorCodes } from '../../utils/errors';

export class AppointmentScheduler {
  constructor(
    private epicClient: EpicClient,
    private fhirClient: FHIRClient
  ) {}

  async getAvailableSlots(params: {
    providerId: string;
    startDate: string;
    endDate: string;
    visitType?: string;
  }): Promise<Array<{
    startTime: string;
    endTime: string;
    providerId: string;
    visitType: string;
  }>> {
    try {
      const epicSlots = await this.epicClient.getProviderSchedule(
        params.providerId,
        params.startDate,
        params.endDate
      );

      return epicSlots.entry
        .filter((entry: any) => entry.resource.status === 'free')
        .map((entry: any) => ({
          startTime: entry.resource.start,
          endTime: entry.resource.end,
          providerId: params.providerId,
          visitType: entry.resource.serviceType?.[0]?.coding?.[0]?.code || 'general'
        }));
    } catch (error) {
      throw new AppError(
        'Failed to fetch available appointment slots',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async scheduleAppointment(appointment: {
    patientId: string;
    providerId: string;
    startTime: string;
    endTime: string;
    visitType: string;
    reason: string;
  }): Promise<Appointment> {
    try {
      // Schedule in Epic
      const epicAppointment = await this.epicClient.scheduleAppointment(appointment);

      // Create corresponding FHIR resource
      const fhirAppointment = await this.fhirClient.createAppointment({
        patientId: appointment.patientId,
        practitionerId: appointment.providerId,
        start: appointment.startTime,
        end: appointment.endTime,
        type: appointment.visitType
      });

      return {
        id: epicAppointment.id,
        patientId: appointment.patientId,
        doctorId: appointment.providerId,
        dateTime: new Date(appointment.startTime),
        type: appointment.visitType as any,
        status: 'scheduled',
        notes: appointment.reason
      };
    } catch (error) {
      throw new AppError(
        'Failed to schedule appointment',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async getPatientAppointments(patientId: string): Promise<Appointment[]> {
    try {
      const epicAppointments = await this.epicClient.getPatientAppointments(patientId);

      return epicAppointments.entry.map((entry: any) => ({
        id: entry.resource.id,
        patientId: entry.resource.participant.find(
          (p: any) => p.actor.reference.startsWith('Patient/')
        ).actor.reference.split('/')[1],
        doctorId: entry.resource.participant.find(
          (p: any) => p.actor.reference.startsWith('Practitioner/')
        ).actor.reference.split('/')[1],
        dateTime: new Date(entry.resource.start),
        type: entry.resource.appointmentType?.coding?.[0]?.code || 'checkup',
        status: entry.resource.status,
        notes: entry.resource.description,
        virtualMeetingLink: entry.resource.extension?.find(
          (e: any) => e.url === 'virtualMeetingUrl'
        )?.valueString
      }));
    } catch (error) {
      throw new AppError(
        'Failed to fetch patient appointments',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    try {
      // Cancel in Epic
      await this.epicClient.request(`/api/FHIR/R4/Appointment/${appointmentId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          resourceType: 'Appointment',
          status: 'cancelled'
        })
      });

      // Update FHIR record
      await this.fhirClient.request(`/Appointment/${appointmentId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          resourceType: 'Appointment',
          status: 'cancelled'
        })
      });
    } catch (error) {
      throw new AppError(
        'Failed to cancel appointment',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async rescheduleAppointment(
    appointmentId: string,
    newSlot: {
      startTime: string;
      endTime: string;
    }
  ): Promise<Appointment> {
    try {
      // Get existing appointment
      const existingAppointment = await this.epicClient.request(
        `/api/FHIR/R4/Appointment/${appointmentId}`
      );

      // Cancel existing appointment
      await this.cancelAppointment(appointmentId);

      // Schedule new appointment
      return this.scheduleAppointment({
        patientId: existingAppointment.participant.find(
          (p: any) => p.actor.reference.startsWith('Patient/')
        ).actor.reference.split('/')[1],
        providerId: existingAppointment.participant.find(
          (p: any) => p.actor.reference.startsWith('Practitioner/')
        ).actor.reference.split('/')[1],
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        visitType: existingAppointment.appointmentType?.coding?.[0]?.code || 'general',
        reason: existingAppointment.description || ''
      });
    } catch (error) {
      throw new AppError(
        'Failed to reschedule appointment',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }
}