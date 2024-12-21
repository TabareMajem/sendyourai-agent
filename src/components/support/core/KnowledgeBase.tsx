```typescript
import React, { useState } from 'react';
import { Book, Search, Plus, Edit, Trash2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: Date;
}

interface KnowledgeBaseProps {
  articles: Article[];
  onAddArticle: (article: Omit<Article, 'id'>) => void;
  onEditArticle: (id: string, updates: Partial<Article>) => void;
  onDeleteArticle: (id: string) => void;
}

export function KnowledgeBase({
  articles,
  onAddArticle,
  onEditArticle,
  onDeleteArticle
}: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(articles.map(article => article.category))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Book className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Knowledge Base</h2>
          </div>
          <button
            onClick={() => {
              onAddArticle({
                title: '',
                content: '',
                category: '',
                tags: [],
                lastUpdated: new Date()
              });
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Article
          </button>
        </div>

        <div className="mt-4 flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredArticles.map((article) => (
          <div key={article.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{article.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{article.content}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {article.category}
                  </span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEditArticle(article.id, {})}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDeleteArticle(article.id)}
                  className="p-2 text-red-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Last updated: {article.lastUpdated.toLocaleDateString()}
            </p>
          </div>
        ))}

        {filteredArticles.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No articles found
          </div>
        )}
      </div>
    </div>
  );
}
```