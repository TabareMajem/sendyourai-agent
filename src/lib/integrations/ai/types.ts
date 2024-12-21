export interface AIProvider {
  isConnected(): Promise<boolean>;
  
  generateText(prompt: string, options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  }): Promise<string>;

  analyzeText(text: string, options?: {
    task?: 'sentiment' | 'classification' | 'extraction';
    model?: string;
  }): Promise<any>;

  generateImage(prompt: string, options?: {
    size?: '256x256' | '512x512' | '1024x1024';
    n?: number;
  }): Promise<string[]>;
}