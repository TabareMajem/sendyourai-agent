// src/pages/Careers/Careers.tsx

import React from 'react';
import { Heart, Brain, Globe } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';

interface Position {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
}

interface Value {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const positions: Position[] = [
  {
    id: 1,
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    department: 'AI Research',
    location: 'Remote',
    type: 'Full-time',
  },
];

const values: Value[] = [
  {
    id: 'innovation',
    icon: Brain,
    title: 'Innovation First',
    description: 'We push boundaries and embrace new ideas.',
  },
  {
    id: 'user-focused',
    icon: Heart,
    title: 'User-Focused',
    description: 'Everything we do is for our users.',
  },
  {
    id: 'remote-first',
    icon: Globe,
    title: 'Remote-First',
    description: 'Work from anywhere in the world.',
  },
];

export function Careers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white">Join Our Team</h1>
          <p className="mt-4 text-xl text-indigo-100">
            Help us build the future of AI-powered automation
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.id} className="text-center">
                  <Icon className="w-12 h-12 text-indigo-600 mx-auto" />
                  <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-2 text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Open Positions</h2>
            <p className="mt-4 text-xl text-gray-600">
              Join us in our mission to make AI accessible to everyone
            </p>
          </div>

          <div className="space-y-4">
            {positions.map((position) => (
              <div
                key={position.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {position.title}
                    </h3>
                    <p className="text-gray-600">{position.department}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{position.location}</span>
                    <span className="text-sm text-gray-500">{position.type}</span>
                    <button
                      onClick={() => handleApply(position.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/**
 * Handle the "Apply Now" button click.
 * You can modify this function to navigate to an application form or perform another action.
 * @param positionId - The ID of the position being applied for.
 */
function handleApply(positionId: number) {
  // Example: Redirect to an application page with the position ID
  // Replace this with your actual application handling logic
  window.location.href = `/apply/${positionId}`;
}
