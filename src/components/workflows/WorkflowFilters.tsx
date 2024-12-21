import React from 'react';
import { Search, Filter } from 'lucide-react';

interface WorkflowFiltersProps {
  filters: {
    search: string;
    status: string[];
    tags: string[];
    dateRange: any;
  };
  onFiltersChange: (filters: any) => void;
}

export function WorkflowFilters({ filters, onFiltersChange }: WorkflowFiltersProps) {
  const statuses = ['All', 'Active', 'Paused', 'Draft', 'Error'];
  const tags = ['Automation', 'Integration', 'Processing', 'Notification', 'Analysis'];

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
            placeholder="Search workflows..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4">
        {/* Status Filter */}
        <div className="relative">
          <select
            value={filters.status[0] || 'All'}
            onChange={(e) => onFiltersChange({
              ...filters,
              status: e.target.value === 'All' ? [] : [e.target.value]
            })}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Tags Filter */}
        <div className="relative">
          <select
            value={filters.tags[0] || 'All Tags'}
            onChange={(e) => onFiltersChange({
              ...filters,
              tags: e.target.value === 'All Tags' ? [] : [e.target.value]
            })}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="All Tags">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="relative">
          <select
            value={filters.dateRange || 'All Time'}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateRange: e.target.value === 'All Time' ? null : e.target.value
            })}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="All Time">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>

        {/* More Filters Button */}
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </button>
      </div>

      {/* Active Filters */}
      {(filters.status.length > 0 || filters.tags.length > 0 || filters.dateRange) && (
        <div className="flex flex-wrap gap-2 pt-2">
          {filters.status.map((status) => (
            <span
              key={status}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {status}
              <button
                type="button"
                onClick={() => onFiltersChange({
                  ...filters,
                  status: filters.status.filter(s => s !== status)
                })}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
              >
                <span className="sr-only">Remove filter</span>
                ×
              </button>
            </span>
          ))}
          {filters.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => onFiltersChange({
                  ...filters,
                  tags: filters.tags.filter(t => t !== tag)
                })}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none"
              >
                <span className="sr-only">Remove filter</span>
                ×
              </button>
            </span>
          ))}
          {filters.dateRange && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {filters.dateRange}
              <button
                type="button"
                onClick={() => onFiltersChange({
                  ...filters,
                  dateRange: null
                })}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
              >
                <span className="sr-only">Remove filter</span>
                ×
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={() => onFiltersChange({
              search: '',
              status: [],
              tags: [],
              dateRange: null
            })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}