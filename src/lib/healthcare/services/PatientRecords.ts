import { FHIRClient } from '../integrations/FHIRClient';
import { EpicClient } from '../integrations/EpicClient';
import { Patient } from '../types';
import { AppError, ErrorCodes } from '../../utils/errors';

export class PatientRecords {
  constructor(
    private fhirClient: FHIRClient,
    private epicClient: EpicClient
  ) {}

  async getPatientRecord(patientId: string): Promise<Patient> {
    try {
      // Fetch patient data from both systems
      const [fhirPatient, epicPatient] = await Promise.all([
        this.fhirClient.getPatient(patientId),
        this.epicClient.request(`/api/FHIR/R4/Patient/${patientId}`)
      ]);

      // Merge and normalize patient data
      return this.normalizePatientData(fhirPatient, epicPatient);
    } catch (error) {
      throw new AppError(
        'Failed to fetch patient record',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async updatePatientRecord(patientId: string, updates: Partial<Patient>): Promise<Patient> {
    try {
      // Update in both systems
      const [fhirUpdate, epicUpdate] = await Promise.all([
        this.fhirClient.request(`/Patient/${patientId}`, {
          method: 'PATCH',
          body: JSON.stringify(this.transformToFHIR(updates))
        }),
        this.epicClient.request(`/api/FHIR/R4/Patient/${patientId}`, {
          method: 'PATCH',
          body: JSON.stringify(this.transformToFHIR(updates))
        })
      ]);

      return this.normalizePatientData(fhirUpdate, epicUpdate);
    } catch (error) {
      throw new AppError(
        'Failed to update patient record',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async getMedicalHistory(patientId: string): Promise<{
    conditions: any[];
    medications: any[];
    allergies: any[];
    immunizations: any[];
    procedures: any[];
  }> {
    try {
      const [
        conditions,
        medications,
        allergies,
        immunizations,
        procedures
      ] = await Promise.all([
        this.epicClient.request(`/api/FHIR/R4/Condition?patient=${patientId}`),
        this.epicClient.getPatientMedications(patientId),
        this.epicClient.getPatientAllergies(patientId),
        this.epicClient.getPatientImmunizations(patientId),
        this.fhirClient.request(`/Procedure?patient=${patientId}`)
      ]);

      return {
        conditions: this.normalizeConditions(conditions),
        medications: this.normalizeMedications(medications),
        allergies: this.normalizeAllergies(allergies),
        immunizations: this.normalizeImmunizations(immunizations),
        procedures: this.normalizeProcedures(procedures)
      };
    } catch (error) {
      throw new AppError(
        'Failed to fetch medical history',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async addMedicalNote(params: {
    patientId: string;
    authorId: string;
    text: string;
    type: string;
  }): Promise<void> {
    try {
      await this.epicClient.createPatientNote(params);
    } catch (error) {
      throw new AppError(
        'Failed to add medical note',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  private normalizePatientData(fhirPatient: any, epicPatient: any): Patient {
    return {
      id: fhirPatient.id,
      name: `${fhirPatient.name[0].given.join(' ')} ${fhirPatient.name[0].family}`,
      dateOfBirth: new Date(fhirPatient.birthDate),
      gender: fhirPatient.gender,
      contact: {
        email: this.extractEmail(fhirPatient),
        phone: this.extractPhone(fhirPatient),
        address: this.extractAddress(fhirPatient)
      },
      medicalHistory: {
        conditions: [],
        medications: [],
        allergies: []
      },
      insurance: {
        provider: this.extractInsuranceProvider(epicPatient),
        policyNumber: this.extractPolicyNumber(epicPatient),
        groupNumber: this.extractGroupNumber(epicPatient)
      }
    };
  }

  private transformToFHIR(updates: Partial<Patient>): any {
    // Transform the updates into FHIR format
    const fhirUpdates: any = {};

    if (updates.name) {
      const [firstName, ...rest] = updates.name.split(' ');
      const lastName = rest.join(' ');
      fhirUpdates.name = [{
        use: 'official',
        given: [firstName],
        family: lastName
      }];
    }

    if (updates.dateOfBirth) {
      fhirUpdates.birthDate = updates.dateOfBirth.toISOString().split('T')[0];
    }

    if (updates.gender) {
      fhirUpdates.gender = updates.gender;
    }

    if (updates.contact) {
      fhirUpdates.telecom = [];
      if (updates.contact.email) {
        fhirUpdates.telecom.push({
          system: 'email',
          value: updates.contact.email
        });
      }
      if (updates.contact.phone) {
        fhirUpdates.telecom.push({
          system: 'phone',
          value: updates.contact.phone
        });
      }
      if (updates.contact.address) {
        fhirUpdates.address = [{
          use: 'home',
          text: updates.contact.address
        }];
      }
    }

    return fhirUpdates;
  }

  private extractEmail(fhirPatient: any): string {
    return fhirPatient.telecom?.find((t: any) => t.system === 'email')?.value || '';
  }

  private extractPhone(fhirPatient: any): string {
    return fhirPatient.telecom?.find((t: any) => t.system === 'phone')?.value || '';
  }

  private extractAddress(fhirPatient: any): string {
    if (!fhirPatient.address?.[0]) return '';
    const addr = fhirPatient.address[0];
    return `${addr.line?.join(' ')}, ${addr.city}, ${addr.state} ${addr.postalCode}`;
  }

  private extractInsuranceProvider(epicPatient: any): string {
    return epicPatient.insurance?.[0]?.coverage?.display || '';
  }

  private extractPolicyNumber(epicPatient: any): string {
    return epicPatient.insurance?.[0]?.identifier?.[0]?.value || '';
  }

  private extractGroupNumber(epicPatient: any): string {
    return epicPatient.insurance?.[0]?.identifier?.[1]?.value || '';
  }

  private normalizeConditions(conditions: any): any[] {
    return conditions.entry?.map((entry: any) => ({
      id: entry.resource.id,
      code: entry.resource.code.coding[0].code,
      display: entry.resource.code.coding[0].display,
      onsetDate: entry.resource.onsetDateTime,
      status: entry.resource.clinicalStatus.coding[0].code
    })) || [];
  }

  private normalizeMedications(medications: any): any[] {
    return medications.entry?.map((entry: any) => ({
      id: entry.resource.id,
      medication: entry.resource.medicationCodeableConcept.coding[0].display,
      status: entry.resource.status,
      dosage: entry.resource.dosageInstruction?.[0]?.text,
      startDate: entry.resource.authoredOn
    })) || [];
  }

  private normalizeAllergies(allergies: any): any[] {
    return allergies.entry?.map((entry: any) => ({
      id: entry.resource.id,
      substance: entry.resource.code.coding[0].display,
      severity: entry.resource.reaction?.[0]?.severity,
      status: entry.resource.clinicalStatus.coding[0].code
    })) || [];
  }

  private normalizeImmunizations(immunizations: any): any[] {
    return immunizations.entry?.map((entry: any) => ({
      id: entry.resource.id,
      vaccine: entry.resource.vaccineCode.coding[0].display,
      date: entry.resource.occurrenceDateTime,
      status: entry.resource.status
    })) || [];
  }

  private normalizeProcedures(procedures: any): any[] {
    return procedures.entry?.map((entry: any) => ({
      id: entry.resource.id,
      procedure: entry.resource.code.coding[0].display,
      date: entry.resource.performedDateTime,
      status: entry.resource.status
    })) || [];
  }
}