import React from 'react';
import { Building2, Camera, Calendar, MessageSquare } from 'lucide-react';
import { UseCaseLayout } from '../../components/use-cases/UseCaseLayout';
import { ChallengesSolutions } from '../../components/use-cases/ChallengesSolutions';
import { UseCaseExample } from '../../components/use-cases/UseCaseExample';
import { Testimonial } from '../../components/use-cases/Testimonial';
import { FAQ } from '../../components/use-cases/FAQ';

const challenges = [
  {
    challenge: "Time-consuming property listing management",
    solution: "Automated listing creation and distribution with AI-enhanced descriptions"
  },
  {
    challenge: "Inefficient showing scheduling",
    solution: "Smart scheduling system with virtual tour integration"
  },
  {
    challenge: "Manual market analysis",
    solution: "AI-powered market analysis and pricing recommendations"
  }
];

const listingExample = {
  title: "Intelligent Listing Management",
  description: "Streamline property listings with AI automation",
  steps: [
    {
      title: "Content Generation",
      description: "AI creates compelling property descriptions"
    },
    {
      title: "Photo Enhancement",
      description: "Automatic photo optimization and virtual staging"
    },
    {
      title: "Distribution",
      description: "Multi-channel listing distribution"
    },
    {
      title: "Analytics",
      description: "Real-time performance tracking"
    }
  ],
  metrics: [
    {
      label: "Time Saved",
      value: "80%",
      description: "Reduction in listing creation time"
    },
    {
      label: "Reach",
      value: "3x",
      description: "Increase in listing visibility"
    },
    {
      label: "Engagement",
      value: "65%",
      description: "Higher engagement rate"
    }
  ]
};

const faqItems = [
  {
    question: "How does the AI create property descriptions?",
    answer: "Our AI analyzes property features, photos, and market data to generate unique, engaging, and accurate descriptions that highlight key selling points."
  },
  {
    question: "Can it integrate with MLS systems?",
    answer: "Yes, we offer seamless integration with major MLS systems for automated listing syndication and updates."
  },
  {
    question: "How does virtual tour scheduling work?",
    answer: "The system automatically manages virtual tour bookings, sends confirmations, and follows up with potential buyers."
  }
];

export function RealEstate() {
  return (
    <UseCaseLayout
      title="Real Estate Automation Solutions"
      subtitle="Transform property management and sales with AI-powered automation"
      backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
    >
      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          {
            icon: Building2,
            title: "Listing Management",
            description: "Automated property listing creation"
          },
          {
            icon: Camera,
            title: "Virtual Tours",
            description: "Interactive virtual showings"
          },
          {
            icon: Calendar,
            title: "Smart Scheduling",
            description: "Automated showing management"
          },
          {
            icon: MessageSquare,
            title: "Lead Management",
            description: "AI-powered lead nurturing"
          }
        ].map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <ChallengesSolutions challenges={challenges} />
      
      <UseCaseExample {...listingExample} />

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <Testimonial
          quote="The AI-powered listing creation has saved us countless hours and improved our property descriptions dramatically."
          author="Jennifer Martinez"
          role="Real Estate Broker"
          company="Premier Properties"
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
        <Testimonial
          quote="Virtual tours and automated scheduling have revolutionized how we show properties. Our agents are more productive than ever."
          author="Robert Wilson"
          role="Sales Director"
          company="City Real Estate"
          image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
      </div>

      <FAQ items={faqItems} />

      {/* Call to Action */}
      <div className="bg-indigo-600 rounded-xl p-8 text-center mt-16">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Transform Your Real Estate Business?
        </h2>
        <p className="text-indigo-100 mb-6">
          Join successful real estate professionals using AI to close more deals.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Start Free Trial
        </button>
      </div>
    </UseCaseLayout>
  );
}