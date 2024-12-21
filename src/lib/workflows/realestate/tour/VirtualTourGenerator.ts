```typescript
import { MatterportService } from '../services/MatterportService';
import { Property } from '../utils/propertyUtils';

export class VirtualTourGenerator {
  private matterportService: MatterportService;

  constructor(matterportService: MatterportService) {
    this.matterportService = matterportService;
  }

  public async generateTour(property: Property, options: {
    quality: 'standard' | 'high';
    features: string[];
  }) {
    const tour = await this.matterportService.createVirtualTour({
      propertyId: property.id,
      images: property.images,
      options: {
        quality: options.quality,
        features: options.features
      }
    });

    // Add hotspots for key features
    const hotspots = property.features.map((feature, index) => ({
      position: this.calculateHotspotPosition(index),
      label: feature,
      type: 'info'
    }));

    await this.matterportService.updateTour(tour.tourId, {
      title: `Virtual Tour - ${property.address.street}`,
      description: this.generateTourDescription(property),
      settings: {
        hotspots,
        allowMeasurements: true,
        enableDollhouse: true
      }
    });

    return tour;
  }

  private calculateHotspotPosition(index: number) {
    // Logic to calculate optimal hotspot positions
    return {
      x: Math.cos(index * (Math.PI / 4)) * 2,
      y: 1.6, // Average human eye level
      z: Math.sin(index * (Math.PI / 4)) * 2
    };
  }

  private generateTourDescription(property: Property): string {
    return `
      Explore this beautiful ${property.details.propertyType} featuring
      ${property.details.bedrooms} bedrooms and ${property.details.bathrooms} bathrooms.
      Built in ${property.details.yearBuilt}, this ${property.details.squareFeet} sq ft home
      showcases ${property.features.slice(0, 3).join(', ')} and more.
    `.trim();
  }
}
```