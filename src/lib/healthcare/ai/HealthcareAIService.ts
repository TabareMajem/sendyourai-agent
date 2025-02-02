import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { AppError, ErrorCodes } from '../../utils/errors';
import { TextBlock } from '@anthropic-ai/sdk/src/resources/messages.js';

type UrgencyLevel = 'low' | 'medium' | 'high' | 'emergency';

interface SymptomAnalysis {
  analysis: string;
  recommendations: string[];
  urgencyLevel: UrgencyLevel;
}

interface HealthEducation {
  content: string;
  references: string[];
  readingLevel: string;
}

interface FollowUpSuggestion {
  recommendation: string;
  timeframe: string;
  reason: string;
}

type AnthropicMessage = Anthropic.Messages.Message;
type OpenAIResponse = OpenAI.Chat.Completions.ChatCompletion;

export class HealthcareAIService {
  private openai: OpenAI;
  private anthropic: Anthropic;

  constructor(config: {
    openaiApiKey: string;
    anthropicApiKey: string;
  }) {
    this.openai = new OpenAI({ apiKey: config.openaiApiKey });
    this.anthropic = new Anthropic({ apiKey: config.anthropicApiKey });
  }

  async analyzeSymptoms(symptoms: string[]): Promise<SymptomAnalysis> {
    try {
      const anthropicResponse = await this.anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Analyze these symptoms and provide medical insights: ${symptoms.join(', ')}`
        }]
      });

      const openaiResponse = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a medical analysis assistant. Review these symptoms and verify the analysis.'
          },
          {
            role: 'user',
            content: `Verify this symptom analysis: ${this.getAnthropicContent(anthropicResponse)}`
          }
        ]
      });

      return this.processAIResponses(anthropicResponse, openaiResponse);
    } catch (error) {
      throw new AppError(
        'Failed to analyze symptoms',
        ErrorCodes.AI_PROCESSING_ERROR,
        500,
        { error }
      );
    }
  }

  private getAnthropicContent(response: AnthropicMessage): string {
    if (!response.content || response.content.length === 0) {
      return '';
    }

    const textContent = response.content.find((block): block is TextBlock => 
      'type' in block && 
      block.type === 'text' && 
      'value' in block && 
      typeof block.value === 'string'
    );

    return textContent?.text || '';
  }

  async generateHealthEducation(
    topic: string, 
    patientContext: Record<string, any>
  ): Promise<HealthEducation> {
    try {
      // Use Anthropic for initial content generation
      const anthropicResponse = await this.anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: `Generate patient-friendly health education content about: ${topic}`
        }]
      });

      // Use OpenAI to adapt content to patient's context
      const openaiResponse = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a health education specialist. Adapt this content to the patient\'s context.'
          },
          {
            role: 'user',
            content: `Adapt this health education content for the patient context: ${JSON.stringify(patientContext)}\n\nContent: ${anthropicResponse.content}`
          }
        ]
      });

      return this.processHealthEducation(anthropicResponse, openaiResponse, patientContext);
    } catch (error) {
      throw new AppError(
        'Failed to generate health education content',
        ErrorCodes.AI_PROCESSING_ERROR,
        500,
        { error }
      );
    }
  }

  async suggestFollowUp(patientHistory: Record<string, any>): Promise<FollowUpSuggestion> {
    try {
      // Use OpenAI for initial recommendation
      const openaiResponse = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a medical follow-up specialist. Analyze patient history and suggest appropriate follow-up.'
          },
          {
            role: 'user',
            content: `Suggest follow-up based on this patient history: ${JSON.stringify(patientHistory)}`
          }
        ]
      });

      // Use Anthropic to verify and enhance recommendation
      const anthropicResponse = await this.anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Verify and enhance this follow-up recommendation: ${openaiResponse.choices[0].message.content}`
        }]
      });

      return this.processFollowUpSuggestion(openaiResponse, anthropicResponse);
    } catch (error) {
      throw new AppError(
        'Failed to generate follow-up suggestion',
        ErrorCodes.AI_PROCESSING_ERROR,
        500,
        { error }
      );
    }
  }

  private processAIResponses(
    anthropicResponse: AnthropicMessage,
    openaiResponse: OpenAIResponse
  ): SymptomAnalysis {
    const analysis = this.getAnthropicContent(anthropicResponse);
    const verification = openaiResponse.choices[0].message.content;

    return {
      analysis: this.combineAnalysis(analysis, verification || ''),
      recommendations: this.extractRecommendations(analysis, verification || ''),
      urgencyLevel: this.determineUrgencyLevel(analysis, verification || '')
    };
  }

  private processHealthEducation(
    anthropicResponse: AnthropicMessage,
    openaiResponse: OpenAIResponse,
    patientContext: Record<string, any>
  ): HealthEducation {
    const baseContent = this.getAnthropicContent(anthropicResponse);
    const adaptedContent = openaiResponse.choices[0].message.content || '';

    return {
      content: this.adaptContentToContext(adaptedContent, patientContext),
      references: this.extractReferences(baseContent),
      readingLevel: this.determineReadingLevel(adaptedContent)
    };
  }

  private processFollowUpSuggestion(
    openaiResponse: OpenAIResponse,
    anthropicResponse: AnthropicMessage
  ): FollowUpSuggestion {
    const initialSuggestion = openaiResponse.choices[0].message.content || '';
    const verifiedSuggestion = this.getAnthropicContent(anthropicResponse);

    return {
      recommendation: this.extractRecommendation(initialSuggestion, verifiedSuggestion),
      timeframe: this.extractTimeframe(initialSuggestion, verifiedSuggestion),
      reason: this.extractReason(initialSuggestion, verifiedSuggestion)
    };
  }

  // Helper methods implementation
  private extractRecommendations(analysis: string, verification: string): string[] {
    const combinedText = `${analysis}\n${verification}`;
    const recommendations = combinedText.match(/(?:recommend|suggest).*?[.!?]/gi) || [];
    return recommendations.map(rec => rec.trim());
  }

  private determineUrgencyLevel(analysis: string, verification: string): UrgencyLevel {
    const combinedText = `${analysis}\n${verification}`.toLowerCase();
    if (combinedText.includes('emergency') || combinedText.includes('immediate')) return 'emergency';
    if (combinedText.includes('urgent') || combinedText.includes('high risk')) return 'high';
    if (combinedText.includes('moderate') || combinedText.includes('soon')) return 'medium';
    return 'low';
  }

  private combineAnalysis(analysis: string, verification: string): string {
    return `Primary Analysis: ${analysis}\nVerification: ${verification}`;
  }

  private adaptContentToContext(content: string, context: Record<string, any>): string {
    // Implement content adaptation based on patient context
    return content.replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] || '');
  }

  private extractReferences(content: string): string[] {
    const references = content.match(/\[\d+\].*?(?=\[\d+\]|$)/g) || [];
    return references.map(ref => ref.trim());
  }

  private determineReadingLevel(content: string): string {
    // Implement reading level determination logic
    const words = content.split(/\s+/).length;
    const sentences = content.split(/[.!?]+/).length;
    const averageWordsPerSentence = words / sentences;
    
    if (averageWordsPerSentence > 20) return 'Advanced';
    if (averageWordsPerSentence > 15) return 'Intermediate';
    return 'Basic';
  }

  private extractRecommendation(initial: string, verified: string): string {
    const recommendation = initial.match(/recommend.*?[.!?]/i)?.[0] || 
                          verified.match(/recommend.*?[.!?]/i)?.[0] || 
                          'No specific recommendation provided.';
    return recommendation.trim();
  }

  private extractTimeframe(initial: string, verified: string): string {
    const timeframe = initial.match(/within \d+.*?[.!?]/i)?.[0] || 
                     verified.match(/within \d+.*?[.!?]/i)?.[0] || 
                     'No specific timeframe provided.';
    return timeframe.trim();
  }

  private extractReason(initial: string, verified: string): string {
    const reason = initial.match(/because.*?[.!?]/i)?.[0] || 
                  verified.match(/because.*?[.!?]/i)?.[0] || 
                  'No specific reason provided.';
    return reason.trim();
  }
}