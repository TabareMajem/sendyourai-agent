import React, { useState } from 'react';
import { Play, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';

interface SimulationPreviewProps {
  config: {
    industries: {
      primary: string;
      secondary: string[];
    };
    goals: {
      efficiency: number;
      innovation: number;
      riskManagement: number;
      customerSatisfaction: number;
      revenueGeneration: number;
    };
    autonomyLevel: string;
    learningPreferences: {
      suggestionTypes: string[];
      feedbackEnabled: boolean;
      feedbackFrequency: string;
    };
  };
}

export function SimulationPreview({ config }: SimulationPreviewProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<{
    suggestions: string[];
    risks: string[];
    impact: {
      efficiency: number;
      cost: number;
      time: number;
    };
  } | null>(null);

  const runSimulation = () => {
    setIsSimulating(true);
    // Simulate API call
    setTimeout(() => {
      setSimulationResults({
        suggestions: [
          'Automate customer onboarding workflow',
          'Implement predictive inventory management',
          'Set up automated follow-up sequences'
        ],
        risks: [
          'Moderate risk in customer data handling',
          'Low risk in automated decision making'
        ],
        impact: {
          efficiency: 25,
          cost: 15,
          time: 30
        }
      });
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Play className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Configuration Preview</h2>
        </div>
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSimulating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Simulating...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Simulation
            </>
          )}
        </button>
      </div>

      {/* Configuration Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Configuration Summary</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Industry: {config.industries.primary}</p>
          <p>Autonomy Level: {config.autonomyLevel}</p>
          <p>Top Goal: {Object.entries(config.goals).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
          <p>Learning Focus: {config.learningPreferences.suggestionTypes.join(', ')}</p>
        </div>
      </div>

      {/* Simulation Results */}
      {simulationResults && (
        <div className="space-y-6">
          {/* Expected Suggestions */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <MessageSquare className="w-4 h-4 text-indigo-600 mr-2" />
              Expected AI Suggestions
            </h3>
            <div className="space-y-2">
              {simulationResults.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-indigo-50 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-sm text-indigo-900">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Potential Risks */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
              Potential Risks
            </h3>
            <div className="space-y-2">
              {simulationResults.risks.map((risk, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-yellow-50 rounded-lg"
                >
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm text-yellow-900">{risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Impact */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Expected Impact</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-sm font-medium text-green-900">
                  {simulationResults.impact.efficiency}%
                </p>
                <p className="text-xs text-green-700">Efficiency Gain</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm font-medium text-blue-900">
                  {simulationResults.impact.cost}%
                </p>
                <p className="text-xs text-blue-700">Cost Reduction</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-sm font-medium text-purple-900">
                  {simulationResults.impact.time}%
                </p>
                <p className="text-xs text-purple-700">Time Saved</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}