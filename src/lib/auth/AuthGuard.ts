```typescript
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SessionManager } from './SessionManager';

export function useAuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const session = SessionManager.getSession();
    
    if (!session) {
      // Save the attempted URL to redirect back after login
      navigate('/login', { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [navigate, location]);

  return SessionManager.getSession();
}

export function usePublicGuard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const session = SessionManager.getSession();
    
    if (session) {
      // If user is already logged in, redirect to dashboard
      const destination = (location.state as any)?.from || '/dashboard';
      navigate(destination, { replace: true });
    }
  }, [navigate, location]);
}
```