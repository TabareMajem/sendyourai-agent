export interface Project {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  stakeholders: string[];
  startDate: Date;
  endDate: Date;
  budget?: number;
  status: 'planning' | 'active' | 'onHold' | 'completed';
  definition: {
    scope: string;
    deliverables: string[];
    constraints: string[];
    assumptions: string[];
  };
  schedule: Array<{
    phase: string;
    startDate: Date;
    endDate: Date;
    milestones: Array<{
      name: string;
      date: Date;
      completed: boolean;
    }>;
  }>;
  resources: Array<{
    type: string;
    name: string;
    allocation: number;
    startDate: Date;
    endDate: Date;
  }>;
  risks: Array<{
    description: string;
    impact: 'high' | 'medium' | 'low';
    probability: 'high' | 'medium' | 'low';
    mitigation: string;
    status: 'identified' | 'mitigated' | 'occurred';
  }>;
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    assignee: string;
    status: 'todo' | 'inProgress' | 'completed';
    startDate: Date;
    endDate: Date;
    dependencies: string[];
  }>;
  qualityPlan: {
    checkpoints: Array<{
      phase: string;
      criteria: string[];
      status: 'pending' | 'passed' | 'failed';
    }>;
    metrics: Record<string, number>;
  };
  metrics: {
    progress: number;
    budgetUtilization: number;
    riskScore: number;
    qualityScore: number;
  } | null;
  createdAt: Date;
}

export interface PMOAgent {
  name: string;
  description: string;
  capabilities: string[];
  status: 'active' | 'paused' | 'stopped';
  metrics?: {
    tasksCompleted: number;
    successRate: number;
    activeProjects: number;
  };
}