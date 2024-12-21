import { useState, useEffect, useCallback } from 'react';
import { NotificationService } from '../lib/notifications/NotificationService';

export function useNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    const notificationService = NotificationService.getInstance();
    
    const init = async () => {
      setIsSupported('Notification' in window);
      setPermission(Notification.permission);
      
      await notificationService.init();
    };

    init();
  }, []);

  const requestPermission = useCallback(async () => {
    const notificationService = NotificationService.getInstance();
    const granted = await notificationService.requestPermission();
    setPermission(granted ? 'granted' : 'denied');
    return granted;
  }, []);

  const subscribe = useCallback(async () => {
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return null;
    }

    const notificationService = NotificationService.getInstance();
    const newSubscription = await notificationService.subscribeToNotifications();
    setSubscription(newSubscription);
    return newSubscription;
  }, [permission, requestPermission]);

  const sendNotification = useCallback(async (title: string, options: NotificationOptions) => {
    const notificationService = NotificationService.getInstance();
    await notificationService.sendNotification(title, options);
  }, []);

  return {
    isSupported,
    permission,
    subscription,
    requestPermission,
    subscribe,
    sendNotification
  };
}