import { AIAgent } from '../../../ai/AIAgent';
import { Property } from '../utils/propertyUtils';

export class TourScheduler {
  private aiAgent: AIAgent;

  constructor(aiAgent: AIAgent) {
    this.aiAgent = aiAgent;
  }

  public async scheduleTour(request: {
    propertyId: string;
    userId: string;
    type: 'virtual' | 'in_person';
    preferredDates: Date[];
    notes?: string;
  }, property: Property) {
    const timeSlots = await this.aiAgent.queueAction('analysis', {
      type: 'analyze_scheduling',
      data: {
        preferredDates: request.preferredDates,
        propertyId: request.propertyId,
        tourType: request.type
      }
    });
  
    if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
      throw new Error('No available time slots found.');
    }
  
    const scheduledTour = await this.aiAgent.queueAction('task', {
      type: 'schedule_tour',
      data: {
        propertyId: request.propertyId,
        userId: request.userId,
        tourType: request.type,
        timeSlot: timeSlots[0],
        notes: request.notes
      }
    });
  
    await Promise.all([
      this.sendBuyerConfirmation(request.userId, scheduledTour),
      this.sendAgentConfirmation(property.agent.id, scheduledTour)
    ]);
  
    return scheduledTour;
  }
  

  private async sendBuyerConfirmation(userId: string, tour: any) {
    await this.aiAgent.queueAction('email', {
      type: 'tour_confirmation',
      data: {
        userId,
        tour,
        template: 'buyer_tour_confirmation'
      }
    });
  }

  private async sendAgentConfirmation(agentId: string, tour: any) {
    await this.aiAgent.queueAction('notification', {
      type: 'tour_scheduled',
      data: {
        agentId,
        tour,
        channel: 'email_and_sms'
      }
    });
  }
}

