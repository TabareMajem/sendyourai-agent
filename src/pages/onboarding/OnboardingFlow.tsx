import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';
import { IndustrySelection } from '../../components/onboarding/IndustrySelection';
import { ApproachDefinition } from '../../components/onboarding/ApproachDefinition';
import { GoalSetting } from '../../components/onboarding/GoalSetting';
import { IntegrationSetup } from '../../components/onboarding/IntegrationSetup';
import { WorkflowBuilder } from '../../components/onboarding/WorkflowBuilder';
import { AIConfiguration } from '../../components/onboarding/AIConfiguration';

export function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    industry: '',
    approach: '',
    goals: [] as string[],
    integrations: [] as string[],
    workflow: [] as any[],
    aiConfig: {} as Record<string, any>
  });

  const handleNext = () => {
    if (step === 6) {
      // Complete onboarding
      navigate('/dashboard');
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <IndustrySelection
            selectedIndustry={data.industry}
            onSelect={(industry) => setData({ ...data, industry })}
          />
        );
      case 2:
        return (
          <ApproachDefinition
            selectedApproach={data.approach}
            onSelect={(approach) => setData({ ...data, approach })}
          />
        );
      case 3:
        return (
          <GoalSetting
            selectedGoals={data.goals}
            onGoalsChange={(goals) => setData({ ...data, goals })}
            industry={data.industry}
          />
        );
      case 4:
        return (
          <IntegrationSetup
            selectedIntegrations={data.integrations}
            onIntegrationsChange={(integrations) => setData({ ...data, integrations })}
            industry={data.industry}
            goals={data.goals}
          />
        );
      case 5:
        return (
          <WorkflowBuilder
            selectedIndustry={data.industry}
            onWorkflowCreate={(workflow) => setData({ ...data, workflow })}
          />
        );
      case 6:
        return (
          <AIConfiguration
            config={data.aiConfig}
            onConfigChange={(aiConfig) => setData({ ...data, aiConfig })}
            industry={data.industry}
            approach={data.approach}
            goals={data.goals}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      currentStep={step}
      totalSteps={6}
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={
        (step === 1 && !data.industry) ||
        (step === 2 && !data.approach) ||
        (step === 3 && data.goals.length === 0) ||
        (step === 4 && data.integrations.length === 0) ||
        (step === 5 && data.workflow.length === 0) ||
        (step === 6 && Object.keys(data.aiConfig).length === 0)
      }
      nextLabel={step === 6 ? 'Complete Setup' : 'Next'}
    >
      {renderStep()}
    </OnboardingLayout>
  );
}