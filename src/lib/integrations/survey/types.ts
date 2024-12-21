export interface SurveyProvider {
  createSurvey(data: {
    title: string;
    fields?: Array<{
      type: string;
      title: string;
      required?: boolean;
      properties?: Record<string, any>;
    }>;
    pages?: Array<{
      questions: Array<{
        type: string;
        text: string;
        required?: boolean;
        choices?: string[];
      }>;
    }>;
  }): Promise<string>;

  getSurvey(surveyId: string): Promise<any>;
  
  getResponses(surveyId: string, options?: {
    pageSize?: number;
    perPage?: number;
    since?: Date;
    until?: Date;
    startDate?: Date;
    endDate?: Date;
  }): Promise<any[]>;
}