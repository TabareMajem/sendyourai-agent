import React from 'react';
import {
  Bot,
  Zap,
  GitBranch,
  Puzzle,
  BrainCircuit,
  Shield,
  Laptop,
  ArrowRight,
  CheckCircle,
  Workflow,
  Settings,
  Lock,
  Gauge,
  Network,
  FileCode,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';

const features = [
  {
    category: "AI Capabilities",
    items: [
      {
        icon: BrainCircuit,
        title: "Proactive AI Agents",
        description: "AI that anticipates needs and takes action before issues arise, powered by advanced machine learning algorithms.",
        benefits: [
          "Autonomous decision-making",
          "Predictive problem-solving",
          "Smart task prioritization"
        ]
      },
      {
        icon: Workflow,
        title: "Intelligent Workflows",
        description: "Create sophisticated automation flows with our intuitive drag-and-drop interface.",
        benefits: [
          "Visual workflow builder",
          "Conditional logic handling",
          "Error handling and recovery"
        ]
      },
      {
        icon: Network,
        title: "AI-Driven Insights",
        description: "Leverage advanced analytics and AI to gain actionable insights from your data.",
        benefits: [
          "Real-time analytics",
          "Trend prediction",
          "Performance optimization"
        ]
      }
    ]
  },
  {
    category: "Integration & Automation",
    items: [
      {
        icon: Puzzle,
        title: "Seamless Integrations",
        description: "Connect with your favorite tools and services through our extensive integration network.",
        benefits: [
          "Zapier integration",
          "API connectivity",
          "Custom webhooks"
        ]
      },
      {
        icon: FileCode,
        title: "Custom Actions",
        description: "Build and deploy custom actions to extend platform capabilities.",
        benefits: [
          "Custom script support",
          "API endpoint creation",
          "Webhook management"
        ]
      },
      {
        icon: MessageSquare,
        title: "Communication Hub",
        description: "Centralize all your communication channels in one place.",
        benefits: [
          "Multi-channel support",
          "Automated responses",
          "Message scheduling"
        ]
      }
    ]
  },
  {
    category: "Security & Performance",
    items: [
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade security measures to protect your data and workflows.",
        benefits: [
          "End-to-end encryption",
          "Role-based access control",
          "Audit logging"
        ]
      },
      {
        icon: Lock,
        title: "Compliance",
        description: "Meet industry standards and regulatory requirements.",
        benefits: [
          "GDPR compliance",
          "HIPAA compliance",
          "SOC 2 certification"
        ]
      },
      {
        icon: Gauge,
        title: "High Performance",
        description: "Lightning-fast execution and reliable uptime.",
        benefits: [
          "99.9% uptime guarantee",
          "Global CDN",
          "Auto-scaling"
        ]
      }
    ]
  }
];

export function Features() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Powerful Features for Modern Workflows
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Discover how Send AI Companion transforms your workflow with cutting-edge AI technology and seamless automation.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {section.items.map((feature, index) => (
                  <div
                    key={index}
                    className="relative bg-white p-8 border border-gray-200 rounded-xl hover:border-indigo-600 transition-colors"
                  >
                    <div className="absolute -top-4 left-4">
                      <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-xl shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-4 text-gray-600">
                        {feature.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="ml-3 text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              See It in Action
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Watch how Send AI Companion transforms your workflow
            </p>
            <div className="mt-10">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Watch Demo
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  <span className="block">Ready to get started?</span>
                  <span className="block">Start your free trial today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-200">
                  Experience the power of AI-driven automation risk-free for 14 days.
                </p>
                <a
                  href="#"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Sign up for free
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}