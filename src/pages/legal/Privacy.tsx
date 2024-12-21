import React from 'react';
import { Shield, Lock, UserCheck, FileText, AlertCircle } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';

export function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        {
          subtitle: 'Personal Information',
          items: [
            'Name and contact information',
            'Account credentials',
            'Payment information',
            'Company details'
          ]
        },
        {
          subtitle: 'Usage Data',
          items: [
            'Workflow configurations',
            'Integration settings',
            'Performance metrics',
            'User preferences'
          ]
        },
        {
          subtitle: 'Technical Data',
          items: [
            'IP address',
            'Browser type and version',
            'Device information',
            'Cookie data'
          ]
        }
      ]
    },
    {
      title: 'How We Use Your Data',
      icon: Shield,
      content: [
        {
          subtitle: 'Service Provision',
          items: [
            'Providing and maintaining our services',
            'Processing your transactions',
            'Managing your account',
            'Sending service notifications'
          ]
        },
        {
          subtitle: 'Service Improvement',
          items: [
            'Analyzing usage patterns',
            'Debugging and fixing issues',
            'Developing new features',
            'Enhancing user experience'
          ]
        }
      ]
    },
    {
      title: 'Data Protection',
      icon: Lock,
      content: [
        {
          subtitle: 'Security Measures',
          items: [
            'End-to-end encryption',
            'Regular security audits',
            'Access controls',
            'Data backup and recovery'
          ]
        },
        {
          subtitle: 'Compliance',
          items: [
            'GDPR compliance',
            'CCPA compliance',
            'HIPAA compliance (where applicable)',
            'Industry standards adherence'
          ]
        }
      ]
    },
    {
      title: 'Your Rights',
      icon: UserCheck,
      content: [
        {
          subtitle: 'Data Control',
          items: [
            'Access your data',
            'Correct inaccurate data',
            'Delete your data',
            'Export your data'
          ]
        },
        {
          subtitle: 'Preferences',
          items: [
            'Opt-out options',
            'Communication preferences',
            'Cookie settings',
            'Marketing choices'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 text-xl text-indigo-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AlertCircle className="w-8 h-8 text-indigo-600 mb-4" />
            <p className="text-gray-600">
              At Send AI Companion, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our service. Please read this privacy policy 
              carefully. If you do not agree with the terms of this privacy policy, please do not access the service.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <div key={index}>
                <div className="flex items-center space-x-3 mb-8">
                  <section.icon className="w-8 h-8 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex} className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-3">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <a
              href="mailto:privacy@sendaicompanion.com"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              privacy@sendaicompanion.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}