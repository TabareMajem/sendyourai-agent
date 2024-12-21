import React from 'react';
import { ArrowRight } from 'lucide-react';

interface UseCaseLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export function UseCaseLayout({ children, title, subtitle, backgroundImage }: UseCaseLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative py-24 bg-gradient-to-r from-indigo-600 to-indigo-800 overflow-hidden"
        style={backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.85), rgba(67, 56, 202, 0.85)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </div>
    </div>
  );
}