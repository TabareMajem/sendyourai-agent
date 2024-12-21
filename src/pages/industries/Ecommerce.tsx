import React from 'react';
import { ShoppingBag, MessageSquare, TrendingUp, Zap } from 'lucide-react';
import { UseCaseLayout } from '../../components/use-cases/UseCaseLayout';
import { ChallengesSolutions } from '../../components/use-cases/ChallengesSolutions';
import { UseCaseExample } from '../../components/use-cases/UseCaseExample';
import { Testimonial } from '../../components/use-cases/Testimonial';
import { FAQ } from '../../components/use-cases/FAQ';

const challenges = [
  {
    challenge: "Managing high volume of customer inquiries",
    solution: "AI-powered chatbot with personalized responses"
  },
  {
    challenge: "Complex inventory management",
    solution: "Automated inventory tracking and predictive restocking"
  },
  {
    challenge: "Personalization at scale",
    solution: "AI-driven product recommendations and customer segmentation"
  }
];

const customerServiceExample = {
  title: "Intelligent Customer Service",
  description: "Enhance customer support with AI-powered automation",
  steps: [
    {
      title: "Query Analysis",
      description: "AI analyzes customer inquiries in real-time"
    },
    {
      title: "Smart Routing",
      description: "Automatic routing to appropriate department"
    },
    {
      title: "Response Generation",
      description: "AI-generated personalized responses"
    },
    {
      title: "Follow-up",
      description: "Automated satisfaction surveys and follow-ups"
    }
  ],
  metrics: [
    {
      label: "Response Time",
      value: "90%",
      description: "Reduction in response time"
    },
    {
      label: "Resolution Rate",
      value: "85%",
      description: "First contact resolution rate"
    },
    {
      label: "Satisfaction",
      value: "95%",
      description: "Customer satisfaction score"
    }
  ]
};

const faqItems = [
  {
    question: "How does the AI handle complex customer queries?",
    answer: "Our AI system uses advanced natural language processing to understand context and intent, routing complex queries to human agents when needed while handling routine inquiries automatically."
  },
  {
    question: "Can it integrate with our existing e-commerce platform?",
    answer: "Yes, we offer seamless integration with major e-commerce platforms including Shopify, WooCommerce, and custom solutions through our API."
  },
  {
    question: "How does the inventory management system work?",
    answer: "The system uses machine learning to predict demand patterns and automatically manages stock levels, considering factors like seasonality and historical data."
  }
];

export function Ecommerce() {
  return (
    <UseCaseLayout
      title="E-commerce Automation Solutions"
      subtitle="Transform your online store with AI-powered automation"
      backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          {
            icon: ShoppingBag,
            title: "Smart Inventory",
            description: "AI-powered inventory management"
          },
          {
            icon: MessageSquare,
            title: "Customer Support",
            description: "Automated customer service"
          },
          {
            icon: TrendingUp,
            title: "Sales Analytics",
            description: "Real-time sales insights"
          },
          {
            icon: Zap,
            title: "Quick Response",
            description: "Instant customer engagement"
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
      
      <UseCaseExample {...customerServiceExample} />

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <Testimonial
          quote="The AI automation has transformed our customer service. We're handling 3x the volume with the same team size."
          author="Emily Rodriguez"
          role="Customer Success Manager"
          company="Fashion Retail Co."
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
        <Testimonial
          quote="Our inventory management is now completely automated. Stock-outs are down 80% and customer satisfaction is at an all-time high."
          author="David Kim"
          role="Operations Director"
          company="Global E-mart"
          image="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
      </div>

      <FAQ items={faqItems} />

      {/* Call to Action */}
      <div className="bg-indigo-600 rounded-xl p-8 text-center mt-16">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Revolutionize Your E-commerce Business?
        </h2>
        <p className="text-indigo-100 mb-6">
          Join successful online retailers using AI to boost sales and customer satisfaction.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Start Free Trial
        </button>
      </div>
    </UseCaseLayout>
  );
}