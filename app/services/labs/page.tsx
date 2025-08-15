'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const panels = [
  {
    name: 'Basic Health Panel',
    price: 199,
    markers: 35,
    category: 'Foundation',
    turnaround: '2-3 days',
    description: 'Essential markers for overall health assessment',
    includes: [
      'Complete Blood Count (CBC)',
      'Comprehensive Metabolic Panel',
      'Lipid Panel',
      'Thyroid (TSH)',
      'Vitamin D',
      'HbA1c'
    ],
    ideal: 'Annual checkups and basic health monitoring'
  },
  {
    name: 'Hormone Complete',
    price: 399,
    markers: 55,
    category: 'Hormones',
    turnaround: '3-5 days',
    description: 'Comprehensive hormone analysis for optimization',
    includes: [
      'Total & Free Testosterone',
      'Estradiol & Progesterone',
      'DHEA-S & Cortisol',
      'FSH & LH',
      'SHBG',
      'Thyroid Panel (TSH, T3, T4)',
      'IGF-1',
      'Prolactin'
    ],
    ideal: 'Hormone optimization and HRT monitoring'
  },
  {
    name: 'Advanced Metabolic',
    price: 499,
    markers: 75,
    category: 'Metabolism',
    turnaround: '5-7 days',
    description: 'Deep dive into metabolic and cardiovascular health',
    includes: [
      'Advanced Lipid Panel',
      'Apolipoprotein B',
      'Lp(a)',
      'hs-CRP & Homocysteine',
      'Insulin & Glucose',
      'Omega-3 Index',
      'Micronutrient Panel',
      'Oxidative Stress Markers'
    ],
    ideal: 'Weight loss programs and metabolic optimization'
  },
  {
    name: 'Executive Wellness',
    price: 999,
    markers: 100+,
    category: 'Comprehensive',
    turnaround: '7-10 days',
    description: 'Our most comprehensive health assessment',
    includes: [
      'Everything in Advanced Metabolic',
      'Cancer Markers (PSA, CEA, CA-125)',
      'Heavy Metal Testing',
      'Food Sensitivity Panel',
      'Genetic Risk Markers',
      'Inflammatory Markers',
      'Gut Health Markers',
      'Neurotransmitter Panel'
    ],
    ideal: 'Executive health programs and preventive care'
  }
];

const addOnTests = [
  {
    name: 'Galleri Cancer Test',
    price: 949,
    description: 'Screens for 50+ types of cancer',
    turnaround: '10-14 days'
  },
  {
    name: 'DUTCH Hormone Test',
    price: 399,
    description: 'Comprehensive hormone metabolites',
    turnaround: '14 days'
  },
  {
    name: 'GI-MAP',
    price: 499,
    description: 'Complete gut microbiome analysis',
    turnaround: '10-14 days'
  },
  {
    name: 'Omega-3 Index',
    price: 89,
    description: 'Measures omega-3 fatty acid levels',
    turnaround: '5-7 days'
  },
  {
    name: 'Siphox At-Home Kit',
    price: 199,
    description: '17 key biomarkers from home',
    turnaround: '5-7 days'
  },
  {
    name: 'Continuous Glucose Monitor',
    price: 149,
    description: '14-day glucose monitoring',
    turnaround: 'Ships in 2-3 days'
  }
];

const collectionOptions = [
  {
    type: 'Lab Draw',
    price: 0,
    description: 'Visit any Quest or LabCorp location nationwide',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    type: 'Mobile Phlebotomy',
    price: 99,
    description: 'Professional comes to your home or office',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    type: 'At-Home Kit',
    price: 49,
    description: 'Self-collection kit shipped to you',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

const process = [
  {
    step: 1,
    title: 'Order Your Panel',
    description: 'Select tests based on your health goals'
  },
  {
    step: 2,
    title: 'Get Blood Drawn',
    description: 'Visit a lab or schedule home collection'
  },
  {
    step: 3,
    title: 'Receive Results',
    description: 'Detailed report in 3-7 days'
  },
  {
    step: 4,
    title: 'Provider Review',
    description: 'Discuss results and get treatment plan'
  }
];

export default function LabsServicePage() {
  const [selectedPanel, setSelectedPanel] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [collectionMethod, setCollectionMethod] = useState(0);

  const calculateTotal = () => {
    let total = panels[selectedPanel].price;
    selectedAddOns.forEach(addon => {
      const found = addOnTests.find(a => a.name === addon);
      if (found) total += found.price;
    });
    total += collectionOptions[collectionMethod].price;
    return total;
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
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Advanced Lab Testing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive biomarker analysis to optimize your health. 
            100+ markers available with physician interpretation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#panels"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Order Labs Now
            </Link>
            <Link
              href="#process"
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition-all"
            >
              How It Works
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              CLIA-Certified Labs
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Physician Reviewed
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              HSA/FSA Eligible
            </div>
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Process</h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Panels */}
      <section id="panels" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Panel</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {panels.map((panel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPanel(index)}
                className={`bg-white rounded-xl p-6 cursor-pointer transition-all ${
                  selectedPanel === index
                    ? 'ring-2 ring-purple-600 shadow-xl'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="mb-3">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {panel.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{panel.name}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ${panel.price}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {panel.markers} markers • {panel.turnaround}
                </p>
                <p className="text-sm text-gray-700 mb-4">{panel.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-700">Key Tests:</h4>
                  <ul className="space-y-1">
                    {panel.includes.slice(0, 4).map((test, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start">
                        <svg className="w-3 h-3 text-green-500 mt-0.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {test}
                      </li>
                    ))}
                    {panel.includes.length > 4 && (
                      <li className="text-xs text-purple-600 font-semibold">
                        +{panel.includes.length - 4} more
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Best for:</span> {panel.ideal}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Tests */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Add Specialty Tests</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {addOnTests.map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold">{test.name}</h3>
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(test.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAddOns([...selectedAddOns, test.name]);
                      } else {
                        setSelectedAddOns(selectedAddOns.filter(a => a !== test.name));
                      }
                    }}
                    className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">+${test.price}</span>
                  <span className="text-xs text-gray-500">{test.turnaround}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Collection Method</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {collectionOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCollectionMethod(index)}
                className={`bg-white rounded-xl p-6 cursor-pointer transition-all ${
                  collectionMethod === index
                    ? 'ring-2 ring-purple-600 shadow-xl'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  {option.icon}
                </div>
                <h3 className="font-bold text-center mb-2">{option.type}</h3>
                <p className="text-sm text-gray-600 text-center mb-4">{option.description}</p>
                <p className="text-2xl font-bold text-purple-600 text-center">
                  {option.price === 0 ? 'Free' : `+$${option.price}`}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Summary */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>{panels[selectedPanel].name}</span>
                <span className="font-semibold">${panels[selectedPanel].price}</span>
              </div>
              
              {selectedAddOns.map(addon => {
                const test = addOnTests.find(a => a.name === addon);
                return test ? (
                  <div key={addon} className="flex justify-between text-sm">
                    <span>{test.name}</span>
                    <span>+${test.price}</span>
                  </div>
                ) : null;
              })}
              
              {collectionOptions[collectionMethod].price > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{collectionOptions[collectionMethod].type}</span>
                  <span>+${collectionOptions[collectionMethod].price}</span>
                </div>
              )}
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">${calculateTotal()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">HSA/FSA eligible</p>
              </div>
            </div>
            
            <Link
              href="/intake"
              className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-center hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Complete Order
            </Link>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Results in {panels[selectedPanel].turnaround} • Physician interpretation included
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}