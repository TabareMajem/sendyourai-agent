import { Shopify } from '@shopify/shopify-api';
import { EcommerceProvider } from './types';

export class ShopifyClient implements EcommerceProvider {
  private client: Shopify;

  constructor(config: {
    shopName: string;
    accessToken: string;
    apiVersion: string;
  }) {
    this.client = new Shopify({
      shopName: config.shopName,
      accessToken: config.accessToken,
      apiVersion: config.apiVersion
    });
  }

  async createOrder(data: {
    email: string;
    items: Array<{
      variantId: string;
      quantity: number;
    }>;
    shippingAddress: any;
    billingAddress: any;
  }): Promise<string> {
    const order = await this.client.order.create({
      email: data.email,
      line_items: data.items,
      shipping_address: data.shippingAddress,
      billing_address: data.billingAddress
    });

    return order.id;
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    await this.client.order.update(orderId, {
      status: status
    });
  }

  async getOrder(orderId: string): Promise<any> {
    return this.client.order.get(orderId);
  }

  async createCustomer(data: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<string> {
    const customer = await this.client.customer.create({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone
    });

    return customer.id;
  }

  async getCustomer(customerId: string): Promise<any> {
    return this.client.customer.get(customerId);
  }

  async searchProducts(query: string): Promise<any[]> {
    const products = await this.client.product.list({
      title: query
    });

    return products;
  }
}