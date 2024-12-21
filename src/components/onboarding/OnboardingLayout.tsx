import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../auth/Button';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled = false,
  nextLabel = 'Next'
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step Counter */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-gray-500 text-center">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {children}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Button
              onClick={onBack}
              variant="secondary"
              disabled={currentStep === 1}
              className="w-32"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={onNext}
              disabled={isNextDisabled}
              className="w-32"
            >
              {nextLabel}
              {nextLabel === 'Next' && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}