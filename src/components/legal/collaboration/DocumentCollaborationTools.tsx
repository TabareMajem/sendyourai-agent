```typescript
import React, { useState } from 'react';
import { Users, MessageSquare, Clock, Share2, Lock, Eye } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'online' | 'offline';
  lastActive?: Date;
}

interface Comment {
  id: string;
  user: Collaborator;
  content: string;
  timestamp: Date;
  resolved: boolean;
}

interface DocumentCollaborationToolsProps {
  documentId: string;
  collaborators: Collaborator[];
  comments: Comment[];
  onAddCollaborator: (email: string, role: Collaborator['role']) => void;
  onRemoveCollaborator: (userId: string) => void;
  onUpdateCollaboratorRole: (userId: string, role: Collaborator['role']) => void;
  onAddComment: (content: string) => void;
  onResolveComment: (commentId: string) => void;
  onShareDocument: (options: { role: Collaborator['role']; expiry?: Date }) => void;
}

export function DocumentCollaborationTools({
  documentId,
  collaborators,
  comments,
  onAddCollaborator,
  onRemoveCollaborator,
  onUpdateCollaboratorRole,
  onAddComment,
  onResolveComment,
  onShareDocument
}: DocumentCollaborationToolsProps) {
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [newCollaboratorRole, setNewCollaboratorRole] = useState<Collaborator['role']>('viewer');
  const [newComment, setNewComment] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareRole, setShareRole] = useState<Collaborator['role']>('viewer');
  const [shareExpiry, setShareExpiry] = useState<string>('');

  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollaboratorEmail.trim()) return;

    onAddCollaborator(newCollaboratorEmail, newCollaboratorRole);
    setNewCollaboratorEmail('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment);
    setNewComment('');
  };

  const handleShare = () => {
    onShareDocument({
      role: shareRole,
      expiry: shareExpiry ? new Date(shareExpiry) : undefined
    });
    setShowShareDialog(false);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Collaboration</h2>
          </div>
          <button
            onClick={() => setShowShareDialog(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Document
          </button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Collaborators Section */}
        <div className="border-r border-gray-200 pr-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Collaborators</h3>
          
          {/* Add Collaborator Form */}
          <form onSubmit={handleAddCollaborator} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="email"
                value={newCollaboratorEmail}
                onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <select
                value={newCollaboratorRole}
                onChange={(e) => setNewCollaboratorRole(e.target.value as Collaborator['role'])}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </form>

          {/* Collaborators List */}
          <div className="space-y-3">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={collaborator.avatar}
                    alt={collaborator.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {collaborator.name}
                    </p>
                    <p className="text-xs text-gray-500">{collaborator.email}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      collaborator.status === 'online'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {collaborator.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={collaborator.role}
                    onChange={(e) => onUpdateCollaboratorRole(collaborator.id, e.target.value as Collaborator['role'])}
                    className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="owner">Owner</option>
                  </select>
                  <button
                    onClick={() => onRemoveCollaborator(collaborator.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Comments</h3>
          
          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Comment
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`p-4 rounded-lg ${
                  comment.resolved ? 'bg-gray-50' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {comment.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {comment.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {!comment.resolved && (
                    <button
                      onClick={() => onResolveComment(comment.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      Resolve
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Share Document</h3>
              <button
                onClick={() => setShowShareDialog(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Access Level
                </label>
                <select
                  value={shareRole}
                  onChange={(e) => setShareRole(e.target.value as Collaborator['role'])}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Link Expiry (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={shareExpiry}
                  onChange={(e) => setShareExpiry(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowShareDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShare}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Generate Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```