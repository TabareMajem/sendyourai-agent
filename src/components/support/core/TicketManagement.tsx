```typescript
import React, { useState } from 'react';
import { Ticket, Filter, Search, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  customer: {
    name: string;
    email: string;
  };
  assignee?: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface TicketManagementProps {
  tickets: SupportTicket[];
  onAssignTicket: (ticketId: string, assigneeId: string) => void;
  onUpdateStatus: (ticketId: string, status: SupportTicket['status']) => void;
  onUpdatePriority: (ticketId: string, priority: SupportTicket['priority']) => void;
}

export function TicketManagement({
  tickets,
  onAssignTicket,
  onUpdateStatus,
  onUpdatePriority
}: TicketManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const getStatusIcon = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'resolved':
      case 'closed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Ticket className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Support Tickets</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {/* Handle export */}}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Export
            </button>
            <button
              onClick={() => {/* Handle filter */}}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-4 flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(ticket.status)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{ticket.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </span>
                {ticket.assignee ? (
                  <img
                    src={ticket.assignee.avatar}
                    alt={ticket.assignee.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <button
                    onClick={() => {/* Handle assign */}}
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Assign
                  </button>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <div>
                Created {ticket.createdAt.toLocaleDateString()} by {ticket.customer.name}
              </div>
              <div>
                Last updated {ticket.updatedAt.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No tickets found
          </div>
        )}
      </div>
    </div>
  );
}
```