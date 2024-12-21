import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../../components/auth/AuthForms';
import { useAuth } from '../../hooks/useAuth';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}