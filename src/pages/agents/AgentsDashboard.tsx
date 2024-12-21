import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { AgentCard } from '../../components/agents/AgentCard';
import { AgentCreator } from '../../components/agents/AgentCreator';
import { Plus, Search, Filter } from 'lucide-react';

// Mock data - In a real app, this would come from an API
const mockAgents = [
  {
    id: '1',
    name: 'Marketing Campaign Manager',
    description: 'Manages multi-channel marketing campaigns autonomously',
    status: 'active' as const,
    type: 'marketing' as const,
    metrics: {
      tasksCompleted: 145,
      successRate: 92,
      activeWorkflows: 3
    }
  },
  {
    id: '2',
    name: 'Sales Lead Qualifier',
    description: 'Qualifies and nurtures sales leads automatically',
    status: 'paused' as const,
    type: 'sales' as const,
    metrics: {
      tasksCompleted: 89,
      successRate: 88,
      activeWorkflows: 1
    }
  }
];

export function AgentsDashboard() {
  const [agents, setAgents] = useState(mockAgents);
  const [showCreator, setShowCreator] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: ''
  });

  const handleStartAgent = (id: string) => {
    setAgents(agents.map(agent =>
      agent.id === id ? { ...agent, status: 'active' as const } : agent
    ));
  };

  const handlePauseAgent = (id: string) => {
    setAgents(agents.map(agent =>
      agent.id === id ? { ...agent, status: 'paused' as const } : agent
    ));
  };

  const handleConfigureAgent = (id: string) => {
    // Implement configuration modal/page navigation
    console.log('Configure agent:', id);
  };

  const handleCreateAgent = (newAgent: any) => {
    setAgents([...agents, { ...newAgent, id: (agents.length + 1).toString() }]);
    setShowCreator(false);
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         agent.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = !filters.type || agent.type === filters.type;
    const matchesStatus = !filters.status || agent.status === filters.status;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Agents</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your autonomous AI agents and their workflows
            </p>
          </div>
          <button
            onClick={() => setShowCreator(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
              <option value="custom">Custom</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="stopped">Stopped</option>
            </select>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onStart={handleStartAgent}
              onPause={handlePauseAgent}
              onConfigure={handleConfigureAgent}
            />
          ))}
        </div>

        {/* Agent Creator Modal */}
        {showCreator && (
          <AgentCreator
            onClose={() => setShowCreator(false)}
            onCreate={handleCreateAgent}
          />
        )}
      </div>
    </DashboardLayout>
  );
}