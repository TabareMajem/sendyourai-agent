import React from 'react';

interface UseCaseExampleProps {
  title: string;
  description: string;
  steps: {
    title: string;
    description: string;
  }[];
  metrics?: {
    label: string;
    value: string;
    description: string;
  }[];
}

export function UseCaseExample({ title, description, steps, metrics }: UseCaseExampleProps) {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-4 text-gray-600">{description}</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="bg-white px-4">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-medium">{index + 1}</span>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-900">{step.title}</h4>
                  <p className="mt-2 text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {metrics && (
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-sm font-medium text-gray-600 uppercase">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-indigo-600">{metric.value}</p>
              <p className="mt-2 text-sm text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}