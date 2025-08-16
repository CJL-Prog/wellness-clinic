'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const treatments = {
  men: [
    {
      name: 'Testosterone Cypionate',
      description: 'Gold standard for testosterone replacement',
      benefits: ['Increased muscle mass', 'Improved libido', 'Better mood', 'Enhanced energy'],
      dosing: '100-200mg weekly'
    },
    {
      name: 'HCG',
      description: 'Maintains testicular function and fertility',
      benefits: ['Preserves fertility', 'Prevents testicular atrophy', 'Boosts natural production'],
      dosing: '250-500IU 2x weekly'
    },
    {
      name: 'Anastrozole',
      description: 'Aromatase inhibitor to control estrogen',
      benefits: ['Prevents gynecomastia', 'Optimizes testosterone/estrogen ratio', 'Reduces water retention'],
      dosing: '0.5-1mg 2x weekly'
    },
    {
      name: 'DHEA',
      description: 'Precursor hormone for overall vitality',
      benefits: ['Improved energy', 'Better immune function', 'Enhanced mood'],
      dosing: '25-50mg daily'
    }
  ],
  women: [
    {
      name: 'Estradiol',
      description: 'Bioidentical estrogen replacement',
      benefits: ['Reduced hot flashes', 'Better sleep', 'Improved mood', 'Vaginal health'],
      dosing: 'Patches, creams, or pellets'
    },
    {
      name: 'Progesterone',
      description: 'Balances estrogen and supports sleep',
      benefits: ['Better sleep', 'Reduced anxiety', 'Protects uterine health', 'Mood stability'],
      dosing: '100-200mg at bedtime'
    },
    {
      name: 'Testosterone',
      description: 'Low-dose testosterone for women',
      benefits: ['Increased libido', 'More energy', 'Better muscle tone', 'Improved mood'],
      dosing: 'Cream or pellets'
    },
    {
      name: 'DHEA',
      description: 'Supports overall hormone balance',
      benefits: ['Enhanced energy', 'Better skin', 'Improved libido', 'Bone health'],
      dosing: '10-25mg daily'
    }
  ]
};

const symptoms = {
  men: [
    'Low energy or fatigue',
    'Decreased muscle mass',
    'Increased body fat',
    'Low libido',
    'Erectile dysfunction',
    'Depression or mood swings',
    'Brain fog',
    'Poor sleep'
  ],
  women: [
    'Hot flashes',
    'Night sweats',
    'Vaginal dryness',
    'Low libido',
    'Mood swings',
    'Weight gain',
    'Insomnia',
    'Brain fog'
  ]
};

const labMarkers = [
  'Total Testosterone',
  'Free Testosterone',
  'Estradiol',
  'DHEA-S',
  'Progesterone',
  'FSH & LH',
  'SHBG',
  'Thyroid Panel',
  'Cortisol',
  'IGF-1'
];

export default function HRTPage() {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');

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
            Hormone Replacement Therapy
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            Restore your hormonal balance with bioidentical hormone therapy. 
            Personalized protocols for men and women.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/intake"
              className="brutal-button"
            >
              Check Your Hormones
            </Link>
            <Link
              href="/labs"
              className="px-8 py-3 bg-white border-2 border-black text-neutral-700 rounded-lg font-bold hover:bg-neutral-50 transition-all"
              style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
            >
              Order Lab Tests
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Gender Toggle */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex justify-center">
          <div className="inline-flex brutal-card bg-white p-1">
            <button
              onClick={() => setActiveTab('men')}
              className={`px-8 py-3 rounded-md font-bold transition-all ${
                activeTab === 'men'
                  ? 'bg-emerald-600 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              For Men
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`px-8 py-3 rounded-md font-bold transition-all ${
                activeTab === 'women'
                  ? 'bg-pink-600 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              For Women
            </button>
          </div>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {activeTab === 'men' ? 'Signs of Low Testosterone' : 'Signs of Hormone Imbalance'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {symptoms[activeTab].map((symptom, index) => (
              <motion.div
                key={symptom}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center p-4 glass-card rounded-lg"
              >
                <svg className={`w-5 h-5 ${activeTab === 'men' ? 'text-emerald-600' : 'text-pink-600'} mr-3 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700 font-medium">{symptom}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-neutral-600 mb-4">Experiencing 3+ symptoms?</p>
            <Link
              href="/intake"
              className="inline-flex items-center gradient-text font-bold hover:underline"
            >
              Take our assessment
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {activeTab === 'men' ? 'Treatments for Men' : 'Treatments for Women'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {treatments[activeTab].map((treatment, index) => (
              <motion.div
                key={treatment.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="brutal-card bg-white hover:transform hover:-translate-y-1 transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{treatment.name}</h3>
                <p className="text-neutral-600 mb-4">{treatment.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-neutral-700 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {treatment.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-neutral-600">
                          <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-3 border-t-2 border-neutral-200">
                    <p className="text-xs text-neutral-500">
                      <span className="font-bold">Typical dosing:</span> {treatment.dosing}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Testing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Lab Testing</h2>
          <p className="text-center text-neutral-600 mb-8 max-w-2xl mx-auto">
            We monitor all key hormone markers to ensure safe and effective treatment
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {labMarkers.map((marker, index) => (
              <motion.div
                key={marker}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-3 text-center border-2 border-black"
                style={{ boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
              >
                <span className="text-sm font-bold text-neutral-700">{marker}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/labs"
              className="brutal-button"
            >
              Order Lab Panel
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Restore Your Vitality Today
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have optimized their hormones and transformed their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/intake"
              className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-neutral-100 transition-colors"
              style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}
            >
              Start Assessment
            </Link>
            <Link
              href="/labs"
              className="px-8 py-3 bg-emerald-800 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors"
              style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}
            >
              Order Labs First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}