'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: '⚡',
    title: 'Metabolic Reset',
    description: 'Advanced peptide protocols for cellular rejuvenation',
    benefits: [
      'Enhanced recovery & healing',
      'Improved sleep quality',
      'Cellular repair & anti-aging',
      'Increased energy & vitality'
    ],
    link: '/services/peptides'
  },
  {
    icon: '⚖️',
    title: 'Hormone Optimization',
    description: 'Personalized HRT for men and women',
    benefits: [
      'Balanced mood & mental clarity',
      'Restored energy levels',
      'Better sleep patterns',
      'Enhanced libido & performance'
    ],
    link: '/services/hrt'
  },
  {
    icon: '🎯',
    title: 'Weight Transformation',
    description: 'Physician-supervised GLP-1 programs',
    benefits: [
      'Sustainable weight loss',
      'Appetite regulation',
      'Metabolic health improvement',
      'Ongoing medical support'
    ],
    link: '/services/weight-loss'
  },
  {
    icon: '🔬',
    title: 'Advanced Diagnostics',
    description: 'Comprehensive health optimization testing',
    benefits: [
      'Full biomarker panels',
      'In-home collection available',
      'Personalized insights',
      'Prevention-focused approach'
    ],
    link: '/services/labs'
  }
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Transform Your Health</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based treatments personalized to your unique biology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <div className={`
                h-full p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                ${hoveredIndex === index 
                  ? 'border-blue-500 shadow-xl transform -translate-y-2' 
                  : 'border-gray-200 hover:border-gray-300'}
              `}>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute bottom-6 right-6"
                >
                  <span className="text-blue-600 font-semibold">
                    Learn more →
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}