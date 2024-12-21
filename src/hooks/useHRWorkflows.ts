import { useState, useEffect, useCallback } from 'react';
import { ZapierClient } from '../lib/zapier/ZapierClient';
import { AIAgent } from '../lib/ai/AIAgent';
import { EmployeeSurveyWorkflow } from '../lib/workflows/hr/EmployeeSurveyWorkflow';
import { OnboardingWorkflow } from '../lib/workflows/hr/OnboardingWorkflow';
import { PerformanceReviewWorkflow } from '../lib/workflows/hr/PerformanceReviewWorkflow';

export function useHRWorkflows() {
  const [zapier] = useState(() => new ZapierClient({
    apiKey: process.env.ZAPIER_API_KEY || '',
    accountId: process.env.ZAPIER_ACCOUNT_ID || ''
  }));
  const [aiAgent] = useState(() => new AIAgent());

  const [surveyWorkflow] = useState(() => new EmployeeSurveyWorkflow(zapier, aiAgent));
  const [onboardingWorkflow] = useState(() => new OnboardingWorkflow(zapier, aiAgent));
  const [reviewWorkflow] = useState(() => new PerformanceReviewWorkflow(zapier, aiAgent));

  const setupWorkflows = useCallback(async () => {
    const [surveyConfig, onboardingConfig, reviewConfig] = await Promise.all([
      surveyWorkflow.setup(),
      onboardingWorkflow.setup(),
      reviewWorkflow.setup()
    ]);

    return {
      survey: surveyConfig,
      onboarding: onboardingConfig,
      review: reviewConfig
    };
  }, [surveyWorkflow, onboardingWorkflow, reviewWorkflow]);

  const processSurveyResponse = useCallback(async (response: any) => {
    await surveyWorkflow.processSurveyResponse(response);
  }, [surveyWorkflow]);

  const processNewEmployee = useCallback(async (employeeData: any) => {
    await onboardingWorkflow.processNewEmployee(employeeData);
  }, [onboardingWorkflow]);

  const processReviewCycle = useCallback(async (employees: any[]) => {
    await reviewWorkflow.processReviewCycle(employees);
  }, [reviewWorkflow]);

  return {
    setupWorkflows,
    processSurveyResponse,
    processNewEmployee,
    processReviewCycle,
    generateReviewMaterials: reviewWorkflow.generateReviewMaterials.bind(reviewWorkflow)
  };
}