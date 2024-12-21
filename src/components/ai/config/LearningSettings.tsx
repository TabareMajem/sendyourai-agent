import React, { useState } from 'react';
import { Brain, Zap, Target, Gauge } from 'lucide-react';

export function LearningSettings() {
  const [config, setConfig] = useState({
    adaptiveMode: 'balanced',
    learningRate: 0.5,
    feedbackSources: ['user', 'system'],
    optimizationGoals: {
      accuracy: 70,
      speed: 60,
      efficiency: 50
    }
  });

  const adaptiveModes = [
    { id: 'conservative', name: 'Conservative', icon: Brain },
    { id: 'balanced', name: 'Balanced', icon: Gauge },
    { id: 'aggressive', name: 'Aggressive', icon: Zap }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Adaptive Mode</h4>
        <div className="grid grid-cols-3 gap-4">
          {adaptiveModes.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setConfig({ ...config, adaptiveMode: id })}
              className={`
                p-4 text-center rounded-lg border-2 transition-colors
                ${config.adaptiveMode === id 
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
                }
              `}
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${
                config.adaptiveMode === id ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                config.adaptiveMode === id ? 'text-indigo-600' : 'text-gray-900'
              }`}>
                {name}
              </span>
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

      {/* Optimization Goals */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Optimization Goals</h4>
        <div className="space-y-4">
          {Object.entries(config.optimizationGoals).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                <span className="text-sm text-gray-500">{value}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setConfig({
                  ...config,
                  optimizationGoals: {
                    ...config.optimizationGoals,
                    [key]: parseInt(e.target.value)
                  }
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}