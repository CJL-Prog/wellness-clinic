'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const plans = [
  {
    name: 'Essential',
    monthlyPrice: 199,
    quarterlyPrice: 537, // $179/mo when billed quarterly (10% off)
    description: 'Perfect for starting your health journey',
    features: [
      'Online health assessment',
      'Provider consultation',
      'Basic peptide protocols',
      'Quarterly check-ins',
      'HSA/FSA eligible'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Comprehensive',
    monthlyPrice: 399,
    quarterlyPrice: 1077, // $359/mo when billed quarterly (10% off)
    description: 'Our most popular program',
    features: [
      'Everything in Essential',
      'Advanced peptide combinations',
      'Hormone optimization',
      'Monthly provider calls',
      'Priority support',
      'Lab testing included'
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    name: 'Elite',
    monthlyPrice: 599,
    quarterlyPrice: 1617, // $539/mo when billed quarterly (10% off)
    description: 'Complete transformation package',
    features: [
      'Everything in Comprehensive',
      'GLP-1 weight loss program',
      'Weekly provider access',
      'Comprehensive lab panels',
      'Personalized nutrition plan',
      'Concierge support'
    ],
    cta: 'Get Started',
    popular: false
  }
];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly'>('quarterly');

  return (
    <section id="membership" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Membership Plans</h2>
          <p className="text-xl text-gray-600 mb-8">
            All plans include ongoing provider support and quarterly optimization
          </p>
          
          {/* Billing toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md transition-all ${
                billingPeriod === 'monthly' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('quarterly')}
              className={`px-4 py-2 rounded-md transition-all ${
                billingPeriod === 'quarterly' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              Quarterly (Save 10%)
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'lg:-mt-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className={`
                h-full bg-white rounded-2xl p-8 transition-all
                ${plan.popular 
                  ? 'shadow-2xl border-2 border-blue-500' 
                  : 'shadow-lg border border-gray-200'}
              `}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  {billingPeriod === 'monthly' ? (
                    <>
                      <span className="text-5xl font-bold">
                        ${plan.monthlyPrice}
                      </span>
                      <span className="text-gray-600">/mo</span>
                    </>
                  ) : (
                    <div>
                      <span className="text-5xl font-bold">
                        ${Math.round(plan.quarterlyPrice / 3)}
                      </span>
                      <span className="text-gray-600">/mo</span>
                      <div className="text-sm text-green-600 mt-1 font-semibold">
                        Save ${(plan.monthlyPrice - Math.round(plan.quarterlyPrice / 3)) * 3}/quarter
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mb-6">
                  {billingPeriod === 'monthly' 
                    ? 'Billed monthly • Cancel after 3 months'
                    : `Billed quarterly ($${plan.quarterlyPrice}) • Best value`}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/intake?plan=${plan.name.toLowerCase()}`}
                  className={`
                    block w-full py-3 rounded-lg font-semibold text-center transition-all
                    ${plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                  `}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}