import { z } from 'zod';

export const SalesforceConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  redirectUri: z.string(),
  instanceUrl: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional()
});

export type SalesforceConfig = z.infer<typeof SalesforceConfigSchema>;

export const SalesforceAuthSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  instanceUrl: z.string(),
  expiresAt: z.date()
});

export type SalesforceAuth = z.infer<typeof SalesforceAuthSchema>;