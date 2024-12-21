export interface IntegrationProvider {
  isConnected(): Promise<boolean>;
}

export interface EmailProvider extends IntegrationProvider {
  sendEmail(options: {
    to: string;
    subject: string;
    body: string;
    html?: string;
  }): Promise<string>;
}

export interface MessagingProvider extends IntegrationProvider {
  sendMessage(options: {
    channel: string;
    text: string;
    blocks?: any[];
  }): Promise<string>;
}

export interface CRMProvider extends IntegrationProvider {
  createLead(data: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    status: string;
  }): Promise<string>;

  updateLead(id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    status: string;
  }>): Promise<void>;

  getLead(id: string): Promise<any>;
  searchLeads(query: string): Promise<any[]>;
}

export interface ProjectManagementProvider extends IntegrationProvider {
  createBoard(options: {
    name: string;
    description?: string;
    defaultLists?: boolean;
  }): Promise<string>;

  createList(options: {
    name: string;
    boardId: string;
  }): Promise<string>;

  createCard(options: {
    name: string;
    description?: string;
    listId: string;
    dueDate?: Date;
    labels?: string[];
  }): Promise<string>;

  moveCard(cardId: string, listId: string): Promise<void>;
  addComment(cardId: string, text: string): Promise<string>;
}

export interface EcommerceProvider extends IntegrationProvider {
  createOrder(data: any): Promise<string>;
  updateOrderStatus(orderId: string, status: string): Promise<void>;
  getOrder(orderId: string): Promise<any>;
  createCustomer(data: any): Promise<string>;
  getCustomer(customerId: string): Promise<any>;
  searchProducts(query: string): Promise<any[]>;
}

export interface SchedulingProvider extends IntegrationProvider {
  createEvent(data: {
    summary: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    attendees?: string[];
    location?: string;
  }): Promise<string>;

  updateEvent(eventId: string, data: {
    summary?: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
    attendees?: string[];
    location?: string;
  }): Promise<void>;

  deleteEvent(eventId: string): Promise<void>;
  getEvent(eventId: string): Promise<any>;
  listEvents(options?: any): Promise<any[]>;
}

export interface SurveyProvider extends IntegrationProvider {
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
  getResponses(surveyId: string, options?: any): Promise<any[]>;
}