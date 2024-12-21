import { useState, useEffect } from 'react';
import { FileText, MessageSquare, Database, Calendar, Mail, Bot, Building2 } from 'lucide-react';

export function useIntegrations() {
  const [integrations, setIntegrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const icons = {
    'zapier': Bot,
    'google-drive': FileText,
    'slack': MessageSquare,
    'salesforce': Building2,
    'hubspot': Database,
    'google-calendar': Calendar,
    'sendgrid': Mail,
    'default': FileText
  };

  useEffect(() => {
    const loadIntegrations = async () => {
      try {
        // In a real app, this would fetch from an API
        const availableIntegrations = [
          {
            id: 'zapier',
            name: 'Zapier',
            category: 'automation',
            description: 'Connect with 5000+ apps through Zapier',
            status: 'available',
            features: [
              'Automated workflows',
              'Custom integrations',
              'Real-time sync',
              'Data mapping'
            ]
          }
        ];

        setIntegrations(availableIntegrations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load integrations'));
      } finally {
        setIsLoading(false);
      }
    };

    loadIntegrations();
  }, []);

  return { integrations, isLoading, error, icons };
}