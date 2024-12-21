import React from 'react';
import { Dumbbell, Heart, Brain, Users } from 'lucide-react';
import { UseCaseLayout } from '../../components/use-cases/UseCaseLayout';
import { ChallengesSolutions } from '../../components/use-cases/ChallengesSolutions';
import { UseCaseExample } from '../../components/use-cases/UseCaseExample';
import { Testimonial } from '../../components/use-cases/Testimonial';
import { FAQ } from '../../components/use-cases/FAQ';

const challenges = [
  {
    challenge: "Creating personalized workout plans at scale",
    solution: "AI-powered workout generation based on individual goals and fitness levels"
  },
  {
    challenge: "Tracking member progress effectively",
    solution: "Automated progress tracking and performance analytics"
  },
  {
    challenge: "Maintaining member engagement",
    solution: "Smart notifications and personalized motivation system"
  }
];

const workoutPlanExample = {
  title: "Intelligent Workout Planning",
  description: "Create personalized fitness plans with AI automation",
  steps: [
    {
      title: "Assessment",
      description: "AI analyzes fitness level and goals"
    },
    {
      title: "Plan Generation",
      description: "Custom workout plan creation"
    },
    {
      title: "Progress Tracking",
      description: "Automated performance monitoring"
    },
    {
      title: "Plan Adjustment",
      description: "Dynamic plan optimization"
    }
  ],
  metrics: [
    {
      label: "Member Success",
      value: "85%",
      description: "Goal achievement rate"
    },
    {
      label: "Engagement",
      value: "73%",
      description: "Increased member engagement"
    },
    {
      label: "Retention",
      value: "92%",
      description: "Member retention rate"
    }
  ]
};

const faqItems = [
  {
    question: "How does the AI create personalized workout plans?",
    answer: "Our AI analyzes multiple factors including fitness level, goals, preferences, and any limitations to create tailored workout plans that adapt over time based on progress."
  },
  {
    question: "Can it integrate with fitness tracking devices?",
    answer: "Yes, we support integration with major fitness tracking devices and apps to collect real-time performance data."
  },
  {
    question: "How does progress tracking work?",
    answer: "The system automatically tracks workouts, measures progress against goals, and provides detailed analytics and recommendations."
  }
];

export function Fitness() {
  return (
    <UseCaseLayout
      title="Fitness & Wellness Automation"
      subtitle="Transform fitness experiences with AI-powered personalization"
      backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          {
            icon: Dumbbell,
            title: "Smart Workouts",
            description: "AI-generated personalized plans"
          },
          {
            icon: Heart,
            title: "Health Tracking",
            description: "Comprehensive progress monitoring"
          },
          {
            icon: Brain,
            title: "Intelligent Coaching",
            description: "AI-powered fitness guidance"
          },
          {
            icon: Users,
            title: "Community",
            description: "Enhanced member engagement"
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
      
      <UseCaseExample {...workoutPlanExample} />

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <Testimonial
          quote="The AI workout planning has transformed how we serve our members. We can now provide truly personalized fitness experiences at scale."
          author="Mark Thompson"
          role="Fitness Director"
          company="Elite Fitness Club"
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
        <Testimonial
          quote="Member engagement has skyrocketed since implementing the AI companion. The personalized approach makes a real difference."
          author="Lisa Chen"
          role="Operations Manager"
          company="Wellness Hub"
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
        />
      </div>

      <FAQ items={faqItems} />

      {/* Call to Action */}
      <div className="bg-indigo-600 rounded-xl p-8 text-center mt-16">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Transform Your Fitness Business?
        </h2>
        <p className="text-indigo-100 mb-6">
          Join leading fitness centers in delivering personalized experiences through AI.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Start Free Trial
        </button>
      </div>
    </UseCaseLayout>
  );
}