import { Stripe } from '@stripe/stripe-js';
import { AppError, ErrorCodes } from '../utils/errors';

export class PaymentService {
  private stripe: Stripe;

  constructor(stripe: Stripe) {
    this.stripe = stripe;
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<string> {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      throw new AppError(
        'Failed to create payment intent',
        ErrorCodes.PAYMENT_ERROR,
        500,
        { error }
      );
    }
  }

  async handleCardPayment(clientSecret: string, paymentMethod: any): Promise<any> {
    try {
      const result = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentIntent;
    } catch (error) {
      throw new AppError(
        'Payment failed',
        ErrorCodes.PAYMENT_ERROR,
        500,
        { error }
      );
    }
  }

  async createSubscription(priceId: string, paymentMethodId: string): Promise<any> {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          paymentMethodId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      return response.json();
    } catch (error) {
      throw new AppError(
        'Failed to create subscription',
        ErrorCodes.PAYMENT_ERROR,
        500,
        { error }
      );
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    try {
      const response = await fetch(`/api/cancel-subscription/${subscriptionId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      return response.json();
    } catch (error) {
      throw new AppError(
        'Failed to cancel subscription',
        ErrorCodes.PAYMENT_ERROR,
        500,
        { error }
      );
    }
  }

  async getPaymentMethods(): Promise<any[]> {
    try {
      const response = await fetch('/api/payment-methods');
      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }

      return response.json();
    } catch (error) {
      throw new AppError(
        'Failed to fetch payment methods',
        ErrorCodes.PAYMENT_ERROR,
        500,
        { error }
      );
    }
  }

  async addPaymentMethod(paymentMethodId: string): Promise<any> {
    try {
      const response = await fetch('/api/add-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }

      return response.json();
    } catch (error) {
      throw new AppError(
        'Failed to add payment method',
        ErrorCodes.PAYMENT_ERROR,
        500,
        { error }
      );
    }
  }

  async removePaymentMethod(paymentMethodId: string): Promise<void> {
    try {
      const response = await fetch(`/api/remove-payment-method/${paymentMethodId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove payment method');
      }
    } catch (error) {
      throw new AppError(
        'Failed to remove payment method',
        ErrorCodes.PAYMENT_ERROR,
        500,
        { error }
      );
    }
  }
}