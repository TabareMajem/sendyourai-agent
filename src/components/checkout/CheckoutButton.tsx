```typescript
import React from 'react';
import { useStripe } from '../../hooks/useStripe';

interface CheckoutButtonProps {
  priceId: string;
  children: React.ReactNode;
  className?: string;
}

export function CheckoutButton({ priceId, children, className = '' }: CheckoutButtonProps) {
  const { createCheckoutSession, isLoading } = useStripe();

  const handleClick = async () => {
    try {
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}
```