```typescript
import { z } from 'zod';

export const PropertySchema = z.object({
  id: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string()
  }),
  price: z.number().positive(),
  features: z.array(z.string()),
  images: z.array(z.string().url()),
  details: z.object({
    bedrooms: z.number(),
    bathrooms: z.number(),
    squareFeet: z.number(),
    yearBuilt: z.number(),
    propertyType: z.string(),
    lotSize: z.number().optional()
  }),
  status: z.enum(['active', 'pending', 'sold', 'draft']),
  agent: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional()
  })
});

export type Property = z.infer<typeof PropertySchema>;

export function validateProperty(data: unknown): Property {
  return PropertySchema.parse(data);
}

export function generateListingTitle(property: Property): string {
  const { bedrooms, bathrooms, squareFeet, propertyType } = property.details;
  return `${bedrooms} BD | ${bathrooms} BA | ${squareFeet.toLocaleString()} SF ${propertyType}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
}

export function calculateMarketMetrics(property: Property): {
  pricePerSqFt: number;
  daysOnMarket: number;
  comparableListings: number;
} {
  const pricePerSqFt = property.price / property.details.squareFeet;
  // Additional market analysis logic would go here
  return {
    pricePerSqFt,
    daysOnMarket: 0, // Would be calculated based on listing date
    comparableListings: 0 // Would be calculated based on market data
  };
}
```