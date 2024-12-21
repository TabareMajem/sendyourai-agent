import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { SchedulingProvider } from './types';
import { AppError, ErrorCodes } from '../../utils/errors';

export class GoogleCalendarClient implements SchedulingProvider {
  private oauth2Client: OAuth2Client;
  private calendar: any;

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

    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.calendar.calendarList.list();
      return true;
    } catch {
      return false;
    }
  }

  async createEvent(data: {
    summary: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    attendees?: string[];
    location?: string;
  }): Promise<string> {
    try {
      const event = {
        summary: data.summary,
        description: data.description,
        start: {
          dateTime: data.startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: data.endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        attendees: data.attendees?.map(email => ({ email })),
        location: data.location,
        reminders: {
          useDefault: true
        }
      };

      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        sendUpdates: 'all'
      });

      return response.data.id;
    } catch (error) {
      throw new AppError(
        'Failed to create Google Calendar event',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }

  async updateEvent(eventId: string, data: {
    summary?: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
    attendees?: string[];
    location?: string;
  }): Promise<void> {
    try {
      const event: any = {};

      if (data.summary) event.summary = data.summary;
      if (data.description) event.description = data.description;
      if (data.startTime) {
        event.start = {
          dateTime: data.startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
      }
      if (data.endTime) {
        event.end = {
          dateTime: data.endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
      }
      if (data.attendees) {
        event.attendees = data.attendees.map(email => ({ email }));
      }
      if (data.location) event.location = data.location;

      await this.calendar.events.patch({
        calendarId: 'primary',
        eventId: eventId,
        requestBody: event,
        sendUpdates: 'all'
      });
    } catch (error) {
      throw new AppError(
        'Failed to update Google Calendar event',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { eventId, error }
      );
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
        sendUpdates: 'all'
      });
    } catch (error) {
      throw new AppError(
        'Failed to delete Google Calendar event',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { eventId, error }
      );
    }
  }

  async getEvent(eventId: string): Promise<any> {
    try {
      const response = await this.calendar.events.get({
        calendarId: 'primary',
        eventId: eventId
      });

      return response.data;
    } catch (error) {
      throw new AppError(
        'Failed to get Google Calendar event',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { eventId, error }
      );
    }
  }

  async listEvents(options: {
    timeMin?: Date;
    timeMax?: Date;
    maxResults?: number;
  } = {}): Promise<any[]> {
    try {
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin: options.timeMin?.toISOString(),
        timeMax: options.timeMax?.toISOString(),
        maxResults: options.maxResults || 10,
        singleEvents: true,
        orderBy: 'startTime'
      });

      return response.data.items;
    } catch (error) {
      throw new AppError(
        'Failed to list Google Calendar events',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { error }
      );
    }
  }
}