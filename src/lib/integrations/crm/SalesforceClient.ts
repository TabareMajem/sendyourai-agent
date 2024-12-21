import jsforce from 'jsforce';
import { CRMProvider } from './types';

export class SalesforceClient implements CRMProvider {
  private connection: jsforce.Connection;

  constructor(credentials: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }) {
    this.connection = new jsforce.Connection({
      oauth2: {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        redirectUri: credentials.redirectUri
      }
    });
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.connection.identity();
      return true;
    } catch {
      return false;
    }
  }

  async createLead(data: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    status: string;
  }): Promise<string> {
    const result = await this.connection.sobject('Lead').create({
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Company: data.company,
      Status: data.status
    });

    if (!result.success) {
      throw new Error('Failed to create lead');
    }

    return result.id;
  }

  async updateLead(id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    status: string;
  }>): Promise<void> {
    const updateData: Record<string, any> = {
      Id: id
    };
    
    if (data.firstName) updateData.FirstName = data.firstName;
    if (data.lastName) updateData.LastName = data.lastName;
    if (data.email) updateData.Email = data.email;
    if (data.company) updateData.Company = data.company;
    if (data.status) updateData.Status = data.status;

    const result = await this.connection.sobject('Lead').update(updateData);

    if (!result.success) {
      throw new Error('Failed to update lead');
    }
  }

  async getLead(id: string): Promise<any> {
    const lead = await this.connection.sobject('Lead').retrieve(id);
    return lead;
  }

  async searchLeads(query: string): Promise<any[]> {
    const results = await this.connection.search(
      `FIND {${query}} IN ALL FIELDS RETURNING Lead`
    );
    return results.searchRecords;
  }
}