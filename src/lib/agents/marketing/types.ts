export interface Campaign {
  id: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  goals: string[];
  targetAudience: string;
  channels: string[];
  budget?: number;
  duration: string;
  ideas: Array<{
    title: string;
    description: string;
    expectedImpact: string;
  }>;
  strategy: {
    overview: string;
    channelStrategy: Record<string, any>;
    timeline: any;
    kpis: string[];
  };
  content: {
    copy: Array<{
      channel: string;
      text: string;
      targetDate?: Date;
    }>;
    visuals: Array<{
      channel: string;
      url: string;
      type: string;
      targetDate?: Date;
    }>;
  };
  schedule: Array<{
    date: Date;
    channel: string;
    contentId: string;
    status: 'scheduled' | 'published' | 'failed';
  }>;
  metrics: {
    engagement: Record<string, number>;
    conversions: Record<string, number>;
    roi?: number;
  } | null;
  createdAt: Date;
}

export interface MarketingAgent {
  name: string;
  description: string;
  capabilities: string[];
  status: 'active' | 'paused' | 'stopped';
  metrics?: {
    tasksCompleted: number;
    successRate: number;
    activeWorkflows: number;
  };
}