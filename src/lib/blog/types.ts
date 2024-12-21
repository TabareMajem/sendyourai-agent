```typescript
import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string()
  }),
  category: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    ogImage: z.string().optional()
  }),
  readingTime: z.number()
});

export type Post = z.infer<typeof PostSchema>;

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional()
});

export type Category = z.infer<typeof CategorySchema>;

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string()
});

export type Tag = z.infer<typeof TagSchema>;
```