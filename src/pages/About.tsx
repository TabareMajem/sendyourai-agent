import React from 'react';
import { Bot, Heart, Target, Shield, Zap, Users, Mail, Building } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We put our customers at the heart of everything we do, ensuring their success is our success.'
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'We constantly push boundaries to deliver cutting-edge AI solutions.'
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'We maintain the highest standards of security and ethical AI practices.'
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'We strive to make complex workflows simple and efficient.'
  }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Former AI Research Lead at Tech Giants, passionate about making AI accessible to businesses.'
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: '15+ years in AI and automation, previously founded two successful tech startups.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Product leader with expertise in AI-driven solutions and user experience.'
  },
  {
    name: 'David Kim',
    role: 'Head of AI Research',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Ph.D. in Machine Learning, leading our AI innovation and research initiatives.'
  }
];

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bot className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Mission
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            To empower businesses with intelligent automation, making AI accessible and practical for everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-6 text-lg text-gray-600">
                Founded in 2023, Send AI Companion emerged from a simple observation: businesses needed a better way to 
                harness the power of AI. Our founders, with decades of combined experience in AI and automation, set out 
                to create a solution that would make AI truly accessible and practical for businesses of all sizes.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Today, we're proud to help thousands of businesses automate their workflows and leverage AI to achieve 
                their goals. Our platform continues to evolve, driven by our commitment to innovation and our users' success.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Team collaboration"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8 text-center">
                <value.icon className="w-12 h-12 text-indigo-600 mx-auto" />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-4 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-xl text-gray-600">
              The passionate people behind Send AI Companion
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute inset-0 rounded-full ring-4 ring-indigo-600 ring-opacity-0 hover:ring-opacity-100 transition-all duration-300" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-indigo-600 font-medium">{member.role}</p>
                <p className="mt-2 text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Mail className="w-8 h-8 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">General Inquiries</h3>
              <p className="mt-2 text-gray-600">info@sendaicompanion.com</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Users className="w-8 h-8 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Careers</h3>
              <p className="mt-2 text-gray-600">careers@sendaicompanion.com</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Building className="w-8 h-8 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Press</h3>
              <p className="mt-2 text-gray-600">press@sendaicompanion.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}