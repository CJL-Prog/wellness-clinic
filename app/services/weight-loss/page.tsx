'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const medications = [
  {
    name: 'Semaglutide (Ozempic/Wegovy)',
    type: 'GLP-1 Agonist',
    averageLoss: '15-20%',
    description: 'Once-weekly injection that reduces appetite and slows gastric emptying',
    benefits: [
      'FDA-approved for weight loss',
      'Improves blood sugar control', 
      'Reduces cardiovascular risk',
      'Once-weekly dosing'
    ],
    sideEffects: ['Nausea (improves over time)', 'Constipation', 'Decreased appetite'],
    price: 'Starting at $299/month'
  },
  {
    name: 'Tirzepatide (Mounjaro/Zepbound)',
    type: 'GLP-1/GIP Agonist',
    averageLoss: '20-25%',
    description: 'Dual-action medication for superior weight loss results',
    benefits: [
      'Most effective weight loss medication',
      'Dual hormone action',
      'Improves insulin sensitivity',
      'Once-weekly injection'
    ],
    sideEffects: ['Mild nausea', 'Reduced appetite', 'Possible fatigue'],
    price: 'Starting at $399/month'
  },
  {
    name: 'Liraglutide (Saxenda)',
    type: 'GLP-1 Agonist',
    averageLoss: '10-15%',
    description: 'Daily injection for appetite control and weight loss',
    benefits: [
      'FDA-approved for weight loss',
      'Improves metabolic health',
      'Reduces hunger',
      'Well-studied safety profile'
    ],
    sideEffects: ['Nausea', 'Constipation', 'Headache'],
    price: 'Starting at $249/month'
  },
  {
    name: 'Naltrexone/Bupropion (Contrave)',
    type: 'Combination',
    averageLoss: '5-10%',
    description: 'Oral medication that reduces cravings and appetite',
    benefits: [
      'Oral medication (no injections)',
      'Reduces food cravings',
      'Can improve mood',
      'Good for emotional eating'
    ],
    sideEffects: ['Dry mouth', 'Constipation', 'Insomnia'],
    price: 'Starting at $149/month'
  }
];

const successStories = [
  {
    name: 'Sarah M.',
    age: 42,
    medication: 'Semaglutide',
    weightLoss: '47 lbs',
    timeframe: '6 months',
    quote: 'I finally found something that works. The appetite control is incredible.',
    beforeAfter: { before: 198, after: 151 }
  },
  {
    name: 'Michael R.',
    age: 38,
    medication: 'Tirzepatide',
    weightLoss: '62 lbs',
    timeframe: '5 months',
    quote: 'This medication changed my life. I have energy I haven\'t had in years.',
    beforeAfter: { before: 285, after: 223 }
  },
  {
    name: 'Jennifer K.',
    age: 52,
    medication: 'Semaglutide',
    weightLoss: '35 lbs',
    timeframe: '4 months',
    quote: 'No more yo-yo dieting. This is sustainable and I feel amazing.',
    beforeAfter: { before: 175, after: 140 }
  }
];

const programFeatures = [
  {
    title: 'Medical Supervision',
    description: 'Board-certified physicians monitor your progress',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Personalized Dosing',
    description: 'Customized titration schedule for minimal side effects',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  },
  {
    title: 'Nutrition Guidance',
    description: 'Meal plans and nutritional support included',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: 'Ongoing Support',
    description: '24/7 messaging with your care team',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  }
];

export default function WeightLossPage() {
  const [selectedMed, setSelectedMed] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Medical Weight Loss
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Lose 15-25% of your body weight with FDA-approved GLP-1 medications. 
            Physician-supervised programs with guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/intake"
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-pink-700 transition-all"
            >
              Start Losing Weight
            </Link>
            <Link
              href="#medications"
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-orange-600 hover:text-orange-600 transition-all"
            >
              Compare Medications
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              FDA-Approved Medications
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No Insurance Required
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Results Guaranteed
            </div>
          </div>
        </motion.div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Real Results from Real Patients</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold">{story.name}</h3>
                    <p className="text-sm text-gray-600">Age {story.age}</p>
                  </div>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-orange-600">
                    {story.medication}
                  </span>
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex justify-around text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-400">{story.beforeAfter.before}</p>
                      <p className="text-xs text-gray-500">Before</p>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{story.beforeAfter.after}</p>
                      <p className="text-xs text-gray-500">After</p>
                    </div>
                  </div>
                  <div className="text-center mt-3 pt-3 border-t">
                    <p className="text-lg font-bold text-orange-600">-{story.weightLoss}</p>
                    <p className="text-xs text-gray-500">in {story.timeframe}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 italic">"{story.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medications Section */}
      <section id="medications" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Weight Loss Medications</h2>
          
          <div className="max-w-6xl mx-auto">
            {/* Medication Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {medications.map((med, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMed(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedMed === index
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {med.name.split(' ')[0]}
                </button>
              ))}
            </div>
            
            {/* Selected Medication Details */}
            <motion.div
              key={selectedMed}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2">{medications[selectedMed].name}</h3>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                      {medications[selectedMed].type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{medications[selectedMed].description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {medications[selectedMed].benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 mb-6">
                    <h4 className="font-semibold mb-2">Average Weight Loss</h4>
                    <p className="text-4xl font-bold text-orange-600 mb-2">
                      {medications[selectedMed].averageLoss}
                    </p>
                    <p className="text-sm text-gray-600">of total body weight</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Common Side Effects:</h4>
                    <ul className="space-y-1">
                      {medications[selectedMed].sideEffects.map((effect, i) => (
                        <li key={i} className="text-sm text-gray-600">• {effect}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-600 mb-1">
                      {medications[selectedMed].price}
                    </p>
                    <p className="text-sm text-gray-600">Includes medication, consultations & support</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link
                  href="/intake"
                  className="inline-flex items-center px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Get Started with {medications[selectedMed].name.split(' ')[0]}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Weight Loss Program</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BMI Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Do You Qualify?</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-600 mb-6">
                Our weight loss programs are available for patients with:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-orange-600 mb-2">BMI ≥ 30</h3>
                  <p className="text-sm text-gray-600">Classified as obese</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-orange-600 mb-2">BMI ≥ 27</h3>
                  <p className="text-sm text-gray-600">With weight-related conditions</p>
                </div>
              </div>
              
              <Link
                href="/intake"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-pink-700 transition-all"
              >
                Check Your Eligibility
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your Weight Loss Journey Today
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands who have successfully lost weight with our medical weight loss program.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-orange-100 text-sm mt-4">
            No insurance required • HSA/FSA eligible • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}