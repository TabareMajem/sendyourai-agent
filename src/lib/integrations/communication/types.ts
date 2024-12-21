export interface VideoConferenceProvider {
  createMeeting(data: {
    topic: string;
    startTime: Date;
    duration: number;
    agenda?: string;
    settings?: Record<string, any>;
  }): Promise<{
    id: string;
    joinUrl: string;
    password?: string;
  }>;

  getMeeting(meetingId: string): Promise<any>;
  
  updateMeeting(meetingId: string, data: {
    topic?: string;
    startTime?: Date;
    duration?: number;
    agenda?: string;
    settings?: Record<string, any>;
  }): Promise<void>;
  
  deleteMeeting(meetingId: string): Promise<void>;
  
  listRecordings(options?: {
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<any[]>;
}