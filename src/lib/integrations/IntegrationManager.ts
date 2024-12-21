import { z } from 'zod';
import { AppError, ErrorCodes } from '../utils/errors';

const IntegrationConfigSchema = z.object({
  id: z.string(),
  provider: z.string(),
  credentials: z.record(z.unknown()),
  settings: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional()
});

export type IntegrationConfig = z.infer<typeof IntegrationConfigSchema>;

export class IntegrationManager {
  private static instance: IntegrationManager;
  private configs: Map<string, IntegrationConfig>;

  private constructor() {
    this.configs = new Map();
  }

  public static getInstance(): IntegrationManager {
    if (!IntegrationManager.instance) {
      IntegrationManager.instance = new IntegrationManager();
    }
    return IntegrationManager.instance;
  }

  public async connectIntegration(type: string, category: string, config: any): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const integrationConfig: IntegrationConfig = {
        id: type,
        provider: category,
        credentials: config,
        metadata: {
          connectedAt: new Date().toISOString()
        }
      };

      this.configs.set(type, integrationConfig);
    } catch (error) {
      throw new AppError(
        'Failed to connect integration',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { type, category }
      );
    }
  }

  public async disconnectIntegration(integrationId: string): Promise<void> {
    this.configs.delete(integrationId);
  }

  public async listIntegrations(): Promise<IntegrationConfig[]> {
    return Array.from(this.configs.values());
  }

  public async getIntegrationStatus(integrationId: string): Promise<'connected' | 'disconnected'> {
    return this.configs.has(integrationId) ? 'connected' : 'disconnected';
  }
}