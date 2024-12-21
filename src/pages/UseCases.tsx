import React from 'react';
import {
  Users,
  GraduationCap,
  Stethoscope,
  BadgeDollarSign,
  HeadsetIcon,
  Brain,
  Plane,
  Palette,
  Building2,
  BarChart3
} from 'lucide-react';
import { UseCaseLayout } from '../components/use-cases/UseCaseLayout';
import { IndustryCard } from '../components/use-cases/IndustryCard';

const industries = [
  {
    title: 'Human Resources',
    description: 'Streamline HR processes and enhance employee experience with AI-powered automation.',
    icon: Users,
    benefits: [
      'Automated onboarding workflows',
      'Smart performance review scheduling',
      'Employee engagement monitoring'
    ],
    href: '/use-cases/hr'
  },
  {
    title: 'Education',
    description: 'Transform learning experiences with intelligent automation and personalized support.',
    icon: GraduationCap,
    benefits: [
      'Automated assignment tracking',
      'Personalized learning paths',
      'Smart progress monitoring'
    ],
    href: '/use-cases/education'
  },
  {
    title: 'Healthcare',
    description: 'Enhance patient care and streamline medical workflows with AI assistance.',
    icon: Stethoscope,
    benefits: [
      'Automated appointment scheduling',
      'Patient follow-up management',
      'Health record organization'
    ],
    href: '/use-cases/healthcare'
  },
  {
    title: 'Finance',
    description: 'Optimize financial operations and compliance with intelligent automation.',
    icon: BadgeDollarSign,
    benefits: [
      'Automated invoice processing',
      'Smart fraud detection',
      'Compliance monitoring'
    ],
    href: '/use-cases/finance'
  },
  {
    title: 'Customer Support',
    description: 'Deliver exceptional customer service with AI-powered automation.',
    icon: HeadsetIcon,
    benefits: [
      'Automated ticket routing',
      'Smart response suggestions',
      'Customer sentiment analysis'
    ],
    href: '/use-cases/customer-support'
  },
  {
    title: 'Personal Productivity',
    description: 'Boost individual and team productivity with smart automation.',
    icon: Brain,
    benefits: [
      'Intelligent task management',
      'Meeting scheduling automation',
      'Smart reminders'
    ],
    href: '/use-cases/productivity'
  },
  {
    title: 'Hospitality & Travel',
    description: 'Enhance guest experiences with automated service management.',
    icon: Plane,
    benefits: [
      'Automated booking management',
      'Guest communication',
      'Service personalization'
    ],
    href: '/use-cases/hospitality'
  },
  {
    title: 'Creative & Entertainment',
    description: 'Streamline creative workflows with AI-powered automation.',
    icon: Palette,
    benefits: [
      'Content scheduling',
      'Asset management',
      'Workflow automation'
    ],
    href: '/use-cases/creative'
  },
  {
    title: 'CRM Enhancement',
    description: 'Optimize customer relationships with intelligent automation.',
    icon: Building2,
    benefits: [
      'Lead nurturing automation',
      'Customer journey tracking',
      'Engagement analytics'
    ],
    href: '/use-cases/crm'
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Stay ahead with automated monitoring and alerts.',
    icon: BarChart3,
    benefits: [
      'System performance monitoring',
      'Automated alerts',
      'Trend analysis'
    ],
    href: '/use-cases/monitoring'
  }
];

export function UseCases() {
  return (
    <UseCaseLayout
      title="Transform Your Industry"
      subtitle="Discover how Send AI Companion revolutionizes workflows across different sectors"
      backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Solutions for Every Industry
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Whether you're streamlining HR processes or enhancing customer engagement,
          our AI Companion adapts to your unique needs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => (
          <IndustryCard key={index} {...industry} />
        ))}
      </div>
    </UseCaseLayout>
  );
}