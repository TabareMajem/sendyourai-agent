```typescript
import React, { useState } from 'react';
import { FileText, MessageSquare, Tag, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';

interface ReviewComment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  section: string;
  resolved: boolean;
}

interface DocumentReviewProps {
  documentId: string;
  content: string;
  comments: ReviewComment[];
  onAddComment: (comment: Omit<ReviewComment, 'id' | 'timestamp'>) => void;
  onResolveComment: (commentId: string) => void;
  onMarkSection: (section: string, status: 'approved' | 'rejected' | 'flagged') => void;
}

export function DocumentReviewInterface({
  documentId,
  content,
  comments,
  onAddComment,
  onResolveComment,
  onMarkSection
}: DocumentReviewProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!selectedSection || !newComment.trim()) return;

    onAddComment({
      user: {
        name: 'Current User', // This would come from auth context
        avatar: 'https://example.com/avatar.jpg'
      },
      content: newComment,
      section: selectedSection,
      resolved: false
    });

    setNewComment('');
  };

  return (
    <div className="flex h-full">
      {/* Document Viewer */}
      <div className="flex-1 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Document Review</h2>
          </div>
        </div>

        <div className="p-4">
          {/* Document content would be rendered here with selectable sections */}
          <div className="prose max-w-none">
            {content.split('\n\n').map((section, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedSection === `section-${index}`
                    ? 'bg-indigo-50 border-2 border-indigo-500'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSection(`section-${index}`)}
              >
                <p>{section}</p>
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkSection(`section-${index}`, 'approved');
                    }}
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkSection(`section-${index}`, 'rejected');
                    }}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkSection(`section-${index}`, 'flagged');
                    }}
                    className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments Panel */}
      <div className="w-96 bg-gray-50">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Comments</h3>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Comment List */}
          <div className="space-y-4">
            {comments
              .filter(comment => !comment.resolved)
              .map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-lg shadow p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {comment.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {comment.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onResolveComment(comment.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      Resolve
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{comment.content}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Tag className="w-3 h-3 mr-1" />
                      {comment.section}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Add Comment */}
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={3}
            />
            <button
              onClick={handleAddComment}
              disabled={!selectedSection || !newComment.trim()}
              className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```