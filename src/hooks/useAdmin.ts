import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would verify admin status from backend
        setIsAdmin(user?.role === 'admin');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [user]);

  return { isAdmin, isLoading };
}