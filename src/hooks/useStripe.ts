```typescript
import { useState, useEffect } from 'react';
import { StripeClient } from '../lib/stripe/StripeClient';

export function useStripe() {
  const [stripeClient, setStripeClient] = useState<StripeClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        // In a real app, fetch this from your backend
        const publicKey = process.env.VITE_STRIPE_PUBLIC_KEY;
        if (!publicKey) {
          throw new Error('Stripe public key not found');
        }

        const client = StripeClient.getInstance(publicKey);
        setStripeClient(client);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    initStripe();
  }, []);

  const createCheckoutSession = async (priceId: string) => {
    if (!stripeClient) {
      throw new Error('Stripe not initialized');
    }

    try {
      const sessionId = await stripeClient.createCheckoutSession(priceId);
      await stripeClient.redirectToCheckout(sessionId);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    stripeClient,
    isLoading,
    error,
    createCheckoutSession
  };
}
```