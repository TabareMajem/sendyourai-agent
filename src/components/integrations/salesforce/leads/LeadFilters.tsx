```typescript
import React from 'react';
import { Filter } from 'lucide-react';

interface LeadFiltersProps {
  filters: {
    status: string;
    source: string;
  };
  onChange: (filters: any) => void;
}

export function LeadFilters({ filters, onChange }: LeadFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Working">Working</option>
          <option value="Qualified">Qualified</option>
          <option value="Unqualified">Unqualified</option>
        </select>
      </div>

      <select
        value={filters.source}
        onChange={(e) => onChange({ ...filters, source: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">All Sources</option>
        <option value="Web">Web</option>
        <option value="Phone">Phone</option>
        <option value="Email">Email</option>
        <option value="Referral">Referral</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}
```