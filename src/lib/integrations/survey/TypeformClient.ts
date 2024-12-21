import { SurveyProvider } from './types';

export class TypeformClient implements SurveyProvider {
  private apiKey: string;
  private baseUrl = 'https://api.typeform.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`Typeform API error: ${response.statusText}`);
    }

    return response.json();
  }

  async createForm(data: {
    title: string;
    fields: Array<{
      type: string;
      title: string;
      required?: boolean;
      properties?: Record<string, any>;
    }>;
  }): Promise<string> {
    const response = await this.request('/forms', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        fields: data.fields
      })
    });

    return response.id;
  }

  async getForm(formId: string): Promise<any> {
    return this.request(`/forms/${formId}`);
  }

  async getResponses(formId: string, options: {
    pageSize?: number;
    since?: Date;
    until?: Date;
  } = {}): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.pageSize) params.append('page_size', options.pageSize.toString());
    if (options.since) params.append('since', options.since.toISOString());
    if (options.until) params.append('until', options.until.toISOString());

    const response = await this.request(`/forms/${formId}/responses?${params.toString()}`);
    return response.items;
  }

  async getWebhooks(formId: string): Promise<any[]> {
    const response = await this.request(`/forms/${formId}/webhooks`);
    return response.items;
  }

  async createWebhook(formId: string, url: string, tag?: string): Promise<string> {
    const response = await this.request(`/forms/${formId}/webhooks`, {
      method: 'PUT',
      body: JSON.stringify({
        url,
        enabled: true,
        tag
      })
    });

    return response.id;
  }
}