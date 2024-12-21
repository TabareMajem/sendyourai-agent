import { useState, useEffect } from 'react';

interface AnalyticsData {
  overview: {
    totalWorkflows: number;
    successRate: number;
    tasksAutomated: number;
    timeSaved: string;
    costSavings: number;
  };
  performance: {
    workflowExecutions: {
      date: string;
      successful: number;
      failed: number;
    }[];
    responseTime: {
      date: string;
      value: number;
    }[];
  };
  workflows: {
    topWorkflows: {
      name: string;
      executions: number;
      successRate: number;
    }[];
    workflowTypes: {
      name: string;
      value: number;
    }[];
  };
  ai: {
    suggestions: {
      total: number;
      accepted: number;
      dismissed: number;
    };
    accuracy: {
      date: string;
      value: number;
    }[];
    impact: {
      timeSaved: string;
      successRate: number;
      improvements: number;
    };
  };
  engagement: {
    activeUsers: {
      total: number;
      change: number;
    };
    featureAdoption: {
      feature: string;
      adoption: number;
    }[];
    sessionMetrics: {
      averageDuration: string;
      totalSessions: number;
    };
    topUsers: {
      name: string;
      activity: number;
      avatar: string;
    }[];
  };
}

// Mock data
const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalWorkflows: 1234,
    successRate: 98,
    tasksAutomated: 15678,
    timeSaved: '2,456 hours',
    costSavings: 125000
  },
  performance: {
    workflowExecutions: [
      { date: '2024-02-14', successful: 245, failed: 12 },
      { date: '2024-02-15', successful: 256, failed: 8 },
      { date: '2024-02-16', successful: 278, failed: 15 },
      { date: '2024-02-17', successful: 289, failed: 10 },
      { date: '2024-02-18', successful: 302, failed: 7 },
      { date: '2024-02-19', successful: 315, failed: 9 },
      { date: '2024-02-20', successful: 328, failed: 11 }
    ],
    responseTime: [
      { date: '2024-02-14', value: 250 },
      { date: '2024-02-15', value: 245 },
      { date: '2024-02-16', value: 238 },
      { date: '2024-02-17', value: 242 },
      { date: '2024-02-18', value: 235 },
      { date: '2024-02-19', value: 230 },
      { date: '2024-02-20', value: 228 }
    ]
  },
  workflows: {
    topWorkflows: [
      { name: 'Customer Onboarding', executions: 456, successRate: 98 },
      { name: 'Invoice Processing', executions: 389, successRate: 95 },
      { name: 'Lead Nurturing', executions: 345, successRate: 97 },
      { name: 'Support Ticket Routing', executions: 289, successRate: 94 }
    ],
    workflowTypes: [
      { name: 'Automation', value: 35 },
      { name: 'Integration', value: 25 },
      { name: 'Processing', value: 20 },
      { name: 'Notification', value: 15 },
      { name: 'Analysis', value: 5 }
    ]
  },
  ai: {
    suggestions: {
      total: 1567,
      accepted: 1245,
      dismissed: 322
    },
    accuracy: [
      { date: '2024-02-14', value: 92 },
      { date: '2024-02-15', value: 93 },
      { date: '2024-02-16', value: 94 },
      { date: '2024-02-17', value: 93 },
      { date: '2024-02-18', value: 95 },
      { date: '2024-02-19', value: 96 },
      { date: '2024-02-20', value: 95 }
    ],
    impact: {
      timeSaved: '456 hours',
      successRate: 94,
      improvements: 278
    }
  },
  engagement: {
    activeUsers: {
      total: 456,
      change: 12
    },
    featureAdoption: [
      { feature: 'Workflows', adoption: 85 },
      { feature: 'AI Assistant', adoption: 72 },
      { feature: 'Integrations', adoption: 68 },
      { feature: 'Analytics', adoption: 45 }
    ],
    sessionMetrics: {
      averageDuration: '28m',
      totalSessions: 2567
    },
    topUsers: [
      {
        name: 'John Doe',
        activity: 156,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        name: 'Jane Smith',
        activity: 134,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        name: 'Mike Johnson',
        activity: 98,
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]
  }
};

export function useAnalytics(timeRange: { start: Date; end: Date }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockAnalyticsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  return { data, isLoading, error };
}