import { SurveyProvider } from './types';

export class SurveyMonkeyClient implements SurveyProvider {
  private apiKey: string;
  private baseUrl = 'https://api.surveymonkey.com/v3';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`SurveyMonkey API error: ${response.statusText}`);
    }

    return response.json();
  }

  async createSurvey(data: {
    title: string;
    pages: Array<{
      questions: Array<{
        type: string;
        text: string;
        required?: boolean;
        choices?: string[];
      }>;
    }>;
  }): Promise<string> {
    const response = await this.request('/surveys', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        pages: data.pages.map(page => ({
          questions: page.questions.map(q => ({
            family: 'single_choice',
            subtype: q.type,
            heading: q.text,
            required: q.required,
            answers: q.choices?.map(choice => ({
              text: choice
            }))
          }))
        }))
      })
    });

    return response.id;
  }

  async getSurvey(surveyId: string): Promise<any> {
    return this.request(`/surveys/${surveyId}`);
  }

  async getResponses(surveyId: string, options: {
    perPage?: number;
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.perPage) params.append('per_page', options.perPage.toString());
    if (options.startDate) params.append('start_date', options.startDate.toISOString());
    if (options.endDate) params.append('end_date', options.endDate.toISOString());

    const response = await this.request(`/surveys/${surveyId}/responses?${params.toString()}`);
    return response.data;
  }

  async createCollector(surveyId: string, type: 'weblink' | 'email' | 'embedded'): Promise<string> {
    const response = await this.request(`/surveys/${surveyId}/collectors`, {
      method: 'POST',
      body: JSON.stringify({
        type
      })
    });

    return response.id;
  }

  async getCollectorDetails(collectorId: string): Promise<any> {
    return this.request(`/collectors/${collectorId}`);
  }
}