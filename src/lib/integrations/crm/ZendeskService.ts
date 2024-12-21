```typescript
import { AppError, ErrorCodes } from '../../utils/errors';

export class ZendeskService {
  private baseUrl: string;
  private token: string;

  constructor(subdomain: string, token: string) {
    this.baseUrl = `https://${subdomain}.zendesk.com/api/v2`;
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new AppError(
        'Zendesk API request failed',
        ErrorCodes.INTEGRATION_ERROR,
        response.status
      );
    }

    return response.json();
  }

  async createTicket(data: {
    subject: string;
    description: string;
    priority?: 'urgent' | 'high' | 'normal' | 'low';
    type?: 'problem' | 'incident' | 'question' | 'task';
    tags?: string[];
    customFields?: Record<string, any>;
  }): Promise<any> {
    return this.request('/tickets', {
      method: 'POST',
      body: JSON.stringify({
        ticket: {
          subject: data.subject,
          comment: { body: data.description },
          priority: data.priority,
          type: data.type,
          tags: data.tags,
          custom_fields: data.customFields
        }
      })
    });
  }

  async updateTicket(ticketId: number, updates: {
    status?: 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';
    priority?: 'urgent' | 'high' | 'normal' | 'low';
    assigneeId?: number;
    comment?: string;
  }): Promise<any> {
    return this.request(`/tickets/${ticketId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ticket: {
          status: updates.status,
          priority: updates.priority,
          assignee_id: updates.assigneeId,
          comment: updates.comment ? { body: updates.comment } : undefined
        }
      })
    });
  }

  async getTicket(ticketId: number): Promise<any> {
    return this.request(`/tickets/${ticketId}`);
  }

  async searchTickets(query: string): Promise<any> {
    return this.request(`/search?query=${encodeURIComponent(query)}`);
  }

  async getUser(userId: number): Promise<any> {
    return this.request(`/users/${userId}`);
  }

  async createUser(data: {
    name: string;
    email: string;
    phone?: string;
    role?: string;
    customFields?: Record<string, any>;
  }): Promise<any> {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          user_fields: data.customFields
        }
      })
    });
  }

  async addTicketComment(ticketId: number, comment: string, isPublic: boolean = true): Promise<any> {
    return this.request(`/tickets/${ticketId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ticket: {
          comment: {
            body: comment,
            public: isPublic
          }
        }
      })
    });
  }

  async getTicketComments(ticketId: number): Promise<any> {
    return this.request(`/tickets/${ticketId}/comments`);
  }

  async getTicketMetrics(ticketId: number): Promise<any> {
    return this.request(`/tickets/${ticketId}/metrics`);
  }

  async bulkUpdateTickets(ticketIds: number[], updates: {
    status?: string;
    priority?: string;
    assigneeId?: number;
    tags?: string[];
  }): Promise<any> {
    return this.request('/tickets/update_many', {
      method: 'PUT',
      body: JSON.stringify({
        ticket_ids: ticketIds,
        ticket: updates
      })
    });
  }
}
```