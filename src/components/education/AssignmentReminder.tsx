import React from 'react';
import { Calendar, Clock, BookOpen, AlertCircle } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: Date;
  description: string;
  studyTips: string[];
  status: 'upcoming' | 'overdue' | 'completed';
}

interface AssignmentReminderProps {
  assignment: Assignment;
  onGenerateStudyPlan: (assignmentId: string) => void;
  onMarkComplete: (assignmentId: string) => void;
}

export function AssignmentReminder({
  assignment,
  onGenerateStudyPlan,
  onMarkComplete
}: AssignmentReminderProps) {
  const daysUntilDue = Math.ceil(
    (assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getStatusBadge = (status: Assignment['status']) => {
    const colors = {
      upcoming: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
          <p className="text-sm text-gray-500">{assignment.subject}</p>
        </div>
        {getStatusBadge(assignment.status)}
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Due {assignment.dueDate.toLocaleDateString()}</span>
          {daysUntilDue > 0 && (
            <span className="ml-2 text-xs">({daysUntilDue} days remaining)</span>
          )}
        </div>

        <p className="text-sm text-gray-600">{assignment.description}</p>

        {assignment.studyTips.length > 0 && (
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-indigo-900 mb-2">Study Tips</h4>
            <ul className="space-y-2">
              {assignment.studyTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <BookOpen className="w-4 h-4 text-indigo-600 mt-0.5 mr-2" />
                  <span className="text-sm text-indigo-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {assignment.status === 'overdue' && (
          <div className="bg-red-50 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Assignment Overdue</h4>
              <p className="mt-1 text-sm text-red-700">
                Please submit your work as soon as possible or contact your instructor.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => onGenerateStudyPlan(assignment.id)}
          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Generate Study Plan
        </button>
        {assignment.status !== 'completed' && (
          <button
            onClick={() => onMarkComplete(assignment.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}