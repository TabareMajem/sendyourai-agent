import React from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { AIConfigPanel } from '../../components/ai/config/AIConfigPanel';
import { AIPerformanceMetrics } from '../../components/ai/analytics/AIPerformanceMetrics';
import { AIInsightsList } from '../../components/ai/analytics/AIInsightsList';
import { AILearningProgress } from '../../components/ai/analytics/AILearningProgress';
import { AIDecisionHistory } from '../../components/ai/analytics/AIDecisionHistory';

export default function AISettings() {
  const performanceMetrics = {
    successRate: 95,
    averageResponseTime: 250,
    actionsCompleted: 1234,
    activeAutomations: 45,
    errorRate: 2
  };

  const insights = [
    {
      id: '1',
      type: 'optimization',
      title: 'Workflow Optimization Available',
      description: 'AI has detected potential improvements in your customer onboarding workflow',
      impact: 'high',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'warning',
      title: 'Unusual Pattern Detected',
      description: 'Detected anomaly in system response times during peak hours',
      impact: 'medium',
      timestamp: new Date()
    }
  ];

  const learningMetrics = {
    accuracy: 92,
    accuracyChange: 5,
    decisionsCount: 1543,
    decisionsChange: 123,
    adaptationScore: 88,
    adaptationChange: 3,
    confidenceLevel: 85,
    confidenceChange: 2
  };

  const decisions = [
    {
      id: '1',
      timestamp: new Date(),
      type: 'Workflow Optimization',
      context: 'Customer onboarding process',
      outcome: 'success',
      confidence: 95,
      impact: 'high',
      details: 'Successfully optimized workflow reducing process time by 25%'
    },
    {
      id: '2',
      timestamp: new Date(),
      type: 'Resource Allocation',
      context: 'Server scaling decision',
      outcome: 'pending',
      confidence: 85,
      impact: 'medium',
      details: 'Evaluating resource requirements based on current load'
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Configuration */}
          <AIConfigPanel />

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIPerformanceMetrics metrics={performanceMetrics} />
            <AIInsightsList
              insights={insights}
              onInsightAction={(id, action) => {
                console.log('Insight action:', id, action);
              }}
            />
          </div>

          {/* Learning Progress */}
          <AILearningProgress metrics={learningMetrics} />

          {/* Decision History */}
          <AIDecisionHistory decisions={decisions} />
        </div>
      </div>
    </DashboardLayout>
  );
}