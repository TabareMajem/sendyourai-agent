```typescript
import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export function SubscriptionBanner() {
  const { subscription, plans } = useSubscription();

  if (!subscription || subscription.status === 'active') {
    return null;
  }

  const messages = {
    canceled: {
      title: 'Your subscription will end soon',
      message: 'Your subscription will be canceled at the end of the current billing period.',
      action: 'Reactivate Subscription'
    },
    past_due: {
      title: 'Payment Failed',
      message: 'We were unable to process your last payment. Please update your payment method.',
      action: 'Update Payment Method'
    },
    trialing: {
      title: 'Trial Period',
      message: 'Your trial will end soon. Upgrade to continue using premium features.',
      action: 'Upgrade Now'
    }
  };

  const info = messages[subscription.status];

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{info.title}</h3>
          <p className="mt-2 text-sm text-yellow-700">{info.message}</p>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
              >
                {info.action}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```