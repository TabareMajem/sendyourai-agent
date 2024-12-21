```typescript
import React, { useState } from 'react';
import { Search, Filter, Book, Download } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  source: string;
  citation: string;
  summary: string;
  relevance: number;
  date: Date;
}

interface LegalResearchInterfaceProps {
  onSearch: (query: string, filters: any) => Promise<void>;
  onExport: (results: SearchResult[]) => Promise<void>;
  results: SearchResult[];
  isLoading: boolean;
}

export function LegalResearchInterface({
  onSearch,
  onExport,
  results,
  isLoading
}: LegalResearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    jurisdiction: '',
    dateRange: '',
    sourceType: '',
    practiceArea: ''
  });

  const handleSearch = () => {
    onSearch(query, filters);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Book className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Legal Research</h2>
          </div>
          <button
            onClick={() => onExport(results)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </button>
        </div>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search legal documents, cases, and statutes..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.jurisdiction}
              onChange={(e) => setFilters({ ...filters, jurisdiction: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Jurisdictions</option>
              <option value="federal">Federal</option>
              <option value="state">State</option>
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Dates</option>
              <option value="last-year">Last Year</option>
              <option value="last-5-years">Last 5 Years</option>
              <option value="last-10-years">Last 10 Years</option>
            </select>

            <select
              value={filters.sourceType}
              onChange={(e) => setFilters({ ...filters, sourceType: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Sources</option>
              <option value="cases">Cases</option>
              <option value="statutes">Statutes</option>
              <option value="regulations">Regulations</option>
            </select>

            <select
              value={filters.practiceArea}
              onChange={(e) => setFilters({ ...filters, practiceArea: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Practice Areas</option>
              <option value="corporate">Corporate Law</option>
              <option value="criminal">Criminal Law</option>
              <option value="civil">Civil Law</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="divide-y divide-gray-200">
        {results.map((result) => (
          <div key={result.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{result.title}</h3>
              <span className="text-sm text-gray-500">{result.citation}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{result.summary}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{result.source}</span>
                <span>•</span>
                <span>{result.date.toLocaleDateString()}</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {result.relevance}% Match
              </span>
            </div>
          </div>
        ))}

        {results.length === 0 && !isLoading && (
          <div className="p-6 text-center text-gray-500">
            No results found. Try adjusting your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
```