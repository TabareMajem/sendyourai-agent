import { useState, useEffect } from 'react';
import { apiRequest } from '../lib/utils/api';

interface Settings {
  account: {
    name: string;
    email: string;
    avatar: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  ai: {
    proactivity: number;
    autonomy: number;
    industry: string;
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // In a real app, this would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSettings({
          account: {
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://example.com/avatar.jpg'
          },
          notifications: {
            email: true,
            sms: false,
            inApp: true
          },
          ai: {
            proactivity: 75,
            autonomy: 50,
            industry: 'Technology'
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load settings'));
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (section: string, data: any) => {
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSettings(prev => prev ? {
        ...prev,
        [section]: { ...prev[section], ...data }
      } : null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update settings'));
      return false;
    }
  };

  return { settings, isLoading, error, updateSettings };
}