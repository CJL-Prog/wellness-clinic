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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Hormone Replacement Therapy
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Restore your hormonal balance with bioidentical hormone therapy. 
            Personalized protocols for men and women.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/intake"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all"
            >
              Check Your Hormones
            </Link>
            <Link
              href="/labs"
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600 hover:text-green-600 transition-all"
            >
              Order Lab Tests
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Gender Toggle */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('men')}
              className={`px-8 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'men'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Men
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`px-8 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'women'
                  ? 'bg-white text-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
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
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <svg className={`w-5 h-5 ${activeTab === 'men' ? 'text-blue-600' : 'text-pink-600'} mr-3 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{symptom}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Experiencing 3+ symptoms?</p>
            <Link
              href="/intake"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
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
      <section className="py-20 bg-gray-50">
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
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{treatment.name}</h3>
                <p className="text-gray-600 mb-4">{treatment.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {treatment.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">Typical dosing:</span> {treatment.dosing}
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
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
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
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 text-center"
              >
                <span className="text-sm font-medium text-gray-700">{marker}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/labs"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Order Lab Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Safe & Monitored Treatment</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">FDA-Approved</h3>
              <p className="text-gray-600">
                All medications are FDA-approved or compounded in licensed pharmacies
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Regular Monitoring</h3>
              <p className="text-gray-600">
                Quarterly labs and monthly check-ins to optimize your protocol
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Physicians</h3>
              <p className="text-gray-600">
                Board-certified physicians specializing in hormone optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Restore Your Vitality Today
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have optimized their hormones and transformed their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/intake"
              className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Assessment
            </Link>
            <Link
              href="/labs"
              className="px-8 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Order Labs First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}