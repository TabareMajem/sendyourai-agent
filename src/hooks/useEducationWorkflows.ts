import { useState, useEffect, useCallback } from 'react';
import { ZapierClient } from '../lib/zapier/ZapierClient';
import { AIAgent } from '../lib/ai/AIAgent';
import { StudentProgressWorkflow } from '../lib/workflows/education/StudentProgressWorkflow';
import { AssignmentReminderWorkflow } from '../lib/workflows/education/AssignmentReminderWorkflow';

export function useEducationWorkflows() {
  const [zapier] = useState(() => new ZapierClient({
    apiKey: process.env.ZAPIER_API_KEY || '',
    accountId: process.env.ZAPIER_ACCOUNT_ID || ''
  }));
  const [aiAgent] = useState(() => new AIAgent());

  const [progressWorkflow] = useState(() => new StudentProgressWorkflow(zapier, aiAgent));
  const [reminderWorkflow] = useState(() => new AssignmentReminderWorkflow(zapier, aiAgent));

  const setupWorkflows = useCallback(async () => {
    const [progressConfig, reminderConfig] = await Promise.all([
      progressWorkflow.setup(),
      reminderWorkflow.setup()
    ]);

    return {
      progress: progressConfig,
      reminder: reminderConfig
    };
  }, [progressWorkflow, reminderWorkflow]);

  const processNewGrade = useCallback(async (gradeData: any) => {
    await progressWorkflow.processNewGrade(gradeData);
  }, [progressWorkflow]);

  const processUpcomingAssignment = useCallback(async (assignment: any) => {
    await reminderWorkflow.processUpcomingAssignment(assignment);
  }, [reminderWorkflow]);

  const generateProgressReport = useCallback(async (studentId: string) => {
    return progressWorkflow.generateProgressReport(studentId);
  }, [progressWorkflow]);

  const generateStudyPlan = useCallback(async (studentId: string, assignmentId: string) => {
    return reminderWorkflow.generateStudyPlan(studentId, assignmentId);
  }, [reminderWorkflow]);

  return {
    setupWorkflows,
    processNewGrade,
    processUpcomingAssignment,
    generateProgressReport,
    generateStudyPlan
  };
}