```typescript
import { useState } from 'react';
import { ZendeskService } from '../lib/integrations/crm/ZendeskService';

export function useZendesk(subdomain: string, token: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const zendesk = new ZendeskService(subdomain, token);

  const createTicket = async (data: {
    subject: string;
    description: string;
    priority?: 'urgent' | 'high' | 'normal' | 'low';
    type?: 'problem' | 'incident' | 'question' | 'task';
    tags?: string[];
    customFields?: Record<string, any>;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await zendesk.createTicket(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create ticket'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicket = async (ticketId: number, updates: {
    status?: 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';
    priority?: 'urgent' | 'high' | 'normal' | 'low';
    assigneeId?: number;
    comment?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await zendesk.updateTicket(ticketId, updates);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update ticket'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const searchTickets = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await zendesk.searchTickets(query);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search tickets'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (ticketId: number, comment: string, isPublic: boolean = true) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await zendesk.addTicketComment(ticketId, comment, isPublic);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add comment'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createTicket,
    updateTicket,
    searchTickets,
    addComment
  };
}
```