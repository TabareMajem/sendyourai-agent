import { useState } from 'react';
import { Brain, Zap, Target, Gauge } from 'lucide-react';
import { Users } from 'lucide-react';

interface LearningConfig {
  adaptiveMode: string;
  learningRate: number;
  feedbackSources: string[];
  optimizationGoals: {
    accuracy: number;
    speed: number;
    efficiency: number;
  };
}

export function LearningSettings() {
  const [config, setConfig] = useState<LearningConfig>({
    adaptiveMode: 'balanced',
    learningRate: 0.5,
    feedbackSources: ['user', 'system'],
    optimizationGoals: {
      accuracy: 70,
      speed: 60,
      efficiency: 50
    }
  });

  const handleOptimizationChange = (goal: keyof typeof config.optimizationGoals, value: number) => {
    setConfig({
      ...config,
      optimizationGoals: {
        ...config.optimizationGoals,
        [goal]: value
      }
    });
  };

  const handleFeedbackSourceToggle = (source: string) => {
    const sources = config.feedbackSources;
    const newSources = sources.includes(source)
      ? sources.filter(s => s !== source)
      : [...sources, source];
    setConfig({ ...config, feedbackSources: newSources });
  };

  return (
    <div className="space-y-6">
      {/* Adaptive Mode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adaptive Mode
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['conservative', 'balanced', 'aggressive'].map((mode) => (
            <button
              key={mode}
              onClick={() => setConfig({ ...config, adaptiveMode: mode })}
              className={`
                p-4 text-center rounded-lg border-2 transition-colors
                ${config.adaptiveMode === mode
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
                }
              `}
            >
              <Brain className={`w-5 h-5 mx-auto mb-2 ${
                config.adaptiveMode === mode ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <span className="text-sm font-medium capitalize">{mode}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Learning Rate */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Learning Rate</label>
          <span className="text-sm text-gray-500">{config.learningRate.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={config.learningRate}
          onChange={(e) => setConfig({ ...config, learningRate: parseFloat(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Slower Learning</span>
          <span>Faster Learning</span>
        </div>
      </div>

      {/* Feedback Sources */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Feedback Sources
        </label>
        <div className="space-y-2">
          {[
            { id: 'user', label: 'User Feedback', icon: Users },
            { id: 'system', label: 'System Metrics', icon: Gauge },
            { id: 'automated', label: 'Automated Tests', icon: Zap }
          ].map(({ id, label, icon: Icon }) => (
            <label key={id} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={config.feedbackSources.includes(id)}
                onChange={() => handleFeedbackSourceToggle(id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <Icon className="w-5 h-5 text-gray-400 ml-3 mr-2" />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Optimization Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Optimization Goals
        </label>
        <div className="space-y-4">
          {[
            { key: 'accuracy', label: 'Accuracy', icon: Target },
            { key: 'speed', label: 'Speed', icon: Zap },
            { key: 'efficiency', label: 'Efficiency', icon: Gauge }
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Icon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {config.optimizationGoals[key as keyof typeof config.optimizationGoals]}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.optimizationGoals[key as keyof typeof config.optimizationGoals]}
                onChange={(e) => handleOptimizationChange(
                  key as keyof typeof config.optimizationGoals,
                  parseInt(e.target.value)
                )}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Learning Status */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h4 className="text-sm font-medium text-gray-900">Learning Status</h4>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Model Version</span>
            <span className="text-gray-900">v2.3.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last Updated</span>
            <span className="text-gray-900">2 hours ago</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Training Progress</span>
            <span className="text-gray-900">98%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
