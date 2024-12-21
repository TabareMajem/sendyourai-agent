import { AppError, ErrorCodes } from '../../utils/errors';
import { SymptomCheck } from '../types';

export class SymptomChecker {
  private readonly symptomDatabase: Map<string, {
    relatedConditions: string[];
    urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
    followUpRecommendations: string[];
  }>;

  constructor() {
    // Initialize symptom database
    this.symptomDatabase = new Map([
      ['fever', {
        relatedConditions: ['flu', 'covid-19', 'infection'],
        urgencyLevel: 'medium',
        followUpRecommendations: [
          'Monitor temperature',
          'Stay hydrated',
          'Rest',
          'Seek medical attention if temperature exceeds 103°F'
        ]
      }],
      ['chest_pain', {
        relatedConditions: ['heart attack', 'angina', 'pulmonary embolism'],
        urgencyLevel: 'emergency',
        followUpRecommendations: [
          'Seek immediate medical attention',
          'Call emergency services',
          'Take prescribed medication if available'
        ]
      }]
      // Add more symptoms as needed
    ]);
  }

  async analyzeSymptoms(symptoms: Array<{
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration: string;
    description?: string;
  }>): Promise<{
    possibleConditions: string[];
    recommendedActions: string[];
    urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  }> {
    try {
      let highestUrgency: 'low' | 'medium' | 'high' | 'emergency' = 'low';
      const possibleConditions = new Set<string>();
      const recommendedActions = new Set<string>();

      // Analyze each symptom
      for (const symptom of symptoms) {
        const symptomInfo = this.symptomDatabase.get(symptom.name.toLowerCase());
        
        if (symptomInfo) {
          // Add related conditions
          symptomInfo.relatedConditions.forEach(condition => 
            possibleConditions.add(condition)
          );

          // Update urgency level
          if (
            (symptomInfo.urgencyLevel === 'emergency') ||
            (symptomInfo.urgencyLevel === 'high' && highestUrgency !== 'emergency') ||
            (symptomInfo.urgencyLevel === 'medium' && ['low'].includes(highestUrgency))
          ) {
            highestUrgency = symptomInfo.urgencyLevel;
          }

          // Add recommendations
          symptomInfo.followUpRecommendations.forEach(rec => 
            recommendedActions.add(rec)
          );
        }

        // Adjust urgency based on severity
        if (symptom.severity === 'severe' && highestUrgency !== 'emergency') {
          highestUrgency = 'high';
        }
      }

      // Add general recommendations based on urgency
      if (highestUrgency === 'emergency') {
        recommendedActions.add('Seek immediate medical attention');
        recommendedActions.add('Call emergency services if symptoms worsen');
      } else if (highestUrgency === 'high') {
        recommendedActions.add('Schedule an appointment with your healthcare provider');
        recommendedActions.add('Monitor symptoms closely');
      }

      return {
        possibleConditions: Array.from(possibleConditions),
        recommendedActions: Array.from(recommendedActions),
        urgencyLevel: highestUrgency
      };
    } catch (error) {
      throw new AppError(
        'Failed to analyze symptoms',
        ErrorCodes.PROCESSING_ERROR,
        500,
        { error }
      );
    }
  }

  async createSymptomCheck(params: {
    patientId: string;
    symptoms: Array<{
      name: string;
      severity: 'mild' | 'moderate' | 'severe';
      duration: string;
      description?: string;
    }>;
  }): Promise<SymptomCheck> {
    try {
      const analysis = await this.analyzeSymptoms(params.symptoms);

      const symptomCheck: SymptomCheck = {
        id: crypto.randomUUID(),
        patientId: params.patientId,
        timestamp: new Date(),
        symptoms: params.symptoms,
        aiAssessment: {
          possibleConditions: analysis.possibleConditions,
          recommendedActions: analysis.recommendedActions,
          urgencyLevel: analysis.urgencyLevel
        }
      };

      // In a real implementation, save to database here
      return symptomCheck;
    } catch (error) {
      throw new AppError(
        'Failed to create symptom check',
        ErrorCodes.PROCESSING_ERROR,
        500,
        { error }
      );
    }
  }

  async getSymptomHistory(patientId: string): Promise<SymptomCheck[]> {
    try {
      // In a real implementation, fetch from database
      return [];
    } catch (error) {
      throw new AppError(
        'Failed to fetch symptom history',
        ErrorCodes.DATABASE_ERROR,
        500,
        { error }
      );
    }
  }

  async updateSymptomCheck(
    checkId: string,
    updates: Partial<SymptomCheck>
  ): Promise<SymptomCheck> {
    try {
      // In a real implementation, update in database
      throw new Error('Not implemented');
    } catch (error) {
      throw new AppError(
        'Failed to update symptom check',
        ErrorCodes.DATABASE_ERROR,
        500,
        { error }
      );
    }
  }

  private calculateRiskScore(symptoms: SymptomCheck['symptoms']): number {
    let score = 0;
    
    for (const symptom of symptoms) {
      // Add to score based on severity
      switch (symptom.severity) {
        case 'severe':
          score += 3;
          break;
        case 'moderate':
          score += 2;
          break;
        case 'mild':
          score += 1;
          break;
      }

      // Add to score based on duration
      const durationDays = this.parseDuration(symptom.duration);
      if (durationDays > 14) score += 3;
      else if (durationDays > 7) score += 2;
      else if (durationDays > 3) score += 1;

      // Check for critical symptoms
      const symptomInfo = this.symptomDatabase.get(symptom.name.toLowerCase());
      if (symptomInfo?.urgencyLevel === 'emergency') {
        score += 5;
      }
    }

    return Math.min(score, 10); // Normalize to 0-10 scale
  }

  private parseDuration(duration: string): number {
    // Simple duration parser - in real implementation, use a proper date parsing library
    const match = duration.match(/(\d+)\s*(day|days|week|weeks)/i);
    if (!match) return 0;
    
    const [, value, unit] = match;
    const numValue = parseInt(value);
    
    return unit.toLowerCase().startsWith('week') ? numValue * 7 : numValue;
  }
}