import { MessagingProvider } from './types';
import { AppError, ErrorCodes } from '../../utils/errors';

export class SlackClient implements MessagingProvider {
  private token: string;
  private baseUrl = 'https://slack.com/api';

  constructor(token: string) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    const data = await response.json();

    if (!data.ok) {
      throw new AppError(
        data.error || 'Slack API request failed',
        ErrorCodes.INTEGRATION_ERROR,
        response.status
      );
    }

    return data;
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.request('/auth.test');
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
    const response = await this.request('/chat.postMessage', {
      method: 'POST',
      body: JSON.stringify({
        channel: options.channel,
        text: options.text,
        blocks: options.blocks
      })
    });

    return response.ts;
  }

  async createChannel(name: string): Promise<string> {
    const response = await this.request('/conversations.create', {
      method: 'POST',
      body: JSON.stringify({
        name: name.toLowerCase().replace(/[^a-z0-9-_]/g, '-')
      })
    });

    return response.channel.id;
  }

  async inviteToChannel(channelId: string, userIds: string[]): Promise<void> {
    await Promise.all(
      userIds.map(userId =>
        this.request('/conversations.invite', {
          method: 'POST',
          body: JSON.stringify({
            channel: channelId,
            users: userId
          })
        })
      )
    );
  }
}