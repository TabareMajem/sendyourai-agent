import React, { useState } from 'react';
import { useStripe } from '../../lib/stripe/StripeProvider';
import { CreditCard, AlertTriangle } from 'lucide-react';

interface PaymentMethodFormProps {
  onSuccess: (paymentMethod: any) => void;
  onError: (error: Error) => void;
}

export function PaymentMethodForm({ onSuccess, onError }: PaymentMethodFormProps) {
  const { stripe } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe) return;

    setIsLoading(true);
    setError(null);

    try {
      const elements = stripe.elements();
      const card = elements.create('card');
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentMethod) {
        onSuccess(result.paymentMethod);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process payment method');
      onError(err instanceof Error ? err : new Error('Failed to process payment method'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Information
        </label>
        <div className="mt-1">
          <div id="card-element" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Payment Error
              </h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !stripe}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Add Payment Method
          </span>
        )}
      </button>
    </form>
  );
}