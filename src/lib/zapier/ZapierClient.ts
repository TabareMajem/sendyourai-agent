import { v4 as uuidv4 } from 'uuid';
import { AppError, ErrorCodes } from '../utils/errors';

export interface ZapierAuth {
  apiKey: string;
  accountId: string;
}

export interface ZapierWebhook {
  id: string;
  url: string;
  event: string;
  active: boolean;
}

export class ZapierClient {
  private auth: ZapierAuth;
  private webhooks: Map<string, ZapierWebhook>;
  private baseUrl: string;

  constructor(auth: ZapierAuth) {
    this.auth = auth;
    this.webhooks = new Map();
    this.baseUrl = 'https://api.zapier.com/v2';
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.auth.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new AppError(
        'Zapier API request failed',
        ErrorCodes.INTEGRATION_ERROR,
        response.status
      );
    }

    return response.json();
  }

  public async createWebhook(event: string): Promise<ZapierWebhook> {
    const webhook: ZapierWebhook = {
      id: uuidv4(),
      url: `https://hooks.zapier.com/hooks/catch/${this.auth.accountId}/${uuidv4()}`,
      event,
      active: true
    };

    this.webhooks.set(webhook.id, webhook);
    return webhook;
  }

  public async listWebhooks(): Promise<ZapierWebhook[]> {
    return Array.from(this.webhooks.values());
  }

  public async deleteWebhook(webhookId: string): Promise<boolean> {
    return this.webhooks.delete(webhookId);
  }

  public async triggerWebhook(webhookId: string, data: any): Promise<void> {
    const webhook = this.webhooks.get(webhookId);
    if (!webhook || !webhook.active) {
      throw new AppError(
        'Webhook not found or inactive',
        ErrorCodes.NOT_FOUND,
        404
      );
    }

    const response = await fetch(webhook.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new AppError(
        'Failed to trigger webhook',
        ErrorCodes.INTEGRATION_ERROR,
        response.status
      );
    }
  }
}