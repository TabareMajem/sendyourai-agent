import { z } from 'zod';

const envSchema = z.object({
  app: z.object({
    name: z.string(),
    url: z.string().url()
  }),
  api: z.object({
    url: z.string().url()
  }),
  auth: z.object({
    domain: z.string(),
    clientId: z.string(),
    audience: z.string()
  }),
  stripe: z.object({
    publicKey: z.string()
  }),
  integrations: z.object({
    salesforce: z.object({
      clientId: z.string()
    }),
    hubspot: z.object({
      clientId: z.string()
    }),
    slack: z.object({
      clientId: z.string()
    }),
    google: z.object({
      clientId: z.string()
    }),
    epic: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      baseUrl: z.string().url()
    }),
    fhir: z.object({
      apiKey: z.string(),
      baseUrl: z.string().url()
    })
  }),
  features: z.object({
    analytics: z.boolean(),
    notifications: z.boolean()
  })
});

export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME,
    url: import.meta.env.VITE_APP_URL
  },
  api: {
    url: import.meta.env.VITE_API_URL
  },
  auth: {
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH_AUDIENCE
  },
  stripe: {
    publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY
  },
  integrations: {
    salesforce: {
      clientId: import.meta.env.VITE_SALESFORCE_CLIENT_ID
    },
    hubspot: {
      clientId: import.meta.env.VITE_HUBSPOT_CLIENT_ID
    },
    slack: {
      clientId: import.meta.env.VITE_SLACK_CLIENT_ID
    },
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
    },
    epic: {
      clientId: import.meta.env.VITE_EPIC_CLIENT_ID,
      clientSecret: import.meta.env.VITE_EPIC_CLIENT_SECRET,
      baseUrl: import.meta.env.VITE_EPIC_BASE_URL
    },
    fhir: {
      apiKey: import.meta.env.VITE_FHIR_API_KEY,
      baseUrl: import.meta.env.VITE_FHIR_BASE_URL
    }
  },
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true'
  }
} as const;

// Validate environment variables
try {
  envSchema.parse(config);
} catch (error) {
  console.error('Invalid environment configuration:', error);
  throw new Error('Invalid environment configuration');
}

export type Config = typeof config;