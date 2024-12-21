import React from 'react';
import { BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
import { Project } from '../../../../../lib/agents/pmo/types';

interface QualityMetricsProps {
  project: Project;
}

export function QualityMetrics({ project }: QualityMetricsProps) {
  const getStatusColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <BarChart2 className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Overall Quality</span>
          </div>
          <p className={`mt-1 text-2xl font-bold ${getStatusColor(project.metrics?.qualityScore || 0)}`}>
            {project.metrics?.qualityScore || 0}%
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Passed Checkpoints</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {project.qualityPlan.checkpoints.filter(c => c.status === 'passed').length}/
            {project.qualityPlan.checkpoints.length}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Failed Criteria</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {project.qualityPlan.checkpoints.filter(c => c.status === 'failed').length}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quality Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(project.qualityPlan.metrics).map(([metric, value], index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {metric.split(/(?=[A-Z])/).join(' ')}
                </span>
                <span className={`text-sm font-medium ${getStatusColor(value)}`}>
                  {value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    value >= 80 ? 'bg-green-500' :
                    value >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quality Checkpoints</h3>
        <div className="space-y-4">
          {project.qualityPlan.checkpoints.map((checkpoint, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">{checkpoint.phase}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  checkpoint.status === 'passed' ? 'bg-green-100 text-green-800' :
                  checkpoint.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {checkpoint.status.charAt(0).toUpperCase() + checkpoint.status.slice(1)}
                </span>
              </div>
              <ul className="space-y-2">
                {checkpoint.criteria.map((criterion, criterionIndex) => (
                  <li key={criterionIndex} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2" />
                    <span className="text-sm text-gray-600">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}