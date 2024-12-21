import React from 'react';
import { Zap, GitBranch, Puzzle, BrainCircuit } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: BrainCircuit,
      title: 'AI-Powered Automation',
      description: 'Create customized workflows effortlessly with our intuitive drag-and-drop interface.'
    },
    {
      icon: Puzzle,
      title: 'Seamless Integrations',
      description: 'Connect with your favorite tools and platforms seamlessly.'
    },
    {
      icon: GitBranch,
      title: 'Smart Workflows',
      description: 'Build complex automation flows with conditional logic and AI decision-making.'
    },
    {
      icon: Zap,
      title: 'Real-Time Analytics',
      description: 'Monitor and optimize your workflows with detailed performance insights.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Powerful Features for Modern Businesses
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to automate and optimize your workflows
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}