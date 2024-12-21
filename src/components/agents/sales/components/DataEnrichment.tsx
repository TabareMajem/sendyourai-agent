import React, { useState } from 'react';
import { Database, RefreshCw, Search, AlertTriangle } from 'lucide-react';

interface DataEnrichmentProps {
  onEnrich: (data: any) => Promise<any>;
  onBulkEnrich: (data: any[]) => Promise<any[]>;
}

export function DataEnrichment({ onEnrich, onBulkEnrich }: DataEnrichmentProps) {
  const [isEnriching, setIsEnriching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleEnrich = async (data: any) => {
    setIsEnriching(true);
    try {
      const enrichedData = await onEnrich(data);
      setResults([...results, enrichedData]);
    } catch (error) {
      console.error('Enrichment failed:', error);
    } finally {
      setIsEnriching(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Database className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Data Enrichment</h2>
          </div>
          <button
            onClick={() => handleEnrich({ query: searchQuery })}
            disabled={isEnriching || !searchQuery}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isEnriching ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Enriching...
              </>
            ) : (
              'Enrich Data'
            )}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter company name, domain, or email..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              {/* Display enriched data */}
              <pre className="whitespace-pre-wrap text-sm text-gray-600">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ))}

          {results.length === 0 && (
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-sm font-medium text-gray-900">No enriched data</h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter a search query to enrich your data
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}