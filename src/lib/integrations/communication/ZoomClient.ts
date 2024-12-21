import { VideoConferenceProvider } from './types';

export class ZoomClient implements VideoConferenceProvider {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.zoom.us/v2';

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  private async getAccessToken(): Promise<string> {
    // Implement JWT generation for Zoom API
    return 'zoom-jwt-token';
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`Zoom API error: ${response.statusText}`);
    }

    return response.json();
  }

  async createMeeting(data: {
    topic: string;
    startTime: Date;
    duration: number;
    agenda?: string;
    settings?: Record<string, any>;
  }): Promise<{
    id: string;
    joinUrl: string;
    password?: string;
  }> {
    const response = await this.request('/users/me/meetings', {
      method: 'POST',
      body: JSON.stringify({
        topic: data.topic,
        type: 2, // Scheduled meeting
        start_time: data.startTime.toISOString(),
        duration: data.duration,
        agenda: data.agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 2,
          audio: 'both',
          auto_recording: 'none',
          ...data.settings
        }
      })
    });

    return {
      id: response.id,
      joinUrl: response.join_url,
      password: response.password
    };
  }

  async getMeeting(meetingId: string): Promise<any> {
    return this.request(`/meetings/${meetingId}`);
  }

  async updateMeeting(meetingId: string, data: {
    topic?: string;
    startTime?: Date;
    duration?: number;
    agenda?: string;
    settings?: Record<string, any>;
  }): Promise<void> {
    await this.request(`/meetings/${meetingId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        topic: data.topic,
        start_time: data.startTime?.toISOString(),
        duration: data.duration,
        agenda: data.agenda,
        settings: data.settings
      })
    });
  }

  async deleteMeeting(meetingId: string): Promise<void> {
    await this.request(`/meetings/${meetingId}`, {
      method: 'DELETE'
    });
  }

  async listRecordings(options: {
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.startDate) params.append('from', options.startDate.toISOString().split('T')[0]);
    if (options.endDate) params.append('to', options.endDate.toISOString().split('T')[0]);

    const response = await this.request(
      `/users/${options.userId || 'me'}/recordings?${params.toString()}`
    );

    return response.meetings;
  }
}