```typescript
import { loadStripe, Stripe } from '@stripe/stripe-js';

export class StripeClient {
  private static instance: StripeClient;
  private stripe: Promise<Stripe | null>;

  private constructor(publicKey: string) {
    this.stripe = loadStripe(publicKey);
  }

  public static getInstance(publicKey: string): StripeClient {
    if (!StripeClient.instance) {
      StripeClient.instance = new StripeClient(publicKey);
    }
    return StripeClient.instance;
  }

  public async createCheckoutSession(priceId: string): Promise<string> {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const { sessionId } = await response.json();
    return sessionId;
  }

  public async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await this.stripe;
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw new Error(error.message);
    }
  }
}
```