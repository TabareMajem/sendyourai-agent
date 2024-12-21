import React from 'react';
import { Stethoscope, Clock, BarChart2, Shield } from 'lucide-react';
import { UseCaseLayout } from '../../components/use-cases/UseCaseLayout';
import { ChallengesSolutions } from '../../components/use-cases/ChallengesSolutions';
import { UseCaseExample } from '../../components/use-cases/UseCaseExample';
import { Testimonial } from '../../components/use-cases/Testimonial';
import { FAQ } from '../../components/use-cases/FAQ';

const challenges = [
  {
    challenge: "Managing high volume of patient appointments and follow-ups manually",
    solution: "Automated scheduling system with AI-powered prioritization and smart reminders"
  },
  {
    challenge: "Ensuring consistent patient communication and engagement",
    solution: "Personalized automated communication flows with context-aware messaging"
  },
  {
    challenge: "Tracking and managing patient health records efficiently",
    solution: "Intelligent record management with automated updates and smart categorization"
  }
];

const patientFollowUpExample = {
  title: "Automated Patient Follow-up System",
  description: "Streamline patient care with intelligent follow-up management",
  steps: [
    {
      title: "Initial Assessment",
      description: "AI analyzes patient visit data and determines follow-up requirements"
    },
    {
      title: "Scheduling",
      description: "Automated appointment scheduling based on care requirements"
    },
    {
      title: "Communication",
      description: "Smart reminders and personalized health tips sent to patients"
    },
    {
      title: "Monitoring",
      description: "Continuous tracking of patient responses and engagement"
    }
  ],
  metrics: [
    {
      label: "Efficiency Increase",
      value: "85%",
      description: "Reduction in manual follow-up management time"
    },
    {
      label: "Patient Satisfaction",
      value: "92%",
      description: "Positive feedback on automated communication"
    },
    {
      label: "Appointment Adherence",
      value: "78%",
      description: "Increase in follow-up appointment attendance"
    }
  ]
};

const faqItems = [
  {
    question: "How does the AI ensure HIPAA compliance?",
    answer: "Our AI system is built with HIPAA compliance at its core, implementing end-to-end encryption, secure data handling, and strict access controls. All patient data is processed in compliance with healthcare regulations."
  },
  {
    question: "Can the system integrate with existing EMR systems?",
    answer: "Yes, our platform offers seamless integration with major EMR systems through secure APIs, ensuring smooth data flow while maintaining compliance and security."
  },
  {
    question: "How does the AI prioritize patient follow-ups?",
    answer: "The AI uses multiple factors including condition severity, treatment plan, historical data, and physician input to create intelligent prioritization algorithms for patient follow-ups."
  }
];

export function Healthcare() {
  return (
    <UseCaseLayout
      title="Healthcare Automation Solutions"
      subtitle="Enhance patient care and streamline medical workflows with AI-powered automation"
      backgroundImage="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
    >
      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          {
            icon: Clock,
            title: "Smart Scheduling",
            description: "AI-powered appointment management and reminders"
          },
          {
            icon: Stethoscope,
            title: "Patient Care",
            description: "Automated follow-ups and care plan tracking"
          },
          {
            icon: BarChart2,
            title: "Analytics",
            description: "Comprehensive healthcare metrics and insights"
          },
          {
            icon: Shield,
            title: "Compliance",
            description: "HIPAA-compliant data handling and security"
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
      
      <UseCaseExample {...patientFollowUpExample} />

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <Testimonial
          quote="The AI Companion has transformed how we manage patient follow-ups. Our staff saves hours each day, and patient satisfaction has significantly improved."
          author="Dr. Sarah Chen"
          role="Medical Director"
          company="Metropolitan Health Center"
          image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
        <Testimonial
          quote="Implementation was smooth, and the results were immediate. Our patient engagement rates have increased dramatically."
          author="James Wilson"
          role="Healthcare Operations Manager"
          company="City General Hospital"
          image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
      </div>

      <FAQ items={faqItems} />

      {/* Call to Action */}
      <div className="bg-indigo-600 rounded-xl p-8 text-center mt-16">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Transform Your Healthcare Practice?
        </h2>
        <p className="text-indigo-100 mb-6">
          Join leading healthcare providers in delivering better patient care through AI automation.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Get Started Free
        </button>
      </div>
    </UseCaseLayout>
  );
}