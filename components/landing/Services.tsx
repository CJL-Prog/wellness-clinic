'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const services = [
  {
    icon: '⚡',
    title: 'Metabolic Reset',
    subtitle: 'Peptide Therapy',
    description: 'Advanced peptide protocols for cellular rejuvenation and optimization',
    benefits: [
      'Enhanced recovery & healing',
      'Improved sleep quality',
      'Cellular repair & anti-aging',
      'Increased energy & vitality'
    ],
    link: '/services/peptides',
    color: 'from-blue-500 to-cyan-500',
    popularTreatments: ['BPC-157', 'CJC-1295', 'NAD+'],
    price: 'From $199/mo'
  },
  {
    icon: '⚖️',
    title: 'Hormone Balance',
    subtitle: 'HRT Optimization',
    description: 'Personalized bioidentical hormone therapy for men and women',
    benefits: [
      'Balanced mood & mental clarity',
      'Restored energy levels',
      'Better sleep patterns',
      'Enhanced libido & performance'
    ],
    link: '/services/hrt',
    color: 'from-purple-500 to-pink-500',
    popularTreatments: ['Testosterone', 'Estradiol', 'Progesterone'],
    price: 'From $249/mo'
  },
  {
    icon: '🎯',
    title: 'Weight Transformation',
    subtitle: 'Medical Weight Loss',
    description: 'Physician-supervised GLP-1 programs with guaranteed results',
    benefits: [
      'Sustainable 15-25% weight loss',
      'Appetite regulation',
      'Metabolic health improvement',
      'Ongoing medical support'
    ],
    link: '/services/weight-loss',
    color: 'from-orange-500 to-red-500',
    popularTreatments: ['Semaglutide', 'Tirzepatide', 'Liraglutide'],
    price: 'From $299/mo'
  },
  {
    icon: '🔬',
    title: 'Advanced Diagnostics',
    subtitle: 'Comprehensive Testing',
    description: 'Deep health insights with 100+ biomarker analysis',
    benefits: [
      'Full biomarker panels',
      'In-home collection available',
      'Personalized insights',
      'Prevention-focused approach'
    ],
    link: '/services/labs',
    color: 'from-green-500 to-emerald-500',
    popularTreatments: ['Hormone Panel', 'Metabolic Panel', 'Nutrient Testing'],
    price: 'From $299'
  }
];

const processSteps = [
  { step: '01', title: 'Assess', description: '5-minute health questionnaire' },
  { step: '02', title: 'Consult', description: 'Physician review within 24hr' },
  { step: '03', title: 'Receive', description: 'Medications shipped to you' },
  { step: '04', title: 'Transform', description: 'Ongoing support & optimization' },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4"
          >
            PERSONALIZED TREATMENTS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Transform Your <span className="gradient-text">Health</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based treatments personalized to your unique biology and health goals
          </p>
        </motion.div>

        {/* Quick Process Steps */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-full font-bold mb-2">
                {step.step}
              </div>
              <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
              <p className="text-xs text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <Link href={service.link}>
                <div className={`
                  h-full rounded-2xl transition-all duration-300 cursor-pointer
                  ${hoveredIndex === index 
                    ? 'brutal-card transform -translate-y-2' 
                    : 'glass-card hover:shadow-xl'}
                `}>
                  {/* Service Header */}
                  <div className="p-6">
                    <motion.div 
                      className="text-5xl mb-4"
                      animate={hoveredIndex === index ? { scale: 1.1, rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {service.icon}
                    </motion.div>
                    
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                    <h3 className="text-xl font-bold mb-2 font-heading">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    
                    {/* Price Badge */}
                    <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold mb-4">
                      {service.price}
                    </div>

                    {/* Benefits List */}
                    <ul className="space-y-2 mb-4">
                      {service.benefits.map((benefit, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={hoveredIndex === index ? { opacity: 1, x: 0 } : { opacity: 0.8, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <span className="text-primary-500 mt-0.5">✓</span>
                          <span className="text-gray-600">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Popular Treatments */}
                    <div className="border-t pt-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">Popular treatments:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.popularTreatments.map((treatment, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                            {treatment}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Arrow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      className="absolute bottom-6 right-6"
                    >
                      <span className="text-primary-600 font-semibold flex items-center gap-1">
                        Learn more 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </motion.div>
                  </div>

                  {/* Gradient Border on Hover */}
                  {hoveredIndex === index && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-10`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                    />
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-medical rounded-3xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Why Choose Our Treatments?</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '👨‍⚕️', title: 'Board Certified', desc: 'Licensed physicians' },
              { icon: '🔬', title: 'Evidence-Based', desc: 'Proven protocols' },
              { icon: '📱', title: '24/7 Support', desc: 'Always available' },
              { icon: '💯', title: 'Guaranteed', desc: 'Results or refund' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm opacity-90">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">Ready to transform your health?</p>
          <Link href="/intake" className="brutal-button inline-flex items-center gap-2">
            Start Your Assessment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}