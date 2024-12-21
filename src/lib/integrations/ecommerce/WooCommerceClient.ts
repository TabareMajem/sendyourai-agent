import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { EcommerceProvider } from './types';

export class WooCommerceClient implements EcommerceProvider {
  private client: WooCommerceRestApi;

  constructor(config: {
    url: string;
    consumerKey: string;
    consumerSecret: string;
    version: string;
  }) {
    this.client = new WooCommerceRestApi({
      url: config.url,
      consumerKey: config.consumerKey,
      consumerSecret: config.consumerSecret,
      version: config.version
    });
  }

  async createOrder(data: {
    customerId: string;
    items: Array<{
      productId: number;
      quantity: number;
    }>;
    billing: any;
    shipping: any;
  }): Promise<string> {
    const response = await this.client.post('orders', {
      customer_id: data.customerId,
      line_items: data.items.map(item => ({
        product_id: item.productId,
        quantity: item.quantity
      })),
      billing: data.billing,
      shipping: data.shipping
    });

    return response.data.id.toString();
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    await this.client.put(`orders/${orderId}`, {
      status: status
    });
  }

  async getOrder(orderId: string): Promise<any> {
    const response = await this.client.get(`orders/${orderId}`);
    return response.data;
  }

  async createCustomer(data: {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  }): Promise<string> {
    const response = await this.client.post('customers', {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      password: data.password
    });

    return response.data.id.toString();
  }

  async getCustomer(customerId: string): Promise<any> {
    const response = await this.client.get(`customers/${customerId}`);
    return response.data;
  }

  async searchProducts(query: string): Promise<any[]> {
    const response = await this.client.get('products', {
      search: query
    });

    return response.data;
  }
}