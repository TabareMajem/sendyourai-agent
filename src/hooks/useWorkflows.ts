import { useState, useEffect } from 'react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft' | 'error';
  lastRun: string;
  successRate: number;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  collaborators: {
    id: string;
    name: string;
    avatar: string;
  }[];
  tags: string[];
  createdAt: string;
  modifiedAt: string;
  industry: string;
  department: string;
  runs: number;
  averageExecutionTime: number;
}

// Mock data
const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Customer Onboarding',
    description: 'Automate the customer onboarding process with AI-driven personalization',
    status: 'active',
    lastRun: '2024-02-20T10:30:00Z',
    successRate: 98,
    owner: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    collaborators: [
      {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ],
    tags: ['onboarding', 'customer', 'automation'],
    createdAt: '2024-01-15T08:00:00Z',
    modifiedAt: '2024-02-20T10:30:00Z',
    industry: 'Technology',
    department: 'Customer Success',
    runs: 1250,
    averageExecutionTime: 45
  },
  {
    id: '2',
    name: 'Invoice Processing',
    description: 'Automated invoice processing and approval workflow',
    status: 'paused',
    lastRun: '2024-02-19T15:45:00Z',
    successRate: 95,
    owner: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    collaborators: [],
    tags: ['finance', 'invoices', 'automation'],
    createdAt: '2024-01-20T09:00:00Z',
    modifiedAt: '2024-02-19T15:45:00Z',
    industry: 'Technology',
    department: 'Finance',
    runs: 850,
    averageExecutionTime: 60
  },
  {
    id: '3',
    name: 'Lead Nurturing',
    description: 'AI-powered lead nurturing and qualification workflow',
    status: 'error',
    lastRun: '2024-02-20T09:15:00Z',
    successRate: 92,
    owner: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    collaborators: [
      {
        id: '3',
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ],
    tags: ['sales', 'leads', 'automation'],
    createdAt: '2024-01-25T10:00:00Z',
    modifiedAt: '2024-02-20T09:15:00Z',
    industry: 'Technology',
    department: 'Sales',
    runs: 650,
    averageExecutionTime: 30
  }
];

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWorkflows(mockWorkflows);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  return { workflows, isLoading, error };
}