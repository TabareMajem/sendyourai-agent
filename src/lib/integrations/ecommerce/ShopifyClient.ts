// import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
// import { RestResources } from '@shopify/shopify-api/rest/admin/2024-01';
// import { EcommerceProvider } from '../types';

// interface ShopifyConfig {
//   shopName: string;
//   accessToken: string;
//   apiVersion?: string;
// }

// interface LineItem {
//   variant_id: string | number;
//   quantity: number;
// }

// interface Address {
//   first_name: string;
//   last_name: string;
//   address1: string;
//   address2?: string;
//   city: string;
//   province?: string;
//   country: string;
//   zip: string;
//   phone?: string;
// }

// interface OrderData {
//   email: string;
//   items: Array<{
//     variantId: string;
//     quantity: number;
//   }>;
//   shippingAddress: Address;
//   billingAddress: Address;
// }

// interface CustomerData {
//   email: string;
//   firstName: string;
//   lastName: string;
//   phone?: string;
// }

// export class ShopifyClient implements EcommerceProvider {
//   private client: ReturnType<typeof shopifyApi<typeof RestResources>>;
//   private shop: string;

//   constructor(config: ShopifyConfig) {
//     this.shop = config.shopName;
    
//     this.client = shopifyApi({
//       apiKey: process.env.SHOPIFY_API_KEY || '',
//       apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY || '',
//       scopes: ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_customers', 'write_customers'],
//       hostName: `${config.shopName}.myshopify.com`,
//       apiVersion: config.apiVersion || LATEST_API_VERSION,
//       isEmbeddedApp: false,
//       adminApiAccessToken: config.accessToken,
//     });
//   }
//   isConnected(): Promise<boolean> {
//     throw new Error('Method not implemented.');
//   }

//   async createOrder(data: OrderData): Promise<string> {
//     try {
//       const response = await this.client.rest.Order.create({
//         session: {
//           shop: this.shop,
//           accessToken: this.client.config.adminApiAccessToken!,
//         },
//         data: {
//           email: data.email,
//           line_items: data.items.map(item => ({
//             variant_id: item.variantId,
//             quantity: item.quantity
//           })),
//           shipping_address: data.shippingAddress,
//           billing_address: data.billingAddress
//         },
//       });

//       return response.body.order.id.toString();
//     } catch (error) {
//       throw new Error(`Shopify create order failed: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   }

//   async updateOrderStatus(orderId: string, status: string): Promise<void> {
//     try {
//       await this.client.rest.Order.update({
//         session: {
//           shop: this.shop,
//           accessToken: this.client.config.adminApiAccessToken!,
//         },
//         id: orderId,
//         order: { status }
//       });
//     } catch (error) {
//       throw new Error(`Shopify update order status failed: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   }

//   async getOrder(orderId: string): Promise<any> {
//     try {
//       const response = await this.client.rest.Order.find({
//         session: {
//           shop: this.shop,
//           accessToken: this.client.config.adminApiAccessToken!,
//         },
//         id: orderId,
//       });
//       return response.body.order;
//     } catch (error) {
//       throw new Error(`Shopify get order failed: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   }

//   async createCustomer(data: CustomerData): Promise<string> {
//     try {
//       const response = await this.client.rest.Customer.create({
//         session: {
//           shop: this.shop,
//           accessToken: this.client.config.adminApiAccessToken!,
//         },
//         data: {
//           email: data.email,
//           first_name: data.firstName,
//           last_name: data.lastName,
//           phone: data.phone,
//           verified_email: true
//         },
//       });

//       return response.body.customer.id.toString();
//     } catch (error) {
//       throw new Error(`Shopify create customer failed: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   }

//   async getCustomer(customerId: string): Promise<any> {
//     try {
//       const response = await this.client.rest.Customer.find({
//         session: {
//           shop: this.shop,
//           accessToken: this.client.config.adminApiAccessToken!,
//         },
//         id: customerId,
//       });
//       return response.body.customer;
//     } catch (error) {
//       throw new Error(`Shopify get customer failed: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   }

//   async searchProducts(query: string): Promise<any[]> {
//     try {
//       const response = await this.client.rest.Product.all({
//         session: {
//           shop: this.shop,
//           accessToken: this.client.config.adminApiAccessToken!,
//         },
//         query: { title: query },
//       });
      
//       return response.data;
//     } catch (error) {
//       throw new Error(`Shopify search products failed: ${error instanceof Error ? error.message : String(error)}`);
//     }
//   }
// }