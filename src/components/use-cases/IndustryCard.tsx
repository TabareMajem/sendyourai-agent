import React from 'react';
import { ArrowRight } from 'lucide-react';

interface IndustryCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
  href: string;
}

export function IndustryCard({ title, description, icon: Icon, benefits, href }: IndustryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-indigo-600 transition-colors p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Icon className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
      <ul className="mt-4 space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
            {benefit}
          </li>
        ))}
      </ul>
      <a
        href={href}
        className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
      >
        Learn More
        <ArrowRight className="ml-2 w-4 h-4" />
      </a>
    </div>
  );
}