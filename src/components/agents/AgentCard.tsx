import React from 'react';
import { Play, Pause, Settings, Activity, Bot } from 'lucide-react';

interface AgentCard {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'stopped';
  type: 'marketing' | 'sales' | 'support' | 'custom';
  metrics?: {
    tasksCompleted: number;
    successRate: number;
    activeWorkflows: number;
  };
}

interface AgentCardProps {
  agent: AgentCard;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onConfigure: (id: string) => void;
}

export function AgentCard({ agent, onStart, onPause, onConfigure }: AgentCardProps) {
  const getStatusColor = (status: AgentCard['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-indigo-600 transition-colors shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Bot className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.description}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
      </div>

      {agent.metrics && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900">
              {agent.metrics.tasksCompleted}
            </p>
            <p className="text-sm text-gray-500">Tasks Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900">
              {agent.metrics.successRate}%
            </p>
            <p className="text-sm text-gray-500">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900">
              {agent.metrics.activeWorkflows}
            </p>
            <p className="text-sm text-gray-500">Active Workflows</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        {agent.status !== 'active' ? (
          <button
            onClick={() => onStart(agent.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </button>
        ) : (
          <button
            onClick={() => onPause(agent.id)}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </button>
        )}
        <button
          onClick={() => onConfigure(agent.id)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </button>
        <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900">
          <Activity className="w-4 h-4 mr-1" />
          View Activity
        </button>
      </div>
    </div>
  );
}