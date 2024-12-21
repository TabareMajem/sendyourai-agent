import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  companyLogo?: string;
}

export function Testimonial({
  quote,
  author,
  role,
  company,
  image,
  companyLogo
}: TestimonialProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={image}
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{author}</h4>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
        {companyLogo && (
          <img
            src={companyLogo}
            alt={company}
            className="h-8 ml-auto"
          />
        )}
      </div>
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-indigo-100" />
        <p className="relative z-10 text-gray-600 italic">"{quote}"</p>
      </div>
    </div>
  );
}