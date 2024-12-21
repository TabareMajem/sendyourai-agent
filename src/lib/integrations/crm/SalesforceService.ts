import jsforce from 'jsforce';
import { SalesforceConfig, SalesforceAuth } from './SalesforceConfig';
import { AppError, ErrorCodes } from '../../utils/errors';

export class SalesforceService {
  private connection: jsforce.Connection | null = null;
  private config: SalesforceConfig;
  private auth: SalesforceAuth | null = null;

  constructor(config: SalesforceConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    try {
      this.connection = new jsforce.Connection({
        oauth2: {
          clientId: this.config.clientId,
          clientSecret: this.config.clientSecret,
          redirectUri: this.config.redirectUri
        },
        instanceUrl: this.config.instanceUrl,
        accessToken: this.config.accessToken
      });

      if (this.config.accessToken) {
        await this.validateConnection();
      }
    } catch (error) {
      throw new AppError(
        'Failed to initialize Salesforce connection',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  private async validateConnection(): Promise<void> {
    try {
      await this.connection?.identity();
    } catch (error) {
      if (this.config.refreshToken) {
        await this.refreshAccessToken();
      } else {
        throw new AppError(
          'Invalid Salesforce credentials',
          ErrorCodes.UNAUTHORIZED,
          401
        );
      }
    }
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.connection) {
      throw new AppError(
        'Salesforce connection not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    try {
      const oauth2 = this.connection.oauth2;
      const response = await oauth2.refreshToken(this.config.refreshToken!);
      
      this.auth = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token || this.config.refreshToken!,
        instanceUrl: response.instance_url,
        expiresAt: new Date(Date.now() + (response.expires_in * 1000))
      };

      this.connection.accessToken = this.auth.accessToken;
      this.connection.instanceUrl = this.auth.instanceUrl;
    } catch (error) {
      throw new AppError(
        'Failed to refresh Salesforce access token',
        ErrorCodes.UNAUTHORIZED,
        401,
        { error }
      );
    }
  }

  async createLead(data: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    status: string;
  }): Promise<string> {
    if (!this.connection) {
      throw new AppError(
        'Salesforce connection not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    try {
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
    } catch (error) {
      throw new AppError(
        'Failed to create Salesforce lead',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async updateLead(id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    status: string;
  }>): Promise<void> {
    if (!this.connection) {
      throw new AppError(
        'Salesforce connection not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    try {
      const result = await this.connection.sobject('Lead').update({
        Id: id,
        ...(data.firstName && { FirstName: data.firstName }),
        ...(data.lastName && { LastName: data.lastName }),
        ...(data.email && { Email: data.email }),
        ...(data.company && { Company: data.company }),
        ...(data.status && { Status: data.status })
      });

      if (!result.success) {
        throw new Error('Failed to update lead');
      }
    } catch (error) {
      throw new AppError(
        'Failed to update Salesforce lead',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error, leadId: id }
      );
    }
  }

  async searchLeads(query: string): Promise<any[]> {
    if (!this.connection) {
      throw new AppError(
        'Salesforce connection not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    try {
      const results = await this.connection.search(
        `FIND {${query}} IN ALL FIELDS RETURNING Lead`
      );
      return results.searchRecords;
    } catch (error) {
      throw new AppError(
        'Failed to search Salesforce leads',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error, query }
      );
    }
  }

  async addNote(params: {
    parentId: string;
    title: string;
    body: string;
  }): Promise<string> {
    if (!this.connection) {
      throw new AppError(
        'Salesforce connection not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    try {
      const result = await this.connection.sobject('Note').create({
        ParentId: params.parentId,
        Title: params.title,
        Body: params.body
      });

      if (!result.success) {
        throw new Error('Failed to create note');
      }

      return result.id;
    } catch (error) {
      throw new AppError(
        'Failed to add Salesforce note',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error, parentId: params.parentId }
      );
    }
  }

  async createTask(params: {
    subject: string;
    description?: string;
    status: string;
    priority: string;
    whatId?: string;
    whoId?: string;
    dueDate?: Date;
  }): Promise<string> {
    if (!this.connection) {
      throw new AppError(
        'Salesforce connection not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    try {
      const result = await this.connection.sobject('Task').create({
        Subject: params.subject,
        Description: params.description,
        Status: params.status,
        Priority: params.priority,
        WhatId: params.whatId,
        WhoId: params.whoId,
        ActivityDate: params.dueDate
      });

      if (!result.success) {
        throw new Error('Failed to create task');
      }

      return result.id;
    } catch (error) {
      throw new AppError(
        'Failed to create Salesforce task',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  getAuthUrl(scopes: string[]): string {
    if (!this.connection) {
      throw new AppError(
        'Salesforce connection not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    return this.connection.oauth2.getAuthorizationUrl({
      scope: scopes.join(' '),
      state: crypto.randomUUID()
    });
  }

  async handleAuthCallback(code: string): Promise<SalesforceAuth> {
    if (!this.connection) {
      throw new AppError(
        'Salesforce connection not initialized',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }

    try {
      const oauth2 = this.connection.oauth2;
      const response = await oauth2.requestToken(code);

      this.auth = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        instanceUrl: response.instance_url,
        expiresAt: new Date(Date.now() + (response.expires_in * 1000))
      };

      this.connection.accessToken = this.auth.accessToken;
      this.connection.instanceUrl = this.auth.instanceUrl;

      return this.auth;
    } catch (error) {
      throw new AppError(
        'Failed to complete Salesforce OAuth flow',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }
}