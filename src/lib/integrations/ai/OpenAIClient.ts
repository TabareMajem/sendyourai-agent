import { AIProvider } from './types';

export class OpenAIClient implements AIProvider {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

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
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    return response.json();
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.request('/models');
      return true;
    } catch {
      return false;
    }
  }

  async generateText(prompt: string, options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}): Promise<string> {
    const response = await this.request('/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: options.model || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: options.maxTokens || 100,
        temperature: options.temperature || 0.7
      })
    });

    return response.choices[0].message.content;
  }

  async analyzeText(text: string, options: {
    task?: 'sentiment' | 'classification' | 'extraction';
    model?: string;
  } = {}): Promise<any> {
    const response = await this.request('/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: options.model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Perform ${options.task || 'sentiment'} analysis on the following text.`
          },
          { role: 'user', content: text }
        ]
      })
    });

    return response.choices[0].message.content;
  }

  async generateImage(prompt: string, options: {
    size?: '256x256' | '512x512' | '1024x1024';
    n?: number;
  } = {}): Promise<string[]> {
    const response = await this.request('/images/generations', {
      method: 'POST',
      body: JSON.stringify({
        prompt,
        size: options.size || '512x512',
        n: options.n || 1
      })
    });

    return response.data.map((image: any) => image.url);
  }
}