'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const plans = [
  {
    name: 'Essential',
    monthlyPrice: 199,
    quarterlyPrice: 537,
    yearlyPrice: 1908,
    description: 'Perfect for starting your health journey',
    features: [
      { text: 'Online health assessment', included: true },
      { text: 'Provider consultation', included: true },
      { text: 'Basic peptide protocols', included: true },
      { text: 'Quarterly check-ins', included: true },
      { text: 'Secure messaging', included: true },
      { text: 'HSA/FSA eligible', included: true },
      { text: 'Free standard shipping', included: true },
      { text: 'Advanced peptides', included: false },
      { text: 'Lab testing', included: false },
      { text: 'GLP-1 medications', included: false },
    ],
    cta: 'Start Essential',
    popular: false,
    color: 'primary',
    icon: '🌱',
    savings: null
  },
  {
    name: 'Comprehensive',
    monthlyPrice: 399,
    quarterlyPrice: 1077,
    yearlyPrice: 3828,
    description: 'Our most popular program',
    features: [
      { text: 'Everything in Essential', included: true },
      { text: 'Advanced peptide combinations', included: true },
      { text: 'Hormone optimization', included: true },
      { text: 'Monthly provider calls', included: true },
      { text: 'Priority support', included: true },
      { text: 'Basic lab panel included', included: true },
      { text: 'Personalized protocols', included: true },
      { text: 'Dose adjustments', included: true },
      { text: 'GLP-1 medications', included: false },
      { text: 'Concierge service', included: false },
    ],
    cta: 'Start Comprehensive',
    popular: true,
    color: 'gradient',
    icon: '⭐',
    savings: 'SAVE $480/year'
  },
  {
    name: 'Elite',
    monthlyPrice: 599,
    quarterlyPrice: 1617,
    yearlyPrice: 5748,
    description: 'Complete transformation package',
    features: [
      { text: 'Everything in Comprehensive', included: true },
      { text: 'GLP-1 weight loss program', included: true },
      { text: 'Weekly provider access', included: true },
      { text: 'Comprehensive lab panels', included: true },
      { text: 'Personalized nutrition plan', included: true },
      { text: 'Concierge support', included: true },
      { text: 'Priority shipping', included: true },
      { text: 'Custom compounding', included: true },
      { text: 'Unlimited adjustments', included: true },
      { text: 'White-glove service', included: true },
    ],
    cta: 'Start Elite',
    popular: false,
    color: 'accent',
    icon: '👑',
    savings: 'SAVE $720/year'
  }
];

