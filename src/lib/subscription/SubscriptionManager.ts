```typescript
import { z } from 'zod';
import { loadStripe } from '@stripe/stripe-js';

const PlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  interval: z.enum(['month', 'year']),
  features: z.array(z.string()),
  limits: z.record(z.number())
});

const SubscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  planId: z.string(),
  status: z.enum(['active', 'canceled', 'past_due', 'trialing']),
  currentPeriodEnd: z.date(),
  cancelAtPeriodEnd: z.boolean()
});

export type Plan = z.infer<typeof PlanSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;

export class SubscriptionManager {
  private static stripe = loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY || '');

  private static readonly PLANS: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      interval: 'month',
      features: [
        'Up to 5 workflows',
        'Basic integrations',
        'Community support'
      ],
      limits: {
        workflows: 5,
        apiCalls: 1000,
        storage: 1 // GB
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49,
      interval: 'month',
      features: [
        'Unlimited workflows',
        'Advanced integrations',
        'Priority support',
        'Advanced AI models'
      ],
      limits: {
        workflows: -1, // unlimited
        apiCalls: 10000,
        storage: 10 // GB
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      interval: 'month',
      features: [
        'Custom workflows',
        'Dedicated support',
        'SLA guarantees',
        'Custom integrations'
      ],
      limits: {
        workflows: -1,
        apiCalls: -1,
        storage: 100
      }
    }
  ];

  public static getPlans(): Plan[] {
    return this.PLANS;
  }

  public static async createCheckoutSession(planId: string, userId: string): Promise<string> {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, userId })
    });

    const { sessionId } = await response.json();
    const stripe = await this.stripe;
    
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw new Error(error.message);
    }

    return sessionId;
  }

  public static async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    try {
      const response = await fetch(`/api/subscriptions/${userId}`);
      const subscription = await response.json();
      return SubscriptionSchema.parse(subscription);
    } catch {
      return null;
    }
  }

  public static async cancelSubscription(subscriptionId: string): Promise<void> {
    await fetch(`/api/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST'
    });
  }

  public static async reactivateSubscription(subscriptionId: string): Promise<void> {
    await fetch(`/api/subscriptions/${subscriptionId}/reactivate`, {
      method: 'POST'
    });
  }

  public static async updateSubscription(subscriptionId: string, planId: string): Promise<void> {
    await fetch(`/api/subscriptions/${subscriptionId}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId })
    });
  }

  public static isFeatureAvailable(subscription: Subscription | null, feature: string): boolean {
    if (!subscription) return false;
    
    const plan = this.PLANS.find(p => p.id === subscription.planId);
    if (!plan) return false;

    return plan.features.includes(feature);
  }

  public static checkLimit(subscription: Subscription | null, limit: keyof Plan['limits'], value: number): boolean {
    if (!subscription) return false;

    const plan = this.PLANS.find(p => p.id === subscription.planId);
    if (!plan) return false;

    const limitValue = plan.limits[limit];
    return limitValue === -1 || value <= limitValue;
  }
}
```