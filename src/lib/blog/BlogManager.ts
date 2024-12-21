```typescript
import { Post, Category, Tag } from './types';
import { AppError, ErrorCodes } from '../utils/errors';

export class BlogManager {
  private posts: Map<string, Post>;
  private categories: Map<string, Category>;
  private tags: Map<string, Tag>;

  constructor() {
    this.posts = new Map();
    this.categories = new Map();
    this.tags = new Map();
  }

  // Post Management
  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const id = crypto.randomUUID();
      const newPost: Post = {
        ...post,
        id,
        slug: this.generateSlug(post.title),
        readingTime: this.calculateReadingTime(post.content)
      };

      this.posts.set(id, newPost);
      return newPost;
    } catch (error) {
      throw new AppError(
        'Failed to create post',
        ErrorCodes.DATABASE_ERROR,
        500,
        { error }
      );
    }
  }

  async updatePost(id: string, updates: Partial<Post>): Promise<Post> {
    const post = this.posts.get(id);
    if (!post) {
      throw new AppError(
        'Post not found',
        ErrorCodes.NOT_FOUND,
        404
      );
    }

    const updatedPost: Post = {
      ...post,
      ...updates,
      updatedAt: new Date()
    };

    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<void> {
    if (!this.posts.delete(id)) {
      throw new AppError(
        'Post not found',
        ErrorCodes.NOT_FOUND,
        404
      );
    }
  }

  async getPost(id: string): Promise<Post> {
    const post = this.posts.get(id);
    if (!post) {
      throw new AppError(
        'Post not found',
        ErrorCodes.NOT_FOUND,
        404
      );
    }
    return post;
  }

  async getPostBySlug(slug: string): Promise<Post> {
    const post = Array.from(this.posts.values()).find(p => p.slug === slug);
    if (!post) {
      throw new AppError(
        'Post not found',
        ErrorCodes.NOT_FOUND,
        404
      );
    }
    return post;
  }

  async listPosts(params: {
    category?: string;
    tag?: string;
    status?: Post['status'];
    page?: number;
    limit?: number;
  } = {}): Promise<{
    posts: Post[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    let filteredPosts = Array.from(this.posts.values());

    // Apply filters
    if (params.category) {
      filteredPosts = filteredPosts.filter(p => p.category === params.category);
    }
    if (params.tag) {
      filteredPosts = filteredPosts.filter(p => p.tags.includes(params.tag!));
    }
    if (params.status) {
      filteredPosts = filteredPosts.filter(p => p.status === params.status);
    }

    // Sort by publish date
    filteredPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedPosts = filteredPosts.slice(start, end);

    return {
      posts: paginatedPosts,
      total: filteredPosts.length,
      page,
      totalPages: Math.ceil(filteredPosts.length / limit)
    };
  }

  // Category Management
  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const id = crypto.randomUUID();
    const newCategory: Category = {
      ...category,
      id,
      slug: this.generateSlug(category.name)
    };

    this.categories.set(id, newCategory);
    return newCategory;
  }

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    const category = this.categories.get(id);
    if (!category) {
      throw new AppError(
        'Category not found',
        ErrorCodes.NOT_FOUND,
        404
      );
    }

    const updatedCategory: Category = {
      ...category,
      ...updates
    };

    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    if (!this.categories.delete(id)) {
      throw new AppError(
        'Category not found',
        ErrorCodes.NOT_FOUND,
        404
      );
    }
  }

  async listCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  // Tag Management
  async createTag(tag: Omit<Tag, 'id'>): Promise<Tag> {
    const id = crypto.randomUUID();
    const newTag: Tag = {
      ...tag,
      id,
      slug: this.generateSlug(tag.name)
    };

    this.tags.set(id, newTag);
    return newTag;
  }

  async updateTag(id: string, updates: Partial<Tag>): Promise<Tag> {
    const tag = this.tags.get(id);
    if (!tag) {
      throw new AppError(
        'Tag not found',
        ErrorCodes.NOT_FOUND,
        404
      );
    }

    const updatedTag: Tag = {
      ...tag,
      ...updates
    };

    this.tags.set(id, updatedTag);
    return updatedTag;
  }

  async deleteTag(id: string): Promise<void> {
    if (!this.tags.delete(id)) {
      throw new AppError(
        'Tag not found',
        ErrorCodes.NOT_FOUND,
        404
      );
    }
  }

  async listTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  // Utility methods
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }

  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}
```