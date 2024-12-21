import React from 'react';
import { Newspaper, Award, Calendar } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';

const pressReleases = [
  {
    id: 1,
    title: 'Send AI Companion Raises $10M Series A',
    date: '2024-02-15',
    summary: 'Funding will accelerate development of AI-powered workflow automation platform.',
    link: '#'
  },
  {
    id: 2,
    title: 'Launch of Enterprise Features',
    date: '2024-01-20',
    summary: 'New enterprise-grade features for large organizations.',
    link: '#'
  }
];

const mediaKit = {
  logos: [
    { name: 'Primary Logo', format: 'PNG, SVG', size: '2.5 MB' },
    { name: 'Icon Only', format: 'PNG, SVG', size: '1.2 MB' },
    { name: 'Dark Version', format: 'PNG, SVG', size: '2.3 MB' }
  ],
  brandGuidelines: {
    colors: ['#4F46E5', '#10B981', '#6366F1'],
    typography: 'Inter, sans-serif'
  }
};

export function Press() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white">Press & Media</h1>
          <p className="mt-4 text-xl text-indigo-100">
            Latest news and resources for the press
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Press Releases</h2>
          </div>

          <div className="space-y-8">
            {pressReleases.map((release) => (
              <div
                key={release.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {release.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{release.summary}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{release.date}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href={release.link}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Media Kit</h2>
            <p className="mt-4 text-xl text-gray-600">
              Download official logos and brand assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Logos</h3>
              <div className="space-y-4">
                {mediaKit.logos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{logo.name}</p>
                      <p className="text-sm text-gray-500">
                        {logo.format} • {logo.size}
                      </p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Brand Guidelines
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Colors</h4>
                  <div className="flex space-x-4">
                    {mediaKit.brandGuidelines.colors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-12 h-12 rounded-lg mb-2"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm text-gray-600">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Typography
                  </h4>
                  <p className="text-gray-600">{mediaKit.brandGuidelines.typography}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Press Contact</h2>
          <div className="inline-block bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-gray-900">Media Inquiries</p>
            <a
              href="mailto:press@sendaicompanion.com"
              className="mt-2 text-indigo-600 hover:text-indigo-700"
            >
              press@sendaicompanion.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}