import { Client } from '@hubspot/api-client';

export class HubSpotClient {
  private client: Client;

  constructor(apiKey: string) {
    this.client = new Client({ accessToken: apiKey });
  }

  // async createContact(properties: Record<string, string | number | boolean>) {
  //   return this.client.crm.contacts.basicApi.create({
  //     properties
  //   });
  // }

  // async updateContact(contactId: string, properties: Record<string, string | number | boolean>) {
  //   return this.client.crm.contacts.basicApi.update(contactId, {
  //     properties
  //   });
  // }

  // async createDeal(properties: Record<string, string | number | boolean>) {
  //   return this.client.crm.deals.basicApi.create({
  //     properties
  //   });
  // }

  // async updateDeal(dealId: string, properties: Record<string, string | number | boolean>) {
  //   return this.client.crm.deals.basicApi.update(dealId, {
  //     properties
  //   });
  // }

  async createContact(properties: Record<string, string | number | boolean>) {
    const formattedProperties = Object.fromEntries(
      Object.entries(properties).map(([key, value]) => [key, String(value)])
    );
  
    return this.client.crm.contacts.basicApi.create({
      properties: formattedProperties
    });
  }
  
  async updateContact(contactId: string, properties: Record<string, string | number | boolean>) {
    const formattedProperties = Object.fromEntries(
      Object.entries(properties).map(([key, value]) => [key, String(value)])
    );
  
    return this.client.crm.contacts.basicApi.update(contactId, {
      properties: formattedProperties
    });
  }
  
  async createDeal(properties: Record<string, string | number | boolean>) {
    const formattedProperties = Object.fromEntries(
      Object.entries(properties).map(([key, value]) => [key, String(value)])
    );
  
    return this.client.crm.deals.basicApi.create({
      properties: formattedProperties
    });
  }
  
  async updateDeal(dealId: string, properties: Record<string, string | number | boolean>) {
    const formattedProperties = Object.fromEntries(
      Object.entries(properties).map(([key, value]) => [key, String(value)])
    );
  
    return this.client.crm.deals.basicApi.update(dealId, {
      properties: formattedProperties
    });
  }

  async searchContacts(query: string) {
    return this.client.crm.contacts.searchApi.doSearch({
      query,
      properties: ['firstname', 'lastname', 'email', 'company']
    });
  }
}