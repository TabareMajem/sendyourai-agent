typescript
import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { AlertTriangle, Lock } from 'lucide-react';

interface FeatureLimitProps {
  feature: string;
  limit: 'workflows' | 'apiCalls' | 'storage';
  current: number;
  children: React.ReactNode;
}

export function FeatureLimit({ feature, limit, current, children }: FeatureLimitProps) {
  const { subscription, checkFeature, checkLimit, plans } = useSubscription();

  if (!checkFeature(feature)) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              This feature requires a premium subscription
            </p>
            <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Upgrade Now
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  if (!checkLimit(limit, current)) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-yellow-800">
              You've reached your {limit} limit
            </p>
            <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
              Upgrade Plan
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}
```