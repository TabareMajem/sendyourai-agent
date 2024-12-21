import { Clearbit } from 'clearbit';

export class ClearbitClient {
  private client: Clearbit;

  constructor(apiKey: string) {
    this.client = new Clearbit({ key: apiKey });
  }

  async enrichCompany(domain: string) {
    return this.client.Company.find({ domain });
  }

  async enrichPerson(email: string) {
    return this.client.Person.find({ email });
  }

  async prospectCompany(query: {
    domain?: string;
    company?: string;
    location?: string;
  }) {
    return this.client.Company.prospect(query);
  }
}