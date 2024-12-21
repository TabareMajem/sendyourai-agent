import React from 'react';
import { Users, CheckCircle, Calendar, Brain } from 'lucide-react';
import { UseCaseLayout } from '../../components/use-cases/UseCaseLayout';
import { ChallengesSolutions } from '../../components/use-cases/ChallengesSolutions';
import { UseCaseExample } from '../../components/use-cases/UseCaseExample';
import { Testimonial } from '../../components/use-cases/Testimonial';
import { FAQ } from '../../components/use-cases/FAQ';

const challenges = [
  {
    challenge: "Time-consuming manual onboarding processes",
    solution: "Automated onboarding workflows with AI-driven document processing"
  },
  {
    challenge: "Inefficient performance review scheduling",
    solution: "Smart scheduling system with automated reminders and feedback collection"
  },
  {
    challenge: "Complex employee data management",
    solution: "Centralized employee database with AI-powered insights and analytics"
  }
];

const onboardingExample = {
  title: "Automated Employee Onboarding",
  description: "Streamline the employee onboarding process with intelligent automation",
  steps: [
    {
      title: "Document Collection",
      description: "Automated document requests and validation"
    },
    {
      title: "System Setup",
      description: "Automatic account creation and access provisioning"
    },
    {
      title: "Training Assignment",
      description: "Personalized training programs based on role"
    },
    {
      title: "Progress Tracking",
      description: "Real-time monitoring of onboarding progress"
    }
  ],
  metrics: [
    {
      label: "Time Saved",
      value: "75%",
      description: "Reduction in onboarding processing time"
    },
    {
      label: "Accuracy",
      value: "99%",
      description: "Document processing accuracy"
    },
    {
      label: "Satisfaction",
      value: "92%",
      description: "Employee satisfaction rate"
    }
  ]
};

const faqItems = [
  {
    question: "How does the AI ensure data privacy?",
    answer: "Our AI system is built with privacy-first architecture, implementing end-to-end encryption and strict access controls. All data processing complies with GDPR and other relevant regulations."
  },
  {
    question: "Can it integrate with existing HR systems?",
    answer: "Yes, our platform offers seamless integration with major HR management systems through secure APIs and pre-built connectors."
  },
  {
    question: "How long does implementation take?",
    answer: "Typical implementation takes 2-4 weeks, depending on your organization's size and complexity. We provide full support throughout the process."
  }
];

export function HumanResources() {
  return (
    <UseCaseLayout
      title="HR Process Automation"
      subtitle="Transform your HR operations with AI-powered automation"
      backgroundImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          {
            icon: Users,
            title: "Employee Management",
            description: "Streamlined employee data management"
          },
          {
            icon: CheckCircle,
            title: "Automated Onboarding",
            description: "Efficient employee onboarding process"
          },
          {
            icon: Calendar,
            title: "Smart Scheduling",
            description: "AI-powered review scheduling"
          },
          {
            icon: Brain,
            title: "Intelligent Insights",
            description: "Data-driven HR analytics"
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
      
      <UseCaseExample {...onboardingExample} />

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <Testimonial
          quote="The AI Companion has revolutionized our HR processes. What used to take days now takes hours, and our team can focus on more strategic tasks."
          author="Sarah Johnson"
          role="HR Director"
          company="Global Tech Solutions"
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
        <Testimonial
          quote="Implementation was smooth, and the results were immediate. Our onboarding process is now completely automated and error-free."
          author="Michael Chen"
          role="Head of People Operations"
          company="Innovate Inc."
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
      </div>

      <FAQ items={faqItems} />

      {/* Call to Action */}
      <div className="bg-indigo-600 rounded-xl p-8 text-center mt-16">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Transform Your HR Operations?
        </h2>
        <p className="text-indigo-100 mb-6">
          Join leading companies in delivering better HR experiences through AI automation.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Get Started Free
        </button>
      </div>
    </UseCaseLayout>
  );
}