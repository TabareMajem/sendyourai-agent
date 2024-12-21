```typescript
import React, { useState } from 'react';
import { Clock, Filter, Download, Search, ArrowRight } from 'lucide-react';

interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'task';
  title: string;
  description: string;
  timestamp: Date;
  user: {
    name: string;
    avatar: string;
  };
  metadata?: Record<string, any>;
}

interface ActivityLogProps {
  activities: Activity[];
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedType(type);
    onFilter({ type });
  };

  const getActivityIcon = (type: Activity['type']) => {
    const icons = {
      email: '📧',
      call: '📞',
      meeting: '👥',
      note: '📝',
      task: '✓'
    };
    return icons[type];
  };

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

        {/* Search and Filter Bar */}
        <div className="mt-4 flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search activities..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="all">All Types</option>
            <option value="email">Emails</option>
            <option value="call">Calls</option>
            <option value="meeting">Meetings</option>
            <option value="note">Notes</option>
            <option value="task">Tasks</option>
          </select>
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-900">
                    {activity.user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.timestamp.toLocaleString()}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No activities found
          </div>
        )}
      </div>
    </div>
  );
}
```