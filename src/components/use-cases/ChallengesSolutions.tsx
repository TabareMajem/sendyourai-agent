import React from 'react';
import { Check } from 'lucide-react';

interface Challenge {
  challenge: string;
  solution: string;
}

interface ChallengesSolutionsProps {
  challenges: Challenge[];
}

export function ChallengesSolutions({ challenges }: ChallengesSolutionsProps) {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Challenges & Solutions
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((item, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h3>
                <p className="text-gray-600">{item.challenge}</p>
              </div>
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Solution</h3>
                </div>
                <p className="text-gray-600">{item.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}