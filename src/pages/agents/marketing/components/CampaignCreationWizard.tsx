import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CampaignCreationWizardProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function CampaignCreationWizard({ onSubmit, onCancel }: CampaignCreationWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    goals: [] as string[],
    targetAudience: '',
    channels: [] as string[],
    budget: '',
    duration: '30',
    preferences: {
      tone: 'professional',
      style: 'modern',
      contentTypes: [] as string[]
    }
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Q4 Product Launch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Campaign Goals
              </label>
              <div className="mt-2 space-y-2">
                {[
                  'Increase Brand Awareness',
                  'Generate Leads',
                  'Drive Sales',
                  'Boost Engagement',
                  'Product Launch'
                ].map((goal) => (
                  <label key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal)}
                      onChange={(e) => {
                        const goals = e.target.checked
                          ? [...formData.goals, goal]
                          : formData.goals.filter(g => g !== goal);
                        setFormData({ ...formData, goals });
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Audience
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Describe your target audience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marketing Channels
              </label>
              <div className="mt-2 space-y-2">
                {[
                  'Facebook',
                  'Instagram',
                  'Twitter',
                  'LinkedIn',
                  'Email',
                  'Blog',
                  'Google Ads'
                ].map((channel) => (
                  <label key={channel} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.channels.includes(channel)}
                      onChange={(e) => {
                        const channels = e.target.checked
                          ? [...formData.channels, channel]
                          : formData.channels.filter(c => c !== channel);
                        setFormData({ ...formData, channels });
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{channel}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Campaign Duration (days)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="1"
                max="365"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget (optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content Tone
              </label>
              <select
                value={formData.preferences.tone}
                onChange={(e) => setFormData({
                  ...formData,
                  preferences: { ...formData.preferences, tone: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Visual Style
              </label>
              <select
                value={formData.preferences.style}
                onChange={(e) => setFormData({
                  ...formData,
                  preferences: { ...formData.preferences, style: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="modern">Modern</option>
                <option value="minimalist">Minimalist</option>
                <option value="bold">Bold</option>
                <option value="classic">Classic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content Types
              </label>
              <div className="mt-2 space-y-2">
                {[
                  'Images',
                  'Videos',
                  'Carousel Posts',
                  'Stories',
                  'Blog Posts',
                  'Infographics'
                ].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferences.contentTypes.includes(type)}
                      onChange={(e) => {
                        const contentTypes = e.target.checked
                          ? [...formData.preferences.contentTypes, type]
                          : formData.preferences.contentTypes.filter(t => t !== type);
                        setFormData({
                          ...formData,
                          preferences: { ...formData.preferences, contentTypes }
                        });
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Create Marketing Campaign</h2>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {['Campaign Details', 'Audience & Channels', 'Schedule & Budget', 'Preferences'].map((label, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? 'bg-green-500' :
                    step === index + 1 ? 'bg-indigo-600' :
                    'bg-gray-200'
                  } text-white font-medium`}>
                    {step > index + 1 ? '✓' : index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-24 h-1 ${
                      step > index + 1 ? 'bg-green-500' :
                      'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['Campaign Details', 'Audience & Channels', 'Schedule & Budget', 'Preferences'].map((label, index) => (
                <span key={index} className="text-xs text-gray-500">{label}</span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={step === 1 ? onCancel : handleBack}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {step === 4 ? 'Create Campaign' : 'Next'}
              {step < 4 && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}