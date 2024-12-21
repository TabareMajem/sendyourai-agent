import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

interface StripeContextType {
  stripe: Stripe | null;
  isLoading: boolean;
  error: Error | null;
}

const StripeContext = createContext<StripeContextType | null>(null);

export function StripeProvider({ children }: { children: React.ReactNode }) {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
        if (!stripeKey) {
          throw new Error('Stripe public key not found');
        }

        const stripeInstance = await loadStripe(stripeKey);
        setStripe(stripeInstance);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load Stripe'));
      } finally {
        setIsLoading(false);
      }
    };

    initStripe();
  }, []);

  return (
    <StripeContext.Provider value={{ stripe, isLoading, error }}>
      {children}
    </StripeContext.Provider>
  );
}

export function useStripe() {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
}