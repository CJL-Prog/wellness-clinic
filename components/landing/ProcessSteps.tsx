'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Tell Us About You',
    description: 'Complete our 3-minute health assessment to help us understand your goals and medical history',
    icon: '📋'
  },
  {
    number: '02',
    title: 'Provider Review',
    description: 'Board-certified physicians review your information within 24-48 hours',
    icon: '👨‍⚕️'
  },
  {
    number: '03',
    title: 'Personalized Plan Delivered',
    description: 'Receive your customized treatment plan and medications shipped discreetly to your door',
    icon: '📦'
  }
];

export function ProcessSteps() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Your Journey to Better Health</h2>
          <p className="text-xl text-neutral-600">Simple, fast, and completely online</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 hidden md:block" />
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="brutal-card bg-white">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full text-white text-2xl font-bold mb-4 mx-auto border-2 border-black">
                      {step.number}
                    </div>
                    <div className="text-3xl mb-4 text-center">{step.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
                    <p className="text-neutral-600 text-center">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}