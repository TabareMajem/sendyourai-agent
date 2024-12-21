import React from 'react';
import { Clock, Filter, Download, Search } from 'lucide-react';
import { ActivityTimeline } from './ActivityTimeline';

interface ActivityLogProps {
  activities: any[];
  onFilter: (filters: any) => void;
  onExport: () => void;
  onSearch: (query: string) => void;
}

export function ActivityLog({
  activities,
  onFilter,
  onExport,
  onSearch
}: ActivityLogProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Activity Log</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onExport}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
            <button
              onClick={() => onFilter({})}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <ActivityTimeline activities={activities} />
      </div>
    </div>
  );
}