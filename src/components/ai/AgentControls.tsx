import React, { useState } from 'react';
import { Brain, Settings, Power, Gauge } from 'lucide-react';
import { useProactiveAgent } from '../../hooks/useProactiveAgent';

interface AgentControlsProps {
  className?: string;
}

export function AgentControls({ className = '' }: AgentControlsProps) {
  const {
    isLearning,
    confidenceThreshold,
    toggleLearning,
    updateConfidenceThreshold
  } = useProactiveAgent();

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">AI Agent Controls</h3>
        </div>
        <button
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Learning Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Power className={`w-5 h-5 ${isLearning ? 'text-green-500' : 'text-gray-400'}`} />
            <span className="text-sm font-medium text-gray-700">Learning Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isLearning}
              onChange={(e) => toggleLearning(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Confidence Threshold */}
        {isConfigOpen && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">
                  Confidence Threshold: {(confidenceThreshold * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={confidenceThreshold * 100}
              onChange={(e) => updateConfidenceThreshold(Number(e.target.value) / 100)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1">
              Adjust how confident the AI needs to be before taking autonomous actions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}