const testimonialQuotes = [
  { name: 'Sarah M.', quote: 'Lost 35 lbs in 4 months!', plan: 'Elite' },
  { name: 'Mike R.', quote: 'Energy levels through the roof', plan: 'Comprehensive' },
  { name: 'Jessica K.', quote: 'Finally sleeping through the night', plan: 'Essential' },
];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('quarterly');
  const [showComparison, setShowComparison] = useState(false);

  const getPrice = (plan: typeof plans[0]) => {
    switch (billingPeriod) {
      case 'yearly':
        return Math.round(plan.yearlyPrice / 12);
      case 'quarterly':
        return Math.round(plan.quarterlyPrice / 3);
      default:
        return plan.monthlyPrice;
    }
  };

  const getTotalPrice = (plan: typeof plans[0]) => {
    switch (billingPeriod) {
      case 'yearly':
        return plan.yearlyPrice;
      case 'quarterly':
        return plan.quarterlyPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  const getSavings = (plan: typeof plans[0]) => {
    switch (billingPeriod) {
      case 'yearly':
        return plan.monthlyPrice * 12 - plan.yearlyPrice;
      case 'quarterly':
        return (plan.monthlyPrice * 3) - plan.quarterlyPrice;
      default:
        return 0;
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4"
          >
            TRANSPARENT PRICING
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Choose Your <span className="gradient-text-accent">Transformation</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            All plans include ongoing provider support and quarterly optimization
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center glass-card p-1 rounded-full">
            {(['monthly', 'quarterly', 'yearly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBillingPeriod(period)}
                className={`
                  px-6 py-3 rounded-full transition-all capitalize font-medium
                  ${billingPeriod === period 
                    ? 'bg-primary-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                {period}
                {period === 'quarterly' && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    Save 10%
                  </span>
                )}
                {period === 'yearly' && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'lg:-mt-8 lg:scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div 
                  className="absolute -top-4 left-0 right-0 flex justify-center z-10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="brutal-button px-6 py-2 text-sm">
                    MOST POPULAR • {plan.savings}
                  </span>
                </motion.div>
              )}
              
              <div className={`
                h-full rounded-3xl p-8 transition-all
                ${plan.popular 
                  ? 'brutal-card transform hover:scale-[1.02]' 
                  : 'glass-card hover:shadow-2xl'}
              `}>
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <motion.div 
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                  >
                    {plan.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 font-heading">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  {/* Price Display */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold gradient-text">
                        ${getPrice(plan)}
                      </span>
                      <span className="text-gray-600">/mo</span>
                    </div>
                    
                    {billingPeriod !== 'monthly' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2"
                      >
                        <p className="text-sm text-gray-500">
                          Billed ${getTotalPrice(plan)} {billingPeriod}
                        </p>
                        {getSavings(plan) > 0 && (
                          <p className="text-sm text-primary-600 font-semibold mt-1">
                            Save ${getSavings(plan)} vs monthly
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Cancel after 3 months • HSA/FSA eligible
                  </p>
                </div>
                
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02 }}
                    >
                      {feature.included ? (
                        <>
                          <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-sm">{feature.text}</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400 line-through text-sm">{feature.text}</span>
                        </>
                      )}
                    </motion.li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Link
                  href={`/intake?plan=${plan.name.toLowerCase()}`}
                  className={`
                    block w-full py-4 rounded-xl font-semibold text-center transition-all
                    ${plan.popular
                      ? 'brutal-button'
                      : 'brutal-button-secondary'}
                  `}
                >
                  {plan.cta}
                </Link>
                
                {/* Money Back Guarantee */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  30-day satisfaction guarantee
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex flex-wrap justify-center gap-6">
            {testimonialQuotes.map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card px-6 py-3 rounded-full"
              >
                <p className="text-sm">
                  <span className="font-semibold">{quote.name}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="italic">"{quote.quote}"</span>
                  <span className="ml-2 text-primary-600 font-semibold">{quote.plan}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="brutal-button-soft inline-flex items-center gap-2"
          >
            {showComparison ? 'Hide' : 'Show'} Full Comparison
            <motion.svg
              animate={{ rotate: showComparison ? 180 : 0 }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
        </motion.div>

        {/* Detailed Comparison Table */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden"
            >
              <div className="glass-card rounded-2xl p-8 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-heading">Features</th>
                      <th className="text-center py-4 px-4 font-heading">Essential</th>
                      <th className="text-center py-4 px-4 bg-primary-50 font-heading">Comprehensive</th>
                      <th className="text-center py-4 px-4 font-heading">Elite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Provider Consultations', 'Quarterly', 'Monthly', 'Weekly'],
                      ['Response Time', '48 hours', '24 hours', 'Same day'],
                      ['Peptide Protocols', 'Basic', 'Advanced', 'Custom'],
                      ['Lab Testing', '-', 'Basic Panel', 'Comprehensive'],
                      ['Hormone Optimization', '-', '✓', '✓'],
                      ['GLP-1 Medications', '-', '-', '✓'],
                      ['Shipping', 'Standard', 'Priority', 'Express'],
                      ['Support Level', 'Standard', 'Priority', 'Concierge'],
                    ].map(([feature, ...values], i) => (
                      <motion.tr 
                        key={feature}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium">{feature}</td>
                        {values.map((value, j) => (
                          <td key={j} className={`py-3 px-4 text-center ${j === 1 ? 'bg-primary-50' : ''}`}>
                            {value === '✓' ? (
                              <svg className="w-5 h-5 text-primary-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : value === '-' ? (
                              <span className="text-gray-300">—</span>
                            ) : (
                              <span className="text-sm">{value}</span>
                            )}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}