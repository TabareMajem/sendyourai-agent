import { 
  EmailProvider, 
  MessagingProvider, 
  CRMProvider, 
  ProjectManagementProvider, 
} from './types';

import { GmailClient } from './email/GmailClient';
import { SlackClient } from './messaging/SlackClient';
import { TwilioClient } from './messaging/TwilioClient';
import { SalesforceClient } from './crm/SalesforceClient';
import { TrelloClient } from './project/TrelloClient';
import { AsanaClient } from './project/AsanaClient';
import { GoogleDriveClient } from './drive/GoogleDriveClient';
import { StorageProvider } from './drive/types';

export class IntegrationFactory {

  public static async createProvider(type: string, category: string, config: any): Promise<any> {
    switch (category) {
      case 'email':
        return this.createEmailProvider(type, config);
      case 'messaging':
        return this.createMessagingProvider(type, config);
      case 'crm':
        return this.createCRMProvider(type, config);
      case 'project':
        return this.createProjectProvider(type, config);
      case 'storage':
        return this.createStorageProvider(type, config);
      default:
        throw new Error(`Unsupported integration category: ${category}`);
    }
  }

  private static async createEmailProvider(type: string, config: any): Promise<EmailProvider> {
    switch (type) {
      case 'gmail':
        return new GmailClient(config);
      default:
        throw new Error(`Unsupported email provider: ${type}`);
    }
  }

  private static async createMessagingProvider(type: string, config: any): Promise<MessagingProvider> {
    switch (type) {
      case 'slack':
        return new SlackClient(config.token);
      case 'twilio':
        return new TwilioClient(config.accountSid, config.authToken);
      default:
        throw new Error(`Unsupported messaging provider: ${type}`);
    }
  }

  private static async createCRMProvider(type: string, config: any): Promise<CRMProvider> {
    switch (type) {
      case 'salesforce':
        return new SalesforceClient(config);
      default:
        throw new Error(`Unsupported CRM provider: ${type}`);
    }
  }

  private static async createProjectProvider(type: string, config: any): Promise<ProjectManagementProvider> {
    switch (type) {
      case 'trello':
        return new TrelloClient(config.apiKey, config.token);
      case 'asana':
        return new AsanaClient(config.accessToken);
      default:
        throw new Error(`Unsupported project management provider: ${type}`);
    }
  }

  private static async createStorageProvider(type: string, config: any): Promise<StorageProvider> {
    switch (type) {
      case 'google-drive':
        return new GoogleDriveClient(config);
      default:
        throw new Error(`Unsupported storage provider: ${type}`);
    }
  }
}