import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Transform Your Business with{' '}
            <span className="text-indigo-600">Intelligent AI Automation</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline operations, enhance productivity, and drive growth with SendYourAI's cutting-edge solutions.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started Free
            </Link>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Image/Animation */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl"></div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="AI Automation Platform"
            className="relative rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}