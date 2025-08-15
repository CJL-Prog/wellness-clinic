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
    color: 'blue',
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

const addOns = [
  {
    name: 'Comprehensive Lab Panel',
    price: 299,
    description: '75+ biomarkers analyzed'
  },
  {
    name: 'GLP-1 Add-On',
    price: 199,
    description: 'Semaglutide or Tirzepatide'
  },
  {
    name: 'NAD+ Protocol',
    price: 149,
    description: 'Cellular energy optimization'
  },
  {
    name: 'In-Home Phlebotomy',
    price: 99,
    description: 'Lab draw at your location'
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
          <h1 className="text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No hidden fees. No insurance hassles. Cancel anytime after 3 months.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingPeriod === 'monthly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('quarterly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingPeriod === 'quarterly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Quarterly
              <span className="ml-2 text-xs text-green-600 font-semibold">Save 10%</span>
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
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-semibold shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className={`
                h-full bg-white rounded-2xl p-8 transition-all hover:shadow-2xl
                ${plan.popular 
                  ? 'ring-2 ring-blue-500 shadow-xl' 
                  : 'shadow-lg border border-gray-100'}
              `}>
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-5xl font-bold">${getPrice(plan.price)}</span>
                    <span className="text-gray-600">/mo</span>
                  </div>
                  
                  {billingPeriod === 'quarterly' && (
                    <p className="text-sm text-gray-500">
                      Billed ${getPrice(plan.price) * 3} every 3 months
                    </p>
                  )}
                  
                  {plan.savings && billingPeriod === 'quarterly' && (
                    <p className="text-sm text-green-600 font-semibold mt-2">
                      {plan.savings}
                    </p>
                  )}
                </div>
                
                {/* CTA Button */}
                <Link
                  href={`/intake?plan=${plan.name.toLowerCase()}`}
                  className={`
                    block w-full py-3 rounded-lg font-semibold text-center transition-all mb-6
                    ${plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                  `}
                >
                  {plan.cta}
                </Link>
                
                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-3">Included:</h4>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-500 mt-4 mb-2">Not included:</h4>
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
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Add-Ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enhance Your Treatment</h2>
            <p className="text-xl text-gray-600">Optional add-ons to accelerate your results</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold mb-2">{addon.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{addon.description}</p>
                <p className="text-2xl font-bold text-blue-600">+${addon.price}<span className="text-sm text-gray-600">/mo</span></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              {showComparison ? 'Hide' : 'Show'} detailed comparison
            </button>
          </div>
          
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="max-w-5xl mx-auto overflow-x-auto"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Features</th>
                    <th className="text-center py-4 px-4">Essential</th>
                    <th className="text-center py-4 px-4 bg-blue-50">Comprehensive</th>
                    <th className="text-center py-4 px-4">Elite</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Provider Consultations', 'Quarterly', 'Monthly', 'Weekly'],
                    ['Peptide Protocols', 'Basic', 'Advanced', 'Custom'],
                    ['Lab Testing', '-', 'Basic Panel', 'Comprehensive'],
                    ['Hormone Optimization', '-', '✓', '✓'],
                    ['GLP-1 Medications', '-', '-', '✓'],
                    ['Response Time', '48 hours', '24 hours', 'Same day'],
                    ['Shipping', 'Standard', 'Priority', 'Express'],
                  ].map(([feature, ...values]) => (
                    <tr key={feature} className="border-b">
                      <td className="py-3 px-4 font-medium">{feature}</td>
                      {values.map((value, i) => (
                        <td key={i} className={`py-3 px-4 text-center ${i === 1 ? 'bg-blue-50' : ''}`}>
                          {value === '✓' ? (
                            <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : value === '-' ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQs</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-2">Why quarterly billing?</h3>
              <p className="text-gray-600">
                Most treatments take 8-12 weeks to show full results. Quarterly billing ensures you give the treatment enough time to work while saving you 10% compared to monthly billing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-2">Can I change plans?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-2">What's your refund policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day satisfaction guarantee. If you're not happy with your treatment, we'll work with you to find a solution or provide a refund for unused medication.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-2">Do prices include medication?</h3>
              <p className="text-gray-600">
                Yes! Your monthly price includes consultations, medications, shipping, and ongoing support. The only additional costs would be optional add-ons or additional lab work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your Transformation Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients achieving their health goals with personalized treatment plans.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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