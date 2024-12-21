```typescript
import React, { useState } from 'react';
import { MessageSquare, User, Clock, Tag, AlertCircle } from 'lucide-react';

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  requester: {
    name: string;
    email: string;
  };
  assignee?: {
    name: string;
    avatar: string;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  comments: Array<{
    id: number;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isPublic: boolean;
    createdAt: Date;
  }>;
}

interface TicketDetailsProps {
  ticket: Ticket;
  onUpdateStatus: (status: Ticket['status']) => void;
  onUpdatePriority: (priority: Ticket['priority']) => void;
  onAssign: (assigneeId: string) => void;
  onAddComment: (comment: string, isPublic: boolean) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export function TicketDetails({
  ticket,
  onUpdateStatus,
  onUpdatePriority,
  onAssign,
  onAddComment,
  onAddTag,
  onRemoveTag
}: TicketDetailsProps) {
  const [newComment, setNewComment] = useState('');
  const [isPublicComment, setIsPublicComment] = useState(true);
  const [newTag, setNewTag] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment, isPublicComment);
    setNewComment('');
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">#{ticket.id} - {ticket.subject}</h2>
          <div className="flex items-center space-x-4">
            <select
              value={ticket.status}
              onChange={(e) => onUpdateStatus(e.target.value as Ticket['status'])}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="new">New</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="hold">On Hold</option>
              <option value="solved">Solved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={ticket.priority}
              onChange={(e) => onUpdatePriority(e.target.value as Ticket['priority'])}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{ticket.requester.name}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                Created {ticket.createdAt.toLocaleString()}
              </span>
            </div>
          </div>
          {ticket.assignee ? (
            <div className="flex items-center">
              <img
                src={ticket.assignee.avatar}
                alt={ticket.assignee.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm text-gray-600">{ticket.assignee.name}</span>
            </div>
          ) : (
            <button
              onClick={() => {/* Handle assign */}}
              className="text-sm text-indigo-600 hover:text-indigo-900"
            >
              Assign Ticket
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="prose max-w-none">
          <p>{ticket.description}</p>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {ticket.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                  <button
                    onClick={() => onRemoveTag(tag)}
                    className="ml-1.5 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleAddTag}
                placeholder="Add tag..."
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Comments</h3>
          {ticket.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {comment.author.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {comment.createdAt.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
                </div>
                {!comment.isPublic && (
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Internal Note
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Add Comment */}
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add a comment..."
            />
            <div className="mt-2 flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPublicComment}
                  onChange={(e) => setIsPublicComment(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Public comment</span>
              </label>
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```