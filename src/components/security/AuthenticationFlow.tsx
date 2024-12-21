import React, { useState } from 'react';
import { Shield, Key, Lock, AlertTriangle } from 'lucide-react';

interface AuthenticationFlowProps {
  onAuthenticate: (token: string) => void;
  onError: (error: string) => void;
}

export function AuthenticationFlow({ onAuthenticate, onError }: AuthenticationFlowProps) {
  const [step, setStep] = useState<'password' | 'twoFactor'>('password');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      onAuthenticate('mock-jwt-token');
    } catch (error) {
      onError('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900">Secure Authentication</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 'password' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </button>
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Two-Factor Code
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                pattern="[0-9]*"
                maxLength={6}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              <Key className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Continue'
            )}
          </button>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-md">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Security Notice
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                This login is protected by advanced security measures. Never share your
                credentials or authentication codes with anyone.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}