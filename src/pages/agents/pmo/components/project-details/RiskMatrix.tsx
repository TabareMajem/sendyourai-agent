import React from 'react';
import { AlertTriangle, ArrowRight, Shield } from 'lucide-react';
import { Project } from '../../../../../lib/agents/pmo/types';

interface RiskMatrixProps {
  project: Project;
}

export function RiskMatrix({ project }: RiskMatrixProps) {
  const impactLevels = ['high', 'medium', 'low'] as const;
  const probabilityLevels = ['high', 'medium', 'low'] as const;

  const getMatrixCell = (impact: typeof impactLevels[number], probability: typeof probabilityLevels[number]) => {
    return project.risks.filter(risk => 
      risk.impact === impact && risk.probability === probability
    );
  };

  const getCellColor = (impact: typeof impactLevels[number], probability: typeof probabilityLevels[number]) => {
    if (impact === 'high' && probability === 'high') return 'bg-red-50';
    if (impact === 'high' || probability === 'high') return 'bg-orange-50';
    if (impact === 'medium' && probability === 'medium') return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const getCellBorderColor = (impact: typeof impactLevels[number], probability: typeof probabilityLevels[number]) => {
    if (impact === 'high' && probability === 'high') return 'border-red-200';
    if (impact === 'high' || probability === 'high') return 'border-orange-200';
    if (impact === 'medium' && probability === 'medium') return 'border-yellow-200';
    return 'border-green-200';
  };

  return (
    <div className="space-y-6">
      {/* Risk Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-500">High Risks</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {project.risks.filter(r => r.impact === 'high' || r.probability === 'high').length}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-500">Medium Risks</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {project.risks.filter(r => r.impact === 'medium' && r.probability === 'medium').length}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-500">Mitigated</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {project.risks.filter(r => r.status === 'mitigated').length}
          </p>
        </div>
      </div>

      {/* Risk Matrix */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-px bg-gray-200">
          <div className="bg-gray-50 p-4">
            <span className="text-sm font-medium text-gray-900">Impact ↓ Probability →</span>
          </div>
          {probabilityLevels.map((prob) => (
            <div key={prob} className="bg-gray-50 p-4 text-center">
              <span className="text-sm font-medium text-gray-900 capitalize">{prob}</span>
            </div>
          ))}
        </div>

        {impactLevels.map((impact) => (
          <div key={impact} className="grid grid-cols-4 gap-px bg-gray-200">
            <div className="bg-gray-50 p-4 flex items-center">
              <span className="text-sm font-medium text-gray-900 capitalize">{impact}</span>
            </div>
            {probabilityLevels.map((prob) => {
              const risks = getMatrixCell(impact, prob);
              return (
                <div
                  key={`${impact}-${prob}`}
                  className={`${getCellColor(impact, prob)} p-4 border-2 ${getCellBorderColor(impact, prob)}`}
                >
                  {risks.length > 0 ? (
                    <div className="space-y-2">
                      {risks.map((risk, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between text-sm"
                        >
                          <span className="text-gray-900">{risk.description}</span>
                          <button className="ml-2 text-indigo-600 hover:text-indigo-900">
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-sm text-gray-400">No risks</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Risk Legend */}
      <div className="flex items-center justify-end space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-50 border-2 border-red-200 mr-2" />
          <span className="text-gray-600">Critical</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-50 border-2 border-orange-200 mr-2" />
          <span className="text-gray-600">High</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-50 border-2 border-yellow-200 mr-2" />
          <span className="text-gray-600">Medium</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-50 border-2 border-green-200 mr-2" />
          <span className="text-gray-600">Low</span>
        </div>
      </div>
    </div>
  );
}