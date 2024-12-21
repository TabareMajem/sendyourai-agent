import { useState, useEffect } from 'react';
import { SalesforceService } from '../lib/integrations/crm/SalesforceService';
import { SalesforceConfig, SalesforceAuth } from '../lib/integrations/crm/SalesforceConfig';

export function useSalesforce() {
  const [service, setService] = useState<SalesforceService | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeSalesforce = async () => {
      try {
        const config: SalesforceConfig = {
          clientId: process.env.VITE_SALESFORCE_CLIENT_ID || '',
          clientSecret: process.env.VITE_SALESFORCE_CLIENT_SECRET || '',
          redirectUri: `${window.location.origin}/auth/salesforce/callback`,
          accessToken: localStorage.getItem('salesforce_access_token') || undefined,
          refreshToken: localStorage.getItem('salesforce_refresh_token') || undefined,
          instanceUrl: localStorage.getItem('salesforce_instance_url') || undefined
        };

        const salesforceService = new SalesforceService(config);
        await salesforceService.initialize();
        
        setService(salesforceService);
        setIsConnected(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Salesforce'));
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSalesforce();
  }, []);

  const connect = async () => {
    if (!service) return;

    try {
      const authUrl = service.getAuthUrl([
        'api',
        'refresh_token',
        'offline_access'
      ]);
      window.location.href = authUrl;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect to Salesforce'));
      throw err;
    }
  };

  const handleCallback = async (code: string): Promise<SalesforceAuth> => {
    if (!service) {
      throw new Error('Salesforce service not initialized');
    }

    try {
      const auth = await service.handleAuthCallback(code);
      
      // Store tokens
      localStorage.setItem('salesforce_access_token', auth.accessToken);
      localStorage.setItem('salesforce_refresh_token', auth.refreshToken);
      localStorage.setItem('salesforce_instance_url', auth.instanceUrl);
      
      setIsConnected(true);
      return auth;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to handle Salesforce callback'));
      throw err;
    }
  };

  const disconnect = () => {
    localStorage.removeItem('salesforce_access_token');
    localStorage.removeItem('salesforce_refresh_token');
    localStorage.removeItem('salesforce_instance_url');
    setIsConnected(false);
    setService(null);
  };

  return {
    service,
    isConnected,
    isLoading,
    error,
    connect,
    handleCallback,
    disconnect
  };
}