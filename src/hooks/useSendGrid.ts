```typescript
import { useState } from 'react';
import { SendGridService } from '../lib/integrations/email/SendGridService';

export function useSendGrid(apiKey: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendEmail = async (params: {
    to: string;
    from: string;
    subject: string;
    text?: string;
    html?: string;
    templateId?: string;
    dynamicTemplateData?: Record<string, any>;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const sendGrid = new SendGridService(apiKey);
      await sendGrid.sendEmail(params);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send email'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendBulkEmails = async (params: {
    to: string[];
    from: string;
    subject: string;
    text?: string;
    html?: string;
    templateId?: string;
    dynamicTemplateData?: Record<string, any>;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const sendGrid = new SendGridService(apiKey);
      await sendGrid.sendBulkEmails(params);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send bulk emails'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    sendEmail,
    sendBulkEmails
  };
}
```