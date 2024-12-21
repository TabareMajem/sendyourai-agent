```typescript
import { useState, useEffect } from 'react';
import { SubscriptionManager, type Subscription, type Plan } from '../lib/subscription/SubscriptionManager';
import { useAuth } from './useAuth';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSubscription = async () => {
      if (!user) {
        setSubscription(null);
        setIsLoading(false);
        return;
      }

      try {
        const currentSubscription = await SubscriptionManager.getCurrentSubscription(user.id);
        setSubscription(currentSubscription);
        setPlans(SubscriptionManager.getPlans());
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, [user]);

  const checkFeature = (feature: string) => {
    return SubscriptionManager.isFeatureAvailable(subscription, feature);
  };

  const checkLimit = (limit: keyof Plan['limits'], value: number) => {
    return SubscriptionManager.checkLimit(subscription, limit, value);
  };

  const upgradePlan = async (planId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      await SubscriptionManager.createCheckoutSession(planId, user.id);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const cancelSubscription = async () => {
    if (!subscription) return;
    
    try {
      await SubscriptionManager.cancelSubscription(subscription.id);
      const updated = await SubscriptionManager.getCurrentSubscription(user!.id);
      setSubscription(updated);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const reactivateSubscription = async () => {
    if (!subscription) return;
    
    try {
      await SubscriptionManager.reactivateSubscription(subscription.id);
      const updated = await SubscriptionManager.getCurrentSubscription(user!.id);
      setSubscription(updated);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    subscription,
    plans,
    isLoading,
    error,
    checkFeature,
    checkLimit,
    upgradePlan,
    cancelSubscription,
    reactivateSubscription
  };
}
```