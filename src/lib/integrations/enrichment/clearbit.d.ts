declare module 'clearbit' {
    class Clearbit {
      constructor(config: { key: string });
      Company: {
        find(query: { domain: string }): Promise<any>;
        prospect(query: { domain?: string, company?: string, location?: string }): Promise<any>;
      };
      Person: {
        find(query: { email: string }): Promise<any>;
      };
    }
  
    export { Clearbit };
  }
  