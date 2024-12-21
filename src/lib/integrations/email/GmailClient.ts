import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { EmailProvider } from './types';

export class GmailClient implements EmailProvider {
  private oauth2Client: OAuth2Client;
  private gmail: any;

  constructor(credentials: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }) {
    this.oauth2Client = new google.auth.OAuth2(
      credentials.clientId,
      credentials.clientSecret,
      credentials.redirectUri
    );

    this.gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    body: string;
    html?: string;
  }): Promise<string> {
    const message = [
      `To: ${options.to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${options.subject}`,
      '',
      options.html || options.body
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await this.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage
      }
    });

    return res.data.id;
  }

  async getAuthUrl(scopes: string[]): Promise<string> {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });
  }

  async setCredentials(code: string): Promise<void> {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
  }
}