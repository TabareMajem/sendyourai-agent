```typescript
import { AIAgent } from '../../../ai/AIAgent';
import { Property } from '../utils/propertyUtils';

export class ListingContentGenerator {
  private aiAgent: AIAgent;

  constructor(aiAgent: AIAgent) {
    this.aiAgent = aiAgent;
  }

  public async generateListingContent(property: Property) {
    const description = await this.aiAgent.queueAction('analysis', {
      type: 'generate_description',
      data: {
        property,
        optimizeFor: ['seo', 'engagement']
      }
    });

    const highlights = await this.aiAgent.queueAction('analysis', {
      type: 'extract_highlights',
      data: {
        property,
        maxPoints: 5
      }
    });

    const socialContent = await this.aiAgent.queueAction('analysis', {
      type: 'generate_social_content',
      data: {
        property,
        platforms: ['instagram', 'facebook', 'linkedin']
      }
    });

    return {
      description,
      highlights,
      socialContent
    };
  }

  public async optimizeImages(images: string[]) {
    return this.aiAgent.queueAction('analysis', {
      type: 'optimize_images',
      data: {
        images,
        optimizations: ['order', 'captions', 'tags']
      }
    });
  }
}
```