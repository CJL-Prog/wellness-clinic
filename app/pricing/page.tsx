'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const plans = [
  {
    name: 'Essential',
    price: 199,
    description: 'Perfect for starting your health journey',
    features: [
      'Online health assessment',
      'Provider consultation',
      'Basic peptide protocols',
      'Quarterly check-ins',
      'Secure messaging',
      'HSA/FSA eligible',
      'Free shipping'
    ],
    notIncluded: [
      'Lab testing',
      'Advanced peptides',
      'Hormone optimization',
      'Weekly consultations'
    ],
    cta: 'Start Essential',
    popular: false,
    color: 'gray'
  },
  {
    name: 'Comprehensive',
    price: 399,
    description: 'Our most popular program',
    features: [
      'Everything in Essential',
      'Advanced peptide combinations',
      'Hormone optimization',
      'Monthly provider calls',
      'Priority support',
      'Basic lab panel included',
      'Personalized protocols',
      'Dose adjustments',
      'Treatment optimization'
    ],
    notIncluded: [
      'GLP-1 medications',
      'Weekly consultations',
      'Advanced diagnostics'
    ],
    cta: 'Start Comprehensive',
    popular: true,
    color: 'emerald',
    savings: 'Save $200/quarter'
  },
  {
    name: 'Elite',
    price: 599,
    description: 'Complete transformation package',
    features: [
      'Everything in Comprehensive',
      'GLP-1 weight loss program',
      'Weekly provider access',
      'Comprehensive lab panels',
      'Personalized nutrition plan',
      'Concierge support',
      'Priority shipping',
      'Custom compounding',
      'Unlimited adjustments',
      'White-glove service'
    ],
    notIncluded: [],
    cta: 'Start Elite',
    popular: false,
    color: 'purple'
  }
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly'>('quarterly');
  const [showComparison, setShowComparison] = useState(false);

  const getPrice = (basePrice: number) => {
    return billingPeriod === 'quarterly' ? Math.floor(basePrice * 0.9) : basePrice;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 gradient-text-hero">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No hidden fees. No insurance hassles. Cancel anytime after 3 months.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md font-bold transition-all ${
                billingPeriod === 'monthly' 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('quarterly')}
              className={`px-6 py-2 rounded-md font-bold transition-all ${
                billingPeriod === 'quarterly' 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Quarterly
              <span className="ml-2 text-xs text-emerald-300 font-bold">Save 10%</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'lg:-mt-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className={`
                h-full brutal-card p-8 transition-all
                ${plan.popular 
                  ? 'border-emerald-500 bg-emerald-50 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)]' 
                  : 'hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'}
              `}>
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-5xl font-bold gradient-text">${getPrice(plan.price)}</span>
                    <span className="text-gray-600">/mo</span>
                  </div>
                  
                  {billingPeriod === 'quarterly' && (
                    <p className="text-sm text-gray-500">
                      Billed ${getPrice(plan.price) * 3} every 3 months
                    </p>
                  )}
                  
                  {plan.savings && billingPeriod === 'quarterly' && (
                    <p className="text-sm text-emerald-600 font-bold mt-2">
                      {plan.savings}
                    </p>
                  )}
                </div>
                
                {/* CTA Button */}
                <Link
                  href={`/intake?plan=${plan.name.toLowerCase()}`}
                  className={`
                    block w-full py-3 rounded-lg font-bold text-center transition-all mb-6
                    ${plan.popular
                      ? 'brutal-button'
                      : 'bg-white border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]'}
                  `}
                >
                  {plan.cta}
                </Link>
                
                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 mb-3">Included:</h4>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="font-bold text-gray-500 mt-4 mb-2">Not included:</h4>
                      {plan.notIncluded.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-500 text-sm line-through">{item}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                
                {/* Money Back Guarantee */}
                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    30-day satisfaction guarantee
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your Transformation Today
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients achieving their health goals with personalized treatment plans.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 rounded-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Get Started Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}