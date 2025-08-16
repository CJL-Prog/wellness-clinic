'use client';
import { useState } from 'react';
import Link from 'next/link';

const labPanels = [
  {
    name: 'Essential Panel',
    price: 299,
    markers: '45+',
    category: 'Basic',
    turnaround: '3-5 days',
    description: 'Core health markers for prevention',
    tests: [
      'Complete Blood Count (CBC)',
      'Comprehensive Metabolic Panel',
      'Lipid Profile',
      'Thyroid Function (TSH, T3, T4)',
      'Vitamin D & B12',
      'Inflammation Markers (CRP, ESR)'
    ]
  },
  {
    name: 'Advanced Panel',
    price: 599,
    markers: '75+',
    category: 'Advanced',
    turnaround: '5-7 days',
    description: 'Comprehensive health optimization',
    tests: [
      'Everything in Essential',
      'Full Hormone Panel',
      'Advanced Cardiovascular Markers',
      'Micronutrient Analysis',
      'Cortisol & Stress Hormones',
      'Autoimmune Markers'
    ]
  },
  {
    name: 'Executive Wellness',
    price: 999,
    markers: '100+',
    category: 'Comprehensive',
    turnaround: '7-10 days',
    description: 'Our most comprehensive health assessment',
    tests: [
      'Everything in Advanced',
      'Genetic Testing',
      'Food Sensitivity Panel',
      'Gut Health Analysis',
      'Heavy Metal Testing',
      'Cancer Screening Markers'
    ]
  }
];

const addOns = [
  { name: 'Galleri Cancer Test', price: 949, description: 'Multi-cancer early detection' },
  { name: 'DUTCH Hormone Test', price: 399, description: 'Comprehensive hormone mapping' },
  { name: 'GI-MAP Gut Test', price: 499, description: 'Complete gut microbiome analysis' },
  { name: 'Food Sensitivity Panel', price: 299, description: 'Test 200+ foods' },
  { name: 'Siphox Home Kit', price: 199, description: 'At-home biomarker testing' }
];

export default function LabsServicePage() {
  const [selectedPanel, setSelectedPanel] = useState<number | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [collectionMethod, setCollectionMethod] = useState<'lab' | 'home'>('lab');

  const calculateTotal = () => {
    let total = selectedPanel !== null ? labPanels[selectedPanel].price : 0;
    selectedAddOns.forEach(addon => {
      const found = addOns.find(a => a.name === addon);
      if (found) total += found.price;
    });
    if (collectionMethod === 'home') total += 99;
    return total;
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text-hero">Advanced Lab Testing</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Comprehensive biomarker analysis to optimize your health with actionable insights
          </p>
        </div>

        {/* Lab Panels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Choose Your Panel</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {labPanels.map((panel, index) => (
              <div
                key={index}
                onClick={() => setSelectedPanel(index)}
                className={`
                  cursor-pointer brutal-card bg-white transition-all
                  ${selectedPanel === index 
                    ? 'ring-4 ring-emerald-500 transform -translate-y-1' 
                    : 'hover:transform hover:-translate-y-1'}
                `}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{panel.name}</h3>
                  {selectedPanel === index && (
                    <span className="text-emerald-600">✓</span>
                  )}
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  ${panel.price}
                </div>
                <p className="text-neutral-600 mb-4">
                  {panel.markers} biomarkers • {panel.turnaround}
                </p>
                <p className="text-neutral-700 mb-4">{panel.description}</p>
                <ul className="space-y-2">
                  {panel.tests.map((test, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="glass-card rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Optional Add-ons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map(addon => (
              <label
                key={addon.name}
                className="flex items-start gap-3 p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow border-2 border-neutral-200 hover:border-emerald-500"
              >
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(addon.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAddOns([...selectedAddOns, addon.name]);
                    } else {
                      setSelectedAddOns(selectedAddOns.filter(a => a !== addon.name));
                    }
                  }}
                  className="w-5 h-5 text-emerald-600 mt-0.5"
                />
                <div className="flex-1">
                  <div className="font-bold">{addon.name}</div>
                  <div className="text-sm text-neutral-600">{addon.description}</div>
                  <div className="text-sm font-bold gradient-text mt-1">+${addon.price}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Collection Method */}
        <div className="brutal-card bg-white mb-12">
          <h2 className="text-2xl font-bold mb-6">Collection Method</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <label
              className={`
                p-6 rounded-xl border-2 border-black cursor-pointer transition-all
                ${collectionMethod === 'lab' 
                  ? 'bg-emerald-50' 
                  : 'bg-white hover:bg-neutral-50'}
              `}
              style={{ boxShadow: collectionMethod === 'lab' ? '4px 4px 0px 0px rgba(0,0,0,1)' : 'none' }}
            >
              <input
                type="radio"
                name="collection"
                value="lab"
                checked={collectionMethod === 'lab'}
                onChange={() => setCollectionMethod('lab')}
                className="sr-only"
              />
              <div>
                <h3 className="font-bold mb-2">Lab Draw</h3>
                <p className="text-neutral-600">Visit any Quest or LabCorp location</p>
                <p className="text-emerald-600 font-bold mt-2">Included</p>
              </div>
            </label>
            
            <label
              className={`
                p-6 rounded-xl border-2 border-black cursor-pointer transition-all
                ${collectionMethod === 'home' 
                  ? 'bg-emerald-50' 
                  : 'bg-white hover:bg-neutral-50'}
              `}
              style={{ boxShadow: collectionMethod === 'home' ? '4px 4px 0px 0px rgba(0,0,0,1)' : 'none' }}
            >
              <input
                type="radio"
                name="collection"
                value="home"
                checked={collectionMethod === 'home'}
                onChange={() => setCollectionMethod('home')}
                className="sr-only"
              />
              <div>
                <h3 className="font-bold mb-2">In-Home Phlebotomy</h3>
                <p className="text-neutral-600">Professional comes to you</p>
                <p className="gradient-text font-bold mt-2">+$99</p>
              </div>
            </label>
          </div>
        </div>

        {/* Total & CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white border-2 border-black"
             style={{ boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Total</h3>
              <p className="text-3xl font-bold">${calculateTotal()}</p>
              <p className="text-emerald-100 mt-2">HSA/FSA eligible</p>
            </div>
            <Link
              href={selectedPanel !== null ? `/intake?labs=${selectedPanel}` : '#'}
              className={`
                px-8 py-4 rounded-xl font-bold text-lg transition-all
                ${selectedPanel !== null 
                  ? 'bg-white text-emerald-600 hover:bg-neutral-100' 
                  : 'bg-emerald-500 text-emerald-200 cursor-not-allowed'}
              `}
              style={{ boxShadow: selectedPanel !== null ? '4px 4px 0px 0px rgba(0,0,0,0.3)' : 'none' }}
            >
              Order Labs
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { icon: '🏥', title: '5,000+ Lab Locations', description: 'Quest & LabCorp nationwide' },
            { icon: '📊', title: 'Physician Reviewed', description: 'Expert analysis included' },
            { icon: '🚀', title: 'Fast Results', description: '3-7 days turnaround' },
            { icon: '💳', title: 'HSA/FSA Eligible', description: 'Save with tax-free dollars' }
          ].map((benefit, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-2">{benefit.icon}</div>
              <h3 className="font-bold mb-1">{benefit.title}</h3>
              <p className="text-sm text-neutral-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}