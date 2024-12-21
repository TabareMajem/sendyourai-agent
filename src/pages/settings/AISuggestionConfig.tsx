import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { IndustryPreferences } from './components/IndustryPreferences';
import { GoalAlignment } from './components/GoalAlignment';
import { DataSourcesConfig } from './components/DataSourcesConfig';
import { AutonomySettings } from './components/AutonomySettings';
import { LearningPreferences } from './components/LearningPreferences';
import { SafetySettings } from './components/SafetySettings';
import { SimulationPreview } from './components/SimulationPreview';
import { Bot, Save } from 'lucide-react';

export function AISuggestionConfig() {
  const [config, setConfig] = useState({
    industries: {
      primary: '',
      secondary: []
    },
    goals: {
      efficiency: 50,
      innovation: 50,
      riskManagement: 50,
      customerSatisfaction: 50,
      revenueGeneration: 50
    },
    dataSources: [],
    autonomyLevel: 'partial',
    learningPreferences: {
      suggestionTypes: [],
      feedbackEnabled: true,
      feedbackFrequency: 'always'
    },
    safetySettings: {
      contentModeration: true,
      biasDetection: true,
      complianceChecks: true
    }
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving configuration:', config);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Suggestion Configuration
                </h1>
                <p className="text-sm text-gray-500">
                  Customize how your AI companion works and provides suggestions
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IndustryPreferences
                value={config.industries}
                onChange={(industries) => setConfig({ ...config, industries })}
              />
              <GoalAlignment
                value={config.goals}
                onChange={(goals) => setConfig({ ...config, goals })}
              />
            </div>

            <DataSourcesConfig
              value={config.dataSources}
              onChange={(dataSources) => setConfig({ ...config, dataSources })}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AutonomySettings
                value={config.autonomyLevel}
                onChange={(autonomyLevel) => setConfig({ ...config, autonomyLevel })}
              />
              <LearningPreferences
                value={config.learningPreferences}
                onChange={(learningPreferences) => setConfig({ ...config, learningPreferences })}
              />
            </div>

            <SafetySettings
              value={config.safetySettings}
              onChange={(safetySettings) => setConfig({ ...config, safetySettings })}
            />

            <SimulationPreview config={config} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}