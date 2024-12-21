import React, { useState } from 'react';
import { Check, X, HelpCircle, Bot, Zap, Users, Puzzle, MessageSquare, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';

const plans = [
  {
    name: 'Free',
    description: 'Perfect for trying out our features',
    price: {
      monthly: 0,
      annually: 0
    },
    features: [
      { name: 'Up to 5 workflows', included: true },
      { name: 'Basic integrations', included: true },
      { name: 'Community support', included: true },
      { name: '1 team member', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'API access', included: false },
      { name: 'Custom workflows', included: false },
      { name: 'Priority support', included: false },
      { name: 'Advanced security', included: false },
      { name: 'Custom integrations', included: false }
    ],
    cta: 'Get Started Free',
    highlight: false
  },
  {
    name: 'Pro',
    description: 'Everything you need for a growing business',
    price: {
      monthly: 49,
      annually: 39
    },
    features: [
      { name: 'Unlimited workflows', included: true },
      { name: 'Advanced integrations', included: true },
      { name: 'Priority support', included: true },
      { name: 'Up to 10 team members', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'API access', included: true },
      { name: 'Custom workflows', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced security', included: true },
      { name: 'Custom integrations', included: false }
    ],
    cta: 'Start Free Trial',
    highlight: true
  },
  {
    name: 'Enterprise',
    description: 'Advanced features for large organizations',
    price: {
      monthly: null,
      annually: null
    },
    features: [
      { name: 'Unlimited workflows', included: true },
      { name: 'Advanced integrations', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Custom analytics', included: true },
      { name: 'API access', included: true },
      { name: 'Custom workflows', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced security', included: true },
      { name: 'Custom integrations', included: true }
    ],
    cta: 'Contact Sales',
    highlight: false
  }
];

const faqs = [
  {
    question: 'How does the free trial work?',
    answer: 'You can try our Pro plan free for 14 days. No credit card required. Cancel anytime during the trial period.'
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH payments, and wire transfers for Enterprise plans.'
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No, all our plans are month-to-month or annual. You can cancel at any time.'
  }
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <div className="relative max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            type="button"
            className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual(!isAnnual)}
            style={{ backgroundColor: isAnnual ? '#4F46E5' : '#D1D5DB' }}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isAnnual ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
            Annual
            <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.highlight
                  ? 'border-indigo-600 shadow-indigo-100'
                  : 'border-gray-200'
              } bg-white p-8 shadow-lg ${plan.highlight ? 'shadow-xl' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.description}</p>
                <p className="mt-6">
                  {plan.price.monthly === null ? (
                    <span className="text-4xl font-bold text-gray-900">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ${isAnnual ? plan.price.annually : plan.price.monthly}
                      </span>
                      <span className="text-base font-medium text-gray-500">/month</span>
                    </>
                  )}
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className="ml-3 text-gray-600">{feature.name}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-lg px-4 py-2 text-center text-sm font-semibold ${
                  plan.highlight
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              All plans include these powerful features
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Bot,
                title: 'AI-Powered Automation',
                description: 'Let AI handle your workflows while you focus on what matters most'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized performance with rapid workflow execution'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Work together seamlessly with shared workflows and permissions'
              },
              {
                icon: Puzzle,
                title: 'Integrations',
                description: 'Connect with your favorite tools and services'
              },
              {
                icon: MessageSquare,
                title: '24/7 Support',
                description: 'Get help when you need it, no matter the time'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-grade security to protect your data'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <feature.icon className="h-8 w-8 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <HelpCircle className="h-5 w-5 text-indigo-600 mr-2" />
                  {faq.question}
                </h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                Get started
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}