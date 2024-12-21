export interface Lead {
  id: string;
  source: string;
  company: {
    name: string;
    industry: string;
    size: string;
    location: string;
  };
  contact: {
    name: string;
    title: string;
    email: string;
    phone?: string;
  };
  status: 'new' | 'qualified' | 'disqualified';
  score: number;
  notes: string[];
  createdAt: Date;
  lastContact?: Date;
}

export interface Conversation {
  id: string;
  leadId: string;
  messages: Array<{
    role: 'ai' | 'human';
    content: string;
    timestamp: Date;
    language?: string;
  }>;
  status: 'active' | 'completed' | 'failed';
  summary?: string;
  nextSteps?: string[];
}

export interface Deal {
  id: string;
  leadId: string;
  status: 'negotiating' | 'won' | 'lost';
  value: number;
  currency: string;
  terms: Record<string, any>;
  timeline: Array<{
    event: string;
    timestamp: Date;
    details: string;
  }>;
  documents: Array<{
    type: string;
    url: string;
    status: 'draft' | 'sent' | 'signed';
  }>;
}

export interface SalesAgent {
  id: string;
  name: string;
  type: 'lead_gen' | 'qualification' | 'outreach' | 'negotiation';
  status: 'active' | 'paused' | 'stopped';
  capabilities: string[];
  metrics?: {
    leadsGenerated?: number;
    qualificationRate?: number;
    responseRate?: number;
    conversionRate?: number;
    averageDealSize?: number;
  };
}