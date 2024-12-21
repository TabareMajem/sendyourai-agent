export interface StripeConfig {
  publicKey: string;
  webhookSecret: string;
  mode: 'test' | 'live';
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  billingDetails?: {
    name: string;
    email: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

export interface Subscription {
  id: string;
  status: 'active' | 'past_due' | 'canceled' | 'incomplete';
  currentPeriodEnd: string;
  plan: SubscriptionPlan;
  defaultPaymentMethod?: PaymentMethod;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded';
  clientSecret: string;
}