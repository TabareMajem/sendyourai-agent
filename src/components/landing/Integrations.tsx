import React from 'react';
import { Link } from 'react-router-dom';
import { Puzzle, ArrowRight } from 'lucide-react';

export function Integrations() {
  const integrations = [
    { name: 'Salesforce', category: 'CRM' },
    { name: 'Slack', category: 'Communication' },
    { name: 'Google Workspace', category: 'Productivity' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'Zoom', category: 'Communication' },
    { name: 'HubSpot', category: 'Marketing' },
    { name: 'Asana', category: 'Project Management' },
    { name: 'Stripe', category: 'Payments' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Connect Your Favorite Tools</h2>
          <p className="mt-4 text-xl text-gray-600">
            Seamlessly integrate with the tools you already use
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-lg"
            >
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4">
                <Puzzle className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">{integration.name}</h3>
              <p className="text-xs text-gray-500">{integration.category}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/integrations"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            View all integrations <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}