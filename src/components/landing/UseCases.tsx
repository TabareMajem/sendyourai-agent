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
  BarChart3,
  DollarSign
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function UseCases() {
  const { t } = useTranslation('landing');

  const industries = [
    {
      title: t('useCases.industries.hr.title'),
      description: t('useCases.industries.hr.description'),
      icon: Users,
      benefits: [
        'Automated onboarding workflows',
        'Smart performance review scheduling',
        'Employee engagement monitoring'
      ],
      href: '/use-cases/hr'
    },
    {
      title: t('useCases.industries.healthcare.title'),
      description: t('useCases.industries.healthcare.description'),
      icon: Stethoscope,
      benefits: [
        'Patient follow-up automation',
        'Appointment scheduling',
        'Medical records management'
      ],
      href: '/use-cases/healthcare'
    },
    {
      title: t('useCases.industries.ecommerce.title'),
      description: t('useCases.industries.ecommerce.description'),
      icon: Building2,
      benefits: [
        'Inventory management',
        'Order processing',
        'Customer support automation'
      ],
      href: '/use-cases/ecommerce'
    },
    {
      title: t('useCases.industries.realEstate.title'),
      description: t('useCases.industries.realEstate.description'),
      icon: Building2,
      benefits: [
        'Listing automation',
        'Virtual tour scheduling',
        'Lead management'
      ],
      href: '/use-cases/real-estate'
    },
    {
      title: 'Sales',
      description: 'Automate and optimize your sales processes',
      icon: DollarSign,
      benefits: [
        'Lead qualification automation',
        'Smart follow-up sequences',
        'Deal pipeline optimization',
        'Performance analytics'
      ],
      href: '/use-cases/sales'
    },
    {
      title: 'Travel & Tourism',
      description: 'Streamline travel operations and enhance guest experiences',
      icon: Plane,
      benefits: [
        'Booking automation',
        'Itinerary management',
        'Customer communication',
        'Review management'
      ],
      href: '/use-cases/travel'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{t('useCases.title')}</h2>
          <p className="mt-4 text-xl text-gray-600">{t('useCases.subtitle')}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-600 transition-colors"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{industry.title}</h3>
                <p className="mt-2 text-gray-600">{industry.description}</p>
                <ul className="mt-4 space-y-2">
                  {industry.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}