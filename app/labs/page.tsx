'use client';
import { useState } from 'react';
import Link from 'next/link';

const labPanels = [
  {
    name: 'Essential Panel',
    price: 299,
    markers: 45,
    tests: [
      'Complete Blood Count (CBC)',
      'Comprehensive Metabolic Panel',
      'Lipid Profile',
      'Thyroid Function (TSH, T3, T4)',
      'Vitamin D & B12',
      'Inflammation Markers'
    ],
    turnaround: '3-5 days'
  },
  {
    name: 'Advanced Panel',
    price: 599,
    markers: 75,
    tests: [
      'Everything in Essential',
      'Full Hormone Panel',
      'Advanced Cardiovascular Markers',
      'Micronutrient Analysis',
      'Cortisol & Stress Hormones',
      'Autoimmune Markers'
    ],
    turnaround: '5-7 days'
  },
  {
    name: 'Comprehensive Panel',
    price: 999,
    markers: 100,
    tests: [
      'Everything in Advanced',
      'Genetic Testing',
      'Food Sensitivity Panel',
      'Gut Health Analysis',
      'Heavy Metal Testing',
      'Cancer Screening Markers'
    ],
    turnaround: '7-10 days'
  }
];

const addOns = [
  { name: 'Galleri Cancer Test', price: 949 },
  { name: 'DUTCH Hormone Test', price: 399 },
  { name: 'GI-MAP Gut Test', price: 499 },
  { name: 'Food Sensitivity Panel', price: 299 },
  { name: 'Siphox Home Kit', price: 199 }
];

export default function LabsPage() {
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Diagnostic Lab Testing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive biomarker analysis to optimize your health
          </p>
        </div>

        {/* Lab Panels */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {labPanels.map((panel, index) => (
            <div
              key={index}
              onClick={() => setSelectedPanel(index)}
              className={`
                cursor-pointer rounded-2xl p-6 transition-all
                ${selectedPanel === index 
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-xl' 
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300'}
              `}
            >
              <h3 className="text-2xl font-bold mb-2">{panel.name}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${panel.price}
              </div>
              <p className="text-gray-600 mb-4">
                {panel.markers}+ biomarkers • {panel.turnaround}
              </p>
              <ul className="space-y-2">
                {panel.tests.map((test, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{test}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Optional Add-ons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map(addon => (
              <label
                key={addon.name}
                className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow"
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
                  className="w-5 h-5 text-blue-600"
                />
                <div className="flex-1">
                  <span className="font-medium">{addon.name}</span>
                  <span className="text-gray-600 ml-2">+${addon.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Collection Method */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6">Collection Method</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <label
              className={`
                p-6 rounded-xl border-2 cursor-pointer transition-all
                ${collectionMethod === 'lab' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'}
              `}
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
                <p className="text-gray-600">Visit any Quest or LabCorp location</p>
                <p className="text-green-600 font-semibold mt-2">Included</p>
              </div>
            </label>
            
            <label
              className={`
                p-6 rounded-xl border-2 cursor-pointer transition-all
                ${collectionMethod === 'home' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'}
              `}
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
                <p className="text-gray-600">Professional comes to you</p>
                <p className="text-blue-600 font-semibold mt-2">+$99</p>
              </div>
            </label>
          </div>
        </div>

        {/* Total & CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Total</h3>
              <p className="text-3xl font-bold">${calculateTotal()}</p>
              <p className="text-blue-100 mt-2">HSA/FSA eligible</p>
            </div>
            <Link
              href={selectedPanel !== null ? `/intake?labs=${selectedPanel}` : '#'}
              className={`
                px-8 py-4 rounded-xl font-semibold text-lg transition-all
                ${selectedPanel !== null 
                  ? 'bg-white text-blue-600 hover:shadow-lg' 
                  : 'bg-blue-500 text-blue-200 cursor-not-allowed'}
              `}
            >
              Order Labs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}