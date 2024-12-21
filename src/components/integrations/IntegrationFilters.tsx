import React from 'react';
import { Search } from 'lucide-react';

interface IntegrationFiltersProps {
  filters: {
    search: string;
    category: string;
    status: string;
    industry: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function IntegrationFilters({
  filters,
  onFiltersChange
}: IntegrationFiltersProps) {
  const categories = [
    'All',
    'CRM',
    'Communication',
    'Productivity',
    'AI Services',
    'Data Storage'
  ];

  const statuses = [
    'All',
    'Connected',
    'Disconnected',
    'Pending'
  ];

  const industries = [
    'All',
    'Technology',
    'Sales',
    'Finance',
    'Healthcare',
    'Education'
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="max-w-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search integrations..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filters.category}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
          className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
          className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          value={filters.industry}
          onChange={(e) => onFiltersChange({ ...filters, industry: e.target.value })}
          className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Industries</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>
    </div>
  );
}