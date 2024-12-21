import React from 'react';
import { Scale, FileText, AlertTriangle, Shield, HelpCircle } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';

export function Terms() {
  const sections = [
    {
      title: 'Terms of Use',
      icon: Scale,
      content: [
        {
          subtitle: 'Account Responsibilities',
          items: [
            'Maintain accurate account information',
            'Keep login credentials secure',
            'Report unauthorized access',
            'Comply with age restrictions'
          ]
        },
        {
          subtitle: 'Acceptable Use',
          items: [
            'Use services as intended',
            'Respect intellectual property rights',
            'Follow applicable laws and regulations',
            'Maintain appropriate conduct'
          ]
        }
      ]
    },
    {
      title: 'Service Terms',
      icon: FileText,
      content: [
        {
          subtitle: 'Service Provision',
          items: [
            'Service availability and uptime',
            'Maintenance and updates',
            'Technical support',
            'Feature modifications'
          ]
        },
        {
          subtitle: 'Payment Terms',
          items: [
            'Subscription billing',
            'Refund policy',
            'Payment methods',
            'Price changes'
          ]
        }
      ]
    },
    {
      title: 'Limitations',
      icon: AlertTriangle,
      content: [
        {
          subtitle: 'Liability Limitations',
          items: [
            'Service interruptions',
            'Data loss or corruption',
            'Third-party services',
            'Force majeure events'
          ]
        },
        {
          subtitle: 'Warranty Disclaimers',
          items: [
            'Service fitness',
            'Accuracy of results',
            'Third-party content',
            'Integration compatibility'
          ]
        }
      ]
    },
    {
      title: 'Termination',
      icon: Shield,
      content: [
        {
          subtitle: 'Account Termination',
          items: [
            'Termination conditions',
            'Notice requirements',
            'Data retention',
            'Refund eligibility'
          ]
        },
        {
          subtitle: 'Post-Termination',
          items: [
            'Data export',
            'Account restoration',
            'Surviving provisions',
            'Final billing'
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
          <Scale className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          <p className="mt-4 text-xl text-indigo-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AlertTriangle className="w-8 h-8 text-indigo-600 mb-4" />
            <p className="text-gray-600">
              These Terms of Service ("Terms") govern your access to and use of Send AI Companion's services. 
              By using our services, you agree to be bound by these Terms. If you disagree with any part of 
              the terms, you may not access the service.
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

      {/* Help Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <HelpCircle className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms, please contact us at:
            </p>
            <a
              href="mailto:legal@sendaicompanion.com"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              legal@sendaicompanion.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}