import { MessagingProvider } from './types';
import { AppError, ErrorCodes } from '../../utils/errors';

export class TwilioClient implements MessagingProvider {
  private accountSid: string;
  private authToken: string;
  private baseUrl: string;

  constructor(accountSid: string, authToken: string) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}`;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const auth = btoa(`${this.accountSid}:${this.authToken}`);
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new AppError(
        'Twilio API request failed',
        ErrorCodes.INTEGRATION_ERROR,
        response.status
      );
    }

    return response.json();
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.request('/Messages.json?PageSize=1');
      return true;
    } catch {
      return false;
    }
  }

  async sendMessage(options: {
    channel: string;
    text: string;
    blocks?: any[];
  }): Promise<string> {
    const params = new URLSearchParams({
      To: options.channel,
      From: process.env.VITE_TWILIO_PHONE_NUMBER || '',
      Body: options.text
    });

    const response = await this.request('/Messages.json', {
      method: 'POST',
      body: params
    });

    return response.sid;
  }
}