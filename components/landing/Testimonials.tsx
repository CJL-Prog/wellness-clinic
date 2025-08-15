'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Sarah M.',
    program: 'Metabolic Reset Program',
    rating: 5,
    text: "I've tried everything for my fatigue and brain fog. Within 3 weeks on the peptide protocol, I felt like myself again. The energy is sustainable and natural.",
    age: 42,
    results: 'Energy increased 80%'
  },
  {
    name: 'Michael R.',
    program: 'Weight Transformation',
    rating: 5,
    text: 'Lost 42 pounds in 4 months with the GLP-1 program. The medical supervision made all the difference. This is the first time weight loss has felt sustainable.',
    age: 38,
    results: '42 lbs lost'
  },
  {
    name: 'Jennifer K.',
    program: 'Hormone Optimization',
    rating: 5,
    text: 'HRT has given me my life back at 52. Better sleep, stable mood, and my relationship has never been better. Wish I had started sooner!',
    age: 52,
    results: 'Life-changing'
  },
  {
    name: 'David L.',
    program: 'Comprehensive Plan',
    rating: 5,
    text: 'The lab testing revealed issues my regular doctor never caught. The personalized treatment plan addresses everything. Worth every penny.',
    age: 45,
    results: 'Complete transformation'
  },
  {
    name: 'Amanda T.',
    program: 'Sleep & Recovery',
    rating: 5,
    text: 'As an athlete, recovery is everything. The peptide protocols cut my recovery time in half. I feel stronger and younger than I have in years.',
    age: 35,
    results: 'Recovery time -50%'
  },
  {
    name: 'Robert H.',
    program: 'Elite Membership',
    rating: 5,
    text: 'The concierge service and weekly check-ins keep me accountable. Down 30 pounds and my testosterone levels are optimal. Game changer.',
    age: 48,
    results: '30 lbs lost + optimized hormones'
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600">Real results from real patients</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.program}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {testimonial.results}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">4,500+</p>
            <p className="text-sm">Happy Patients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">4.9/5</p>
            <p className="text-sm">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">47</p>
            <p className="text-sm">States Served</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">24hr</p>
            <p className="text-sm">Provider Response</p>
          </div>
        </div>
      </div>
    </section>
  );
}