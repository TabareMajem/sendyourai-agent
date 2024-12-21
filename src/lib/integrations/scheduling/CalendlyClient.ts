import { SchedulingProvider } from './types';

export class CalendlyClient implements SchedulingProvider {
  private apiKey: string;
  private baseUrl = 'https://api.calendly.com/v2';

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
      throw new Error(`Calendly API error: ${response.statusText}`);
    }

    return response.json();
  }

  async createEventType(data: {
    name: string;
    description?: string;
    duration: number;
    color?: string;
  }): Promise<string> {
    const response = await this.request('/event_types', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        duration: data.duration,
        color: data.color
      })
    });

    return response.resource.uri;
  }

  async getEventType(eventTypeId: string): Promise<any> {
    const response = await this.request(`/event_types/${eventTypeId}`);
    return response.resource;
  }

  async listEventTypes(): Promise<any[]> {
    const response = await this.request('/event_types');
    return response.collection;
  }

  async getScheduledEvents(options: {
    startTime?: Date;
    endTime?: Date;
    status?: 'active' | 'canceled';
  } = {}): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.startTime) params.append('start_time', options.startTime.toISOString());
    if (options.endTime) params.append('end_time', options.endTime.toISOString());
    if (options.status) params.append('status', options.status);

    const response = await this.request(`/scheduled_events?${params.toString()}`);
    return response.collection;
  }

  async cancelEvent(eventId: string, reason?: string): Promise<void> {
    await this.request(`/scheduled_events/${eventId}/cancellation`, {
      method: 'POST',
      body: JSON.stringify({
        reason: reason
      })
    });
  }

  async getAvailability(options: {
    startTime: Date;
    endTime: Date;
    eventTypeId?: string;
  }): Promise<any[]> {
    const params = new URLSearchParams({
      start_time: options.startTime.toISOString(),
      end_time: options.endTime.toISOString()
    });
    if (options.eventTypeId) params.append('event_type', options.eventTypeId);

    const response = await this.request(`/user_availability?${params.toString()}`);
    return response.collection;
  }
}