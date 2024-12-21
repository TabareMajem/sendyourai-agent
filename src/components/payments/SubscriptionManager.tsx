import React, { useState } from 'react';
import { CreditCard, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { PaymentMethodForm } from './PaymentMethodForm';
import type { Subscription, PaymentMethod } from '../../lib/stripe/types';

interface SubscriptionManagerProps {
  subscription: Subscription | null;
  paymentMethods: PaymentMethod[];
  onUpdatePaymentMethod: (paymentMethodId: string) => Promise<void>;
  onCancelSubscription: () => Promise<void>;
  onReactivateSubscription: () => Promise<void>;
}

export function SubscriptionManager({
  subscription,
  paymentMethods,
  onUpdatePaymentMethod,
  onCancelSubscription,
  onReactivateSubscription
}: SubscriptionManagerProps) {
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePaymentMethodUpdate = async (paymentMethodId: string) => {
    try {
      setError(null);
      setIsUpdatingPayment(true);
      await onUpdatePaymentMethod(paymentMethodId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment method');
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Subscription Management</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Subscription Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Current Plan</h3>
              {subscription ? (
                <>
                  <p className="mt-1 text-sm text-gray-500">
                    {subscription.plan.name} - ${subscription.plan.amount}/
                    {subscription.plan.interval}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p className="mt-1 text-sm text-gray-500">No active subscription</p>
              )}
            </div>
            <div className="flex items-center">
              {subscription?.status === 'active' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Active
                </span>
              )}
              {subscription?.status === 'past_due' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Past Due
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {method.card?.brand.toUpperCase()} •••• {method.card?.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.card?.expMonth}/{method.card?.expYear}
                    </p>
                  </div>
                </div>
                {subscription?.defaultPaymentMethod?.id !== method.id && (
                  <button
                    onClick={() => handlePaymentMethodUpdate(method.id)}
                    disabled={isUpdatingPayment}
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Make Default
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Payment Method */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Add Payment Method</h3>
          <PaymentMethodForm
            onSuccess={(paymentMethod) => handlePaymentMethodUpdate(paymentMethod.id)}
            onError={(err) => setError(err.message)}
          />
        </div>

        {/* Subscription Actions */}
        {subscription && (
          <div className="border-t border-gray-200 pt-6">
            {subscription.status === 'active' ? (
              <button
                onClick={onCancelSubscription}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel Subscription
              </button>
            ) : (
              <button
                onClick={onReactivateSubscription}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Reactivate Subscription
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}