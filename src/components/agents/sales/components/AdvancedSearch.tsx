import React, { useState } from 'react';
import { Search, Filter, X, Plus } from 'lucide-react';

interface SearchFilter {
  field: string;
  operator: string;
  value: string;
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilter[]) => void;
  availableFields: string[];
}

export function AdvancedSearch({ onSearch, availableFields }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>([]);

  const handleAddFilter = () => {
    setFilters([...filters, { field: availableFields[0], operator: 'equals', value: '' }]);
  };

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleFilterChange = (index: number, updates: Partial<SearchFilter>) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], ...updates };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onSearch(query, filters);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Filters */}
      <div className="space-y-2">
        {filters.map((filter, index) => (
          <div key={index} className="flex items-center space-x-2">
            <select
              value={filter.field}
              onChange={(e) => handleFilterChange(index, { field: e.target.value })}
              className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {availableFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>

            <select
              value={filter.operator}
              onChange={(e) => handleFilterChange(index, { operator: e.target.value })}
              className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
            </select>

            <input
              type="text"
              value={filter.value}
              onChange={(e) => handleFilterChange(index, { value: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Value"
            />

            <button
              onClick={() => handleRemoveFilter(index)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddFilter}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Filter
        </button>
      </div>

      {/* Search Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSearch}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </button>
      </div>
    </div>
  );
}