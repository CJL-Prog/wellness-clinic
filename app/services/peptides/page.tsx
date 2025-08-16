'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const peptides = [
  {
    name: 'BPC-157',
    category: 'Healing & Recovery',
    benefits: ['Accelerated healing', 'Reduced inflammation', 'Gut health', 'Joint repair'],
    description: 'Body Protection Compound that promotes healing throughout the body.',
    dosing: '250-500mcg daily',
    duration: '4-8 weeks'
  },
  {
    name: 'CJC-1295/Ipamorelin',
    category: 'Growth Hormone',
    benefits: ['Increased muscle mass', 'Fat loss', 'Better sleep', 'Anti-aging'],
    description: 'Growth hormone releasing peptides that work synergistically.',
    dosing: '200-300mcg before bed',
    duration: '12-16 weeks'
  },
  {
    name: 'NAD+',
    category: 'Cellular Energy',
    benefits: ['Enhanced energy', 'Mental clarity', 'DNA repair', 'Longevity'],
    description: 'Coenzyme that supports cellular energy production and repair.',
    dosing: '100-200mg 2-3x weekly',
    duration: '8-12 weeks'
  },
  {
    name: 'TB-500',
    category: 'Recovery',
    benefits: ['Tissue repair', 'Flexibility', 'Reduced scarring', 'Hair growth'],
    description: 'Thymosin Beta-4 fragment that promotes healing and recovery.',
    dosing: '2-5mg weekly',
    duration: '4-6 weeks'
  },
  {
    name: 'PT-141',
    category: 'Sexual Health',
    benefits: ['Increased libido', 'Enhanced arousal', 'Improved performance', 'Works for men & women'],
    description: 'Melanocortin peptide for sexual dysfunction.',
    dosing: '1-2mg as needed',
    duration: 'As needed'
  },
  {
    name: 'Selank',
    category: 'Cognitive',
    benefits: ['Reduced anxiety', 'Enhanced focus', 'Better mood', 'Neuroprotection'],
    description: 'Nootropic peptide for mental performance and anxiety.',
    dosing: '250-500mcg daily',
    duration: '4-8 weeks'
  }
];

const conditions = [
  {
    title: 'Chronic Fatigue',
    peptides: ['NAD+', 'CJC-1295/Ipamorelin'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Joint Pain',
    peptides: ['BPC-157', 'TB-500'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: 'Aging',
    peptides: ['NAD+', 'CJC-1295/Ipamorelin', 'Selank'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Low Libido',
    peptides: ['PT-141', 'CJC-1295/Ipamorelin'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
];

export default function PeptidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 gradient-text-hero">
            Peptide Therapy
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            Cutting-edge peptides to optimize healing, recovery, and performance. 
            Prescribed by physicians, delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/intake"
              className="brutal-button"
            >
              Start Treatment
            </Link>
            <Link
              href="#peptides"
              className="px-8 py-3 bg-white border-2 border-black text-neutral-700 rounded-lg font-bold hover:bg-neutral-50 transition-all"
              style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
            >
              Explore Peptides
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Peptides List */}
      <section id="peptides" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Available Peptides</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {peptides.map((peptide, index) => (
              <motion.div
                key={peptide.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="brutal-card bg-white hover:transform hover:-translate-y-1 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{peptide.name}</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">
                    {peptide.category}
                  </span>
                </div>
                
                <p className="text-neutral-600 mb-4">{peptide.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-neutral-700 mb-1">Benefits:</h4>
                    <ul className="space-y-1">
                      {peptide.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-neutral-600">
                          <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-3 border-t-2 border-neutral-200 space-y-1">
                    <p className="text-xs text-neutral-500">
                      <span className="font-bold">Dosing:</span> {peptide.dosing}
                    </p>
                    <p className="text-xs text-neutral-500">
                      <span className="font-bold">Duration:</span> {peptide.duration}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Treated */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Conditions We Treat</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {conditions.map((condition, index) => (
              <motion.div
                key={condition.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 border-2 border-black">
                  {condition.icon}
                </div>
                <h3 className="font-bold mb-2">{condition.title}</h3>
                <p className="text-sm text-neutral-600">
                  Treated with: {condition.peptides.join(', ')}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your Peptide Journey Today
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients experiencing the benefits of peptide therapy.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-neutral-100 transition-colors"
            style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}
          >
            Get Started
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}