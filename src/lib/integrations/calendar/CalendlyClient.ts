import { Calendly } from 'calendly';

export class CalendlyClient {
  private client: Calendly;

  constructor(token: string) {
    this.client = new Calendly({ token });
  }

  async createEventType(params: {
    name: string;
    description?: string;
    duration: number;
    color?: string;
  }) {
    return this.client.eventTypes.create(params);
  }

  async getScheduledEvents(options: {
    startTime?: Date;
    endTime?: Date;
    status?: 'active' | 'canceled';
  } = {}) {
    return this.client.scheduledEvents.list(options);
  }

  async cancelEvent(eventId: string, reason?: string) {
    return this.client.scheduledEvents.cancel(eventId, { reason });
  }
}