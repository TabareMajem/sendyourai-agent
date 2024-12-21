import React, { useState } from 'react';
import {
  MessageSquare,
  Book,
  Mail,
  Phone,
  Clock,
  Send,
  HelpCircle,
  Users,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';

const supportCategories = [
  {
    title: 'Technical Support',
    description: 'Get help with technical issues or platform functionality',
    icon: MessageSquare
  },
  {
    title: 'Account & Billing',
    description: 'Questions about your account or subscription',
    icon: Users
  },
  {
    title: 'Feature Requests',
    description: 'Suggest new features or improvements',
    icon: FileText
  }
];

const resources = [
  {
    title: 'Knowledge Base',
    description: 'Find answers in our comprehensive documentation',
    icon: Book,
    link: '#'
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users and share experiences',
    icon: Users,
    link: '#'
  },
  {
    title: 'Video Tutorials',
    description: 'Learn through step-by-step video guides',
    icon: FileText,
    link: '#'
  }
];

export function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white">Help & Support</h1>
          <p className="mt-4 text-xl text-indigo-100">
            We're here to help you succeed with Send AI Companion
          </p>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {supportCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8">
                <category.icon className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Support</option>
                    <option value="account">Account & Billing</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>

                {submitSuccess && (
                  <div className="mt-4 p-4 bg-green-50 rounded-md">
                    <p className="text-green-800">
                      Thank you for your message. We'll get back to you soon!
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Resources */}
            <div className="space-y-12">
              {/* Direct Contact */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Direct Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email Support</p>
                      <a href="mailto:support@sendaicompanion.com" className="text-indigo-600 hover:text-indigo-700">
                        support@sendaicompanion.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Phone Support</p>
                      <p className="text-gray-600">+1 (888) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday, 9AM - 6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Help Resources</h3>
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.link}
                      className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-indigo-600 transition-colors"
                    >
                      <resource.icon className="w-6 h-6 text-indigo-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{resource.title}</p>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 ml-auto" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Banner */}
      <section className="bg-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Our Commitment to You</h2>
          <p className="text-indigo-100">
            We aim to respond to all inquiries within 24 hours during business days.
            For urgent matters, please use our phone support.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}