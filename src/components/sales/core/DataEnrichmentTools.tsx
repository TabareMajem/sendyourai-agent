```typescript
import React, { useState } from 'react';
import { Search, RefreshCw, Database } from 'lucide-react';
import { ClearbitClient } from '../../../lib/integrations/enrichment/ClearbitClient';

interface EnrichmentResult {
  company?: {
    name: string;
    domain: string;
    industry: string;
    metrics: {
      employees: number;
      revenue: number;
    };
  };
  person?: {
    name: string;
    title: string;
    email: string;
    social: Record<string, string>;
  };
}

export function DataEnrichmentTools() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<EnrichmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnrich = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const clearbit = new ClearbitClient(process.env.VITE_CLEARBIT_API_KEY || '');
      
      const [companyData, personData] = await Promise.all([
        clearbit.enrichCompany(query),
        clearbit.enrichPerson(query)
      ]);

      setResults({
        company: companyData,
        person: personData
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enrich data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Database className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Data Enrichment</h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* Search Input */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter email, domain, or company name..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={handleEnrich}
            disabled={isLoading || !query.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Enrich Data
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Company Information */}
            {results.company && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{results.company.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Industry</dt>
                    <dd className="mt-1 text-sm text-gray-900">{results.company.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Employees</dt>
                    <dd className="mt-1 text-sm text-gray-900">{results.company.metrics.employees}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Revenue</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${results.company.metrics.revenue.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Person Information */}
            {results.person && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Person Information</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{results.person.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">{results.person.title}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{results.person.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Social Profiles</dt>
                    <dd className="mt-1 space-y-1">
                      {Object.entries(results.person.social).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-900 block"
                        >
                          {platform}
                        </a>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```