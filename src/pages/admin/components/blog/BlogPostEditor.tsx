```typescript
import React, { useState } from 'react';
import { Save, X, Image, Tag as TagIcon } from 'lucide-react';
import { Post } from '../../../../lib/blog/types';

interface BlogPostEditorProps {
  post?: Post;
  onSave: (post: Partial<Post>) => Promise<void>;
  onCancel: () => void;
  categories: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
}

export function BlogPostEditor({
  post,
  onSave,
  onCancel,
  categories,
  tags
}: BlogPostEditorProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    category: post?.category || '',
    tags: post?.tags || [],
    seo: {
      title: post?.seo.title || '',
      description: post?.seo.description || '',
      keywords: post?.seo.keywords || [],
      ogImage: post?.seo.ogImage || ''
    },
    status: post?.status || 'draft'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={15}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Excerpt
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Category & Tags */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <select
            multiple
            value={formData.tags}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              setFormData({ ...formData, tags: values });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            SEO Title
          </label>
          <input
            type="text"
            value={formData.seo.title}
            onChange={(e) => setFormData({
              ...formData,
              seo: { ...formData.seo, title: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Description
          </label>
          <textarea
            value={formData.seo.description}
            onChange={(e) => setFormData({
              ...formData,
              seo: { ...formData.seo, description: e.target.value }
            })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Keywords
          </label>
          <input
            type="text"
            value={formData.seo.keywords.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              seo: { ...formData.seo, keywords: e.target.value.split(',').map(k => k.trim()) }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter keywords separated by commas"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Open Graph Image URL
          </label>
          <input
            type="url"
            value={formData.seo.ogImage || ''}
            onChange={(e) => setFormData({
              ...formData,
              seo: { ...formData.seo, ogImage: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({
            ...formData,
            status: e.target.value as Post['status']
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Post
            </>
          )}
        </button>
      </div>
    </form>
  );
}
```