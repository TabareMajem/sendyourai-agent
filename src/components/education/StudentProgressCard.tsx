import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Book } from 'lucide-react';

interface StudentProgress {
  studentId: string;
  name: string;
  subject: string;
  currentGrade: number;
  previousGrade: number;
  assignments: {
    completed: number;
    total: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
}

interface StudentProgressCardProps {
  progress: StudentProgress;
  onViewDetails: (studentId: string) => void;
  onGenerateReport: (studentId: string) => void;
}

export function StudentProgressCard({
  progress,
  onViewDetails,
  onGenerateReport
}: StudentProgressCardProps) {
  const gradeChange = progress.currentGrade - progress.previousGrade;
  const completionRate = (progress.assignments.completed / progress.assignments.total) * 100;

  const getRiskBadge = (risk: StudentProgress['riskLevel']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[risk]}`}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{progress.name}</h3>
          <p className="text-sm text-gray-500">{progress.subject}</p>
        </div>
        {getRiskBadge(progress.riskLevel)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Current Grade</span>
            <div className="flex items-center">
              {gradeChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                gradeChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(gradeChange)}%
              </span>
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{progress.currentGrade}%</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Assignments</span>
            <span className="text-sm text-gray-500">
              {progress.assignments.completed}/{progress.assignments.total}
            </span>
          </div>
          <div className="mt-2 relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${completionRate}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      {progress.riskLevel === 'high' && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Attention Needed</h4>
            <p className="mt-1 text-sm text-red-700">
              Student performance has dropped significantly. Consider scheduling an intervention.
            </p>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => onViewDetails(progress.studentId)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          View Details
        </button>
        <button
          onClick={() => onGenerateReport(progress.studentId)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Book className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>
    </div>
  );
}