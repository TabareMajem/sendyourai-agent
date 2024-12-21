import React, { useState } from 'react';
import { Brain, Clock, Target, Book, Plus, X } from 'lucide-react';

interface StudyPlanGeneratorProps {
  studentId: string;
  assignmentId: string;
  onGenerate: (config: StudyPlanConfig) => void;
  onClose: () => void;
}

interface StudyPlanConfig {
  duration: number;
  includeMilestones: boolean;
  includeResources: boolean;
  adaptToLearningStyle: boolean;
  focusAreas: string[];
}

export function StudyPlanGenerator({
  studentId,
  assignmentId,
  onGenerate,
  onClose
}: StudyPlanGeneratorProps) {
  const [config, setConfig] = useState<StudyPlanConfig>({
    duration: 60,
    includeMilestones: true,
    includeResources: true,
    adaptToLearningStyle: true,
    focusAreas: []
  });

  const [newFocusArea, setNewFocusArea] = useState('');

  const handleAddFocusArea = () => {
    if (newFocusArea.trim()) {
      setConfig(prev => ({
        ...prev,
        focusAreas: [...prev.focusAreas, newFocusArea.trim()]
      }));
      setNewFocusArea('');
    }
  };

  const handleRemoveFocusArea = (index: number) => {
    setConfig(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Generate Study Plan</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Study Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Study Duration (minutes)
          </label>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="15"
              max="180"
              step="15"
              value={config.duration}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                duration: parseInt(e.target.value)
              }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Focus Areas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Focus Areas
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={newFocusArea}
              onChange={(e) => setNewFocusArea(e.target.value)}
              placeholder="Add focus area"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              onClick={handleAddFocusArea}
              className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {config.focusAreas.map((area, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-700">{area}</span>
                <button
                  onClick={() => handleRemoveFocusArea(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Options
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeMilestones}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  includeMilestones: e.target.checked
                }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Include milestones</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeResources}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  includeResources: e.target.checked
                }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Include learning resources</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.adaptToLearningStyle}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  adaptToLearningStyle: e.target.checked
                }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Adapt to learning style</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={() => onGenerate(config)}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Brain className="w-4 h-4 mr-2" />
          Generate Study Plan
        </button>
      </div>
    </div>
  );
}